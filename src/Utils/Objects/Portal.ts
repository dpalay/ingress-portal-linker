import Point from "./Point";
import Link from "./Link";

class Portal {
  location: Point;
  title: string;

  constructor(location: Point, title: string) {
    this.location = new Point();
    this.location.set(location);
    this.title = title;
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
