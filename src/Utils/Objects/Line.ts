import Point from "./Point";
import { Vector } from "@geometric/vector";

class Line {
  p1: Point;
  p2: Point;
  vector: Vector;

  static Slope(p1: Point, p2: Point){
    return (p2.y - p1.y) / (p2.x - p1.x)
  }

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
    this.vector = new Vector(p2.x - p1.x, p2.y - p1.y);
  }

  length(): number {
    return this.p1.distance(this.p2);
  }

  slope(): number {
    return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
  }

  //https://stackoverflow.com/a/24392281
  /*Lines can be described by some initial vector, v, and a direction vector, d:

r = v + lambda*d 
We use one point (a,b) as the initial vector and the difference between them (c-a,d-b) as the direction vector. Likewise for our second line.

If our two lines intersect, then there must be a point, X, that is reachable by travelling some distance, lambda, along our first line and also reachable by travelling gamma units along our second line. This gives us two simultaneous equations for the coordinates of X:

X = v1 + lambda*d1 
X = v2 + gamma *d2
These equations can be represented in matrix form. We check that the determinant is non-zero to see if the intersection X even exists.

If there is an intersection, then we must check that the intersection actually lies between both sets of points. If lambda is greater than 1, the intersection is beyond the second point. If lambda is less than 0, the intersection is before the first point.

Hence, 0<lambda<1 && 0<gamma<1 indicates that the two lines intersect!*/

  intersect(otherLine: Line): boolean {
    let a = this.p1.x
    let b = this.p1.y
    let c = this.p2.x
    let d = this.p2.y
    let p = otherLine.p1.x
    let q = otherLine.p1.y
    let r = otherLine.p2.x
    let s = otherLine.p2.y

    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return 0 < lambda && lambda < 1 && (0 < gamma && gamma < 1);
    }
  }
}

export default Line;
