import { GameController } from "./GameController";

const Main = async (): Promise<void> => {
    let gameController: GameController = new GameController();
    await gameController.setUp()
    gameController.startGame()
};

Main();
