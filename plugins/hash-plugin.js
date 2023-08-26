
class HashPlugin{
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin',(compilation)=>{
      //如果你想改变hash值，可以在hash生成这后修改
      compilation.hooks.afterHash.tap('HashPlugin',()=>{
        console.log('hash', compilation.hash);
        compilation.hash='hash'
        for (let chunk of compilation.chunks) {
          console.log('renderedHash', chunk.renderedHash);//chunkHash
          chunk.renderedHash='chunkhash'
          console.log('contentHash', chunk.contentHash);
          chunk.contentHash={
            'css/mini-extract': 'csshash',
            javascript: 'jshash'
          }
        }
      });
  });
  }
}
module.exports = HashPlugin;