import * as PIXI from "pixi.js"

import {GameProperties} from "../../utilities/GameProperties";
import { TextManager } from "./TextManager";

import {GameStates} from "../../utilities/GameStates"

export class GameManager {
    
    private _gameStateCurrent: GameStates;
    private _gameStatePrev: GameStates;

    private textManager: TextManager;
    private _stage: PIXI.Container;

    constructor (_stage: PIXI.Container) {

        this._stage = _stage;

        this._gameStateCurrent = GameStates.Begin;
        this._gameStatePrev = this._gameStateCurrent;

        

        this.textManager = new TextManager(_stage);

        this.gameStateCurrent = GameStates.Begin;
    }

    get gameStateCurrent(): GameStates { return this._gameStateCurrent; }
    set gameStateCurrent(_value: GameStates) { 
        
        this._gameStatePrev = this.gameStateCurrent;
        this._gameStateCurrent = _value; 
        
        //- This is run once when the state has been changed
        switch (_value)
        {
            case GameStates.Begin:

                this.resetGame();
                
                console.log(11111111)
                //
                this.textManager.CreateText("Scene Text", 5, 5, "Test text", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

            break;

            case GameStates.Mid:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Scene Text", 5, 5, "Mid Game", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

            break;

            case GameStates.Win:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Scene Text", 5, 5, "Win Game", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

            break;

            case GameStates.Lose:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Scene Text", 5, 5, "Lose Game", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

            break;
        }
    }

    public update(): void {

        switch (this.gameStateCurrent)
        {
            case GameStates.Begin:
                

                this.gameStateCurrent = GameStates.Mid;

            break;

            case GameStates.Mid:
                //this.textManager.textDisableAll();

                //

            break;

            case GameStates.Win:

                //

            break;

            case GameStates.Lose:

                //

            break;
        }
    }

    private resetGame() {

        this.textManager.textDisableAll();
    }

    get gameStatePrev(): GameStates { return this._gameStatePrev; }
}




