import { MouseEvent } from "react";

let myClickFunction = (event: MouseEvent) => {
  event.preventDefault();
  let button = event.target;
  let coords: { x: number; y: number } = { x: event.clientX, y: event.clientY };

  console.log(event);
  console.log(button);
  console.log(coords);
};
export default myClickFunction;
