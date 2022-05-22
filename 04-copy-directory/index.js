const fsPromises = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copy() {
  fsPromises.mkdir(newFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const files = await fsPromises.readdir(folder);
  for(let i = 0; i < files.length; i++){
    const srcFile = path.join(folder, files[i]);
    const destFile = path.join(newFolder, files[i]);
    fsPromises.copyFile(srcFile, destFile);
  }
}
copy();
