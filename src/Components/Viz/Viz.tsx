import React, {useEffect, useRef} from 'react';
import './Viz.css';
import * as d3 from 'd3'
import { appendFile } from 'fs';

type IDirection = "East" | "West" | "North" | "South"
interface IProps {
    data?: {count: number}
    whichAnchor: IDirection
}

const Viz: React.FC<IProps> = (props: IProps)  => {
 /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
       const d3Container = useRef(null);
       const dataset = d3.range(20)


    useEffect(() => {
        if (props.data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            //@ts-ignore
            console.log(d3.select("div.viz").node().getBoundingClientRect())
            //@ts-ignore
            const width = d3.select("div.viz").node().getBoundingClientRect().width
            //@ts-ignore
            const height = 800
            // set width/height of SVG
            svg.attr('width', width).attr('height',height)
            
            // get data from props
            const data = dataset.slice(0,props.data.count)
    
            //setup ranges
            let x = d3.scaleLinear().domain([0,1]).range([0,width])
            let y = d3.scaleLinear().domain([0,1]).range([height,0])
            
            const update = svg.selectAll("g.circleContainer").data(data)
            
            // When removing an entry
            update.exit().remove();
            

            // update existing elements
            update.attr("new", "false")
            .transition()
                .duration(500)
                .ease(d3.easeQuadInOut)
                .attr("transform", (datum, i , arr) => `translate(${x((i+1)/(arr.length+1))},${y((i+1)/(arr.length+1))})`)
                .style("fill", (d,i,arr) => (d3.interpolateRainbow((i+1)/(arr.length+1))))
                .style("stroke", "none")
            

            // Adding new elements
            let update_enter = update.enter()
            let update_group_with_data = update_enter.append("g").attr("class", "circleContainer")
            .attr("new", "true")
            .attr("transform", (datum, i , arr) => `translate(${x((i+1)/(arr.length+1))},${y((i+1)/(arr.length+1))})`)
            .style("fill", (d,i,arr) => (d3.interpolateRainbow((i+1)/(arr.length+1))))
            .style("stroke", "black")
            .data(data)
            
            update_group_with_data.append("circle")
            .attr("r", 0)
            .transition()
            .duration(500)
            .delay((d,i) => i*50)
            .attr("r",10)
            update_group_with_data.append("text").text(d=>d) 
            //@ts-ignore
            // the merge returns the g, not the circle
            update_enter.merge(update)
            // This should happen to both old and new
            //.attr("r", Math.random()*15 + 5)
    
    }
}, [props.data, d3Container.current])
    return (<div className="viz">
        <svg className="d3-component ingress-frame" ref={d3Container}/>
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