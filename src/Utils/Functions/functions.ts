type Coords =
{
    lat: number
    lng: number
}
type ShortPortal = 
{
    title: string
    x: number
    y: number
}
type Portal = 
{
    title: string
    x: number
    y: number
    slopeFromAnchor?: number
}
type Link = 
{
    source: ShortPortal
    dest: ShortPortal
}

export const slope = (anchor: Coords, point: Coords): number => 
(point.lat - anchor.lat)/(point.lng - anchor.lng)


export const CCW = (p1:ShortPortal, p2: ShortPortal, p3: ShortPortal): boolean => {
    return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
}

export const intersect = (line1: Link, line2: Link): boolean => {
    if (line1.dest.title == line2.dest.title || line1.dest.title == line2.source.title ||
        line1.source.title == line2.dest.title || line1.source.title == line2.source.title ){
            return false
        }
    return (CCW(line1.source, line2.source, line2.dest) != CCW(line1.dest, line2.source, line2.dest)) && (CCW(line1.source, line1.dest, line2.source) != CCW(line1.source, line1.dest, line2.dest));
}

