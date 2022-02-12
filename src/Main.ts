import { GameController } from "./GameController";

const Main = async (): Promise<void> => {
    let gameController: GameController = new GameController();
    gameController.player = await gameController.generateUser();
    gameController.startGame();
};

Main();
