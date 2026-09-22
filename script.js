// =====================================================
// EXPENSE TRACKER
// =====================================================

// Get saved expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// =====================================================
// ELEMENTS
// =====================================================

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const emptyMessage = document.getElementById("emptyMessage");


// =====================================================
// CATEGORY ICONS
// =====================================================

const categoryIcons = {
    Food: "🍔",
    Travel: "🚌",
    Shopping: "🛍️",
    Bills: "💡",
    Education: "📚",
    Other: "📦"
};


// =====================================================
// ADD EXPENSE
// =====================================================

expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Check input
    if (name === "" || amount <= 0 || category === "") {
        alert("Please enter all expense details.");
        return;
    }

    // Create new expense
    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: getTodayDate()
    };

    // Add to array
    expenses.push(newExpense);

    // Save
    saveExpenses();

    // Display
    displayExpenses();

    // Clear form
    expenseForm.reset();

    // Put cursor back in name field
    expenseName.focus();
});


// =====================================================
// DISPLAY EXPENSES
// =====================================================

function displayExpenses() {

    expenseList.innerHTML = "";

    // No expenses
    if (expenses.length === 0) {

        expenseList.appendChild(emptyMessage);

        emptyMessage.style.display = "block";

        updateTotal();

        return;
    }

    emptyMessage.style.display = "none";


    // Display newest expense first
    expenses.slice().reverse().forEach(function (expense) {

        const expenseItem = document.createElement("div");

        expenseItem.className = "expense-item";


        // ---------------------------------------------
        // Left side
        // ---------------------------------------------

        const expenseInfo = document.createElement("div");

        expenseInfo.className = "expense-info";


        // Icon
        const icon = document.createElement("div");

        icon.className = "expense-icon";

        icon.textContent =
            categoryIcons[expense.category] || "📦";


        // Details
        const details = document.createElement("div");


        const name = document.createElement("div");

        name.className = "expense-name";

        name.textContent = expense.name;


        const category = document.createElement("div");

        category.className = "expense-category";

        category.textContent =
            expense.category + " • " + expense.date;


        details.appendChild(name);
        details.appendChild(category);


        expenseInfo.appendChild(icon);
        expenseInfo.appendChild(details);


        // ---------------------------------------------
        // Right side
        // ---------------------------------------------

        const expenseRight = document.createElement("div");

        expenseRight.className = "expense-right";


        // Amount
        const amount = document.createElement("div");

        amount.className = "expense-amount";

        amount.textContent =
            "₹" + expense.amount.toLocaleString("en-IN");


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function () {

            deleteExpense(expense.id);

        });


        expenseRight.appendChild(amount);
        expenseRight.appendChild(deleteButton);


        // ---------------------------------------------
        // Add everything to expense item
        // ---------------------------------------------

        expenseItem.appendChild(expenseInfo);
        expenseItem.appendChild(expenseRight);

        expenseList.appendChild(expenseItem);

    });


    // Update total
    updateTotal();
}


// =====================================================
// DELETE EXPENSE
// =====================================================

function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {

        return expense.id !== id;

    });

    saveExpenses();

    displayExpenses();
}


// =====================================================
// CALCULATE TOTAL
// =====================================================

function updateTotal() {

    let total = 0;

    expenses.forEach(function (expense) {

        total += expense.amount;

    });

    totalAmount.textContent =
        total.toLocaleString("en-IN");
}


// =====================================================
// SAVE TO LOCAL STORAGE
// =====================================================

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// =====================================================
// LOAD EXPENSES WHEN PAGE OPENS
// =====================================================

displayExpenses();