/*
 * This file is called at the end of the HTML file
 * We assume that createBankManager() is available globally in client side
*/
const bankManager = createBankManager()

// Sections loading
const display = (sectionToDisplay) => {
    ['home', 'balance', 'deposit', 'withdrawal', 'history'].forEach(currentSection => {
        if (currentSection === sectionToDisplay) {
            return document.getElementById(currentSection).style.display = 'block'
        }
        document.getElementById(currentSection).style.display = 'none'
    })
}

const home = () => {
    display('home')
}

const balance = () => {
    const balanceAmount = bankManager.getBalance()

    document.getElementById('balanceAmount').innerHTML = balanceAmount
    display('balance')
}

const deposit = () => {
    const depositInput = document.getElementById('depositInput')
    depositInput.value = 0
    display('deposit')
}

const withdrawal = () => {
    const withdrawalInput = document.getElementById('withdrawalInput')
    withdrawalInput.value = 0
    display('withdrawal')
}

const history = () => {
    const historyListContainer = document.getElementById('historyList')
    const historyList = getHistory()
    let content = ''

    if (historyList.length === 0) {
        content = '<tr><td colspan="4">You have no recent operations to display.</td></tr>'
    } else {
        historyList.forEach(currentHistory => {
            content += `<tr><td>${currentHistory.operation}</td><td>${currentHistory.date}</td>
                <td>${currentHistory.amount}</td><td>${currentHistory.balance}</td></tr>`
        })
    }
    historyListContainer.innerHTML = content
    display('history')
}

// Onclick event handlers
const doDeposit = () => {
    const depositInput = document.getElementById('depositInput')
    const depositAmount = Number(depositInput.value)

    if (!isNaN(depositAmount) && depositAmount > 0) {
        bankManager.deposit(depositAmount)
        alert(`Success deposit of ${depositAmount}.`)
    } else {
        alert('We could not perform this deposit.')
    }
}

const doWithdrawal = () => {
    const withdrawalInput = document.getElementById('withdrawalInput')
    const withdrawalAmount = Number(withdrawalInput.value)

    if (!isNaN(withdrawalAmount) && withdrawalAmount > 0) {
        bankManager.withdrawal(withdrawalAmount)
        alert(`Success withdrawal of ${withdrawalAmount}.`)
    } else {
        alert('We could not perform this withdrawal.')
    }
}

const getHistory = () => {
    return bankManager.history()
}
