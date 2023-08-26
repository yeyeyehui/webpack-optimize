function createHash() {
  return require('crypto').createHash('md5');
}
//入口
let entry = {
  entry1: 'entry1.js',
  entry2: 'entry2.js'
}
//入口文件的内容
let entry1Content = `require('depModule1'`;
let entry2Content = `require('depModule2'`;
//入口依赖的模块
let depModule1 = ')depModule1';
let depModule2 = ')depModule2';

let hash = createHash()
  .update('entry1Content')
  .update('entry2Content')
  .update('depModule1')
  .update('depModule2')
  .digest('hex')
  .slice(0, 8)
//hash 72cbd1e1 说明打过包过程的任何文件发生改变，hash值都会变
console.log('hash', hash);

let entry1ChunkHash = createHash()
  .update('entry1Content')
  .update('depModule1')
  .digest('hex')
  .slice(0, 8)
console.log('entry1ChunkHash', entry1ChunkHash);
  
let entry2ChunkHash = createHash()
  .update('entry2Content')
  .update('depModule2')
  .digest('hex')
  .slice(0, 8)
console.log('entry2ChunkHash', entry2ChunkHash);
  
let entry1ContentHash = createHash()
  .update(entry1Content+depModule1)
  .digest('hex')
  .slice(0, 8)
console.log('entry1ContentHash', entry1ContentHash);
let entry2ContentHash = createHash()
  .update(entry2Content+depModule2)
  .digest('hex')
  .slice(0, 8)
console.log('entry2ContentHash', entry2ContentHash);