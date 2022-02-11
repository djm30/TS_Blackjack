import {Deck} from "./Deck";
import {Player, Dealer} from "./Player"
import {Status} from "./Status"
import {MenuOption, Menu } from "./Menu"
import { GameController } from "./GameController";
import { Readline } from "./Readline";


const Main = async () : Promise<void> =>{
    let gameController : GameController = new GameController();
    gameController.player = await gameController.generateUser();
    console.log(gameController.player)
}

Main();