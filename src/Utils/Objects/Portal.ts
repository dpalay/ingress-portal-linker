import Point from "./Point";
import Link from "./Link";

class Portal {
  location: Point;
  title: string;
  key: number;

  constructor(x: number, y: number, title: string, index: number) {
    this.location = new Point(x,y);
    this.title = title;
    this.key = index;
  }

  linkTo(otherPortal: Portal): Link {
    return new Link(this, otherPortal);
  }

  public get x(): number {
    return this.location.x;
  }

  public get y(): number {
    return this.location.y;
  }

  public get pointXY(): [number, number] {
    return [this.location.x, this.location.y];
  }
}

export default Portal;
