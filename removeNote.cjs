const fs = require('fs');

// 1. App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/  const \[NoteExpand, setNoteExpand\] = useState\([\s\S]*?\}\);\n\n/g, '');
app = app.replace(/    NoteExpand, setNoteExpand,\n/g, '');
app = app.replace(/    NoteExpand, setNoteExpand,\r\n/g, '');
app = app.replace(/        NoteExpand, setNoteExpand,\r\n/g, '');
app = app.replace(/'Note', /g, '');
app = app.replace(/, 'Note'/g, '');
app = app.replace(/.*\{ name: 'Note',.*\n/g, '');
app = app.replace(/.*\{ name: 'Note',.*\r\n/g, '');
app = app.replace(/        if\(lowerCaseName === 'note'\) \{[\s\S]*?handleShow\('Internet'\);\r?\n        \}\r?\n/g, '');
fs.writeFileSync('src/App.jsx', app);

// 2. AppFunctions.js
let appFunc = fs.readFileSync('src/components/function/AppFunctions.js', 'utf8');
appFunc = appFunc.replace(/      case 'Note':\r?\n        return file;\r?\n/g, '');
appFunc = appFunc.replace(/    case 'Note': \r?\n      setProjectUrl\('https:\/\/fullstack-stickynotes\.netlify\.app\/'\);\r?\n      setBackTrackIe\(prev => \[\.\.\.prev, 'https:\/\/fullstack-stickynotes\.netlify\.app\/'\]\);\r?\n    break;\r?\n/g, '');
appFunc = appFunc.replace(/        case 'Note': \r?\n          setProjectUrl\('https:\/\/fullstack-stickynotes\.netlify\.app\/'\); \r?\n          setBackTrackIe\(prev => \[\.\.\.prev, 'https:\/\/fullstack-stickynotes\.netlify\.app\/'\]\);\r?\n          break;\r?\n/g, '');
appFunc = appFunc.replace(/    case 'Note': window\.open\('https:\/\/fullstack-stickynotes\.netlify\.app\/', '_blank'\); break;\r?\n/g, '');
fs.writeFileSync('src/components/function/AppFunctions.js', appFunc);

// 3. Tile.jsx
let tile = fs.readFileSync('src/components/Tile.jsx', 'utf8');
tile = tile.replace(/      case 'Note':\r?\n        return \{\r?\n          backgroundImage: \url\(\\\$\{\w+\}\)\,\r?\n          backgroundPosition: '[^']+',\r?\n          backgroundSize: '[^']+',\r?\n          backgroundRepeat: '[^']+',\r?\n        \};\r?\n/g, '');
fs.writeFileSync('src/components/Tile.jsx', tile);

// 4. TaskManager.jsx
let task = fs.readFileSync('src/components/TaskManager.jsx', 'utf8');
task = task.replace(/'Note', /g, '');
task = task.replace(/, 'Note'/g, '');
fs.writeFileSync('src/components/TaskManager.jsx', task);

// 5. icon.json
let icons = JSON.parse(fs.readFileSync('src/icon.json', 'utf8'));
icons = icons.filter(i => i.name !== 'Note');
fs.writeFileSync('src/icon.json', JSON.stringify(icons, null, 4));

// 6. Delete Note components
if(fs.existsSync('src/components/NoteFolder.jsx')) fs.unlinkSync('src/components/NoteFolder.jsx');
if(fs.existsSync('src/css/NoteFolder.css')) fs.unlinkSync('src/css/NoteFolder.css');
