// ================= SIDEBAR =================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
});


// ================= THEME =================

const themeBtn = document.getElementById("themeBtn");

let dark = false;

themeBtn.addEventListener("click", function () {

    dark = !dark;

    if (dark) {

        document.documentElement.style.setProperty(
            "--background",
            "#0f172a"
        );

        document.documentElement.style.setProperty(
            "--card",
            "#1e293b"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#f8fafc"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#94a3b8"
        );

        document.documentElement.style.setProperty(
            "--border",
            "#334155"
        );

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        document.documentElement.style.setProperty(
            "--background",
            "#f5f7fb"
        );

        document.documentElement.style.setProperty(
            "--card",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#172033"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#7a8496"
        );

        document.documentElement.style.setProperty(
            "--border",
            "#e7eaf0"
        );

        themeBtn.textContent = "🌙 Dark Mode";
    }

});


// ================= MONEY =================

let totalFees = 150000;
let amountPaid = 50000;
let balance = totalFees - amountPaid;


// Format Nigerian Naira

function naira(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


// Update dashboard

function updateDashboard() {

    balance = totalFees - amountPaid;

    let percentage =
        Math.round((amountPaid / totalFees) * 100);

    document.getElementById("totalFees").textContent =
        naira(totalFees);

    document.getElementById("amountPaid").textContent =
        naira(amountPaid);

    document.getElementById("balance").textContent =
        naira(balance);

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "%";

    document.getElementById("progressBar").style.width =
        percentage + "%";

}

updateDashboard();


// ================= PAYMENT =================

const paymentForm =
    document.getElementById("paymentForm");

paymentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const feeType =
        document.getElementById("feeType").value;

    const paymentAmount =
        Number(
            document.getElementById("paymentAmount").value
        );

    const method =
        document.querySelector(
            'input[name="method"]:checked'
        );


    if (feeType === "") {

        showToast(
            "Payment Error",
            "Please select a fee."
        );

        return;
    }


    if (
        !paymentAmount ||
        paymentAmount <= 0
    ) {

        showToast(
            "Payment Error",
            "Please enter a valid amount."
        );

        return;
    }


    if (paymentAmount > balance) {

        showToast(
            "Payment Error",
            "The amount is greater than the current balance."
        );

        return;
    }


    if (!method) {

        showToast(
            "Payment Error",
            "Please select a payment method."
        );

        return;
    }


    /*
        DEMO ONLY

        No real payment happens here.
    */

    amountPaid += paymentAmount;

    updateDashboard();


    const reference =
        "TXN-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    addTransaction(
        reference,
        feeType,
        paymentAmount
    );


    document.getElementById(
        "receiptStudent"
    ).textContent =
        document.getElementById(
            "paymentStudent"
        ).value;


    document.getElementById(
        "receiptAmount"
    ).textContent =
        naira(paymentAmount);


    document.getElementById(
        "receiptReference"
    ).textContent =
        reference;


    paymentForm.reset();


    showToast(
        "Payment Successful",
        "Demo payment recorded successfully."
    );

});


// ================= TRANSACTION =================

function addTransaction(
    reference,
    fee,
    amount
) {

    const list =
        document.getElementById(
            "transactionList"
        );


    const row =
        document.createElement("tr");


    const date =
        new Date().toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    row.innerHTML = `

        <td>
            <strong>${reference}</strong>
        </td>

        <td>${fee}</td>

        <td>${date}</td>

        <td>${naira(amount)}</td>

        <td>
            <span class="status paid">
                Successful
            </span>
        </td>

    `;


    list.prepend(row);

}


// ================= SEARCH =================

const search =
    document.getElementById(
        "searchTransaction"
    );


search.addEventListener("input", function () {

    const value =
        search.value.toLowerCase();


    const rows =
        document.querySelectorAll(
            "#transactionList tr"
        );


    rows.forEach(function (row) {

        const text =
            row.textContent.toLowerCase();


        if (text.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


// ================= TOAST =================

function showToast(title, message) {

    const toast =
        document.getElementById("toast");

    document.getElementById(
        "toastTitle"
    ).textContent = title;

    document.getElementById(
        "toastMessage"
    ).textContent = message;


    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3500);

}


// ================= NOTIFICATION =================

document
    .getElementById("notificationBtn")
    .addEventListener("click", function () {

        showToast(
            "Notifications",
            "You have 2 school fee notifications."
        );

    });


// ================= HELP =================

function showHelp() {

    showToast(
        "School Support",
        "Please contact your school's finance office."
    );

}


// ================= LOGOUT =================

document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        showToast(
            "Demo Logout",
            "You have been logged out of the demo."
        );

    });