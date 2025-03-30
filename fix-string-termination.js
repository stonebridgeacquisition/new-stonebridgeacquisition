const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'src/app/page.tsx',
  'src/app/services/page.tsx',
  'src/app/test-sheets/page.tsx',
  'src/components/ui/gooey-text-morphing.tsx',
  'src/components/ui/testimonial.tsx',
  'src/components/ui/waves-background.tsx'
];

// Function to fix a specific file
function fixFile(filePath) {
  try {
    console.log(`Fixing file: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix string termination issues
    let fixedContent = content;
    
    // Replace &quot; at the end of strings
    fixedContent = fixedContent.replace(/&quot;(,|\)|\s)/g, '"$1');
    
    // Replace specific problematic patterns in JSX tags
    fixedContent = fixedContent.replace(/<(div|li|motion\.li|svg|button|a)([^>]*?)>/g, (match, tag, attrs) => {
      // Only process if there's a malformed tag
      if (attrs.includes('&quot;') || attrs.includes('&#39;')) {
        // Fix attribute values
        const fixedAttrs = attrs.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        return `<${tag}${fixedAttrs}>`;
      }
      return match;
    });
    
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
  console.log('🔍 Starting to fix string termination issues in specific files...');
  
  let fixedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fixFile(fullPath)) {
      fixedCount++;
    }
  });
  
  console.log(`✅ Fixed ${fixedCount} out of ${filesToFix.length} files`);
}

// Run the script
main(); 