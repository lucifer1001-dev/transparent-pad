const textarea = document.getElementById('pad');
const textColorPicker = document.getElementById('textColor');
const bgColorPicker = document.getElementById('bgColor');
const opacitySlider = document.getElementById('opacity');
const fontSizeSlider = document.getElementById('fontSize');
const closeBtn = document.getElementById('closeBtn');

/* =========================
   LOAD SAVED STATE
========================= */
textarea.value = localStorage.getItem('pad') || '';

const savedTextColor = localStorage.getItem('textColor') || '#ffffff';
const savedBgColor = localStorage.getItem('bgColor') || '#000000';
const savedOpacity = localStorage.getItem('opacity') || 0.3;
const savedFontSize = localStorage.getItem('fontSize') || 16;

textarea.style.color = savedTextColor;
textarea.style.fontSize = `${savedFontSize}px`;
document.body.style.background = hexToRgba(savedBgColor, savedOpacity);

textColorPicker.value = savedTextColor;
bgColorPicker.value = savedBgColor;
opacitySlider.value = savedOpacity;
fontSizeSlider.value = savedFontSize;

/* =========================
   SAVE TEXT
========================= */
textarea.addEventListener('input', () => {
  localStorage.setItem('pad', textarea.value);
});

/* =========================
   TEXT COLOR
========================= */
textColorPicker.addEventListener('input', (e) => {
  const color = e.target.value;
  textarea.style.color = color;
  localStorage.setItem('textColor', color);
});

/* =========================
   BACKGROUND COLOR
========================= */
bgColorPicker.addEventListener('input', (e) => {
  const color = e.target.value;
  updateBackground(color, opacitySlider.value);
  localStorage.setItem('bgColor', color);
});

/* =========================
   OPACITY
========================= */
opacitySlider.addEventListener('input', (e) => {
  const opacity = e.target.value;
  updateBackground(bgColorPicker.value, opacity);
  localStorage.setItem('opacity', opacity);
});

/* =========================
   FONT SIZE
========================= */
fontSizeSlider.addEventListener('input', (e) => {
  const fontSize = e.target.value;
  textarea.style.fontSize = `${fontSize}px`;
  localStorage.setItem('fontSize', fontSize);
});

/* =========================
   CLOSE BUTTON
========================= */
closeBtn.addEventListener('click', () => {
  window.api.close();
});

/* =========================
   HELPERS
========================= */
function updateBackground(hex, opacity) {
  document.body.style.background = hexToRgba(hex, opacity);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}