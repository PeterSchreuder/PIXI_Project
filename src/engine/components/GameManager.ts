import * as PIXI from "pixi.js"

import {GameProperties} from "../../utilities/GameProperties";
import { TextManager } from "./TextManager";

import {GameStates} from "../../utilities/GameStates";
import { InputManager } from "./InputManager";
import { vk_Keys } from "../../utilities/VirtualKeyboard";

export class GameManager {
    
    private _gameStateCurrent: GameStates;
    private _gameStatePrev: GameStates;

    private textManager: TextManager;
    private _stage: PIXI.Container;

    private inputManager: InputManager;

    constructor (_stage: PIXI.Container, _inputManager: InputManager) {

        this._stage = _stage;
        this.inputManager = _inputManager;

        this._gameStateCurrent = GameStates.Begin;
        this._gameStatePrev = this._gameStateCurrent;

        this.textManager = new TextManager(_stage);

        this.gameStateCurrent = GameStates.Begin;
    }

    get gameStateCurrent(): GameStates { return this._gameStateCurrent; }
    set gameStateCurrent(_value: GameStates) { 
        
        this._gameStatePrev = this.gameStateCurrent;
        this._gameStateCurrent = _value; 
        let _midText;

        //- This is run once when the state has been changed
        switch (_value)
        {
            case GameStates.Begin:

                this.resetGame();

                //
                this.textManager.CreateText("Screen Text", 5, 5, "Begin Screen", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

                _midText = this.textManager.CreateText("Mid Text", GameProperties.levelMidX, GameProperties.levelMidY + 100, "Press Enter to Start", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5,
                    align: "center",
                });
                _midText.anchor.set(0.5);

            break;

            case GameStates.Mid:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Screen Text", 5, 5, "Mid Screen", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

            break;

            case GameStates.Win:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Screen Text", 5, 5, "Win Screen", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

                _midText = this.textManager.CreateText("Mid Text", GameProperties.levelMidX, GameProperties.levelMidY + 100, "You've Won!\nPress Enter to play again", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5,
                    align: "center",
                });
                _midText.anchor.set(0.5);

            break;

            case GameStates.Lose:

                this.textManager.textDisableAll();

                this.textManager.CreateText("Screen Text", 5, 5, "Lose Screen", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5
                });

                _midText = this.textManager.CreateText("Mid Text", GameProperties.levelMidX, GameProperties.levelMidY + 100, "Game Over\nPress Enter to Restart", {
                    fill: "#ffa200",
                    fontSize: 20,
                    lineJoin: "round",
                    strokeThickness: 5,
                    align: "center",
                });
                _midText.anchor.set(0.5);

            break;
        }
    }

    public update(): void {

        switch (this.gameStateCurrent)
        {
            case GameStates.Begin:
                

                if (this.inputManager.keyDown(vk_Keys.enter))
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

                if (this.inputManager.keyDown(vk_Keys.enter))
                    this.gameStateCurrent = GameStates.Begin;

            break;
        }
    }

    private resetGame() {

        this.textManager.textDisableAll();
    }

    get gameStatePrev(): GameStates { return this._gameStatePrev; }
}


