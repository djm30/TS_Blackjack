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
const Deck_1 = require("./Deck");
const Config_1 = require("./Config");
const Readline_1 = require("./Readline");
//Deck declaration
let deckSize = Config_1.cfg.deckSize;
let deck = new Deck_1.Deck(deckSize);
//Main Menu declaration
let MainMenu;
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
        this.startGame = () => {
            this.dealer.initalDraw(deck.drawCard(), deck.drawCard());
        };
        this.dealer = new Player_1.Dealer();
        this.player = new Player_1.Player("Default");
    }
}
exports.GameController = GameController;
