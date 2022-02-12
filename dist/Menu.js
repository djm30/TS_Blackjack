"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const Readline_1 = require("./Readline");
// export interface MenuOption{
//     text: string,
//     callback : Function
// }
// export class Menu{
//     constructor(
//         public options : MenuOption[],
//         public initial? : Function,
//         public after? : Function,
//     ){}
//     public display = async () : Promise<void> => {
//         if(this.initial){
//             this.initial()
//             this.initial == undefined
//         }
//         console.log("Please choose an option from the menu below")
//         for(let i : number = 0; i < this.options.length; i++){
//             console.log(`${i+1}: ${this.options[i].text}`)
//         }
//         let choice = await this.getChoice();
//         this.options[choice-1].callback();
//     }
//     public getChoice = async () : Promise<number> => {
//         const checkInput = (numToConvert : string ) : boolean =>{
//             if(Number.parseInt(numToConvert)){
//                 let num = Number.parseInt(numToConvert)
//                 if(num >= 1 && num <= this.options.length){
//                     return true;
//                 }
//             }
//             return false;  
//         }
//         const getInput = async (message: string) : Promise<number>  =>{
//             let answer = await Readline(message  +"\n")
//             if(checkInput(answer)){
//                 return Number.parseInt(answer);
//             }
//             return 0
//         }
//         let initialAnswer = await getInput("Please make a selection");
//         if(initialAnswer){
//             return initialAnswer
//         } 
//         while(true){
//             let answer = await getInput(`Please enter a number in the range from 1 -> ${this.options.length}`)
//             if(answer){
//                 return answer
//             }
//         }
//     }
// }
class Menu {
    constructor(options) {
        this.options = options;
        this.display = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Please choose an option from the menu below");
            for (let i = 0; i < this.options.length; i++) {
                console.log(`${i + 1}: ${this.options[i]}`);
            }
            let choice = yield this.getChoice();
            return choice;
        });
        this.getChoice = () => __awaiter(this, void 0, void 0, function* () {
            const checkInput = (numToConvert) => {
                if (Number.parseInt(numToConvert)) {
                    let num = Number.parseInt(numToConvert);
                    if (num >= 1 && num <= this.options.length) {
                        return true;
                    }
                }
                return false;
            };
            const getInput = (message) => __awaiter(this, void 0, void 0, function* () {
                let answer = yield (0, Readline_1.Readline)(message + "\n");
                if (checkInput(answer)) {
                    return Number.parseInt(answer);
                }
                return 0;
            });
            let initialAnswer = yield getInput("Please make a selection");
            if (initialAnswer) {
                return initialAnswer;
            }
            while (true) {
                let answer = yield getInput(`Please enter a number in the range from 1 -> ${this.options.length}`);
                if (answer) {
                    return answer;
                }
            }
        });
    }
}
exports.Menu = Menu;
