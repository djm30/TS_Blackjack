"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dealer = exports.Player = void 0;
const Status_1 = require("./Status");
class User {
    constructor() {
        this.addCard = (card) => {
            if (card.name === "Ace") {
                if (this.value + 11 > 21) {
                    card.value = 1;
                }
            }
            this.cards.push(card);
            this.value += card.value;
            return this.getStatus();
        };
        this.getStatus = () => {
            switch (true) {
                case (this.value > 21):
                    return Status_1.Status.Lost;
                case (this.value === 21):
                    return Status_1.Status.TwentyOne;
                default:
                    return Status_1.Status.Playing;
            }
        };
        this.cards = [];
        this.value = 0;
    }
}
class Player extends User {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Player = Player;
class Dealer extends User {
    constructor() {
        super();
        this.addCard = (card) => {
            if (this.value < 17) {
                if (card.name === "Ace") {
                    if (this.value + 11 > 21) {
                        card.value = 1;
                    }
                }
                this.cards.push(card);
                this.value += card.value;
            }
            return this.getStatus();
        };
        this.getStatus = () => {
            switch (true) {
                case (this.value > 16):
                    return Status_1.Status.DealerFinished;
                case (this.value > 21):
                    return Status_1.Status.Lost;
                case (this.value === 21):
                    return Status_1.Status.TwentyOne;
                default:
                    return Status_1.Status.Playing;
            }
        };
        this.initalDraw = (firstCard, secondCard) => {
            console.log(`Dealer draws: ${firstCard.toString()}`);
            this.addCard(firstCard);
            if (firstCard.value in [10, 11]) {
                console.log(`Dealer draws: ${secondCard.toString()}`);
            }
            this.addCard(secondCard);
            return this.getStatus();
        };
    }
}
exports.Dealer = Dealer;