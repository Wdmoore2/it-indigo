$(document).ready(function () {
    $("#myform").validate({
        rules: {
            Operand1: {
                required: true,
                number: true
            },
            Operand2: {
                required: true,
                number: true
            },
            Operator: {
                required: true
            }
        },
        messages: {
            Operand1: {
                required: "Operand 1 is required",
                number: "Operand 1 must be a number"
            },
            Operand2: {
                required: "Operand 2 is required",
                number: "Operand 2 must be a number"
            },
            Operator: {
                required: "Please select an operator"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "Operator") {
                error.insertAfter("#OperatorError");
            } else {
                error.insertAfter(element);
            }
        }
    });
});

function calculate() {
    if (!$("#myform").valid()) {
        return;
    }

    let op1 = parseFloat($("#Operand1").val());
    let op2 = parseFloat($("#Operand2").val());
    let operator = $("input[name='Operator']:checked").val();

    let result;

    switch (operator) {
        case "+":
            result = op1 + op2;
            break;
        case "-":
            result = op1 - op2;
            break;
        case "*":
            result = op1 * op2;
            break;
        case "/":
            result = (op2 === 0) ? "Cannot divide by zero" : op1 / op2;
            break;
    }

    $("#Result").text(result);
}

function clearform() {
    $("#myform")[0].reset();
    $("#Result").text("");
    $(".error").text("");
}
