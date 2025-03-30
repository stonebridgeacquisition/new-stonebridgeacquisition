const fs = require('fs');
const path = require('path');

// Path to the thank-you page
const filePath = './src/app/audit-survey/thank-you/page.tsx';

try {
  console.log(`Fixing attributes in: ${filePath}`);
  
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Start with a clean slate - replace all &quot; with "
  let fixedContent = content;
  
  // Fix all bottleneck entries (these are complex objects with lots of quotes)
  fixedContent = fixedContent.replace(/&quot;([^"]+)": {/g, '"$1": {');
  
  // Fix title: entries
  fixedContent = fixedContent.replace(/title: &quot;([^"]+)&quot;/g, 'title: "$1"');
  
  // Fix string arrays - this is critical
  fixedContent = fixedContent.replace(/&quot;([^"]+)",/g, '"$1",');
  fixedContent = fixedContent.replace(/&quot;([^"]+)&quot;/g, '"$1"');
  
  // Fix budget recommendations
  fixedContent = fixedContent.replace(/&quot;Less than \$1,000": \[/g, '"Less than $1,000": [');
  fixedContent = fixedContent.replace(/"\$1,000 - \$3,000": \[/g, '"$1,000 - $3,000": [');
  fixedContent = fixedContent.replace(/"\$3,000 - \$5,000": \[/g, '"$3,000 - $5,000": [');
  fixedContent = fixedContent.replace(/"\$5,000\+": \[/g, '"$5,000+": [');
  
  // Fix timeEstimate and costSavingsEstimate strings
  fixedContent = fixedContent.replace(/timeEstimate = "([^"]+)&quot;/g, 'timeEstimate = "$1"');
  fixedContent = fixedContent.replace(/costSavingsEstimate = "([^"]+)&quot;/g, 'costSavingsEstimate = "$1"');
  
  // Fix "surveyData?.contactInfo?.name || "Not provided&quot;$5$6</p>
  fixedContent = fixedContent.replace(/surveyData\?\.[^|]+\|\| "([^"]+)&quot;\$5\$6</g, 'surveyData?.$1 || "$2"<');
  
  // Save the fixed content
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  
  console.log(`✅ Fixed: ${filePath}`);
} catch (error) {
  console.error(`❌ Error fixing ${filePath}:`, error.message);
} 