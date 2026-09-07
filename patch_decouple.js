const fs = require('fs');
const filePath = 'src/App.tsx';

let content = fs.readFileSync(filePath, 'utf8');

// Inject a dedicated sub-state to track whether the inline chat prompt is the active camera caller
content = content.replace(
  'const [isCameraActive, setIsCameraActive] = useState(false);',
  'const [isCameraActive, setIsCameraActive] = useState(false);\n  const [isInlineChatCamera, setIsInlineChatCamera] = useState(false);'
);

// Block the top-side ViewfinderCard from waking up if it is an inline chat session call
content = content.replace(
  'isCameraActive={isCameraActive}',
  'isCameraActive={isCameraActive && !isInlineChatCamera}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('🛡️ Top-side viewfinder camera hijacking block applied successfully!');
