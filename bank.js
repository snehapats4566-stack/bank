
class BankAccount {
    constructor() {
        this.accNo = '';
        this.name = '';
        this.balance = 0;
    }

    async createAccount(rl) {
        this.accNo = await question(rl, 'Enter Account Number: ');
        this.name = await question(rl, 'Enter Account Holder Name: ');
        const bal = await question(rl, 'Enter Initial Balance: ');
        this.balance = parseFloat(bal) || 0;
    }

    async deposit(rl) {
        const amt = await question(rl, 'Enter amount to deposit: ');
        const amount = parseFloat(amt);
        if (isNaN(amount) || amount <= 0) {
            console.log('Invalid amount.');
            return;
        }
        this.balance += amount;
        console.log('Amount deposited successfully.');
    }

    async withdraw(rl) {
        const amt = await question(rl, 'Enter amount to withdraw: ');
        const amount = parseFloat(amt);
        if (isNaN(amount) || amount <= 0) {
            console.log('Invalid amount.');
            return;
        }
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log('Withdrawal successful.');
        } else {
            console.log('Insufficient balance.');
        }
    }

    display() {
        console.log('\n--- Account Details ---');
        console.log('Account Number:', this.accNo);
        console.log('Name:', this.name);
        console.log('Balance: ₹' + this.balance);
    }
}

function question(rl, prompt) {
    return new Promise(resolve => rl.question(prompt, answer => resolve(answer)));
}

const readline = require('readline');

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const b = new BankAccount();

    await b.createAccount(rl);

    let choice;
    do {
        console.log('\n1. Deposit');
        console.log('2. Withdraw');
        console.log('3. Display Account');
        console.log('4. Exit');
        const c = await question(rl, 'Enter your choice: ');
        choice = parseInt(c, 10);

        switch (choice) {
            case 1:
                await b.deposit(rl);
                break;
            case 2:
                await b.withdraw(rl);
                break;
            case 3:
                b.display();
                break;
            case 4:
                console.log('Thank you!');
                break;
            default:
                console.log('Invalid choice.');
        }
    } while (choice !== 4);

    rl.close();
}

main();
