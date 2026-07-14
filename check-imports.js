import fs from 'fs';
import path from 'path';

function checkImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkImports(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+.*?\s+from\s+['"](\..*?)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
        
        // check if file exists (with .js or .jsx extension)
        if (!fs.existsSync(resolvedPath + '.js') && 
            !fs.existsSync(resolvedPath + '.jsx') && 
            !fs.existsSync(resolvedPath)) {
          console.log(`❌ Broken import in ${fullPath}: ${importPath}`);
        }
      }
    }
  }
}

checkImports('E:\\Divya mam portfolio\\src');
console.log('✅ Import check completed');
