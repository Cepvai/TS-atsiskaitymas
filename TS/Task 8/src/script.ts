/* ------------------------------ TASK 8 ----------------------------
Parašykite TS kodą, kuris leis vartotojui įvesti ilgį metrais ir pamatyti jo pateikto ilgio konvertavimą į:
1. Centimetrus (cm) | Formulė: cm = m * 100
2. Colius (in) | Formulė: in = m * 39.37
3. Pėdas (ft) | Formulė: ft = m * 3.281
4. Mylias (mi) | Formulė: mi = m / 1609
5. Jardus (yd) | Formulė: yd = m * 1.094

Pastaba: Atvaizdavimas turi būti matomas su kiekviena įvestimi ir pateikiamas <div id="output"></div> viduje, bei turi turėti bent minimalų stilių;
------------------------------------------------------------------- */

const meterInput = document.querySelector<HTMLInputElement>("#meter");
const centimetersOutput = document.querySelector<HTMLSpanElement>("#centimeters");
const inchesOutput = document.querySelector<HTMLSpanElement>("#inches");
const feetOutput = document.querySelector<HTMLSpanElement>("#feet");
const milesOutput = document.querySelector<HTMLSpanElement>("#miles");
const yardsOutput = document.querySelector<HTMLSpanElement>("#yards");

if (meterInput) {
  meterInput.addEventListener("input", () => {
    const meters = parseFloat(meterInput.value);
    if (!isNaN(meters)) {
      const centimeters = meters * 100;
      const inches = meters * 39.37;
      const feet = meters * 3.281;
      const miles = meters / 1609;
      const yards = meters * 1.094;

      if (centimetersOutput) centimetersOutput.textContent = centimeters.toFixed(2);
      if (inchesOutput) inchesOutput.textContent = inches.toFixed(2);
      if (feetOutput) feetOutput.textContent = feet.toFixed(2);
      if (milesOutput) milesOutput.textContent = miles.toFixed(6);
      if (yardsOutput) yardsOutput.textContent = yards.toFixed(2);
    } else {
      if (centimetersOutput) centimetersOutput.textContent = '0';
      if (inchesOutput) inchesOutput.textContent = '0';
      if (feetOutput) feetOutput.textContent = '0';
      if (milesOutput) milesOutput.textContent = '0';
      if (yardsOutput) yardsOutput.textContent = '0';
    }
  });
}
