const fs = require('fs');

const removeVars = ['Nft', 'Note', 'Fortune'];

function cleanApp(file) {
  let content = fs.readFileSync(file, 'utf8');
  removeVars.forEach(v => {
    // Remove useState
    const regex1 = new RegExp(\const \\\\[\Expand, set\Expand\\\\] = useState\\\\(\\\\s*\\\\{.*?\\\\}\\\\);\\\\s*\, 'g');
    content = content.replace(regex1, '');
    
    // Remove passing props
    const regex2 = new RegExp(\\Expand, set\Expand,\\\\s*\, 'g');
    content = content.replace(regex2, '');
    
    // Remove from ObjectState
    const regex3 = new RegExp(\.*\\\\{\\\\s*name:\\\\s*'\',.*\\\\}\\\\,\\\\s*\, 'g');
    content = content.replace(regex3, '');

    // Remove from arrays
    const regex4 = new RegExp(\'\',\\\\s*\, 'g');
    content = content.replace(regex4, '');
    const regex5 = new RegExp(\,\\\\s*'\'\, 'g');
    content = content.replace(regex5, '');

    // Remove if block
    const regex6 = new RegExp(\\\\\s*if\\\\s*\\\\(lowerCaseName === '\'\\\\)\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*\, 'g');
    content = content.replace(regex6, '');
  });
  fs.writeFileSync(file, content);
}

function cleanAppFunctions(file) {
  let content = fs.readFileSync(file, 'utf8');
  removeVars.forEach(v => {
    // Remove switch cases that return file or image
    const regex1 = new RegExp(\\\\\s*case '\':\\\\s*return [a-zA-Z]+;\\\\s*\, 'g');
    content = content.replace(regex1, '');
    
    // Remove imports
    const regexImport = new RegExp(\import \.*\\\\s*\, 'g');
    content = content.replace(regexImport, '');

    // Remove handleDoubleClickiframe cases
    const regex2 = new RegExp(\\\\\s*case '\':[\\\\s\\\\S]*?break;\\\\s*\, 'g');
    content = content.replace(regex2, '');
  });
  fs.writeFileSync(file, content);
}

function cleanTile(file) {
  let content = fs.readFileSync(file, 'utf8');
  removeVars.forEach(v => {
    const regex1 = new RegExp(\\\\\s*case '\':\\\\s*return \\\\{[\\\\s\\\\S]*?\\\\};\\\\s*\, 'g');
    content = content.replace(regex1, '');
  });
  fs.writeFileSync(file, content);
}

function cleanTaskManager(file) {
  let content = fs.readFileSync(file, 'utf8');
  removeVars.forEach(v => {
    const regex4 = new RegExp(\'\',\\\\s*\, 'g');
    content = content.replace(regex4, '');
    const regex5 = new RegExp(\,\\\\s*'\'\, 'g');
    content = content.replace(regex5, '');
  });
  fs.writeFileSync(file, content);
}

function cleanIconJson(file) {
  let icons = JSON.parse(fs.readFileSync(file, 'utf8'));
  icons = icons.filter(i => !removeVars.includes(i.name));
  fs.writeFileSync(file, JSON.stringify(icons, null, 4));
}

try {
    cleanApp('src/App.jsx');
    cleanAppFunctions('src/components/function/AppFunctions.js');
    cleanTile('src/components/Tile.jsx');
    cleanTaskManager('src/components/TaskManager.jsx');
    cleanIconJson('src/icon.json');
} catch(e) {
    console.error(e);
}
