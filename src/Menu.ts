export interface MenuOption{
    text: string,
    callback : Function
}

export class Menu{
    constructor(
        public options : MenuOption[]
    ){}

    public display = () : void => {
        console.log("Please choose an option from the menu below")
        for(let i : number = 0; i <= this.options.length; i++){
            console.log(`${i}: ${this.options}`)
        }
    }

    public getChoice = () : void => {

    }
}