import * as PIXI from "pixi.js"


//import {GameManager} from "./engine/components/GameManager";
//import {RenderableElement} from "./utilities/RenderableElement";
import { GameObject } from "./engine/components/GameObject";
import { Player } from "./engine/components/Player";

import { InputManager } from "./engine/components/InputManager";
import { TextManager } from "./engine/components/TextManager";

import { GameProperties } from "./utilities/GameProperties"
import { UpdateableElement } from "./utilities/UpdateableElement";
import { GridSystem } from "./engine/components/gridsystem/GridSystem";

import { CollisionWithObject } from "./utilities/CollisionWithSprite";

import {vk_Keys} from "./utilities/VirtualKeyboard";

import {GameManager} from "./engine/components/GameManager"
import { GameStates } from "./utilities/GameStates";

export class GameLoop implements UpdateableElement {

    private readonly renderer: PIXI.Application;
    
    private gameManager: GameManager | undefined;

    private rootStage: PIXI.Container;
    private stages: {background: PIXI.Container, playingfield: PIXI.Container, gui: PIXI.Container};

    public fps: number;
    
    
    public inputManager: InputManager;
    private textManager: TextManager;

    private _gridSystem: GridSystem | undefined;

    private gameObjects = new Map<string, GameObject | Player>();

    private _canDebug: boolean;

    //public systemAssets: {stage: PIXI.Container | undefined, inputManager: InputManager | undefined, textManager: TextManager | undefined, gameObjects: Map<string, GameObject | Player>};

    constructor (rendered: PIXI.Application) {

        this.renderer = rendered;
        this.rootStage = new PIXI.Container();

        //this.gameManager: GameManager;

        this.stages = {background: new PIXI.Container(), playingfield: new PIXI.Container(), gui: new PIXI.Container()};

        this.fps = 0;

        this.inputManager = new InputManager(document.querySelector("#display"), this.renderer);
        this.textManager = new TextManager(this.rootStage);

        this.textManager.CreateText("FPS", 10, 5, this.renderer.ticker.FPS.toString(), {
            fill: "#32CD32",
            fontSize: 15,
            lineJoin: "round",
            strokeThickness: 1,
            align: "right",
        });

        this._canDebug = true;

    }

    public setupGame(): void {

        this._gridSystem = new GridSystem(this.rootStage, 17, 17, 32, this);
        this._gridSystem.gridInit();

        //this._gridSystem.gridGetTile(5,5).x += 5

        this.gameObjects.set("player", new Player(this.rootStage, GameProperties.levelWidth / 2, GameProperties.levelHeight / 2, PIXI.Sprite.from(PIXI.Loader.shared.resources.player.texture), this));
        
        //this.gameObjects.set("player2", new Player(this.rootStage, GameProperties.levelWidth / 2, GameProperties.levelHeight / 2, PIXI.Sprite.from(PIXI.loader.resources.player.texture)));
        
        this.gameManager = new GameManager(this.rootStage, this.inputManager);
        
    }

    public update(): void {
        
        let inputManager = this.inputManager;

        this.gameObjects.forEach(obj => {obj.update()});
        
        if (this.gameManager) {

            this.gameManager.update();
            
            

            switch (this.gameManager.gameStateCurrent)
            {
                case GameStates.Begin:


                    //
                    

                break;

                case GameStates.Mid:
                    
                    //#region Move the player
                    let _player = this.getGameObject("player");
                    
                    if (_player) {

                        let _direction = undefined;
                        if (inputManager.keyDown(vk_Keys.a) || inputManager.keyDown(vk_Keys.left)) _direction = 180;
                        if (inputManager.keyDown(vk_Keys.d) || inputManager.keyDown(vk_Keys.right)) _direction = 0.0001;
                        if (inputManager.keyDown(vk_Keys.w) || inputManager.keyDown(vk_Keys.up)) _direction = 270;
                        if (inputManager.keyDown(vk_Keys.s) || inputManager.keyDown(vk_Keys.down)) _direction = 90;
    
                        if (_direction != undefined)
                        {
                            _player.nextDirection = _direction;
                            _player.speed = 15;
                        }
    
                        if (inputManager.keyUp(vk_Keys.space))
                            this._canDebug = true;
                            //_player.AddBodyObject(1, _player.currentDirection);
    
                        if (_player.checkHitWall())
                            this.gameManager.gameStateCurrent = GameStates.Lose;

                        if (_player.interval != undefined && _player.interval == 0)
                        {
                            this.UpdateTiles();
                        }
                    }

                    

                    // for (let _x = 0; _x < this.gameObjects.size; _x++) {

                    //     let _obj = this.gameObjects.get(this.gameObjects.)
                    //     if ()
                    // }

                break;

                case GameStates.Win:

                    //

                break;

                case GameStates.Lose:

                    //

                break;
            }
        }

        //#endregion

        this.inputManager.keysReset();
    }

    private UpdateTiles() {

        let _gridSystem = this.gridSystem;
        
        let _x, _y, _tile;
        this.getGameObjects().forEach(_obj => {

            if (this._canDebug)
            {
                console.log(_obj);
            }

            if (_obj && _gridSystem)
            {
                _x = Math.floor(_obj.x / 32);
                _y = Math.floor(_obj.y / 32);

                _tile = _gridSystem.gridGetTile(_x, _y);
    
                if (_tile)
                {
                    //console.log(_tile);
                    if (_obj.tile)
                    {
                        _obj.tile.occupier = null;
                    }

                    _obj.tile = _tile;
                    _tile.occupier = _obj;
                }
            }
        });

        if (this._canDebug)
        {
            let _i = 0;
            _gridSystem.gridGetTiles().forEach(_tile => {if (_tile.occupier != null) _i++; });
            console.log("Amount", _i)
            this._canDebug = false;
        }
        
    }

    public render(): void {

        this.renderer.renderer.render(this.rootStage);
    }

    public addGameObject(_object: GameObject) {
        this.gameObjects.set(this.gameObjects.size.toString(), _object);
    }

    public getGameObject(object: string): GameObject | Player | undefined {

        let _return = undefined;

        if (this.gameObjects.has(object))
            _return = this.gameObjects.get(object);

        return _return;
    }

    public getGameObjects(): Map<string, GameObject | Player | undefined>{
        return this.gameObjects;
    }

    public getGameObjectOnPosition(_position: Array<number>): GameObject | Player | undefined{
        let _return = undefined;

        this.gameObjects.forEach(_obj => {
            if (_obj.x == _position[0] && _obj.x == _position[1]) {
                console.log(_obj)
                _return = _obj;
            }
        });
        
        return _return;
    }

    get gridSystem(): GridSystem | undefined { return this._gridSystem; }

    // public getGridSystem(): GridSystem | undefined {
    //     return this._gridSystem;
    // }
    
    public getInputManager(): InputManager {
        console.log(this.inputManager)
        return this.inputManager;
    }

    public getStage(): PIXI.Container {
        return this.rootStage;
    }
}