const fs = require('fs');
const path = require('path');

// Function to fix the stacked-menu.tsx file
function fixStackedMenu() {
  const filePath = path.resolve('./src/components/ui/stacked-menu.tsx');
  
  try {
    console.log(`Fixing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // First, fix the "use client" directive
    content = content.replace(/"use client&quot;/, '"use client"');
    
    // Fix the interface property
    content = content.replace(/align\?: &quot;left&quot; \| &quot;right&quot;/, 'align?: "left" | "right"');
    content = content.replace(/align\?: "left" \| &quot;right&quot;/, 'align?: "left" | "right"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to fix the about/page.tsx file
function fixAboutPage() {
  const filePath = path.resolve('./src/app/about/page.tsx');
  
  try {
    console.log(`Fixing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "use client" directive
    content = content.replace(/"use client&quot;/, '"use client"');
    
    // Fix the images array
    content = content.replace(/\["\/images\/IMG_2309\.JPG&quot;, "\/images\/IMG_2311\.JPG"\]/, '["/images/IMG_2309.JPG", "/images/IMG_2311.JPG"]');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to fix the audit-survey/page.tsx file
function fixAuditSurveyPage() {
  const filePath = path.resolve('./src/app/audit-survey/page.tsx');
  
  try {
    console.log(`Fixing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "use client" directive
    content = content.replace(/"use client&quot;/, '"use client"');
    
    // Fix array items
    content = content.replace(/&quot;Lead handling"/g, '"Lead handling"');
    content = content.replace(/&quot;Client communication"/g, '"Client communication"');
    content = content.replace(/&quot;Content creation"/g, '"Content creation"');
    content = content.replace(/&quot;Administrative tasks"/g, '"Administrative tasks"');
    content = content.replace(/&quot;Data entry"/g, '"Data entry"');
    content = content.replace(/&quot;Customer support"/g, '"Customer support"');
    content = content.replace(/&quot;Other"/g, '"Other"');
    
    // Fix all question properties
    content = content.replace(/question: &quot;([^"]+)&quot;/g, 'question: "$1"');
    
    // Fix all type properties
    content = content.replace(/type: &quot;([^"]+)&quot;/g, 'type: "$1"');
    
    // Fix all label properties
    content = content.replace(/label: &quot;([^"]+)&quot;/g, 'label: "$1"');
    
    // Fix all name properties
    content = content.replace(/name: &quot;([^"]+)&quot;/g, 'name: "$1"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to fix the audit-survey/thank-you/page.tsx file
function fixThankYouPage() {
  const filePath = path.resolve('./src/app/audit-survey/thank-you/page.tsx');
  
  try {
    console.log(`Fixing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "use client" directive
    content = content.replace(/"use client&quot;/, '"use client"');
    
    // Fix the string literals
    content = content.replace(/surveyData\.contactInfo\?\.name \|\| &quot;/g, 'surveyData.contactInfo?.name || "');
    content = content.replace(/surveyData\.contactInfo\?\.email \|\| &quot;/g, 'surveyData.contactInfo?.email || "');
    content = content.replace(/surveyData\.contactInfo\?\.phone \|\| &quot;/g, 'surveyData.contactInfo?.phone || "');
    content = content.replace(/surveyData\.businessName \|\| &quot;/g, 'surveyData.businessName || "');
    content = content.replace(/surveyData\.industry \|\| &quot;/g, 'surveyData.industry || "');
    content = content.replace(/surveyData\.usingAI \|\| &quot;No"/g, 'surveyData.usingAI || "No"');
    content = content.replace(/surveyData\.currentTools \|\| &quot;/g, 'surveyData.currentTools || "');
    content = content.replace(/surveyData\.revenue \|\| &quot;/g, 'surveyData.revenue || "');
    content = content.replace(/surveyData\.timeOnManualTasks \|\| &quot;/g, 'surveyData.timeOnManualTasks || "');
    content = content.replace(/surveyData\.teamSize \|\| &quot;/g, 'surveyData.teamSize || "');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to fix the contact/page.tsx file
function fixContactPage() {
  const filePath = path.resolve('./src/app/contact/page.tsx');
  
  try {
    console.log(`Fixing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "use client" directive
    content = content.replace(/"use client&quot;/, '"use client"');
    
    // Fix the string literals in the form data
    content = content.replace(/name: &quot;/g, 'name: "');
    content = content.replace(/email: &quot;/g, 'email: "');
    content = content.replace(/company: &quot;/g, 'company: "');
    content = content.replace(/message: &quot;/g, 'message: "');
    
    // Fix the webhook data
    content = content.replace(/source: &quot;contact_page"/g, 'source: "contact_page"');
    content = content.replace(/formType: &quot;contact_inquiry"/g, 'formType: "contact_inquiry"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔧 Starting comprehensive repair of files...');
  
  const fixResults = [
    fixStackedMenu(),
    fixAboutPage(),
    fixAuditSurveyPage(),
    fixThankYouPage(),
    fixContactPage()
  ];
  
  const successCount = fixResults.filter(Boolean).length;
  console.log(`✅ Successfully fixed ${successCount} out of 5 files`);
}

// Run the script
main(); 