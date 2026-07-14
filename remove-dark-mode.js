const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.css')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.push(path.join(__dirname, 'index.html'));
files.push(path.join(__dirname, 'tailwind.config.js'));

let totalChanges = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // 1. Strip dark mode classes (e.g. dark:bg-gray-900, dark:hover:text-white, dark:border-gray-700/50, etc)
  content = content.replace(/dark:[^\s"'>`]+/g, '');

  // 2. Replace alternating background section classes to make it uniformly white
  // We want to target bg-background, bg-gray-50, bg-gray-100, bg-slate-50
  // But let's only do it for main sections, not small buttons.
  // Actually, replacing bg-background is safe because it's the global background token (which is #F8FAFC).
  content = content.replace(/\bbg-background\b/g, 'bg-white');
  
  // Clean up double spaces left by removing classes
  content = content.replace(/\s{2,}/g, ' ');
  content = content.replace(/ className=" "/g, '');
  content = content.replace(/ className=' '/g, '');
  content = content.replace(/ className={`\s/g, ' className={`');
  content = content.replace(/\s`}/g, '`}');
  content = content.replace(/"\s/g, '"');
  content = content.replace(/\s"/g, '"');
  
  // Specific fix for tailwind config darkMode and background token
  if (file.endsWith('tailwind.config.js')) {
    content = content.replace(/darkMode:\s*['"]class['"],/, '');
    content = content.replace(/background:\s*['"]#F8FAFC['"],/g, "background: '#FFFFFF',");
  }

  // Remove the dark mode toggle switch from Navbar.jsx if it exists
  if (file.endsWith('Navbar.jsx')) {
    // Attempting to remove the toggle button code safely.
    // The previous implementation might have had a FiMoon/FiSun button.
    content = content.replace(/<button[^>]*onClick=\{toggleDarkMode\}[^>]*>[\s\S]*?<\/button>/g, '');
    content = content.replace(/const \[isDarkMode.*?= useState.*?;\n/g, '');
    content = content.replace(/const toggleDarkMode = \(\) => \{[\s\S]*?\};\n/g, '');
  }

  // Specific fix for index.html body
  if (file.endsWith('index.html')) {
    content = content.replace(/class="bg-background text-gray-900"/g, 'class="bg-white text-gray-900"');
  }
  
  // Specific fix for index.css body
  if (file.endsWith('index.css')) {
    content = content.replace(/@apply bg-background text-gray-900;/g, '@apply bg-white text-gray-900;');
    // Remove all .dark {} blocks
    content = content.replace(/\.dark\s*\{[^}]*\}/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    totalChanges++;
  }
});

console.log(`Finished removing dark mode and unifying white background across ${totalChanges} files.`);
