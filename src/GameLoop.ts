import * as PIXI from "pixi.js"


//import {GameManager} from "./engine/components/GameManager";
//import {RenderableElement} from "./utilities/RenderableElement";
import { GameObject } from "./engine/components/GameObject";
import { InputManager } from "./engine/components/InputManager";

export class GameLoop {

    private vk_Keys = InputManager.vk_Keys;

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    //private readonly gameManager: GameManager;
    private rootStage: PIXI.Container;
    public fps: number;
    private inputManager = new InputManager(document.querySelector("#mouseInput"), document.querySelector("#keyboardInput"));

    private gameObjects = new Map<string, GameObject>();

    constructor (rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {

        this.renderer = rendered;
        //this.gameManager = new GameManager();
        this.rootStage = new PIXI.Container();
        this.fps = 0;

    }

    public setupGame(): void {

        this.gameObjects.set("player", new GameObject(this.rootStage, 0, 0, PIXI.Sprite.from(PIXI.loader.resources.player.texture)));
    }

    public update(): void {
        //this.gameManager.update();
        let vk_Keys = this.vk_Keys;
        let inputManager = this.inputManager;
        
        let _player = this.getGameObject("player");
        
        let speed = 5, hsp = 0, vsp = 0;
        if (inputManager.keyDown(vk_Keys.left)) hsp = -1;
        if (inputManager.keyDown(vk_Keys.right)) hsp = 1;
        if (inputManager.keyDown(vk_Keys.up)) vsp = -1;
        if (inputManager.keyDown(vk_Keys.down)) vsp = 1;
        
        hsp *= speed;
        vsp *= speed;
        console.log(hsp, vsp)
        _player.x += hsp;
        _player.y += vsp;

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

    public getGameObject(object: string): GameObject | undefined {

        let _return = undefined;

        if (this.gameObjects.has(object))
            _return = this.gameObjects.get(object);

        return _return;
    }
}