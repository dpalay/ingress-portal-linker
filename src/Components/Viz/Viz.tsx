import React, { useEffect, useRef } from "react";
import {NodeGroup} from 'react-move'
import "./Viz.css";
import * as scale from 'd3-scale'
import * as array from 'd3-array'
import { Delaunay } from "d3-delaunay";
import { IDirection } from "../../Utils/Types/myTypes";
import { useWindowWidth } from "../../Utils/hooks";
import Surface from "../../Utils/Objects/Surface";
import data from "../../Utils/Data/data";




interface IProps {
  whichAnchor: IDirection;
  data?: {
    guid: string;
    title: string;
    coordinates: { lat: string; lng: string };
    link: { intel: string; gmap: string };
    image: string;
  }[];
  valueOfSlider: number;
}

const Viz: React.FC<IProps> = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */

       const width = useWindowWidth(); // Our custom Hook
       const portalDataset = (props.data &&
        props.data.map(datum => {
          return {
            x: +datum.coordinates.lng,
            y: +datum.coordinates.lat,
            title: datum.title
          };
        })) || [{ x: 0, y: 0, title: "null" }];
        const [(xmin: number),(xmax: number)] = array.extent(portalDataset, d=> d.x) || [0,100]
        const x = scale.scaleLinear().domain([xmin, xmax])
        
        return (
    <div className="viz">
      <Surface 
      className={"viz ingress-frame"}
      view={{height: 800, width: 300}}
      trbl={{top: 10, bottom: 10, left: 10, right: 10}}
      style={{}}
      >
        {portalDataset.map(portal => {
          
          return (
            <g className="circleGroup" transform={`translate(${portal.x})`}></g>
          )
        })}
      </Surface>
      
    </div>
  );
};

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

export default Viz;
