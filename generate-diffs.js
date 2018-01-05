#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cprocess = require('child_process');

const args = process.argv.slice(2);
const a = args[0];
const b = args[1];

function exit(code) { process.exit(code); }

if (!a || !b) {
  console.log('[!] provide to dirs to compare content');
  exit(1);
}

function checkDirExists(path) {
  if (!fs.existsSync(path)) {
    console.log(`[!] path ${path} does not exist`);
    exit(1);
  }

  if (!fs.lstatSync(path).isDirectory()) {
    console.log(`[!] path "${path}" is not directory`);
    exit(1);
  }
}

checkDirExists(a);
checkDirExists(b);

const af = fs.readdirSync(a).sort();
const bf = fs.readdirSync(b).sort();

const maxf = Math.max(af.length, bf.length);

for (let i = 0; i < maxf; i++) {
  const ap = af[i];
  const bp = bf[i];

  const cmd = `diff ${path.join(a, ap)} ${path.join(b, bp)}`;
  cprocess.exec(cmd, { encoding: 'utf-8' }, (err, output, serr) => {
    processOutput({cmd, output});
    console.log();
  });
}

function processOutput({cmd, output}) {
  console.log(`\`\`\`bash\n$ ${cmd}\n\`\`\`\n\`\`\`bash\n${output}\n\`\`\``);
}