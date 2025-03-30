const fs = require('fs');
const path = require('path');

// Files that need fixing (from the error message)
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

// Function to fix unescaped quotes in a file
function fixUnescapedQuotes(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix unescaped quotes
    let fixedContent = content;
    
    // Replace unescaped single quotes in JSX text
    fixedContent = fixedContent.replace(/(\w)'(\w|\s)/g, '$1&#39;$2');
    fixedContent = fixedContent.replace(/(\s)'(\w)/g, '$1&#39;$2');
    fixedContent = fixedContent.replace(/(\w)'(\s|\.|\,|\;)/g, '$1&#39;$2');
    
    // Replace unescaped double quotes in JSX text
    fixedContent = fixedContent.replace(/(\w)"(\w|\s)/g, '$1&quot;$2');
    fixedContent = fixedContent.replace(/(\s)"(\w)/g, '$1&quot;$2');
    fixedContent = fixedContent.replace(/(\w)"(\s|\.|\,|\;)/g, '$1&quot;$2');
    
    // Special quotes at the end of texts
    fixedContent = fixedContent.replace(/"(\.|\,|\;|\:)/g, '&quot;$1');
    fixedContent = fixedContent.replace(/'(\.|\,|\;|\:)/g, '&#39;$1');
    
    // Handle specific patterns in JSX
    fixedContent = fixedContent.replace(/"<\//g, '&quot;</');
    fixedContent = fixedContent.replace(/'<\//g, '&#39;</');
    
    // Save the fixed content
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔍 Starting to fix unescaped quotes in project files...');
  
  let fixedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      if (fixUnescapedQuotes(fullPath)) {
        fixedCount++;
      }
    } else {
      console.warn(`⚠️ File not found: ${fullPath}`);
    }
  });
  
  console.log(`✅ Fixed ${fixedCount} out of ${filesToFix.length} files`);
}

// Run the script
main(); 