import {Card} from "./Deck";
import {Status} from "./Status"


class User{
    public cards: Card[]
    public value: number
    constructor(){
        this.cards =[]
        this.value = 0
    }

    public addCard = (card: Card) : Status => {
        if(card.name === "Ace"){
            if(this.value + 11 > 21){
                card.value = 1;
            }
        }
        this.cards.push(card);
        this.value += card.value;
        return this.getStatus()
    }

    protected getStatus = () : Status =>{
        switch(true){
            case(this.value > 21):
                return Status.Lost
            case(this.value === 21):
                return Status.TwentyOne
            default:
                return Status.Playing  
        }
    }
}

export class Player extends User{
    public name: string
    constructor(name : string){
        super()
        this.name = name
    }
}




export class Dealer extends User{

    constructor(){
        super()
    }

    public addCard = (card: Card) : Status => {
        if(this.value < 17){
            if(card.name === "Ace"){
                if(this.value + 11 > 21){
                    card.value = 1;
                }
            }
            this.cards.push(card);
            this.value += card.value;
        }
        return this.getStatus()
    }

    protected getStatus = () : Status =>{
        switch(true){
            case(this.value > 16):
                return Status.DealerFinished
            case(this.value > 21):
                return Status.Lost
            case(this.value === 21):
                return Status.TwentyOne
            default:
                return Status.Playing  
        }
    }
    

    public initalDraw = (firstCard : Card, secondCard : Card) : Status => {
        console.log(`Dealer draws: ${firstCard.toString()}`);
        this.addCard(firstCard);
        if(firstCard.value in [10,11]){
            console.log(`Dealer draws: ${secondCard.toString()}`);
        }
        this.addCard(secondCard);
        return this.getStatus();
    }
}