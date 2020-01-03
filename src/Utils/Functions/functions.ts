import Point from "../Objects/Point";
import Portal from "../Objects/Portal";
import Link from "../Objects/Link";


export const slope = (anchor: Point, point: Point): number => 
(point.y - anchor.y)/(point.x - anchor.x)


export const CCW = (p1:Portal, p2: Portal, p3: Portal): boolean => {
    return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
}

export const intersect = (line1: Link, line2: Link): boolean => {
    if (line1.dest.title == line2.dest.title || line1.dest.title == line2.source.title ||
        line1.source.title == line2.dest.title || line1.source.title == line2.source.title ){
            return false
        }
    return (CCW(line1.source, line2.source, line2.dest) != CCW(line1.dest, line2.source, line2.dest)) && (CCW(line1.source, line1.dest, line2.source) != CCW(line1.source, line1.dest, line2.dest));
}

