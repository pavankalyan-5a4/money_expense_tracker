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

// ✅ DELETE FUNCTION
function deleteExpense(index) {
    if (confirm("Delete this expense?")) {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateUI();
    }
}

// ✅ EDIT FUNCTION
function editExpense(index) {
    let newAmount = prompt("Enter correct amount:", expenses[index].amount);
    let newNote = prompt("Edit note:", expenses[index].note);

    if (newAmount !== null && newNote !== null) {
        expenses[index].amount = Number(newAmount);
        expenses[index].note = newNote;

        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateUI();
    }
}

function updateUI() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((e, index) => {
        total += e.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            <b>₹${e.amount}</b><br>
            ${e.note}<br>
            <small>${e.time}</small><br><br>

            <button onclick="editExpense(${index})">✏️ Edit</button>
            <button onclick="deleteExpense(${index})">🗑️ Delete</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
    document.getElementById("remaining").innerText = balance - total;
}

function editBalance() {
    let newBalance = prompt("Enter correct balance:", balance);

    if (newBalance !== null && newBalance !== "") {
        balance = Number(newBalance);
        localStorage.setItem("balance", balance);
        updateUI();
    }
}

updateUI();
