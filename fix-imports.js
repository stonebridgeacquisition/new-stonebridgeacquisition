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
function fixFile(filePath) {
  try {
    console.log(`Fixing file: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the import statements and use client directive
    let fixedContent = content;
    
    // Fix "use client" directive
    fixedContent = fixedContent.replace(/"use client&quot;/g, '"use client"');
    
    // Fix import statements
    fixedContent = fixedContent.replace(/from &quot;([^&]+)&quot;/g, 'from "$1"');
    fixedContent = fixedContent.replace(/from "@\/([^&]+)&quot;/g, 'from "@/$1"');
    
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
  console.log('🔍 Starting to fix import statements...');
  
  let fixedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      if (fixFile(fullPath)) {
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