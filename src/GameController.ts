import { User, Player, Dealer } from "./Player";
import { Menu } from "./Menu";
import { Status } from "./Status";
import { Deck, Card } from "./Deck";
import { cfg } from "./Config";
import { Readline } from "./Readline";
import { wait } from "./Wait"

//Deck declaration
let deckSize = cfg.deckSize;
let deck: Deck = new Deck(deckSize);

let MainMenu: Menu = new Menu([
    "Hit",
    "Stand",
    "Check hand",
    "Quit",
]);


export class GameController {
    private player: Player;
    private dealer: Dealer;
    private winner: User;
    constructor() {
    }

    public async setUp() {
        this.dealer = new Dealer();
        this.player = await this.generateUser();
    }

    private generateUser = async (): Promise<Player> => {
        try {
            let answer = await Readline("What is your name?\n");
            return new Player(answer);
        } catch (err) {
            console.log("Error");
            return new Player("Default");
        }
    };


    private initalCardDraws = (): void => {
        console.log(`Welcome ${this.player.toString()}!`)

        //Dealer initial draw
        console.log("Dealers turn to go")
        this.dealer.initalDraw(deck.drawCard(), deck.drawCard())

        console.log("\nPlayers turn to draw")
        this.player.initalDraw(deck.drawCard(), deck.drawCard())
        console.log(`Value: ${this.player.value}\n`)

    }

    private playerLoop = async (): Promise<Status> => {
        let playerDone: boolean = false;
        while (!playerDone) {
            switch (await MainMenu.display()) {
                case 1:
                    //Add card
                    let cardToAdd = deck.drawCard();
                    this.player.addCard(cardToAdd);
                    console.log(`\n${this.player.name} draws: ${cardToAdd.toString()}`)
                    console.log(`Value: ${this.player.value}\n`)
                    break;
                case 2:
                    //Stand
                    console.log("Current hand:")
                    console.log(this.player.getHand())
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
        return this.player.getStatus()
    }

    private dealerLoop = async (): Promise<Status> => {
        //Print dealer initial hand
        console.log("Dealer is going now!\nDealers hand:");
        console.log(this.dealer.getHand())

        let dealerDone: boolean = false;
        while (!dealerDone) {
            await wait(2000);
            let cardToAdd = deck.drawCard();
            let status = this.dealer.addCard(cardToAdd);
            console.log(`Dealer drew: ${cardToAdd.toString()}`)
            console.log(`Value: ${this.dealer.value}\n`)

            if (status !== Status.Playing) {
                dealerDone = true
            }
        }
        console.log("Dealer finished!")
        return this.dealer.getStatus()
    }

    private checkPlayerWin = (player: Player): string => {
        if (player.getStatus() === Status.Lost) {
            return `Sorry, ${player.name}, better luck next time!`;
        }
        return ""
    }

    private finalComparison = (): string => {
        return "Hi there gamers!"
    }

    public startGame = async (): Promise<void> => {
        this.initalCardDraws();
        console.log(await this.playerLoop())
        let message = this.checkPlayerWin(this.player)
        if (!message) {
            await this.dealerLoop()
            console.log(this.finalComparison())
        } else {
            console.log(message);
        }
        await Readline("Press enter to exit...");
    }

}