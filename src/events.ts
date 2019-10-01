import {MouseEvent} from 'react'

let myClickFunction = (event:  MouseEvent) =>{
    event.preventDefault()
console.log(event)
console.log(event.altKey);
console.log(event.button);
console.log(event.buttons);
console.log(event.clientX);
console.log(event.clientY);
console.log(event.ctrlKey);
console.log(event.target)
console.log(event.currentTarget)
console.log(event.isDefaultPrevented)
console.log(event.nativeEvent)
}
export default myClickFunction