const fs = require('fs');

// 1. App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/  const \[NftExpand, setNftExpand\] = useState\([\s\S]*?\}\);\n\n/g, '');
app = app.replace(/    NftExpand, setNftExpand,\n/g, '');
app = app.replace(/'Nft', /g, '');
app = app.replace(/, 'Nft'/g, '');
app = app.replace(/.*\{ name: 'Nft',.*\n/g, '');
app = app.replace(/        if\(lowerCaseName === 'nft'\) \{[\s\S]*?handleShow\('Internet'\);\n        \}\n/g, '');
fs.writeFileSync('src/App.jsx', app);

// 2. AppFunctions.js
let appFunc = fs.readFileSync('src/components/function/AppFunctions.js', 'utf8');
appFunc = appFunc.replace(/      case 'Nft':\n        return file;\n/g, '');
appFunc = appFunc.replace(/    case 'Nft': \n      setProjectUrl\('https:\/\/opennft\.netlify\.app\/'\);\n      setBackTrackIe\(prev => \[\.\.\.prev, 'https:\/\/opennft\.netlify\.app\/'\]\);\n    break;\n/g, '');
appFunc = appFunc.replace(/      case 'Nft': \n        setProjectUrl\('https:\/\/opennft\.netlify\.app\/'\); \n        setBackTrackIe\(prev => \[\.\.\.prev, 'https:\/\/opennft\.netlify\.app\/'\]\);\n        break;\n/g, '');
appFunc = appFunc.replace(/    case 'Nft': window\.open\('https:\/\/opennft\.netlify\.app\/', '_blank'\); break;\n/g, '');
fs.writeFileSync('src/components/function/AppFunctions.js', appFunc);

// 3. Tile.jsx
let tile = fs.readFileSync('src/components/Tile.jsx', 'utf8');
tile = tile.replace(/      case 'Nft':\n        return \{\n          backgroundImage: \url\(\\\$\{\w+\}\)\,\n          backgroundPosition: '[^']+',\n          backgroundSize: '[^']+',\n          backgroundRepeat: '[^']+',\n        \};\n/g, '');
fs.writeFileSync('src/components/Tile.jsx', tile);

// 4. TaskManager.jsx
let task = fs.readFileSync('src/components/TaskManager.jsx', 'utf8');
task = task.replace(/'Nft', /g, '');
task = task.replace(/, 'Nft'/g, '');
fs.writeFileSync('src/components/TaskManager.jsx', task);

