"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
class Menu {
    constructor(options) {
        this.options = options;
        this.display = () => {
            console.log("Please choose an option from the menu below");
            for (let i = 0; i <= this.options.length; i++) {
                console.log(`${i}: ${this.options}`);
            }
        };
        this.getChoice = () => {
        };
    }
}
exports.Menu = Menu;
