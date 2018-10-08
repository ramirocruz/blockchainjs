const SHA256 = require('crypto-js').SHA256;

class Transaction{
    constructor(from,to,amount)
    {
        this.from=from;
        this.to=to;
        this.amount=amount;
    }
}
class Block{
    constructor(timestamp,transactions,previousHash)
    {
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.nonce=0;
        this.currentHash=this.calculateHash();        
    }
    calculateHash(){

        return SHA256(this.index+this.timestamp+JSON.stringify(this.data)+this.previousHash + this.nonce ).toString();
    }
   mineNewBlock(difficulty)
   {
       while(this.currentHash.substr(0,difficulty) !== "0".repeat(difficulty))
       {
           this.nonce++;
           this.currentHash=this.calculateHash();
       }
       console.log("A new block has been mined....");
   }
}
// Date().toISOString().replace(/[.:-]/g,'')
class Blockchain{
    constructor()
    {   
        this.systemaddress = SHA256("systemaddress").toString();
        this.miningreward = 8;
        this.difficulty = 1; 
        this.chain= [this.getgenesisblock()];
        this.pendingTransactions=[];
    }
    getgenesisblock()
    {    
         return new Block(Date.now(),"This is genesis block",SHA256("0").toString());
         
    }
    getlatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }
  minePendingTransactions(miningrewardAdress)
  {
        let block = new Block(Date.now(),this.pendingTransactions,this.getlatestBlock().currentHash);
        block.mineNewBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions=[new Transaction(this.systemaddress,miningrewardAdress,this.miningreward)];
  }
  queueTransactions(transaction){
      this.pendingTransactions.push(transaction);
  }
  getBalanceOfAddress(address)
  {
      let balance = 0;
      for(const block of this.chain)
      {
          for(const trans of block.transactions)
          {
              if(trans.from === address)
              balance -= trans.amount;
              else if(trans.to === address)
              balance += trans.amount;

          }
      } 
      return balance;
  }
    checkchainvalidation(){
        for(let i=1;i<this.chain.length;i++)
        {
           
            if(this.chain[i].previousHash !== this.chain[i-1].calculateHash())
            return false;
            
            
        }
        return true;
    }
}
zcoin = new Blockchain();
console.log(JSON.stringify(zcoin,null,4));
let joiningbonus = new Transaction(zcoin.systemaddress,SHA256("raman").toString(),100);
let trans1 = new Transaction(SHA256("raman").toString(),SHA256("cruz").toString(),50);
let trans2 = new Transaction(SHA256("cruz").toString(),SHA256("raman").toString(),60);
zcoin.queueTransactions(joiningbonus);
zcoin.queueTransactions(trans1);
zcoin.queueTransactions(trans2);
zcoin.minePendingTransactions(SHA256("ramiro").toString());
console.log("The balance of raman is:"+zcoin.getBalanceOfAddress(SHA256("raman").toString()));
console.log("The balance of cruz is:"+zcoin.getBalanceOfAddress(SHA256("cruz").toString()));
console.log("The balance of ramiro is:"+zcoin.getBalanceOfAddress(SHA256("ramiro").toString()));
zcoin.minePendingTransactions(SHA256("ramiro").toString());
console.log("The balance of ramiro again is:"+zcoin.getBalanceOfAddress(SHA256("ramiro").toString()));

console.log(JSON.stringify(zcoin,null,4));
