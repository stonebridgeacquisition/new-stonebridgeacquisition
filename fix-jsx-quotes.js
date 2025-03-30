const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  './src/app/about/page.tsx',
  './src/app/admin/popup-test/page.tsx',
  './src/app/audit-survey/page.tsx',
  './src/app/audit-survey/thank-you/page.tsx',
  './src/app/contact/page.tsx',
  './src/app/nav-original/page.tsx',
  './src/app/nav-test/page.tsx',
  './src/app/page.tsx',
  './src/components/ui/stacked-menu.tsx',
  './src/components/ui/textarea.tsx',
  './src/components/ui/testimonial.tsx',
  './src/components/ui/form.tsx',
  './src/app/test-sheets/page.tsx'
];

// Function to fix a file
function fixJsxQuotes(filePath) {
  try {
    console.log(`Fixing JSX in: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix JSX quotes - we'll use a safer approach
    let lines = content.split('\n');
    let inJsx = false;
    let inImports = true; // Assume we start in imports
    
    // Process line by line
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Skip lines that are imports or use client directives
      if (line.includes('import ') || line.includes('"use client"')) {
        continue;
      }
      
      // Once we see a non-import line, we're out of the imports section
      if (line.trim() && !line.includes('import ') && inImports) {
        inImports = false;
      }
      
      // Only process non-import lines
      if (!inImports) {
        // Check for JSX opening and closing tags
        if (line.includes('<') && !line.includes('//')) {
          inJsx = true;
        }
        
        if (inJsx) {
          // Replace apostrophes only in clear text situations
          line = line.replace(/(\s|>)(\w+)'(\w+)/g, '$1$2&#39;$3');
          line = line.replace(/(\w+)'(\w+|\s|\.|\,|\;)/g, '$1&#39;$2');
          
          // Replace double quotes in text (not in attributes or JSX expressions)
          line = line.replace(/(>)([^<>]*?)(?<!")(?<!\\")"(?!\\")((?<!\\))([^<>]*?)(?=<)/g, '$1$2&quot;$5$6');
          
          // Special cases for quotes at end of text
          line = line.replace(/"(<\/|\.|\,|\;|\:|\.\.\.)/g, '&quot;$1');
          line = line.replace(/'(<\/|\.|\,|\;|\:|\.\.\.)/g, '&#39;$1');
          
          lines[i] = line;
        }
        
        if (line.includes('>') && !line.includes('//')) {
          inJsx = false;
        }
      }
    }
    
    // Join the lines back together
    const fixedContent = lines.join('\n');
    
    // Save only if changes were made
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Changes made to: ${filePath}`);
    } else {
      console.log(`⏩ No changes needed in: ${filePath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔍 Starting to fix JSX quotes (preserving imports)...');
  
  let processedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      if (fixJsxQuotes(fullPath)) {
        processedCount++;
      }
    } else {
      console.warn(`⚠️ File not found: ${fullPath}`);
    }
  });
  
  console.log(`✅ Processed ${processedCount} out of ${filesToFix.length} files`);
}

// Run the script
main(); 