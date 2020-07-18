import * as PIXI from "pixi.js"

import {GameProperties} from "../../utilities/GameProperties";

import {GameStates} from "../../utilities/GameStates"

export class GameManager {
    
    private _gameStateCurrent: GameStates;
    private _gameStatePrev: GameStates;

    constructor () {

        this._gameStateCurrent = GameStates.Begin;
        this._gameStatePrev = this._gameStateCurrent;
    }

    public update(): void {

        switch (this.gameStateCurrent)
        {
            case GameStates.Begin:

                //

            break;

            case GameStates.Mid:

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

    get gameStateCurrent(): GameStates { return this._gameStateCurrent; }
    set gameStateCurrent(_value: GameStates) { 
        
        this._gameStatePrev = this.gameStateCurrent;
        this._gameStateCurrent = _value; 
        
        //- This is run when the state has been changed
        switch (_value)
        {
            case GameStates.Begin:

                //

            break;

            case GameStates.Mid:

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

    get gameStatePrev(): GameStates { return this._gameStatePrev; }
}




