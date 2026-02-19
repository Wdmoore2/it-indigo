document.getElementById("calculateBtn").addEventListener("click", async () => {
    clearErrors();
    document.getElementById("result").innerHTML = "";

    let fromValue = document.getElementById("fromValue").value.trim();
    let fromUnit = document.querySelector('input[name="fromUnit"]:checked');
    let toUnit = document.querySelector('input[name="toUnit"]:checked');

    let valid = true;

    // Validate numeric value
    if (fromValue === "" || isNaN(fromValue)) {
        document.getElementById("valueError").innerText = "Value is required and must be a number";
        valid = false;
    } else {
        fromValue = parseFloat(fromValue);
    }

    
    if (!fromUnit) {
        document.getElementById("fromUnitError").innerText = "From Unit is required";
        valid = false;
    }
    if (!toUnit) {
        document.getElementById("toUnitError").innerText = "To Unit is required";
        valid = false;
    }

    if (!valid) return;

   
    document.getElementById("result").innerText = "Calculating...";

    try {
        const params = new URLSearchParams({
            FromValue: fromValue,
            FromUnit: fromUnit.value,
            ToUnit: toUnit.value
        });

        const response = await fetch("https://brucebauer.info/assets/ITEC3650/unitsconversion.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        });

        let text = await response.text();
        let numericResult = parseFloat(text);

        
        if (!isNaN(numericResult)) {
            document.getElementById("result").innerText = numericResult.toFixed(4);
        } else {
            document.getElementById("result").innerText = text;
        }
    } catch (err) {
        document.getElementById("result").innerText = "Error: Unable to reach server";
        console.error(err);
    }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("fromValue").value = "";
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    clearErrors();
    document.getElementById("result").innerHTML = "";
});

function clearErrors() {
    document.getElementById("valueError").innerText = "";
    document.getElementById("fromUnitError").innerText = "";
    document.getElementById("toUnitError").innerText = "";
}