from PIL import Image
from pathlib import Path

root = Path(__file__).resolve().parents[1]
# Crop supplied artwork without changing the mark's geometry.
source = Image.open(root / 'yamm/1.png').convert('RGBA')
logo = source.crop((650, 1880, 4340, 2660))
pixels = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = pixels[x, y]
        pixels[x, y] = (r, g, b, max(r, g, b))
logo.thumbnail((1600, 400))
logo.save(root / 'public/brand/yemm.png', optimize=True)
arabic = Image.open(root / 'yamm/2.png').convert('RGBA').crop((1190, 1980, 3790, 2810))
pixels = arabic.load()
for y in range(arabic.height):
    for x in range(arabic.width):
        r, g, b, a = pixels[x, y]
        pixels[x, y] = (r, g, b, max(r, g, b))
arabic.thumbnail((1000, 400))
arabic.save(root / 'public/brand/yemm-arabic.png', optimize=True)
Image.open(root / 'hiro.png').convert('RGB').resize((1672, 941)).save(root / 'public/brand/hero-reference.webp', quality=90)
