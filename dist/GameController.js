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
const Wait_1 = require("./Wait");
//Deck declaration
let deckSize = Config_1.cfg.deckSize;
let deck = new Deck_1.Deck(deckSize);
let MainMenu = new Menu_1.Menu([
    "Hit",
    "Stand",
    "Check hand",
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
        this.initalCardDraws = () => {
            console.log(`Welcome ${this.player.toString()}!`);
            //Dealer initial draw
            console.log("Dealers turn to go");
            this.dealer.initalDraw(deck.drawCard(), deck.drawCard());
            console.log("\nPlayers turn to draw");
            this.player.initalDraw(deck.drawCard(), deck.drawCard());
            console.log(`Value: ${this.player.value}\n`);
        };
        this.playerLoop = () => __awaiter(this, void 0, void 0, function* () {
            let playerDone = false;
            while (!playerDone) {
                switch (yield MainMenu.display()) {
                    case 1:
                        //Add card
                        let cardToAdd = deck.drawCard();
                        this.player.addCard(cardToAdd);
                        console.log(`\n${this.player.name} draws: ${cardToAdd.toString()}`);
                        console.log(`Value: ${this.player.value}\n`);
                        break;
                    case 2:
                        //Stand
                        console.log("Current hand:");
                        console.log(this.player.getHand());
                        playerDone = true;
                    case 3:
                        //Player views own cards
                        console.log(this.player.getHand());
                        break;
                    case 4:
                        console.log("Bye bye");
                        process.exit(0);
                }
                if (this.player.value >= 21) {
                    playerDone = true;
                }
            }
            return this.player.getStatus();
        });
        this.dealerLoop = () => __awaiter(this, void 0, void 0, function* () {
            //Print dealer initial hand
            console.log("Dealer is going now!\nDealers hand:");
            console.log(this.dealer.getHand());
            let dealerDone = false;
            while (!dealerDone) {
                yield (0, Wait_1.wait)(2000);
                let cardToAdd = deck.drawCard();
                let status = this.dealer.addCard(cardToAdd);
                console.log(`Dealer drew: ${cardToAdd.toString()}`);
                console.log(`Value: ${this.dealer.value}\n`);
                if (status !== Status_1.Status.Playing) {
                    dealerDone = true;
                }
            }
            console.log("Dealer finished!");
            return this.dealer.getStatus();
        });
        this.checkPlayerWin = (player) => {
            if (player.getStatus() === Status_1.Status.Lost) {
                return `Sorry, ${player.name}, better luck next time!`;
            }
            return "";
        };
        this.finalComparison = () => {
            return "Hi there gamers!";
        };
        this.startGame = () => __awaiter(this, void 0, void 0, function* () {
            this.initalCardDraws();
            console.log(yield this.playerLoop());
            let message = this.checkPlayerWin(this.player);
            if (!message) {
                yield this.dealerLoop();
                console.log(this.finalComparison());
            }
            else {
                console.log(message);
            }
            yield (0, Readline_1.Readline)("Press enter to exit...");
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dealer = new Player_1.Dealer();
            this.player = yield this.generateUser();
        });
    }
}
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map