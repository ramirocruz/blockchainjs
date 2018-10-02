const SHA256 = require('crypto-js').SHA256;

class Block{
    constructor(data,index=0,priviousHash='',timestamp='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.priviousHash=priviousHash;
        this.currentHash=this.calculateHash();
    }
    calculateHash(){

        return SHA256(this.index+this.timestamp+JSON.stringify(this.data)+this.priviousHash).toString();
    }
   
}
// Date().toISOString().replace(/[.:-]/g,'')
class Blockchain{
    constructor()
    {
        this.chain= [Block];
        this.chain.pop();
        this.getgenesisblock();
    }
    getgenesisblock()
    {    
         this.chain.push(new Block("This is a genesis block",this.chain.length,SHA256("0").toString(),Date.now().toString()));
         
    }
    addBlock(newBlock)
    {
        newBlock.index=this.chain.length;             
        newBlock.priviousHash=this.chain[this.chain.length - 1].currentHash;
        newBlock.timestamp=Date.now().toString();        
        newBlock.currentHash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

block1 = new Block({balance : 500});
block2 = new Block({balance : 200});
blockchain = new Blockchain();
blockchain.addBlock(block1);
blockchain.addBlock(block2);

console.log(JSON.stringify(blockchain,null,4));