interface nameType  {
    value : number,
    name : string
}

let suits : string[] = ["Hearts", "Clubs", "Spades", "Diamonds"]
let names : nameType[] = [
    {value : 11, name: "Ace"},
    {value : 2, name: "Two"},
    {value : 3, name: "Three"},
    {value : 4, name: "Four"},
    {value : 5, name: "Five"},
    {value : 6, name: "Six"},
    {value : 7, name: "7"},
    {value : 8, name: "Eight"},
    {value : 9, name: "Nine"},
    {value : 10, name: "Ten"},
    {value : 10, name: "Joker"},
    {value : 10, name: "Queen"},
    {value : 10, name: "King"},
]



export class Card {
    constructor(
        private _value : number,
        private _name : string,
        private _suit : string
    ){}

    public toString = () : string =>{
        return `${this._name} of ${this._suit}`
    }

    get value() : number{
        return this._value;
    }

    set value(value : number) {
        if (this._name === "Ace"){
            this._value = value
        }
        else{
            throw new Error("This card cannot have its value property changed")
        }
    }

    get name() : string {
        return this._name;
    }
}

export class Deck {
    private _deck : Card[]
    private _deckSize : number

    constructor(_deckSize : number){
        this._deckSize = _deckSize
        this._deck = this.shuffle(this.createDeck(this._deckSize));
    }

    private createDeck = (deskSize : number) : Card[] => {
        let singleDeck : Card[] = [];
        let deck : Card[]  = [];
        for(let suit of suits){
            for(let cardInfo of names){
                singleDeck.push(new Card(cardInfo.value, cardInfo.name, suit));
            }
        }
        for(let i : number = 0;  i < deskSize; i++){
            deck = deck.concat(singleDeck);
        }
        return deck;
    }

    private shuffle = (deck : Card[]) : Card[] => {
        let currentIndex = deck.length;
        let randomIndex : number, temp: Card;

        //While elements remain to be shuffled
        while(currentIndex !== 0){
            //Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex--);

            //Swap with current element
            temp = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temp
        }
        return deck;
    }

    public drawCard = () : Card => {
        let drawn = this._deck.shift()
        if(drawn){
            return drawn;
        }
        else{
            throw new Error("No cards left in deck!");
        }
    }

    public toString = () : string => {
        return `Deck of ${this._deck.length} cards`;
    }
}
