import { User, Player, Dealer } from "./Player";
import { Menu } from "./Menu";
import { Status } from "./Status";
import { Deck, Card } from "./Deck";
import { cfg } from "./Config";
import { Readline } from "./Readline";

//Deck declaration
let deckSize = cfg.deckSize;
let deck: Deck = new Deck(deckSize);

let MainMenu: Menu = new Menu([
    "Hit",
    "Stand",
    "Check hand",
    "Check Dealer Hand",
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
        //Welcome message
        console.log(`Welcome, ${this.player.toString()}\n`);

        //Method to add cards in game
        const drawAndAddCard = (user: User): Status => {
            let drawnCard: Card = deck.drawCard();
            console.log(`Drew a: ${drawnCard}`);
            return user.addCard(drawnCard);
        };

        //Method to check win
        const checkWinOrLost = (user: User): void => {
            console.log(user.getStatus());
            if (user.getStatus() == Status.Lost) {
                losingUser = user;
                playGame = false;
            } else if (user.getStatus() == Status.TwentyOne) {
                winningUser = user;
                playGame = false;
            }
        };

        //Check win
        let winningUser: User | undefined;
        let losingUser: User | undefined;

        //Player initial card draw
        console.log("Players go");
        let card1: Card = deck.drawCard(),
            card2: Card = deck.drawCard();
        console.log(`Drew a ${card1}\nDrew a ${card2}\n`);
        this.player.addCard(card1);
        this.player.addCard(card2);

        //Dealer initial draw
        let dealerStatus = this.dealer.initalDraw(
            deck.drawCard(), //First Card
            deck.drawCard() //Second Card
        );

        let playGame: boolean = true;

        //Main game loop
        while (playGame) {
            //Player choice loop
            let playerDone: boolean = false;
            while (!playerDone) {
                switch (await MainMenu.display()) {
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
                if (this.dealer.getStatus() !== Status.DealerFinished) {
                    console.log("Dealers turn!");
                    dealerStatus = drawAndAddCard(this.dealer);
                } else {
                    console.log("Dealer is standing");
                }
                checkWinOrLost(this.dealer);
            }
            //Check win conditions here
        }
        if (winningUser) {
            if (winningUser === this.player) {
                console.log("Player One, Congrats!");
            } else {
                console.log("Dealer won, better luck next time!");
            }
        } else {
            if (losingUser === this.player) {
                console.log("You lost, Better luck next time!");
            } else {
                console.log("Dealer lost, Lets go!");
            }
        }
    };
}
