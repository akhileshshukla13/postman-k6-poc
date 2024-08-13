const fs = require('fs')
const { exec } = require('child_process');
 
const path = require('path');
 
 
const enviornment = process.argv.slice(2)[0]
console.log(enviornment)
const test_data = process.argv.slice(2)[1]
console.log(test_data)
// Path to the collections folder
const COLLECTIONS_FOLDER = path.join(__dirname, 'collections');
const COLLECTIONS_FOLDER_WITH_DATA = path.join(__dirname, 'collections', 'collections_with_data');
const COLLECTIONS_FOLDER_WITHOUT_DATA = path.join(__dirname, 'collections', 'collections_without_data');
let K6_SCRIPT_FOLDER = path.join(__dirname, 'k6_scripts');
 
 
//----
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file, index) => {
          const curPath = path.join(folderPath, file);
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(folderPath);
      console.log(`Deleted folder: ${folderPath}`);
  } else {
      console.error(`Folder ${folderPath} does not exist.`);
  }
}
 
deleteFolderRecursive(K6_SCRIPT_FOLDER)
 
//----
/*
if (fs.existsSync(K6_SCRIPT_FOLDER)) {
  fs.rmdirSync(K6_SCRIPT_FOLDER, { recursive: true })
}
K6_SCRIPT_FOLDER = path.join(__dirname, 'k6_scripts');
console.log(K6_SCRIPT_FOLDER)
*/
 
/*
// Read the contents of the collections folder
fs.readdir(COLLECTIONS_FOLDER_WITHOUT_DATA, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
 
  // Iterate through each file in the folder
  files.forEach(file => {
    console.log(file)
    // Check if the file is a JSON file
    if (file.endsWith('.json')) {
      // Execute postman-to-k6 for each JSON file
      exec(`postman-to-k6 ${COLLECTIONS_FOLDER_WITHOUT_DATA}/${file} -e ./enviornments/${enviornment}.json -o ${K6_SCRIPT_FOLDER}/k6_${file.slice(0, -5)}.js`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error converting ${file} to k6 script:`, error);
          return;
        }
        console.log(`Conversion for ${file} completed successfully`);
      });
    }
  })
});
*/
 
 
// Read the contents of the collections folder
fs.readdir(COLLECTIONS_FOLDER_WITH_DATA, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
 
  // Iterate through each file in the folder
  files.forEach(file => {
    console.log(file)
    // Check if the file is a JSON file
    if (file.endsWith('.json')) {
      if (test_data.includes('.json')) {
        console.log('json test data')
        console.log(K6_SCRIPT_FOLDER)
        // Execute postman-to-k6 for each JSON file
        exec(`postman-to-k6 ${COLLECTIONS_FOLDER_WITH_DATA}/${file} -e ./enviornments/${enviornment}.json  --json ./testdata/${test_data} -o ${K6_SCRIPT_FOLDER}/k6_${file.slice(0, -5)}.js`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error converting ${file} to k6 script:`, error);
            return;
          }
          console.log(`Conversion for ${file} completed successfully`);
        });
 
      } if (test_data.includes('.csv')) {
        console.log('csv test data')
        // Execute postman-to-k6 for each JSON file
        exec(`postman-to-k6 ${COLLECTIONS_FOLDER_WITH_DATA}/${file} -e ./enviornments/${enviornment}.json  --csv ./testdata/${test_data} -o ${K6_SCRIPT_FOLDER}/k6_${file.slice(0, -5)}.js`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error converting ${file} to k6 script:`, error);
            return;
          }
          console.log(`Conversion for ${file} completed successfully`);
        });
      }
    }
  })
});