"use strict";
const meterInput = document.querySelector("#meter");
const centimetersOutput = document.querySelector("#centimeters");
const inchesOutput = document.querySelector("#inches");
const feetOutput = document.querySelector("#feet");
const milesOutput = document.querySelector("#miles");
const yardsOutput = document.querySelector("#yards");
if (meterInput) {
    meterInput.addEventListener("input", () => {
        const meters = parseFloat(meterInput.value);
        if (!isNaN(meters)) {
            const centimeters = meters * 100;
            const inches = meters * 39.37;
            const feet = meters * 3.281;
            const miles = meters / 1609;
            const yards = meters * 1.094;
            if (centimetersOutput)
                centimetersOutput.textContent = centimeters.toFixed(2);
            if (inchesOutput)
                inchesOutput.textContent = inches.toFixed(2);
            if (feetOutput)
                feetOutput.textContent = feet.toFixed(2);
            if (milesOutput)
                milesOutput.textContent = miles.toFixed(6);
            if (yardsOutput)
                yardsOutput.textContent = yards.toFixed(2);
        }
        else {
            if (centimetersOutput)
                centimetersOutput.textContent = '0';
            if (inchesOutput)
                inchesOutput.textContent = '0';
            if (feetOutput)
                feetOutput.textContent = '0';
            if (milesOutput)
                milesOutput.textContent = '0';
            if (yardsOutput)
                yardsOutput.textContent = '0';
        }
    });
}
