const fsPromises = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copy() {
  await fsPromises.rm(newFolder, {recursive: true, force: true,}, (err) => {
    if (err) {throw err;}
  });
  fsPromises.mkdir(newFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
  let files = await fsPromises.readdir(folder);
  for(let i = 0; i < files.length; i++){
    let srcFile = path.join(folder, files[i]);
    let destFile = path.join(newFolder, files[i]);
    fsPromises.copyFile(srcFile, destFile);
  }
}
copy();
