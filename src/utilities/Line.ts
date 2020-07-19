import * as PIXI from "pixi.js"

export class Line extends PIXI.Graphics {

    private lineColor: string;
    private lineWidth: number;
    private points: number[];

    constructor(points: Array<number>, lineSize: number | 5) {
        super();
        
        var s = this.lineWidth = lineSize || 5;
        var c = this.lineColor = "0x000000";
        
        this.points = points;

        this.lineStyle().width = s;

        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
    
    updatePoints(p: Array<number>) {
        
        var points = this.points = p.map((val, index) => val || this.points[index]);
        
        var s = this.lineWidth, c = this.lineColor;
        
        this.clear();
        this.lineStyle().width = s;
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}

// var line = new Line([200, 150, 0, 0]);
// rootStage.addChild(line);