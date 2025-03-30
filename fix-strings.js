const fs = require('fs');
const path = require('path');

// Find all TSX files in project
const findTsxFiles = () => {
  const result = [];
  const scanDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDir(filePath);
      } else if ((file.endsWith('.tsx') || file.endsWith('.jsx')) && !file.includes('.d.ts')) {
        result.push(filePath);
      }
    });
  };
  
  scanDir(path.resolve('./src'));
  return result;
};

// Fix all string issues in a file
const fixFile = (filePath) => {
  console.log(`Processing: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Step 1: Fix HTML entities in the content
    content = content.replace(/&quot;/g, '"');      // Fix double quotes
    content = content.replace(/&#39;/g, "'");       // Fix single quotes
    content = content.replace(/&amp;/g, '&');       // Fix ampersands
    content = content.replace(/&lt;/g, '<');        // Fix less than
    content = content.replace(/&gt;/g, '>');        // Fix greater than
    
    // Step 2: Fix potential JSX attribute issues caused by step 1
    content = content.replace(/className='([^']*?)'/g, 'className="$1"');
    content = content.replace(/className="([^"]*?)$"/g, 'className="$1"');
    
    // Step 3: Fix common attribute patterns
    const attributes = ['className', 'size', 'variant', 'aria-label', 'aria-labelledby', 
                       'aria-hidden', 'aria-haspopup', 'role', 'type', 'id', 'href', 
                       'placeholder', 'name', 'value', 'title', 'alt', 'src'];
    
    attributes.forEach(attr => {
      content = content.replace(new RegExp(`${attr}='([^']*?)'`, 'g'), `${attr}="$1"`);
    });
    
    // Save the file if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`⏩ No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
};

// Main function
const main = () => {
  console.log('🔍 Finding TSX files...');
  const tsxFiles = findTsxFiles();
  console.log(`Found ${tsxFiles.length} TSX files.`);
  
  console.log('🔧 Fixing string issues...');
  let fixedCount = 0;
  
  tsxFiles.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`✅ Fixed ${fixedCount} out of ${tsxFiles.length} files.`);
};

// Run the script
main(); 