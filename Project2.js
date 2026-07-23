let expenseList = []

let addBtn = document.getElementById('addExpenseBtn');

addBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    addExpense();
})

function addExpense() {

    let expenseName = document.getElementById('expenseName').value.trim();

    if (expenseName === "") {
        alert("---> Enter the Expense Name first.");
        return
    }

    let expenseAmount = document.getElementById('expenseAmount').value.trim();

    if (expenseAmount === "") {
        alert("---> No amount was entered");
        return
    }

    let integerAmount = Number(expenseAmount);

    if (Number.isNaN(integerAmount) || integerAmount <= 0) {
        alert("---> Invalid amount given.");
        return
    }

    let category = document.getElementById('category').value;

        if (category === "") {
        alert("---> Please select a category first.")
        return
    }

    expenseList.push({
        expenseName,
        integerAmount,
        category
    })

    displayExpenses();
    doInputsEmpty();
    statistics();

}

function doInputsEmpty() {
    document.getElementById('expenseName').value = "";
    document.getElementById('expenseAmount').value = "";
    document.getElementById('category').value = "";
}

function displayExpenses() {

    document.getElementById('expenseList').innerHTML = "";

    if (filter.value === "All") {

        for (let i = 0 ; i < expenseList.length ; i++) {

            let expense = expenseList[i];

            let newExpense = document.createElement("p");

            newExpense.innerHTML = `
                Expense Name : ${expense.expenseName}<br>
                Amount : ₹${expense.integerAmount}<br>
                Category : ${expense.category} <br><br>      
        
                <button onclick="deleteExpense(${i})">
                    Delete
                </button>
        
                <hr>
            `;

            document.getElementById('expenseList').appendChild(newExpense);
        }


    } else {
        for (let i = 0 ; i < expenseList.length ; i++) {

            let expense = expenseList[i];

            if (expense.category === filter.value) {

                let newExpense = document.createElement("p");

                newExpense.innerHTML = `
                    Expense Name : ${expense.expenseName}<br>
                    Amount : ₹${expense.integerAmount}<br>
                    Category : ${expense.category} <br><br>      
        
                    <button onclick="deleteExpense(${i})">
                        Delete
                    </button>
        
                    <hr>`;

                document.getElementById('expenseList').appendChild(newExpense);
            }

        }
    }
    
}

function deleteExpense(index) {
    expenseList.splice(index , 1)
    displayExpenses();
    statistics();
}

function statistics() {

    document.getElementById('totalExpenses').innerText = expenseList.length;
    
    let highestExpense = 0;
    let lowestExpense = Number.POSITIVE_INFINITY;
    let totalAmount = 0;

    for (let expense of expenseList) {

        totalAmount += expense.integerAmount;

        if (expense.integerAmount > highestExpense) {
            highestExpense = expense.integerAmount;
        }

        if (expense.integerAmount < lowestExpense) {
            lowestExpense = expense.integerAmount;
        }
    }

    document.getElementById('totalAmount').innerText = totalAmount;
    document.getElementById('highestExpense').innerText = highestExpense;
    
    if (expenseList.length === 0) {
        document.getElementById('lowestExpense').innerText = 0;
        document.getElementById('averageExpense').innerText = 0;
    }

    else {

        document.getElementById('lowestExpense').innerText = lowestExpense;
        document.getElementById('averageExpense').innerText = Math.round(totalAmount / expenseList.length);

    }

}

let filter = document.getElementById('filterCategory');

filter.addEventListener("change" , () => {
    displayExpenses();
});