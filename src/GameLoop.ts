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

import {vk_Keys} from "./utilities/VirtualKeyboard"

export class GameLoop implements UpdateableElement {

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    //private readonly gameManager: GameManager;
    private rootStage: PIXI.Container;
    public fps: number;

    public inputManager: InputManager;
    private textManager: TextManager;

    private gridSystem: GridSystem;

    private gameObjects = new Map<string, GameObject | Player>();

    constructor (rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {

        this.renderer = rendered;
        //this.gameManager = new GameManager();
        this.rootStage = new PIXI.Container();
        this.fps = 0;

        this.inputManager = new InputManager(document.querySelector("#display"), document.querySelector("#display"), this.renderer);
        this.textManager = new TextManager(this.rootStage);
    }

    public setupGame(): void {

        this.gridSystem = new GridSystem(this.rootStage, 17, 17, 32);
        this.gridSystem.gridInit();

        //this.gridSystem.gridGetTile(5,5).x += 5

        this.gameObjects.set("player", new Player(this.rootStage, GameProperties.levelWidth / 2, GameProperties.levelHeight / 2, PIXI.Sprite.from(PIXI.loader.resources.player.texture)));
        
        //this.gameObjects.set("player2", new Player(this.rootStage, GameProperties.levelWidth / 2, GameProperties.levelHeight / 2, PIXI.Sprite.from(PIXI.loader.resources.player.texture)));
        this.textManager.CreateText(5, 5, "Test text", {
            fill: "#ffa200",
            fontSize: 20,
            lineJoin: "round",
            strokeThickness: 5
        });
    }

    public update(): void {

        this.gameObjects.forEach(obj => {obj.update()});
        
        let inputManager = this.inputManager;
        
        //#region Move the player
        let _player = this.getGameObject("player");
        //let _player2 = this.getGameObject("player2");
        
        let _direction = undefined;
        if (inputManager.keyDown(vk_Keys.a) || inputManager.keyDown(vk_Keys.left)) _direction = 180;
        if (inputManager.keyDown(vk_Keys.d) || inputManager.keyDown(vk_Keys.right)) _direction = 0;
        if (inputManager.keyDown(vk_Keys.w) || inputManager.keyDown(vk_Keys.up)) _direction = 270;
        if (inputManager.keyDown(vk_Keys.s) || inputManager.keyDown(vk_Keys.down)) _direction = 90;

        if (_direction != undefined)
        {
            _player.nextDirection = _direction;
            _player.speed = 2;
        }
            

        // let speed = 5, hsp = 0, vsp = 0;
        // if (inputManager.keyDown(vk_Keys.a) || inputManager.keyDown(vk_Keys.left)) hsp = -1;
        // if (inputManager.keyDown(vk_Keys.d) || inputManager.keyDown(vk_Keys.right)) hsp = 1;
        // if (inputManager.keyDown(vk_Keys.w) || inputManager.keyDown(vk_Keys.up)) vsp = -1;
        // if (inputManager.keyDown(vk_Keys.s) || inputManager.keyDown(vk_Keys.down)) vsp = 1;
        
        // hsp *= speed;
        // vsp *= speed;
        
        // _player.x += hsp;
        // _player.y += vsp;

        // if (CollisionWithObject.collision(_player, _player2))
        // {
        //     console.log(1111111);
        // }

        //console.log(_player.x);
        // _player.rotation = this.usefullFunctions.lookTowardPoint(_player.x, _player.y, inputManager.mouseX(), inputManager.mouseY());
        // _player.rotation += 0.01;
        // _player.rotation = 6.25
        //console.log(_player.rotation)
        //console.log(this.renderer.plugins.interaction.mouse.global.x);

        //#endregion
    }

    public render(): void {
        //let rootStage = new PIXI.Container();

        // ([
        //     this.gameManager,
        // ] as Array<RenderableElement>)
        //     .map(element => element.getStage())
        //     .forEach(stage => rootStage.addChild(stage));

        this.renderer.render(this.rootStage);
    }

    public getGameObject(object: string): GameObject | Player | undefined {

        let _return = undefined;

        if (this.gameObjects.has(object))
            _return = this.gameObjects.get(object);

        return _return;
    }

    public getInputManager(): InputManager {
        console.log(this.inputManager)
        return this.inputManager;

    }
}