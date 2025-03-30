const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to escape single and double quotes in TSX/JSX files
function fixUnescapedQuotes(filePath) {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix JSX content by replacing unescaped quotes within JSX components
    // This regex looks for quotes inside JSX tags but not in attributes or JS expressions
    let fixedContent = content;
    
    // Replace unescaped single quotes in JSX text nodes
    fixedContent = fixedContent.replace(
      /(<[^>]*>)([^<]*)(')/g, 
      (match, openTag, text, quote) => {
        return `${openTag}${text}&#39;`;
      }
    );
    
    // Replace unescaped double quotes in JSX text nodes
    fixedContent = fixedContent.replace(
      /(<[^>]*>)([^<]*)(")/g, 
      (match, openTag, text, quote) => {
        return `${openTag}${text}&quot;`;
      }
    );
    
    // Write back the modified content
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`× Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to walk a directory recursively and find TSX/JSX files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      fileList = findTsxFiles(filePath, fileList);
    } else if (
      (file.endsWith('.tsx') || file.endsWith('.jsx')) && 
      !file.includes('.d.ts') &&
      !filePath.includes('node_modules')
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main function
function main() {
  console.log('🔍 Finding TSX/JSX files...');
  
  // Find all TSX files in the src directory
  const tsxFiles = findTsxFiles(path.join(__dirname, 'src'));
  
  console.log(`🔧 Found ${tsxFiles.length} TSX/JSX files. Starting to fix quotes...`);
  
  // Fix unescaped quotes in each file
  let fixedCount = 0;
  tsxFiles.forEach(file => {
    if (fixUnescapedQuotes(file)) {
      fixedCount++;
    }
  });
  
  console.log(`✅ Fixed quotes in ${fixedCount} files out of ${tsxFiles.length}`);
}

// Run the script
main(); 