LOKESH_LALITHA_WEDDING — README

HOW TO TEST
1. Extract the ZIP.
2. Open index.html in a modern browser. For best results, run it through a local web server
   (for example VS Code Live Server) so browser media and file behavior are consistent.
3. Tap "TAP TO OPEN INVITATION". Music starts after this user gesture; use MUSIC ON/OFF
   if your browser blocks autoplay.

NETLIFY DEPLOYMENT
1. Drag the extracted LOKESH_LALITHA_WEDDING folder (or its contents) into Netlify Drop,
   or connect a Git repository containing these files.
2. No build command or framework is required. Publish directory: the project root.

CUSTOMIZING PHOTOS
Replace the matching files in images/ while keeping the same filenames:
- couple-embrace.jpg       opening hero image
- couple-portrait.jpg      couple/person portrait panel
- rings-and-hands.jpg      wedding rings photo
- muhurtham-moment.jpg     supplied ceremony photo (kept available for swapping)
- ganesha.svg, mandap.svg, children.svg are local decorative illustrations.
The current layout uses your supplied couple photographs; some images are intentionally
reused because only four photographs were supplied.

MUSIC
music/wedding-instrumental.mp3 is the audio file supplied with the request. It is included
locally and loops after the visitor opens the invitation. Please confirm you have the
necessary rights/permission to publish and redistribute this audio before deploying it.

EDITING DETAILS
- Edit invitation wording and dates in index.html.
- Edit colors, fonts and responsive layout in style.css.
- Edit music, scratch-card and share behavior in script.js.
- Google Maps opens a search for "B V R Gardens Dharmavaram"; verify the exact venue pin
  before sharing the invitation publicly.

NOTES
- Google Fonts are loaded online; system fallbacks are included if the visitor is offline.
- The share control uses the device's native share sheet where supported; otherwise it
  copies invitation text (or displays it as a fallback).
- Scratch card supports touch, mouse and stylus.
