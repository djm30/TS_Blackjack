import {Player, Dealer} from "./Player"
import { MenuOption, Menu } from "./Menu"
import {Status} from  "./Status"
import { Color } from "colors"
import {Deck, Card} from  "./Deck"
import {cfg} from "./Config" 
import {Readline} from "./Readline"

//Deck declaration
let deckSize = cfg.deckSize;
let deck : Deck = new Deck(deckSize);



  //Main Menu declaration
let MainMenu : Menu 


export class GameController{
    public player : Player
    public dealer : Dealer
    constructor(){
        this.dealer = new Dealer()
        this.player = new Player("Default")
    }


    public  generateUser = async () : Promise<Player> =>{
        try{
            let answer  = await Readline("What is your name?\n");
            return new Player(answer);
            
        }catch(err){
            console.log("Error")
            return new Player("Default");
        }
    }


    public startGame = () : void => {
        this.dealer.initalDraw(deck.drawCard(), deck.drawCard())
        }
    }
    

