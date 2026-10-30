"""Render phone-friendly invitation images from the website's event details."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode


ROOT = Path(__file__).resolve().parent
SIZE = (1080, 1920)
MAPS_URL = "https://maps.app.goo.gl/U6MTif6dyTTokPHz6"
FONT_DIR = Path("C:/Windows/Fonts")


def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)


GEORGIA = lambda size: font("georgia.ttf", size)
GEORGIA_ITALIC = lambda size: font("georgiai.ttf", size)
SANS = lambda size: font("segoeui.ttf", size)
SANS_BOLD = lambda size: font("segoeuib.ttf", size)


def centered(draw, y, value, face, color, spacing=0):
    if spacing:
        widths = [draw.textlength(char, font=face) for char in value]
        total = sum(widths) + spacing * (len(value) - 1)
        x = (SIZE[0] - total) / 2
        for char, width in zip(value, widths):
            draw.text((x, y), char, font=face, fill=color)
            x += width + spacing
    else:
        width = draw.textlength(value, font=face)
        draw.text(((SIZE[0] - width) / 2, y), value, font=face, fill=color)


def rule(draw, y, color, width=380):
    x = SIZE[0] // 2
    draw.line((x - width // 2, y, x + width // 2, y), fill=color, width=2)
    draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=color)


def background(top, bottom):
    image = Image.new("RGB", SIZE)
    pixels = image.load()
    for y in range(SIZE[1]):
        t = y / (SIZE[1] - 1)
        color = tuple(round(a * (1 - t) + b * t) for a, b in zip(top, bottom))
        for x in range(SIZE[0]):
            pixels[x, y] = color
    return image


def qr_code():
    code = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=12, border=4)
    code.add_data(MAPS_URL)
    code.make(fit=True)
    return code.make_image(fill_color="#171411", back_color="white").convert("RGB").resize((246, 246), Image.Resampling.NEAREST)


def common_details(image, draw, colors, magical=False):
    ink, accent, muted = colors
    rule(draw, 660, accent, 460)
    centered(draw, 702, "FRIDAY  ·  20 NOVEMBER 2026", SANS_BOLD(34), accent, 1)
    centered(draw, 760, "5:00 – 7:00 PM", GEORGIA(48), ink)

    centered(draw, 876, "THE CELEBRATION", SANS_BOLD(24), accent, 5)
    centered(draw, 919, "Family Park", GEORGIA(55), ink)
    centered(draw, 994, "GATE 3", SANS_BOLD(48), accent, 3)
    centered(draw, 1052, "Borg-Land", GEORGIA(43), ink)
    centered(draw, 1102, "El-Rehab", SANS(28), muted)

    rule(draw, 1152, accent, 330)
    centered(draw, 1172, "ATTIRE", SANS_BOLD(23), accent, 5)
    centered(draw, 1210, "Formal / Elegant", GEORGIA_ITALIC(40), ink)

    qr = qr_code()
    qr_x, qr_y = 417, 1340
    draw.rounded_rectangle((qr_x - 12, qr_y - 12, qr_x + 258, qr_y + 258), radius=7, fill="white")
    image.paste(qr, (qr_x, qr_y))
    centered(draw, 1618, "SCAN FOR LOCATION", SANS_BOLD(22), accent, 4)
    centered(draw, 1698, "View the full invitation online", SANS(26), muted)
    url = "hussamhamdy.github.io/Wedding/" + ("harry-potter/" if magical else "classic/")
    centered(draw, 1742, url, SANS(25), ink)


def classic():
    image = background((251, 247, 239), (240, 226, 204))
    draw = ImageDraw.Draw(image)
    ink, gold, muted = "#23211f", "#ad8954", "#625b52"
    draw.rectangle((42, 42, 1037, 1877), outline=gold, width=3)
    draw.rectangle((56, 56, 1023, 1863), outline="#d8c6a5", width=1)
    centered(draw, 126, "WEDDING INVITATION", SANS_BOLD(25), gold, 5)
    centered(draw, 218, "Hussam", GEORGIA(110), ink)
    centered(draw, 336, "&", GEORGIA_ITALIC(66), gold)
    centered(draw, 404, "Nagah", GEORGIA(110), ink)
    centered(draw, 565, "Together with our families, we invite you", SANS(29), muted)
    centered(draw, 607, "to celebrate our wedding.", SANS(29), muted)
    common_details(image, draw, (ink, gold, muted))
    image.save(ROOT / "classic-invitation.png", optimize=True)


def magical():
    image = background((15, 18, 25), (49, 20, 28))
    draw = ImageDraw.Draw(image)
    ink, gold, muted = "#f8edd6", "#d3ae68", "#dfd1b7"
    draw.rectangle((42, 42, 1037, 1877), outline=gold, width=3)
    draw.rectangle((56, 56, 1023, 1863), outline="#6e573d", width=1)
    for x, y, r in [(150, 165, 3), (890, 280, 2), (780, 110, 2), (280, 455, 2), (880, 625, 3), (185, 690, 2), (917, 1230, 2), (155, 1510, 2)]:
        draw.ellipse((x-r, y-r, x+r, y+r), fill=gold)
    # The same Deathly Hallows symbol used in the website's sharing image.
    draw.line([(540, 116), (480, 220), (600, 220), (540, 116)], fill=gold, width=4, joint="curve")
    draw.ellipse((502, 155, 578, 231), outline=gold, width=3)
    draw.line((540, 116, 540, 220), fill=gold, width=3)
    centered(draw, 252, "A MAGICAL WEDDING INVITATION", SANS_BOLD(24), gold, 3)
    centered(draw, 323, "Hussam", GEORGIA(108), ink)
    centered(draw, 431, "&", GEORGIA_ITALIC(60), gold)
    centered(draw, 487, "Nagah", GEORGIA(108), ink)
    centered(draw, 601, "An evening of vows, candlelight, and magic", GEORGIA_ITALIC(31), muted)
    common_details(image, draw, (ink, gold, muted), magical=True)
    image.save(ROOT / "magical-invitation.png", optimize=True)


if __name__ == "__main__":
    classic()
    magical()
