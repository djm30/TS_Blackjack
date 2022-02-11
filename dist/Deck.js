"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = exports.Card = void 0;
let suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
let names = [
    { value: 11, name: "Ace" },
    { value: 2, name: "Two" },
    { value: 3, name: "Three" },
    { value: 4, name: "Four" },
    { value: 5, name: "Five" },
    { value: 6, name: "Six" },
    { value: 7, name: "7" },
    { value: 8, name: "Eight" },
    { value: 9, name: "Nine" },
    { value: 10, name: "Ten" },
    { value: 10, name: "Joker" },
    { value: 10, name: "Queen" },
    { value: 10, name: "King" },
];
class Card {
    constructor(_value, _name, _suit) {
        this._value = _value;
        this._name = _name;
        this._suit = _suit;
        this.toString = () => {
            return `${this._name} of ${this._suit}`;
        };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._name === "Ace") {
            this._value = value;
        }
        else {
            throw new Error("This card cannot have its value property changed");
        }
    }
    get name() {
        return this._name;
    }
}
exports.Card = Card;
class Deck {
    constructor(_deckSize) {
        this.createDeck = (deskSize) => {
            let singleDeck = [];
            let deck = [];
            for (let suit of suits) {
                for (let cardInfo of names) {
                    singleDeck.push(new Card(cardInfo.value, cardInfo.name, suit));
                }
            }
            for (let i = 0; i < deskSize; i++) {
                deck = deck.concat(singleDeck);
            }
            return deck;
        };
        this.shuffle = (deck) => {
            let currentIndex = deck.length;
            let randomIndex, temp;
            //While elements remain to be shuffled
            while (currentIndex !== 0) {
                //Pick a remaining element
                randomIndex = Math.floor(Math.random() * currentIndex--);
                //Swap with current element
                temp = deck[currentIndex];
                deck[currentIndex] = deck[randomIndex];
                deck[randomIndex] = temp;
            }
            return deck;
        };
        this.drawCard = () => {
            let drawn = this._deck.shift();
            if (drawn) {
                return drawn;
            }
            else {
                throw new Error("No cards left in deck!");
            }
        };
        this.toString = () => {
            return `Deck of ${this._deck.length} cards`;
        };
        this._deckSize = _deckSize;
        this._deck = this.shuffle(this.createDeck(this._deckSize));
    }
}
exports.Deck = Deck;
