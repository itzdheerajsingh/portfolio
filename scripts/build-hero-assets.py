#!/usr/bin/env python3
"""Build seamless looping hero clip + portrait stills.
Usage: python3 scripts/build-hero-assets.py intro.mp4 photo.jpg
Crop is for a 1280x720 source with the person centred (x=640): 576x720 @ x=352,y=0 -> 4:5."""
import subprocess, sys, wave, numpy as np
from pathlib import Path
SRC, PHOTO = sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None
CROP, X, OUT, TMP = "crop=576:720:352:0,scale=768:960", 0.5, Path("public/hero"), Path("/tmp/hero")
OUT.mkdir(parents=True, exist_ok=True); TMP.mkdir(exist_ok=True)
run = lambda *a: subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, a)], check=True)
D = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", SRC]))
D = min(D, 10.0)
# 1+3 video: crop, whiten backdrop, crossfade tail into head
fc = (f"[0:v]{CROP},colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,fps=30,split=2[p][q];"
      f"[p]trim={X}:{D},setpts=PTS-STARTPTS[a];[q]trim=0:{X},setpts=PTS-STARTPTS[b];"
      f"[a][b]xfade=transition=fade:duration={X}:offset={D-2*X}[v]")
run("-i", SRC, "-t", D, "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libx264", "-crf", 12, "-pix_fmt", "yuv420p", TMP/"v.mp4")
# audio: sample-accurate crossfade in numpy
run("-i", SRC, "-t", D, "-vn", "-ac", 1, "-ar", 48000, "-c:a", "pcm_s16le", TMP/"a.wav")
w = wave.open(str(TMP/"a.wav")); sr = w.getframerate()
s = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float64); w.close()
n = int(X*sr); body, head = s[n:].copy(), s[:n]
t = np.linspace(0, 1, n)
body[-n:] = body[-n:]*np.cos(t*np.pi/2) + head*np.sin(t*np.pi/2)   # equal-power
with wave.open(str(TMP/"loop.wav"), "wb") as o:
    o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.clip(body, -32768, 32767).astype(np.int16).tobytes())
# 4 export
run("-i", TMP/"v.mp4", "-i", TMP/"loop.wav", "-c:v", "libx264", "-crf", 24, "-preset", "slow", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest", OUT/"hero.mp4")
try:
    run("-i", TMP/"v.mp4", "-i", TMP/"loop.wav", "-c:v", "libvpx-vp9", "-crf", 36, "-b:v", 0, "-c:a", "libopus", "-b:a", "80k", "-shortest", OUT/"hero.webm")
except Exception as e: print("webm skipped:", e)
# 5 stills
if PHOTO:
    from PIL import Image
    im = Image.open(PHOTO).convert("RGB"); W, H = im.size
    h = H; w_ = int(h*0.8); x = (W-w_)//2
    im.crop((x, 0, x+w_, h)).resize((480, 600), Image.LANCZOS).save("public/portrait-bust.webp", quality=88)
    og = Image.new("RGB", (1200, 630), (244, 242, 238)); p = im.crop((x, 0, x+w_, h)).resize((504, 630), Image.LANCZOS)
    og.paste(p, (348, 0)); og.save("public/og.jpg", quality=88)
print("done", D-X, "s loop")
