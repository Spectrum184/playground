const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transactions {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signNature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signNature || this.signNature.length === 0) {
            throw new Error('No signature in this transaction!');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

        return publicKey.verify(this.calculateHash(), this.signNature);
    }
}

class Block {
    constructor(timestamp, transactions, data, previousHash = '1804') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.transactions = transactions;
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined' + this.hash)
    }

    hashValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 18;
    }

    createGenesisBlock() {
        return new Block(0, Date().toString(), { author: 'ThanhTK', detail: 'OK baby' })
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transactions(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date().toString(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log(block)

        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransactions(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address!');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transactions to chain!');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hashValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}

const tanCoin = new Blockchain();
const myKey = ec.keyFromPrivate('42e3980d1607d6031a77e92a0fd52c70cc360c41b63064220bc8b5698f286508');
const myWalletAddress = myKey.getPublic('hex');
const tx1 = new Transactions(myWalletAddress, 'OK', 10);

tx1.signTransaction(myKey);
tanCoin.addTransactions(tx1);

console.log('Start mining...');
tanCoin.minePendingTransactions(myWalletAddress);
console.log('Balance...', tanCoin.getBalanceOfAddress(myWalletAddress))