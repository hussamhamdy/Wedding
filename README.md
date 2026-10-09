# Wedding Invitation Website

A polished, mobile-first static wedding invitation built with HTML, CSS, and vanilla JavaScript. It is designed to work well on GitHub Pages and to be easy to edit later.

## Preview Locally

Open `index.html` directly in your browser, or run a simple local server from this folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

If Python is not installed but Node.js is available, you can use:

```bash
npx serve .
```

## Customize the Invitation

Most editable values are near the top of `script.js` under:

```js
// EDIT HERE
```

Update these first:

- `groomName`
- `brideName`
- `weddingDate`
- `weddingEnd`
- `timeZone`
- `venueName`
- `venueAddress`
- `googleMapsUrl`
- `whatsappNumber`
- `dressCode`
- `gallery`
- `publicUrl`

Use ISO date strings with the Egypt offset, for example:

```js
weddingDate: "2026-11-21T19:00:00+02:00"
```

## Photos

Put your images in:

```text
assets/images/
```

Then update the `gallery` array in `script.js`.

Recommended sizes:

- Gallery photos: around `1600px` wide, compressed JPG or WebP.
- WhatsApp/Open Graph preview: `assets/images/share-preview.jpg`, ideally `1200 x 630px`.
- Hero photo: replace `assets/images/hero-placeholder.jpg` with a real photo or invitation-style image.

## Optional Music

Put your music file in:

```text
assets/music/
```

Then update:

```js
enableMusic: true,
musicFile: "assets/music/wedding-music.mp3"
```

The site will not autoplay music. Guests must tap the music control, which keeps the experience polite and compatible with phone browsers.

## Language Support

The site supports English and Arabic using one shared page. Translations are stored centrally in `script.js`:

```js
const translations = {
  en: {...},
  ar: {...}
};
```

The language switcher updates page direction (`LTR` / `RTL`) and remembers the guest's choice in `localStorage`.

## RSVP

RSVP currently opens WhatsApp with a pre-filled message. Set your WhatsApp number in international format without `+`, spaces, or dashes:

```js
whatsappNumber: "201XXXXXXXXX"
```

Later, you can replace the button link with Google Forms, another RSVP website, or a backend.

## Shareable Link

The local preview link, such as `http://127.0.0.1:4173/`, only works on your computer. To send the invitation to guests, publish it with GitHub Pages and use the public URL:

```text
https://USERNAME.github.io/REPOSITORY/
```

After GitHub Pages is live, paste that URL into `script.js`:

```js
publicUrl: "https://USERNAME.github.io/REPOSITORY/",
```

The `Share Invitation` button will then share or copy that public link.

## GitHub Pages Deployment

From this folder:

```bash
git init
git add .
git commit -m "Initial wedding invitation"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

Then in GitHub:

```text
GitHub Repository
-> Settings
-> Pages
-> Deploy from branch
-> main
-> /root
```

The site uses relative paths, so it works under:

```text
https://USERNAME.github.io/REPOSITORY/
```

## Privacy

GitHub Pages should be considered public. Do not put secrets, API keys, private guest data, or hidden credentials in this project. Client-side password prompts are not real security for a public static site.

## Files

```text
index.html
style.css
script.js
README.md
favicon/
assets/
  images/
  icons/
  music/
```
