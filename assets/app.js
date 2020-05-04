window.String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

const AppState = {
  screenActive: false,
  canReset: false,
};

const acceptedOperators = ['/', '.', '÷', 'x', '*', '+', '-', '=',
  '(', ')', 'ce', 'CE', 'Backspace', 'Escape'];

const accessibilityOperators = ['Tab', 'Space', 'Enter'];

const unBeautifyEqn = (eqn) => {
  return eqn.replaceAll('x', '*').replaceAll('÷', '/');
};

const parsedEqn = (eqn) => {
  let lastOperator;
  eqn.split('').forEach((ch) => {
    if (acceptedOperators.includes(ch)) {
      lastOperator = ch;
    }
  });

  const openingBracketCount = eqn.split('(').length;
  const closingBracketCount = eqn.split(')').length;

  return {
    'lastOperator': lastOperator,
    'openingBracketCount': openingBracketCount,
    'closingBracketCount': closingBracketCount,
  };
};

const processEquation = (eqn) => {
  return new(Function)('return (' + unBeautifyEqn(eqn) + ')')();
};

const evalMath = (mathexp) => {
  let result = 0;
  try {
    const tmpresult = processEquation(mathexp.replaceAll('))', ')')
        .replaceAll('((', '(').replaceAll('(', '*('));
    if (!isNaN(tmpresult)) {
      result = parseFloat(tmpresult.toPrecision(12));
    }
  } catch (e) {
    console.log('Eval error caught:', e);
  }
  AppState.canReset = true;
  return result;
};
const doMathOp = (event, entry) => {
  if (accessibilityOperators.includes(entry)) {
    return true;
  }
  event.preventDefault();
  if (!acceptedOperators.includes(entry) && isNaN(entry)) {
    return false;
  }
  const screenDisplay = document.getElementById('screenDisplay');
  const equationDisplay = document.getElementById('equationDisplay');
  const screenFrame = document.getElementById('screenFrame');
  const hintElem = document.getElementById('synHint');

  // translate synonyms
  // if (entry == 'Enter') entry = '=';
  if (entry == 'Backspace' || entry == 'Escape') entry = 'CE';
  if (entry == 'x') entry = '*';
  if (entry == '÷') entry = '/';

  document.querySelector(`[data-math-char="${entry}"]`)
      .classList.add('pressedfx');
  window.setTimeout(() => {
    document.querySelector(`[data-math-char="${entry}"]`)
        .classList.remove('pressedfx');
  }, 400);

  const callCE = () => {
    hintElem.innerText = '';
    screenDisplay.innerText = '0';
    equationDisplay.innerText = 'Ans = 0';
    screenFrame.classList.remove('active');
  };

  const hintBrackets = (eqn) => {
    const parsedEquation = parsedEqn(eqn);

    if (parsedEquation.openingBracketCount >
         parsedEquation.closingBracketCount) {
      hintElem.innerText = ')';
    } else {
      if (hintElem.innerText == ')') {
        hintElem.innerText = '';
      }
    }
  };

  const beautifyDisplay = (eqn) => {
    hintBrackets(eqn);
    screenDisplay.innerText = eqn.replaceAll('*', 'x').replaceAll('/', '÷');
  };

  const addToScreen = () => {
    const parsedEquation = parsedEqn(screenDisplay.innerText);
    // prevent double "."
    if (parsedEquation.lastOperator == '.' && entry == '.') {
      return;
    }
    // prevent ")" without opening bracket
    if (parsedEquation.openingBracketCount <
        (parsedEquation.closingBracketCount + 1) &&
     entry == ')') {
      return;
    }

    // prevent multiple operators after each other
    const lastentry = (screenDisplay.innerText
        .substring(screenDisplay.innerText.length - 1));
    if (acceptedOperators.includes(lastentry) &&
     acceptedOperators.includes(entry) && entry != ')' && entry != '(') {
      // check if operator is the same;
      if (lastentry == entry) {
        return;
      } else {
        beautifyDisplay(screenDisplay.innerText
            .substring(0, screenDisplay.innerText.length - 1));
      }
    }
    if (screenDisplay.innerText == '0') {
      if (acceptedOperators.includes(entry)) {
        beautifyDisplay(screenDisplay.innerText + entry);
        return;
      }
      beautifyDisplay(entry);
      return;
    }

    beautifyDisplay(screenDisplay.innerText + entry);
  };

  // add screen activate effect
  if (screenDisplay.innerText.length > 0) {
    if (!screenFrame.classList.contains('active')) {
      screenFrame.classList.add('active');
    }
  } else {
    if (screenFrame.classList.contains('active')) {
      screenFrame.classList.remove('active');
    }
  }

  // handle CE
  if (entry == 'CE' || entry == 'Backspace' || entry == 'Escape') {
    if (screenDisplay.innerText.length > 1 && AppState.canReset == false) {
      screenDisplay.innerText = screenDisplay.innerText
          .substring(0, screenDisplay.innerText.length - 1);
      return;
    }
    AppState.canReset = false;
    callCE();
    return;
  }
  // handle =
  if (entry == '=' || entry == 'Enter') {
    hintElem.innerText = '';
    equationDisplay.innerText = screenDisplay.innerText + '= ';
    screenDisplay.innerText = evalMath(screenDisplay.innerText);
    return;
  }

  // stop accepting more than 16 digits
  if (screenDisplay.innerText.length > 12) {
    // return;
  }


  if (equationDisplay.innerText == 'Ans = 0') {
    addToScreen();
  } else {
    // reset display;
    if (!acceptedOperators.includes(entry)) {
      callCE();
    } else {
      equationDisplay.innerText = 'Ans = 0';
    }
    addToScreen();
  }
};

const bootstrap = () => {
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('mouseup', (event) =>
      doMathOp(event, button.getAttribute('data-math-char')));
  });
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        doMathOp(event, button.getAttribute('data-math-char'));
      }
    });
  });
  document.querySelector('body').addEventListener('keydown', (event) => {
    doMathOp(event, event.key);
  });
  document.getElementById('calcButtons').style.opacity = '1';
};

bootstrap();

// register service-worker
if ('serviceWorker' in navigator) {
  console.log('service worker is supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('service worker registered', registration);
        })
        .catch((e) => {
          console.log('service worker could not register', e);
        });
  });
}
