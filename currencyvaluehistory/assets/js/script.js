const apiKey = "rc2wIgDdWZFvn0LcZefgt3Mz4tPSPKGJ";
const form = document.getElementById("currencyForm");
const clearBtn = document.getElementById("clearBtn");

let currencyChart = null;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();

    const base = document.getElementById("baseCurrency").value;
    const convert = document.getElementById("convertCurrency").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    let isValid = true;

    if (!base) {
        document.getElementById("baseError").textContent = "Base Currency is Required";
        isValid = false;
    }

    if (!convert) {
        document.getElementById("convertError").textContent = "Convert To Currency is Required";
        isValid = false;
    }

    if (!fromDate) {
        document.getElementById("fromDateError").textContent = "From Date is Required";
        isValid = false;
    }

    if (!toDate) {
        document.getElementById("toDateError").textContent = "To Date is Required";
        isValid = false;
    }

    if (!isValid) return;

    const url = `https://api.massive.com/v2/aggs/ticker/C:${base}${convert}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (!data.results) {
                alert("No data returned.");
                return;
            }

            const labels = data.results.map(item =>
                new Date(item.t).toLocaleDateString()
            );

            const values = data.results.map(item => item.c);

            renderChart(labels, values, base, convert);

        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error retrieving data.");
        });
});

function renderChart(labels, values, base, convert) {

    const ctx = document.getElementById("currencyChart").getContext("2d");

    if (currencyChart) {
        currencyChart.destroy();
    }

    currencyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `One ${base} to ${convert}`,
                data: values,
                borderColor: "teal",
                backgroundColor: "rgba(0,128,128,0.2)",
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

clearBtn.addEventListener("click", function () {

    form.reset();
    clearErrors();

    if (currencyChart) {
        currencyChart.destroy();
    }
});

function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
}