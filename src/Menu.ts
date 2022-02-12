import { Readline } from "./Readline"

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


export class Menu{
    constructor(
        public options : string[],

    ){}

    public display = async () : Promise<number> => {
        console.log("Please choose an option from the menu below")
        for(let i : number = 0; i < this.options.length; i++){
            console.log(`${i+1}: ${this.options[i]}`)
        }
        let choice = await this.getChoice();
        return choice
    }

    public getChoice = async () : Promise<number> => {
        const checkInput = (numToConvert : string ) : boolean =>{
            if(Number.parseInt(numToConvert)){
                let num = Number.parseInt(numToConvert)
                if(num >= 1 && num <= this.options.length){
                    return true;
                }
            }
            return false;  
        }

        const getInput = async (message: string) : Promise<number>  =>{
            let answer = await Readline(message  +"\n")
            if(checkInput(answer)){
                return Number.parseInt(answer);
            }
            return 0
        }


        let initialAnswer = await getInput("Please make a selection");
        if(initialAnswer){
            return initialAnswer
        } 
        while(true){
            let answer = await getInput(`Please enter a number in the range from 1 -> ${this.options.length}`)
            if(answer){
                return answer
            }
        }
    }
}