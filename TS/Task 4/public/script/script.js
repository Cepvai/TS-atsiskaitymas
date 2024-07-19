"use strict";
function generuoti(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += i % 2 === 0 ? '1' : '0';
    }
    return result;
}
console.log(generuoti('labas'));
console.log(generuoti('kebabas'));
console.log(generuoti('a'));
