import  Point from "./Point";
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
        return new Link(this, otherPortal)
    }


}

export default Portal