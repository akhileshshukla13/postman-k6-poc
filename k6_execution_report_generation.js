const fs = require('fs')
const { exec } = require('child_process');

const path = require('path');
 
const K6_SCRIPT_FOLDER = path.join(__dirname, 'k6_scripts');



// Read the contents of the collections folder
fs.readdir(K6_SCRIPT_FOLDER, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }
   
    // Iterate through each file in the folder
    files.forEach(file => {
      // Check if the file is a JSON file
      if (file.endsWith('.js')) {

// Paths to the JavaScript files to merge
let file1Path = path.join(K6_SCRIPT_FOLDER, file);
console.log(file1Path)
const file2Path = './k6_reporter.js';

// Read the content of file1
let file1Content = fs.readFileSync(file1Path, 'utf8');
 
// Read the content of file2
let file2Content = fs.readFileSync(file2Path, 'utf8');

file1Content = file1Content.replace(/pm\[Var\]/g, `pm.globals.get`)

console.log('file 2 content' + file2Content)
console.log('file 1 content' + file1Content)

let reportname = file.slice(0,-2)+'html'
console.log('report name is ' + reportname)



file2Content = file2Content.replace(/result.html/g, `${reportname}`)
console.log(file2Content)
// Concatenate the content of file1 and file2
const mergedContent = file1Content + '\n\n' + file2Content;
 console.log(mergedContent)
// Write the merged content to the output file
fs.writeFileSync(file1Path, mergedContent, 'utf8');

 
console.log('Files merged successfully.');

        // Execute postman-to-k6 for each JSON file
        exec(`k6 run ${file1Path} --summary-trend-stats=\"avg,p(90),p(99.9),p(99.99),count\" --out json=test.json`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error while execution ${file} by k6:`, error);
            return;
          }
          console.log(`Load testing  for ${file} by k6 successfully`);
        });
      }
    });
  });

  
