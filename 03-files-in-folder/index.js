const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');
fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    if (file.isFile() === true) {
      fs.stat((folder + '/' + file.name), (err, stats) => {
        if (err) {
          throw err;
        }
        console.log(path.parse(file.name).name + ' ' + '-' + ' ' + path.extname(file.name).slice(1) + ' ' + '-' + ' ' + stats.size/1000 + 'kb');
      });    
    }
  });
});
