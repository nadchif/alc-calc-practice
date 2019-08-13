const AppState = {
    screenActive: false,
    canReset: false
};
const evalMath = (mathexp) => {
    let result = 0;
    try {
        const tmpresult = eval(mathexp.replace("x", "*").replace("÷", "/").replace("(", "*("));
        if (!isNaN(tmpresult)) {
            result = parseFloat(tmpresult.toPrecision(12));
        }
    } catch (e) {
        //console.log("Eval error:", e);
    }
    AppState.canReset = true;
    return result;
}
const acceptedOperators = ["/", ".", "÷", "x", "*", "+", "-", "=", "(", ")", "ce", "CE", "Backspace", "Escape", "Enter"]

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
        if(!screenFrame.classList.contains("active")){
            screenFrame.classList.add("active");
        }
    } else {
        if(screenFrame.classList.contains("active")){
        screenFrame.classList.remove("active");
        }
    }

    //handle CE
    if (entry == "CE" || entry == "Backspace" || entry == "Escape") {

        if (screenDisplay.innerText.length > 1 && AppState.canReset == false) {
            screenDisplay.innerText = screenDisplay.innerText.substring(0, screenDisplay.innerText.length - 1);
            return;
        }
        AppState.canReset = false;
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
    if (screenDisplay.innerText.length > 12) {
        //return;
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
        button.addEventListener('mouseup', (event) => doMathOp(event, button.textContent))
    });
    document.querySelector('body').addEventListener("keydown", () => {
        doMathOp(event, event.key);
    });
    document.getElementById("calcButtons").style.opacity = "1";
}

bootstrap();

//register service-worker
if ('serviceWorker' in navigator) {
    console.log("service worker is supported");
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(registration => {
                console.log("service worker registered", registration)
            })
            .catch(e => {
                console.log("service worker could not register", e);
            });
    });
}
