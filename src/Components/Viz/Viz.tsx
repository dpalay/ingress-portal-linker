import React, {useEffect, useRef} from 'react';
import './Viz.css';
import * as d3 from 'd3'
import { appendFile } from 'fs';

interface IProps {
    data?: {count: number}[]
    reset: React.Dispatch<React.SetStateAction<boolean>>
    dirty: boolean
}

const Viz: React.FC<IProps> = (props: IProps)  => {
 /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
       const d3Container = useRef(null);
       const dataset = d3.range(20)

       // This function sets the individual circles to be random sizes between 5 and 20
       function randomizeSizes(){
            props.reset(!props.dirty)
            d3.selectAll('circle').attr("r", () => Math.random()*15+5)
            //d3.selectAll('circle').each((datum, i,arr) => {d3.select(arr[i]).attr("r", Math.random()*15+5)})
       }


    useEffect(() => {
        if (props.data && d3Container.current) {
           

            const svg = d3.select(d3Container.current);
            // set width/height of SVG
            svg.attr('width', 500).attr('height',500)
            
            // get data from props
            const data = dataset.slice(0,props.data[0].count)
    
            //setup ranges
            let x = d3.scaleLinear().domain([0,1]).range([10,490])
            
            const update = svg.selectAll("g.circleContainer").data(data)
            
            // When removing an entry
            update.exit().remove();


            // update existing elements
            update.attr("new", "false")
            .transition()
                .duration(500)
                .ease(d3.easeQuadInOut)
                .attr("transform", (datum, i , arr) => `translate(${x((i+1)/(arr.length+1))},${Math.random()*500})`)
                .style("fill", (d,i,arr) => (d3.interpolateRainbow((i+1)/(arr.length+1))))
                .style("stroke", "none")
            

            // Adding new elements
            update.enter()
            .append("g").attr("class", "circleContainer")
            .attr("new", "true")
            .attr("transform", (datum, i , arr) => `translate(${x((i+1)/(arr.length+1))},200)`)
            .style("fill", (d,i,arr) => (d3.interpolateRainbow((i+1)/(arr.length+1))))
            .style("stroke", "black")
            .data(data)
            .append("circle")
            .attr("r", 10)
            .on("click",randomizeSizes)
            //@ts-ignore
            // the merge returns the g, not the circle
            .merge(update)
            // This should happen to both old and new
            
    
    }
}, [props.data, props.reset, d3Container.current])
    return (<div className="viz">
        <svg className="d3-component" ref={d3Container}/>
    </div>)

}


/*
//This works!!
  if (props.data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            // set width/height of SVG
            svg.attr('width', 500).attr('height',500)
            // get data from props
            const data = d3.range(props.data[0].count)
    
            
            const update = svg.selectAll("circle").data(data)
            
            // When removing an entry
            update.exit().remove();

            // update existing elements
            update.attr("new", "false")
            .transition()
                .duration(500)
                .ease(d3.easeQuadInOut)
                .attr("transform", (datum, i , arr) => `translate(${(i+1) * 480/(arr.length+1)},200)`)
                
            

            // Adding new elements
            update.enter()
            .append("circle")
            .data(data)
            .attr("r", 10)
            .attr("new", "true")
            .attr("transform", (datum, i , arr) => `translate(${(i+1) * 480/(arr.length+1)},200)`)
            //@ts-ignore
            .merge(update)
    
    }
*/



export default Viz