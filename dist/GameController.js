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
exports.GameController = void 0;
const Player_1 = require("./Player");
const Menu_1 = require("./Menu");
const Status_1 = require("./Status");
const Deck_1 = require("./Deck");
const Config_1 = require("./Config");
const Readline_1 = require("./Readline");
//Deck declaration
let deckSize = Config_1.cfg.deckSize;
let deck = new Deck_1.Deck(deckSize);
let MainMenu = new Menu_1.Menu([
    "Hit",
    "Stand",
    "Check hand",
    "Check Dealer Hand",
    "Quit",
]);
class GameController {
    constructor() {
        this.generateUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let answer = yield (0, Readline_1.Readline)("What is your name?\n");
                return new Player_1.Player(answer);
            }
            catch (err) {
                console.log("Error");
                return new Player_1.Player("Default");
            }
        });
        this.startGame = () => __awaiter(this, void 0, void 0, function* () {
            //Welcome message
            console.log(`Welcome, ${this.player.toString()}\n`);
            //Method to add cards in game
            const drawAndAddCard = (user) => {
                let drawnCard = deck.drawCard();
                console.log(`Drew a: ${drawnCard}`);
                return user.addCard(drawnCard);
            };
            //Method to check win
            const checkWinOrLost = (user) => {
                console.log(user.getStatus());
                if (user.getStatus() == Status_1.Status.Lost) {
                    losingUser = user;
                    playGame = false;
                }
                else if (user.getStatus() == Status_1.Status.TwentyOne) {
                    winningUser = user;
                    playGame = false;
                }
            };
            //Check win
            let winningUser;
            let losingUser;
            //Player initial card draw
            console.log("Players go");
            let card1 = deck.drawCard(), card2 = deck.drawCard();
            console.log(`Drew a ${card1}\nDrew a ${card2}\n`);
            this.player.addCard(card1);
            this.player.addCard(card2);
            //Dealer initial draw
            let dealerStatus = this.dealer.initalDraw(deck.drawCard(), //First Card
            deck.drawCard() //Second Card
            );
            let playGame = true;
            //Main game loop
            while (playGame) {
                //Player choice loop
                let playerDone = false;
                while (!playerDone) {
                    switch (yield MainMenu.display()) {
                        case 1:
                            drawAndAddCard(this.player);
                            checkWinOrLost(this.player);
                            playerDone = true;
                            break;
                        case 2:
                        //Logic if player stops drawing cards - Dealer needs to keep drawing until over 16
                        case 3:
                            console.log(this.player.getHand());
                            break;
                        case 4:
                            console.log("Dealers hand:");
                            console.log(this.dealer.getHand());
                            break;
                        case 5:
                            console.log("Bye bye");
                            process.exit(0);
                    }
                }
                //Checking if dealer can go or not
                if (!winningUser && !losingUser) {
                    if (this.dealer.getStatus() !== Status_1.Status.DealerFinished) {
                        console.log("Dealers turn!");
                        dealerStatus = drawAndAddCard(this.dealer);
                    }
                    else {
                        console.log("Dealer is standing");
                    }
                    checkWinOrLost(this.dealer);
                }
                //Check win conditions here
            }
            if (winningUser) {
                if (winningUser === this.player) {
                    console.log("Player One, Congrats!");
                }
                else {
                    console.log("Dealer won, better luck next time!");
                }
            }
            else {
                if (losingUser === this.player) {
                    console.log("You lost, Better luck next time!");
                }
                else {
                    console.log("Dealer lost, Lets go!");
                }
            }
        });
        this.dealer = new Player_1.Dealer();
        this.player = new Player_1.Player("Default");
    }
}
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map