import { vk_Keys } from "../../utilities/VirtualKeyboard";

export class InputManager {

    private keys: Map<number, boolean>;
    private mouse: {x: number, y: number};
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    constructor(mouseElement: any, renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {

        this.renderer = renderer;


        this.keys = new Map<number, boolean>();
        let keys = this.keys;
        
        this.mouse = {x: 0, y: 0};
        let mouse = this.mouse;

        //- Keyboard events
        window.addEventListener("keydown", setKeyDown);
        window.addEventListener("keyup", setKeyUp);

        function setKeyDown(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;

            keys.set(_keyCode, true);
        }
        //this.renderer.plugins.interaction.mouse.global.x
        function setKeyUp(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;

            keys.set(_keyCode, false);
        }

        
        //- Mouse events
        mouseElement.addEventListener("mousemove", setMousePosition);

        function setMousePosition(e: MouseEvent): void {
            //var rect = renderer.getBoundingClientRect();

            mouse.x = renderer.plugins.interaction.mouse.global.x;//e.clientX - rect.left;
            mouse.y = renderer.plugins.interaction.mouse.global.y;//e.clientY - rect.top;
        }
    }

    public mouseX(): number {
        
        let _return = 0;

        _return = this.mouse.x;

        return _return;
    }

    public mouseY(): number {
        
        let _return = 0;

        _return = this.mouse.y;

        return _return;
    }

    public keyDown(_value: vk_Keys): boolean {
        
        let _return = false;

        if (this.keys.get(_value))
            _return = true;

        return _return;
    }

    public keyUp(_value: vk_Keys): boolean {
        
        let _return = false;

        if (this.keys.has(_value) && this.keys.get(_value) == false)
            _return = true;

        return _return;
    }
}

export namespace InputManager {

    //- Virtual keyboard keys
    
}
