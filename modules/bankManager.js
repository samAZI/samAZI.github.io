
const createBankManager = function () {
	//state
	const account = {
		balance: 0,
		history: []
	}

    // public methods
    const bankManager = {
        getBalance() {
			return account.balance
		},
        deposit(amount) {
        	if (!isNaN(amount) && amount > 0) {
                account.balance += amount
                addHistory('deposit', amount)
			}
		},
        withdrawal(amount) {
            if (!isNaN(amount) && amount > 0) {
                account.balance -= amount
                addHistory('withdrawal', amount)
            }
		},
		history() {
        	return account.history
		},
	}

	// private method
    const addHistory = function (operation, amount) {
        account.history.unshift({
            operation,
            date: new Date().toJSON().slice(0, 10),
            amount,
            balance: account.balance
        })
    }

	return bankManager
}

module.exports = {
    createBankManager,
}