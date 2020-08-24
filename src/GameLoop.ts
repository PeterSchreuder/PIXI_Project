import * as PIXI from "pixi.js"

import "pixi-layers";


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

import {GameManager} from "./engine/components/GameManager";
import { GameStates } from "./utilities/GameStates";
import { Tile } from "./engine/components/gridsystem/Tile";
import { ObjectTypes, PickupTypes } from "./utilities/Enums";
import { Pickup } from "./engine/components/Pickup";

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

    private _availableTiles: Map<string, Tile>;

    private _winAmount: number;

    private _layers: {};

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

        this._availableTiles = new Map<string, Tile>();

        this._layers = {background: new PIXI.display.Group(0, true), foreground: new PIXI.display.Group(0, true), gui: new PIXI.display.Group(0, true)}
    }

    public setupGame(): void {

        this._gridSystem = new GridSystem(this.rootStage, 17, 17, 32, this);
        this._gridSystem.gridInit();

        this._gridSystem.gridGetTiles().forEach(_tile => {
            this.availableTiles.set(_tile.id, _tile);
        })

        this.gameObjects.set("player", new Player(this.rootStage, GameProperties.levelWidth / 2, GameProperties.levelHeight / 2, PIXI.Sprite.from(PIXI.Loader.shared.resources.player.texture), ObjectTypes.Player, this));
        
        this.gameManager = new GameManager(this.rootStage, this.inputManager, this);


    }

    public update(): void {
        
        let inputManager = this.inputManager;

        this.gameObjects.forEach(obj => {obj.update()});
        
        //- Typecast GameObject player to Player
        let _player = <Player>this.getGameObject("player");

        if (this.gameManager) {

            this.gameManager.update();

            switch (this.gameManager.gameStateCurrent)
            {
                case GameStates.Begin:

                    //

                break;

                case GameStates.Mid:
                    
                    //#region Move the player

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
    
                        // if (inputManager.keyUp(vk_Keys.space))
                        //     this.createRandomPickup();
                            //_player.AddBodyObject(1, _player.currentDirection);
    
                        if (_player.checkHitWall())
                            this.gameManager.gameStateCurrent = GameStates.Lose;

                        if (_player.interval != undefined && _player.interval == 0)
                        {
                            this.UpdateTiles(_player);
                        }
                    }

                break;

                case GameStates.Win:
                    
                    // Stop the player
                    _player.speed = 0;

                break;

                case GameStates.Lose:

                    // Stop the player
                    _player.speed = 0;

                break;
            }
        }

        //#endregion

        this.inputManager.keysReset();
    }

    private UpdateTiles(_player: Player) {

        let _gridSystem = this.gridSystem;
        
        let _x, _y, _listTile;
        this.getGameObjects().forEach(_obj => {

            // if (this._canDebug)
            // {
            //     console.log(_obj);
            //     this._canDebug = false;
            // }

            if (_obj && _gridSystem)
            {
                _x = Math.floor(_obj.x / 32);
                _y = Math.floor(_obj.y / 32);

                _listTile = _gridSystem.gridGetTile(_x, _y);
    
                if (_listTile)
                {
                    // Check what kind of tile it is
                    if (_obj == _player)
                    {
                        //
                        let _occupier = _listTile.occupier;
                        if (_occupier && _occupier != _player)
                        {
                            // Check what the player collided with
                            switch (_occupier.type)
                            {
                                case ObjectTypes.Body:// Body is Gameover

                                    if (this.gameManager)
                                        this.gameManager.gameStateCurrent = GameStates.Lose;
                                    
                                    return;

                                break;

                                case ObjectTypes.Pickup:// Grow player

                                    let _pickup = <Pickup>_occupier;
                                    // Place the pickup outside the level
                                    _pickup.x = GameProperties.levelWidth + 20;
                                    _pickup.x = GameProperties.levelHeight + 20;

                                    switch (_pickup.pickupType)
                                    {
                                        case PickupTypes.LengthIncrease:

                                            // If there is no space left, the player has won
                                            if (this.availableTiles.size == 0)
                                            {
                                                if (this.gameManager)
                                                    this.gameManager.gameStateCurrent = GameStates.Lose;
                                            }
                                            else// Create a new pickup
                                            {
                                                _player.AddBodyObject(1);
                                                this.createRandomPickup();
                                            }
                                            

                                        break;
                                    }
                                    
                                    return;

                                break;
                            }
                        }
                    }


                    // Erase this _obj from its previous tile
                    if (_obj.tile)
                    {
                        _obj.tile.occupier = null;
                        this.availableTiles.set(_obj.tile.id, _obj.tile);//
                    }


                    // Add each other
                    _obj.tile = _listTile;
                    _listTile.occupier = _obj;

                    // Remove Tile from the list
                    let _id = _listTile.id;
                    let _index = this.availableTiles.has(_id);

                    if (_index != undefined)
                    {
                        this.availableTiles.delete(_id);
                    }
                }
            }
        });

        // if (this._canDebug)
        // {
        //     let _i = 0;
        //     _gridSystem.gridGetTiles().forEach(_tile => {if (_tile.occupier != null) _i++; });
        //     console.log("Amount", _i)
        //     this._canDebug = false;
        // }
    }

    public createRandomPickup() {

        let _size = this.availableTiles.size;

        if (_size > 0)
        {
            let _array = new Array<Tile>();
            this.availableTiles.forEach(_tile => {

                _array.push(_tile);
            });

            let _index = Math.round(Math.random() * _array.length);

            let _tile = _array[_index];

            if (_tile)
            {
                let _pickUp;

                //- If a pickup does not exits, create it
                if (!this.gameObjects.has("Pickup"))
                {
                    _pickUp = new Pickup(this.rootStage, _tile.gridArrayX, _tile.gridArrayY, PIXI.Sprite.from(PIXI.Loader.shared.resources.pickup.texture), ObjectTypes.Pickup, PickupTypes.LengthIncrease);
                    this.gameObjects.set("Pickup", _pickUp);
                }
                else//- Place the current one on the new position
                {
                    _pickUp = <Pickup>this.gameObjects.get("Pickup");
                    _pickUp.x = _tile.gridArrayX;
                    _pickUp.y = _tile.gridArrayY;
                }
            }
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

    get availableTiles(): Map<string, Tile> { return this._availableTiles; };
}