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
const Deck_1 = require("./Deck");
const Config_1 = require("./Config");
const Readline_1 = require("./Readline");
//Deck declaration
let deckSize = Config_1.cfg.deckSize;
let deck = new Deck_1.Deck(deckSize);
let MainMenu = new Menu_1.Menu([
    "Draw Card",
    "Check hand",
    "Stop drawing",
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
            console.log(`Welcome, ${this.player.toString()}`);
            let dealerStatus = this.dealer.initalDraw(deck.drawCard(), //First Card
            deck.drawCard() //Second Card
            );
            let playerStatus;
            let playGame = true;
            while (playGame) {
                switch (yield MainMenu.display()) {
                    case 1:
                        let drawnCard = deck.drawCard();
                        console.log(`Drew a: ${drawnCard}`);
                        playerStatus = this.player.addCard(drawnCard);
                    case 2:
                        console.log(this.player.getHand());
                        break;
                    case 3:
                    //Logic if player stops drawing cards - Dealer needs to keep drawing until over 16
                    case 4:
                        console.log("Bye bye");
                        process.exit(0);
                }
                //Check win conditions here
                if (!this.dealer.getStatus()) {
                    this.dealer.addCard(deck.drawCard());
                }
            }
        });
        this.dealer = new Player_1.Dealer();
        this.player = new Player_1.Player("Default");
    }
}
exports.GameController = GameController;
