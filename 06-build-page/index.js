const fsPromises = require('fs/promises');
const path = require('path');
const project = path.join(__dirname, 'project-dist');
const styles = path.join(__dirname, 'styles');
const stylesFile = path.join(project, 'style.css');
const htmlFile = path.join(project, 'index.html');
const example = path.join(__dirname, 'template.html');
const assets = path.join(__dirname, 'assets');
const newAssets = path.join(project, 'assets');
const components = path.join(__dirname, 'components');

async function buildPage() {
  await fsPromises.rm(project, {recursive: true, force: true,}, (err) => {
    if (err) {throw err;}
  });
  fsPromises.mkdir(project, {recursive: true});
  const exampleFile = await fsPromises.readFile(example, 'utf-8');
  await fsPromises.writeFile(htmlFile, exampleFile);
  let newHtml = await fsPromises.readFile(htmlFile, 'utf-8');
  const compFiles = await fsPromises.readdir(components, { withFileTypes: true });
  for (let i = 0; i < compFiles.length; i++) {
    const file = await fsPromises.readFile(components + '/' + compFiles[i].name, 'utf-8');
    const regExp = new RegExp(`{{${(compFiles[i].name).split('.')[0]}}}`, 'g');
    newHtml = newHtml.replace(regExp, file);
  }
  await fsPromises.writeFile(htmlFile, newHtml);
  
  async function write() {
    const stylesFiles = await fsPromises.readdir(styles);
    for (let i = 0; i < stylesFiles.length; i++) {
      if (stylesFiles[i].includes('css')) {
        const content = await fsPromises.readFile(styles + '/' + stylesFiles[i], 'utf-8');
        fsPromises.appendFile(stylesFile, content);
      }
    }
  }
  write();

  async function copy() {
    await fsPromises.rm(newAssets, {recursive: true, force: true,}, (err) => {
      if (err) {throw err;}
    });
    fsPromises.mkdir(newAssets, {recursive: true});

    const fonts = path.join(assets, 'fonts');
    const fontsFiles = await fsPromises.readdir(fonts);
    const newFonts = path.join(newAssets, 'fonts');
    fsPromises.mkdir(newFonts, {recursive: true});
    for(let i = 0; i < fontsFiles.length; i++){
      const srcFile = path.join(fonts, fontsFiles[i]);
      const destFile = path.join(newFonts, fontsFiles[i]);
      fsPromises.copyFile(srcFile, destFile);
    }

    const images = path.join(assets, 'img');
    const imgFiles = await fsPromises.readdir(images);
    const newImg = path.join(newAssets, 'img');
    fsPromises.mkdir(newImg, {recursive: true});
    for(let i = 0; i < imgFiles.length; i++){
      const srcFile = path.join(images, imgFiles[i]);
      const destFile = path.join(newImg, imgFiles[i]);
      fsPromises.copyFile(srcFile, destFile);
    }

    const svgs = path.join(assets, 'svg');
    const svgFiles = await fsPromises.readdir(svgs);
    const newSvg = path.join(newAssets, 'svg');
    fsPromises.mkdir(newSvg, {recursive: true});
    for(let i = 0; i < svgFiles.length; i++){
      const srcFile = path.join(svgs, svgFiles[i]);
      const destFile = path.join(newSvg, svgFiles[i]);
      fsPromises.copyFile(srcFile, destFile);
    }
  }
  copy();
}
buildPage();
