const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  './src/components/ui/stacked-menu.tsx',
  './src/app/about/page.tsx',
  './src/app/audit-survey/page.tsx',
  './src/app/audit-survey/thank-you/page.tsx',
  './src/app/contact/page.tsx'
];

// Function to fix a file
function fixJsQuotes(filePath) {
  try {
    console.log(`Fixing JS in: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix JavaScript quotes
    let fixedContent = content;
    
    // Fix string literals in JavaScript (not in JSX)
    fixedContent = fixedContent.replace(/&quot;,/g, '",');
    fixedContent = fixedContent.replace(/&quot;\]/g, '"]');
    fixedContent = fixedContent.replace(/&quot;:/g, '":');
    fixedContent = fixedContent.replace(/&quot; \|/g, '" |');
    fixedContent = fixedContent.replace(/&quot;\)/g, '")');
    fixedContent = fixedContent.replace(/&quot;}/g, '"}');
    fixedContent = fixedContent.replace(/= &quot;/g, '= "');
    fixedContent = fixedContent.replace(/\?\.name \|\| &quot;/g, '?.name || "');
    fixedContent = fixedContent.replace(/\?\.email \|\| &quot;/g, '?.email || "');
    fixedContent = fixedContent.replace(/\?\.phone \|\| &quot;/g, '?.phone || "');
    fixedContent = fixedContent.replace(/\?\.businessName \|\| &quot;/g, '?.businessName || "');
    fixedContent = fixedContent.replace(/\?\.industry \|\| &quot;/g, '?.industry || "');
    
    // Fix string literals in object properties
    fixedContent = fixedContent.replace(/align\?: &quot;/g, 'align?: "');
    fixedContent = fixedContent.replace(/question: &quot;/g, 'question: "');
    fixedContent = fixedContent.replace(/type: &quot;/g, 'type: "');
    fixedContent = fixedContent.replace(/name: &quot;/g, 'name: "');
    fixedContent = fixedContent.replace(/label: &quot;/g, 'label: "');
    fixedContent = fixedContent.replace(/company: &quot;/g, 'company: "');
    fixedContent = fixedContent.replace(/email: &quot;/g, 'email: "');
    fixedContent = fixedContent.replace(/message: &quot;/g, 'message: "');
    
    // Fix array contents
    fixedContent = fixedContent.replace(/\["\/images\/IMG_2309\.JPG&quot;,/g, '["/images/IMG_2309.JPG",');
    
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
  console.log('🔍 Starting to fix JavaScript quotes...');
  
  let fixedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      if (fixJsQuotes(fullPath)) {
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