import { Player, Dealer } from "./Player";
import { Menu } from "./Menu";
import { Status } from "./Status";
import { Deck, Card } from "./Deck";
import { cfg } from "./Config";
import { Readline } from "./Readline";

//Deck declaration
let deckSize = cfg.deckSize;
let deck: Deck = new Deck(deckSize);

let MainMenu: Menu = new Menu([
    "Draw Card",
    "Check hand",
    "Stop drawing",
    "Quit",
]);
export class GameController {
    public player: Player;
    public dealer: Dealer;
    constructor() {
        this.dealer = new Dealer();
        this.player = new Player("Default");
    }

    public generateUser = async (): Promise<Player> => {
        try {
            let answer = await Readline("What is your name?\n");
            return new Player(answer);
        } catch (err) {
            console.log("Error");
            return new Player("Default");
        }
    };

    public startGame = async (): Promise<void> => {
        console.log(`Welcome, ${this.player.toString()}`);
        let dealerStatus = this.dealer.initalDraw(
            deck.drawCard(), //First Card
            deck.drawCard() //Second Card
        );
        let playerStatus: Status;

        let playGame: boolean = true;
        while (playGame) {
            switch (await MainMenu.display()) {
                case 1:
                    let drawnCard: Card = deck.drawCard();
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
    };
}
