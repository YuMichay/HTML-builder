const fsPromises = require('fs/promises');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const project = path.join(__dirname, 'project-dist');
const bundle = path.join(project, 'bundle.css');

async function write() {
  let arr = [];
  const stylesFiles = await fsPromises.readdir(styles);
  for (let i = 0; i < stylesFiles.length; i++) {
    if (stylesFiles[i].includes('css')) {
      const content = await fsPromises.readFile(styles + '/' + stylesFiles[i], 'utf-8');
      arr.push(content);
    }
  }
  fsPromises.writeFile(bundle, arr.join('\n'));
}
write();
