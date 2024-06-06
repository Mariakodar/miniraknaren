document.addEventListener("DOMContentLoaded", function() {
    let selectedNumber = ""; // För att hålla reda på det valda talet
    let currentResult = 0; // För att hålla reda på det aktuella resultatet
    let lastOperator = null; // För att hålla reda på den senaste operatören
    let expression = ""; // För att hålla reda på hela uttrycket

    // Hämta knapparna
    const digits = document.querySelectorAll('.digit');
    const operators = document.querySelectorAll('.op');
    const resultElement = document.getElementById('result');
    const inputElement = document.getElementById('input');

    // Lägg till en klickhändelse på varje siffra
    digits.forEach(function(digit) {
        digit.addEventListener('click', function() {
            selectedNumber += digit.textContent; // Lägg till det valda talet
            expression += digit.textContent; // Lägg till det valda talet till uttrycket
            inputElement.textContent = expression; // Uppdatera det valda talet i gränssnittet
        });
    });

    // Lägg till en klickhändelse på varje operatörknapp
    operators.forEach(function(operator) {
        operator.addEventListener('click', function() {
            if (operator.textContent === "Clear") {
                // Återställ allt vid Clear-knappen
                selectedNumber = "";
                currentResult = 0;
                lastOperator = null;
                expression = "";
                resultElement.textContent = "0";
                inputElement.textContent = "";
            } else if (operator.textContent === "=") {
                // Utför slutlig beräkning vid "="-knappen
                if (selectedNumber !== "" && lastOperator) {
                    currentResult = calculate(currentResult, parseInt(selectedNumber), lastOperator);
                    resultElement.textContent = currentResult; // Uppdatera det aktuella resultatet i gränssnittet
                    selectedNumber = ""; // Återställ det valda numret för nästa operation
                    lastOperator = null; // Återställ operatören
                }
            } else {
                // Om det finns ett valt nummer
                if (selectedNumber !== "") {
                    if (lastOperator) {
                        currentResult = calculate(currentResult, parseInt(selectedNumber), lastOperator);
                    } else {
                        currentResult = parseInt(selectedNumber);
                    }
                    selectedNumber = ""; // Återställ det valda numret för nästa operation
                }
                lastOperator = operator.textContent; // Sätt den aktuella operatören
                expression += " " + operator.textContent + " "; // Lägg till operatorn till uttrycket
                inputElement.textContent = expression; // Uppdatera uttrycket i "Du valde"
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }
});
