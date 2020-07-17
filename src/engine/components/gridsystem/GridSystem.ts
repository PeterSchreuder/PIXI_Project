import { Tile } from "./Tile";

export class GridSystem {

    private stage: PIXI.Container;
    private gridArray: Array<Tile>;
    private gridWidth: number;
    private gridHeight: number;
    private gridTileSize: number;

    constructor (_stage: PIXI.Container, _gridWidth: number, _gridHeight: number, _gridTileSize: number) {

        this.stage = _stage;
        this.gridArray = new Array<Tile>();
        this.gridWidth = _gridWidth;
        this.gridHeight = _gridHeight;
        this.gridTileSize = _gridTileSize;
    }

    public gridInit() {

        let obj = null;
        for (let _x = 0; _x < this.gridWidth; _x++)
        {
            for (let _y = 0; _y < this.gridHeight; _y++)
            {
                obj = new Tile(this.stage, _x * this.gridTileSize, _y * this.gridTileSize, PIXI.Sprite.from(PIXI.loader.resources.tile.texture));
                obj.anchor = {x: 0, y: 0};
                this.gridArray.push(obj);
            }
        }
    }
}