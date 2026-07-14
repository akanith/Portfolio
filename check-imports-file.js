const fs = require('fs');
const path = require('path');

let output = '';
function log(msg) {
  output += msg + '\n';
}

function checkImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkImports(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+(?:.*?\s+from\s+)?['"](\..*?)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        let resolvedPath = path.resolve(path.dirname(fullPath), importPath);
        
        if (!fs.existsSync(resolvedPath + '.js') && 
            !fs.existsSync(resolvedPath + '.jsx') && 
            !fs.existsSync(resolvedPath) &&
            !fs.existsSync(resolvedPath + '/index.js') &&
            !fs.existsSync(resolvedPath + '/index.jsx')) {
          log(`❌ Broken import in ${fullPath}: ${importPath} -> ${resolvedPath}`);
        }
      }
    }
  }
}

checkImports('E:\\Divya mam portfolio\\src');
if (output === '') output = '✅ All relative imports are valid!';
fs.writeFileSync('E:\\Divya mam portfolio\\import-results.txt', output);
