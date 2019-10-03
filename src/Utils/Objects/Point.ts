class Point {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    /**
     * @param otherPoint  Other Point to compare for distance
     * @returns distance between two points
     */
    distance(otherPoint: Point): number{
        return Math.sqrt((this.x - otherPoint.x)**2 + (this.y - otherPoint.y)**2 )
    }

    toString(): string {
        return `(x:${this.x}, y:${this.y})`
    } 

    set(otherPoint: Point): void {
        this.x = otherPoint.x
        this.y = otherPoint.y
    }

}

export default Point
