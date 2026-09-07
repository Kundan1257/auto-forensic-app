const fs = require('fs');
const filePath = 'src/components/InputPanel.tsx';

let content = fs.readFileSync(filePath, 'utf8');

// Inject stopPropagation into the start camera loop to kill parent bubbling
content = content.replace(
  'const startCamera = async () => {',
  'const startCamera = async (e) => {\n    if (e) { e.stopPropagation(); e.preventDefault(); }'
);

// Update button calls to pass the click event safely
content = content.replace(
  'onClick={isCameraActive ? stopCamera : startCamera}',
  'onClick={(e) => { isCameraActive ? stopCamera() : startCamera(e); }}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('⚡ Camera event bubble shield applied successfully!');
