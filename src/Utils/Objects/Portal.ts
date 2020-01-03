import Point from "./Point";
import Link from "./Link";
import Line from "./Line";

class Portal {
  location: Point;
  title: string;
  key: number;
  slopeFromAnchor: number;

  constructor(x: number, y: number, title: string, index: number) {
    this.location = new Point(x, y);
    this.title = title;
    this.key = index;
    this.slopeFromAnchor = 0;
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

  public set slope(anchor: Portal) {
    this.slopeFromAnchor = Line.Slope(anchor.location, this.location);
  }

  // So, not technically the slope.  This gets a transposed slope, since max & min slope on a N/S anchor would have
  public set specialSlope(anchor: Portal) {
    this.slopeFromAnchor = Line.Slope(
      new Point(anchor.location.y, anchor.location.x),
      new Point(this.location.y, this.location.x)
    );
  }

  public get pointXY(): [number, number] {
    return [this.location.x, this.location.y];
  }
}

export default Portal;
