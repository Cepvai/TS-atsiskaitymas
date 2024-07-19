"use strict";
class Potion {
    constructor(color, volume) {
        this.color = color;
        this.volume = volume;
    }
    mix(potion) {
        const newColor = [
            Math.round((this.color[0] + potion.color[0]) / 2),
            Math.round((this.color[1] + potion.color[1]) / 2),
            Math.round((this.color[2] + potion.color[2]) / 2)
        ];
        const newVolume = this.volume + potion.volume;
        return new Potion(newColor, newVolume);
    }
}
const felix_felicis = new Potion([255, 255, 255], 7);
const polyjuice = new Potion([51, 102, 51], 12);
const new_potion = felix_felicis.mix(polyjuice);
console.log(new_potion.color);
console.log(new_potion.volume);
