import * as PIXI from "pixi.js";

import { Tile } from "./Tile";
import { GameLoop } from "../../../GameLoop";
import { GameObject } from "../GameObject";
import { clamp } from "lodash";

export class GridSystem {

    private stage: PIXI.Container;
    private gridArray: Tile[][];
    private gridWidth: number;
    private gridHeight: number;
    private gridTileSize: number;

    constructor (_stage: PIXI.Container, _gridWidth: number, _gridHeight: number, _gridTileSize: number, _gameLoop: GameLoop) {

        this.stage = _stage;
        this.gridArray = [];
        this.gridWidth = _gridWidth;
        this.gridHeight = _gridHeight;
        this.gridTileSize = _gridTileSize;
    }

    public gridInit() {

        let obj = null;
        for (let _x = 0; _x < this.gridWidth; _x++)
        {
            this.gridArray[_x] = [];
            
            for (let _y = 0; _y < this.gridHeight; _y++)
            {
                
                obj = new Tile(this.stage, _x * this.gridTileSize, _y * this.gridTileSize, PIXI.Sprite.from(PIXI.Loader.shared.resources.tile.texture));
                obj.anchor = {x: 0, y: 0};
                this.gridArray[_x][_y] = obj;
            }
        }

        //console.log(this.gridArray)

        // let obj = null;
        // for (let _x = 0; _x < this.gridWidth; _x++)
        // {
        //     this.gridArray[_x] = [];
            
        //     for (let _y = 0; _y < this.gridHeight; _y++)
        //     {
        //         obj = new Tile(this.stage, _x * this.gridTileSize, _y * this.gridTileSize, PIXI.Sprite.from(PIXI.Loader.shared.resources.tile.texture));
        //         obj.anchor = {x: 0, y: 0};
        //         this.gridArray[_x][_y] = obj;
        //     }
        // }
    }

    public gridGetTile(_x: number, _y: number): Tile | undefined {


        // var lastTime = Date.now();
        // this.gridArray[_x][_y];
        // var now = Date.now();    console.log(now - lastTime);



        return this.gridArray[clamp(_x, 0, this.gridWidth - 1)][clamp(_y, 0, this.gridHeight - 1)];


    }

    public gridGetTiles(): Array<Tile> {

        let _array = Array<Tile>();
        let _x = -1;
        
        let _tile, _tile2;
        for (let _x = 0; _x < this.gridArray.length; _x++) {
            
            _tile = this.gridArray[_x];
            _array.push(_tile[_x]);

            for (let _y = 0; _y < _tile.length; _y++) {
                
                _tile2 = this.gridArray[_x][_y];
                _array.push(_tile2);
            }
        }

        // this.gridArray.forEach(_tile => {

        //     _x++;
        //     _array.push(_tile[_x]);

        //     _tile.forEach(_tile2 => {

                
        //         _array.push(_tile2);
        //     })
        // });
        //console.log(_array)
        return _array;
    }
}