
const fs = require('fs');
module.exports = {
  log(msg) {
    console.log(msg);
    fs.appendFileSync('log.txt', msg + '\n');
  }
};