const fs = require('fs');
const path = require('path');

// Files with specific broken className attributes and other issues
const filesToFix = [
  './src/app/audit-survey/thank-you/page.tsx',
  './src/components/ui/stacked-menu.tsx',
  './src/components/ui/textarea.tsx',
  './src/app/nav-original/page.tsx',
  './src/app/nav-test/page.tsx',
  './src/app/test-sheets/page.tsx'
];

// Function to fix a file with broken quotes in attributes
function fixQuotesInAttributes(filePath) {
  try {
    console.log(`Fixing attributes in: ${filePath}`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // First fix all JSX attributes with &quot; in them
    let fixedContent = content;
    
    // Fix className attributes - these are often broken
    fixedContent = fixedContent.replace(/className="([^"]*?)&quot;/g, 'className="$1"');
    
    // Fix size, variant, and other attributes
    fixedContent = fixedContent.replace(/size="([^"]*?)&quot;/g, 'size="$1"');
    fixedContent = fixedContent.replace(/variant="([^"]*?)&quot;/g, 'variant="$1"');
    fixedContent = fixedContent.replace(/align="([^"]*?)&quot;/g, 'align="$1"');
    fixedContent = fixedContent.replace(/role="([^"]*?)&quot;/g, 'role="$1"');
    fixedContent = fixedContent.replace(/aria-orientation="([^"]*?)&quot;/g, 'aria-orientation="$1"');
    fixedContent = fixedContent.replace(/aria-labelledby="([^"]*?)&quot;/g, 'aria-labelledby="$1"');
    fixedContent = fixedContent.replace(/aria-hidden="([^"]*?)&quot;/g, 'aria-hidden="$1"');
    fixedContent = fixedContent.replace(/aria-haspopup="([^"]*?)&quot;/g, 'aria-haspopup="$1"');
    fixedContent = fixedContent.replace(/type="([^"]*?)&quot;/g, 'type="$1"');
    
    // Fix align prop values
    fixedContent = fixedContent.replace(/(align\?=\s*")left&quot; \| &quot;right&quot;/g, '$1left" | "right');
    fixedContent = fixedContent.replace(/(align === ")right&quot; \? &quot;right-0&quot; : &quot;left-0&quot;/g, '$1right" ? "right-0" : "left-0"');
    
    // Fix template string with ms values
    fixedContent = fixedContent.replace(/\${isExpanded \? &#39;300ms&#39; : &#39;200ms'}/g, '${isExpanded ? "300ms" : "200ms"}');
    fixedContent = fixedContent.replace(/opacity \${isExpanded \? &#39;300ms&#39; : &#39;250ms'}/g, 'opacity ${isExpanded ? "300ms" : "250ms"}');
    
    // Fix ternary operators in className 
    fixedContent = fixedContent.replace(/\${disabled \? &quot;([^"]*?)&quot; : &quot;([^"]*?)&quot;}/g, '${disabled ? "$1" : "$2"}');
    fixedContent = fixedContent.replace(/\${isActive \? &quot;([^"]*?)&quot; : &quot;([^"]*?)&quot;}/g, '${isActive ? "$1" : "$2"}');
    
    // Fix string values in test-sheets page
    fixedContent = fixedContent.replace(/name: &quot;([^"]*?)&quot;/g, 'name: "$1"');
    fixedContent = fixedContent.replace(/email: &quot;([^"]*?)&quot;/g, 'email: "$1"');
    fixedContent = fixedContent.replace(/phone: &quot;([^"]*?)&quot;/g, 'phone: "$1"');
    fixedContent = fixedContent.replace(/businessName: &quot;([^"]*?)&quot;/g, 'businessName: "$1"');
    fixedContent = fixedContent.replace(/industry: &quot;([^"]*?)&quot;/g, 'industry: "$1"');
    fixedContent = fixedContent.replace(/bottlenecks: \["([^"]*?)&quot;, &quot;([^"]*?)"\]/g, 'bottlenecks: ["$1", "$2"]');
    fixedContent = fixedContent.replace(/usingAI: &quot;([^"]*?)&quot;/g, 'usingAI: "$1"');
    fixedContent = fixedContent.replace(/currentTools: &quot;([^"]*?)&quot;/g, 'currentTools: "$1"');
    fixedContent = fixedContent.replace(/revenue: "([^"]*?)&quot;/g, 'revenue: "$1"');
    fixedContent = fixedContent.replace(/timeOnManualTasks: &quot;([^"]*?)&quot;/g, 'timeOnManualTasks: "$1"');
    fixedContent = fixedContent.replace(/teamSize: &quot;([^"]*?)&quot;/g, 'teamSize: "$1"');
    fixedContent = fixedContent.replace(/opportunities: &quot;([^"]*?)&quot;/g, 'opportunities: "$1"');
    fixedContent = fixedContent.replace(/recommended_tools: &quot;([^"]*?)&quot;/g, 'recommended_tools: "$1"');
    fixedContent = fixedContent.replace(/time_savings: &quot;([^"]*?)&quot;/g, 'time_savings: "$1"');
    fixedContent = fixedContent.replace(/cost_savings: "([^"]*?)&quot;/g, 'cost_savings: "$1"');
    fixedContent = fixedContent.replace(/priorities: &quot;([^"]*?)&quot;/g, 'priorities: "$1"');
    fixedContent = fixedContent.replace(/source: &quot;([^"]*?)&quot;/g, 'source: "$1"');
    
    // Fix fetch API calls
    fixedContent = fixedContent.replace(/fetch\("([^"]*?)&quot;/g, 'fetch("$1"');
    fixedContent = fixedContent.replace(/method: &quot;([^"]*?)&quot;/g, 'method: "$1"');
    fixedContent = fixedContent.replace(/&quot;Content-Type&quot;: &quot;application\/json&quot;/g, '"Content-Type": "application/json"');
    
    // Fix Thank You page specific issues with string termination
    fixedContent = fixedContent.replace(/timeEstimate = "([^"]*?)&quot;/g, 'timeEstimate = "$1"');
    fixedContent = fixedContent.replace(/costSavingsEstimate = "([^"]*?)&quot;/g, 'costSavingsEstimate = "$1"');
    fixedContent = fixedContent.replace(/source: &quot;([^"]*?)&quot;/g, 'source: "$1"');
    fixedContent = fixedContent.replace(/surveyData\.usingAI === "Yes&quot;/g, 'surveyData.usingAI === "Yes"');
    
    // Fix unterminated string literals
    const regex = /&quot;([^&]+)"/g;
    fixedContent = fixedContent.replace(regex, '"$1"');
    
    // Fix cases where || &quot; appears (common in defaulting variables)
    fixedContent = fixedContent.replace(/\|\| &quot;([^"]*?)&quot;/g, '|| "$1"');
    fixedContent = fixedContent.replace(/\|\| "([^"]*?)&quot;/g, '|| "$1"');
    
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
  console.log('🔧 Starting to fix broken attributes in files...');
  
  let fixedCount = 0;
  
  // Process each file
  filesToFix.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      if (fixQuotesInAttributes(fullPath)) {
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