import Portal from "./Portal";
import Line from './Line';

class Link {
    source: Portal;
    dest: Portal;
    line: Line;
    constructor(source: Portal, dest: Portal) {
        this.source = new Portal(source.location, source.title)
        this.dest = new Portal(dest.location, dest.title)
        this.line = new Line(source.location, dest.location)
    }

    getPoints(): number[] {
        return [this.source.location.x, this.source.location.y, this.dest.location.x, this.dest.location.y]
    }

    toString(): string {
        return `${this.source.title} -> ${this.dest.title}`
    }
}

export default Link