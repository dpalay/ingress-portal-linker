import Point from "./Point";
import { Vector } from '@geometric/vector';


class Line{
    p1: Point;
    p2: Point;
    vector: Vector;

    constructor(p1: Point, p2: Point){
        this.p1 = p1;
        this.p2 = p2;
        this.vector = new Vector(p2.x - p1.x, p2.y - p1.y)
        
    }

    length(): number{
        return this.p1.distance(this.p2)
    }

    slope(): number {
        return ((this.p2.y - this.p1.y)/(this.p2.x - this.p1.x))
    }
}

export default Line