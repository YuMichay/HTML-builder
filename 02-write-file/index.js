const fs = require('fs');
const path = require('path');
const result = fs.createWriteStream(path.join(__dirname, 'result.txt'));
const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hi!');

const start = () => {
  rl.question('Enter something, please: \n', (answer) => {
    if (answer !== 'exit') {
      result.write(answer + '\n');
      start();
    } else if (answer === 'exit') {
      console.log('Okay, bye!');
      process.exit();
    }
    rl.on('SIGINT', () => {
      console.log('Bye!');
      process.exit();
    });
  });
};
start();
