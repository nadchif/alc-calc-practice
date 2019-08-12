const AppState = {
    screenActive: false
};
const evalMath = (mathexp) => {
    let result = 0;
    try {
        const tmpresult = eval(mathexp.replace("x", "*").replace("÷", "/"));
        if (!isNaN(tmpresult)) {
            result = tmpresult
        }
    } catch (e) {
        //console.log("Eval error:", e);
    }
    return result;
}
const acceptedOperators = ["/", "÷", "x", "*", "+", "-", "=", "(", ")", "ce", "CE", "Backspace", "Escape", "Enter"]

const doMathOp = (event, entry) => {
    event.preventDefault();
    if (!acceptedOperators.includes(entry) && isNaN(entry)) {
        return false;
    }
    const screenDisplay = document.getElementById("screenDisplay");
    const equationDisplay = document.getElementById("equationDisplay");
    const screenFrame = document.getElementById("screenFrame");

    const callCE = () => {
        screenDisplay.innerText = "0";
        equationDisplay.innerText = "Ans = 0";
        screenFrame.classList.remove("active");
    }

    const addToScreen = () => {
        //prevent multiple operators after each other
        const lastentry = (screenDisplay.innerText.substring(screenDisplay.innerText.length - 1));
        if (acceptedOperators.includes(lastentry) && acceptedOperators.includes(entry)) {
            //check if operator is the same;
            if (lastentry == entry) {
                return;
            } else {
                screenDisplay.innerText = screenDisplay.innerText.substring(0, screenDisplay.innerText.length - 1);
            }
        }
        if (screenDisplay.innerText == "0") {
            if (acceptedOperators.includes(entry)) {
                screenDisplay.innerText += entry;
                return;
            }
            screenDisplay.innerText = entry;
            return;
        }
        screenDisplay.innerText += entry;
    }

    //add screen activate effect
    if (screenDisplay.innerText.length > 0) {
        screenFrame.classList.add("active");
    } else {
        screenFrame.classList.remove("active");
    }

    //handle CE
    if (entry == "CE" || entry == "Backspace" || entry == "Escape") {
        if (screenDisplay.innerText.length > 1) {
            screenDisplay.innerText = screenDisplay.innerText.substring(0, screenDisplay.innerText.length - 1);
            return;
        }
        callCE();
        return;
    }
    //handle =
    if (entry == "=" || entry == "Enter") {
        equationDisplay.innerText = screenDisplay.innerText + "= ";
        screenDisplay.innerText = evalMath(screenDisplay.innerText);
        return;
    }

    //stop accepting more than 16 digits
    if (screenDisplay.innerText.length > 16) {
        return;
    }



    if (equationDisplay.innerText == "Ans = 0") {
        addToScreen();
    } else {
        //reset display;
        if (!acceptedOperators.includes(entry)) {
            callCE();
        } else {
            equationDisplay.innerText = "Ans = 0";
        }
        addToScreen();
    }

}

const bootstrap = () => {
    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', (event) => doMathOp(event, button.textContent))
    });
    document.querySelector('body').addEventListener("keydown", () => {
        doMathOp(event, event.key);
    })
}

bootstrap();