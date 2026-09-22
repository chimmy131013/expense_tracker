// =====================================================
// EXPENSE HISTORY
// =====================================================

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// =====================================================
// ELEMENTS
// =====================================================

const specificDate = document.getElementById("specificDate");
const dateBtn = document.getElementById("dateBtn");
const dateTitle = document.getElementById("dateTitle");
const dateExpenses = document.getElementById("dateExpenses");

const monthPicker = document.getElementById("monthPicker");
const monthBtn = document.getElementById("monthBtn");
const monthTotal = document.getElementById("monthTotal");

const yearPicker = document.getElementById("yearPicker");
const yearBtn = document.getElementById("yearBtn");
const yearTotal = document.getElementById("yearTotal");


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
// NORMALIZE DATE
// Supports:
// 2026-09-21
// 21/09/2026
// =====================================================

function normalizeDate(date) {

    if (!date) return "";

    // Already YYYY-MM-DD
    if (date.includes("-")) {
        return date;
    }

    // Convert DD/MM/YYYY
    if (date.includes("/")) {

        const parts = date.split("/");

        if (parts.length === 3) {

            const day = parts[0].padStart(2, "0");
            const month = parts[1].padStart(2, "0");
            const year = parts[2];

            return `${year}-${month}-${day}`;
        }
    }

    return "";
}


// =====================================================
// SPECIFIC DATE
// =====================================================

dateBtn.addEventListener("click", function () {

    const selectedDate = specificDate.value;

    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }

    const filteredExpenses = expenses.filter(function (expense) {

        return normalizeDate(expense.date) === selectedDate;

    });

    const dateObject = new Date(selectedDate + "T00:00:00");

    const formattedDate = dateObject.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    dateTitle.textContent =
        "Expenses on " + formattedDate;

    displayDateExpenses(filteredExpenses);
});


// =====================================================
// MONTHLY TOTAL ONLY
// =====================================================

monthBtn.addEventListener("click", function () {

    const selectedMonth = monthPicker.value;

    if (!selectedMonth) {
        alert("Please select a month.");
        return;
    }

    const filteredExpenses = expenses.filter(function (expense) {

        const date = normalizeDate(expense.date);

        return date.startsWith(selectedMonth);

    });

    let total = 0;

    filteredExpenses.forEach(function (expense) {
        total += Number(expense.amount);
    });

    monthTotal.textContent =
        total.toLocaleString("en-IN");
});


// =====================================================
// YEARLY TOTAL ONLY
// =====================================================

yearBtn.addEventListener("click", function () {

    const selectedYear = yearPicker.value;

    if (!selectedYear) {
        alert("Please select a year.");
        return;
    }

    const filteredExpenses = expenses.filter(function (expense) {

        const date = normalizeDate(expense.date);

        return date.startsWith(selectedYear);

    });

    let total = 0;

    filteredExpenses.forEach(function (expense) {
        total += Number(expense.amount);
    });

    yearTotal.textContent =
        total.toLocaleString("en-IN");
});


// =====================================================
// DISPLAY DATE EXPENSES
// ONLY USED FOR SPECIFIC DATE
// =====================================================

function displayDateExpenses(expenseArray) {

    dateExpenses.innerHTML = "";

    if (expenseArray.length === 0) {

        const message = document.createElement("p");

        message.className = "empty-message";

        message.textContent =
            "No expenses found for this date.";

        dateExpenses.appendChild(message);

        return;
    }


    expenseArray.slice().reverse().forEach(function (expense) {

        const item = document.createElement("div");

        item.className = "history-expense";


        // LEFT
        const left = document.createElement("div");

        left.className = "history-expense-left";


        const icon = document.createElement("div");

        icon.className = "history-icon";

        icon.textContent =
            categoryIcons[expense.category] || "📦";


        const details = document.createElement("div");


        const name = document.createElement("div");

        name.className = "history-name";

        name.textContent = expense.name;


        const category = document.createElement("div");

        category.className = "history-category";

        category.textContent =
            expense.category + " • " +
            formatDisplayDate(expense.date);


        details.appendChild(name);
        details.appendChild(category);

        left.appendChild(icon);
        left.appendChild(details);


        // AMOUNT
        const amount = document.createElement("div");

        amount.className = "history-amount";

        amount.textContent =
            "₹" + Number(expense.amount).toLocaleString("en-IN");


        item.appendChild(left);
        item.appendChild(amount);

        dateExpenses.appendChild(item);
    });
}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDisplayDate(date) {

    const normalized = normalizeDate(date);

    if (!normalized) {
        return date;
    }

    const dateObject =
        new Date(normalized + "T00:00:00");

    return dateObject.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


// =====================================================
// LOAD YEARS
// =====================================================

function loadYears() {

    const currentYear = new Date().getFullYear();

    for (
        let year = currentYear;
        year >= currentYear - 5;
        year--
    ) {

        const option =
            document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearPicker.appendChild(option);
    }

    yearPicker.value = currentYear;
}


// =====================================================
// DEFAULT MONTH
// =====================================================

function setDefaultMonth() {

    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    monthPicker.value =
        `${year}-${month}`;
}


// =====================================================
// DEFAULT DATE
// =====================================================

function setDefaultDate() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    specificDate.value =
        `${year}-${month}-${day}`;
}


// =====================================================
// INITIALIZE
// =====================================================

loadYears();

setDefaultMonth();

setDefaultDate();