let balance = localStorage.getItem("balance") || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function setBalance() {
    balance = Number(document.getElementById("balanceInput").value);
    localStorage.setItem("balance", balance);
    updateUI();
}

function addExpense() {
    let amount = Number(document.getElementById("amount").value);
    let note = document.getElementById("note").value;

    if (!amount || !note) {
        alert("Enter valid details");
        return;
    }

    let time = new Date().toLocaleString();

    expenses.unshift({
        amount,
        note,
        time
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("note").value = "";

    updateUI();
}

function updateUI() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach(e => {
        total += e.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            <b>₹${e.amount}</b><br>
            ${e.note}<br>
            <small>${e.time}</small>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
    document.getElementById("remaining").innerText = balance - total;
}

updateUI();