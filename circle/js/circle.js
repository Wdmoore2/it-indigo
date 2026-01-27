$(document).ready(function () {

    // ----- Calculation Functions -----
    function calcDiameter(radius) {
        return 2 * radius;
    }

    function calcCircumference(radius) {
        return 2 * Math.PI * radius;
    }

    function calcArea(radius) {
        return Math.PI * radius * radius;
    }

    // ----- Clear Form Function -----
    function clearForm() {
        $("#radius").val("");
        $("#diameter").text("");
        $("#circumference").text("");
        $("#area").text("");
    }

    // ----- Handle Calculate Button -----
    $("#CircleForm").validate({
        submitHandler: function () {
            let radiusString = $("#radius").val();
            let radius = parseFloat(radiusString);

            if (isNaN(radius) || radius <= 0) {
                alert("Please enter a valid positive number for radius.");
                return;
            }

            let diameter = calcDiameter(radius);
            let circumference = calcCircumference(radius);
            let area = calcArea(radius);

            $("#diameter").text(diameter.toFixed(2));
            $("#circumference").text(circumference.toFixed(2));
            $("#area").text(area.toFixed(2));
        }
    });

    // ----- Handle Clear Button -----
    $("#btnSubmitClear").click(function () {
        clearForm();
    });

});
