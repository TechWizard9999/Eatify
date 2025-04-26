// checkMissingExtensions.js
import fs from 'fs';
import path from 'path';

const allowedExts = ['.js', '.json', '.mjs'];
const importRegex = /(?:import|export).*?from\s+['"](.*?)['"]/g;

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (
      importPath.startsWith('.') &&
      !allowedExts.some((ext) => importPath.endsWith(ext))
    ) {
      console.log(`[❌] Missing extension: '${importPath}' in ${filePath}`);
    }
  }
};

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js')) {
      checkFile(fullPath);
    }
  }
};

console.log('🔍 Scanning for missing ".js" extensions in import/export statements...\n');
walk('./');
