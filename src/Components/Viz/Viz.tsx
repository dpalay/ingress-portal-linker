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
import { duration } from "moment";
import Constants from '../../Utils/constants'
import { easeQuadInOut, interpolateTransformSvg, interpolate } from "d3";



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
const {TRBL, VIEW} = Constants
type iTrbl = typeof TRBL
type iView = typeof VIEW

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
        const [xmin,xmax] = array.extent(portalDataset, d=> d.x) || [0,100]
        const [ymin,ymax] = array.extent(portalDataset, d=> d.y) || [0,100]
        //@ts-ignore
        const x = scale.scaleLinear().domain([xmin, xmax]).range([TRBL.left,VIEW.width-TRBL.right])
        //@ts-ignore
        const y = scale.scaleLinear().domain([ymin, ymax]).range([VIEW.height-TRBL.top,TRBL.bottom])
        
        return (
    <div className="viz">
      <Surface 
      className={"viz ingress-frame"}
      view={VIEW}
      trbl={TRBL}
      style={{}}
      >
        <NodeGroup
        data={portalDataset.slice(0,props.valueOfSlider)}
        keyAccessor = { d => d.title}
        start={() => ({
          opacity: 1e-6,
          x:VIEW.width/2,
          y:VIEW.height/2
        })}

        enter={ (d) => ({
          opacity: [0.4],
          x: x(d.x),
          y: y(d.y),
          timing: {delay: 200, duration: 750, ease: easeQuadInOut}
        })}

        update={
          (d,i) => ({
            opacity: 1,
            color: "#EE6600"
          })
        }

        interpolation={(begValue, endValue, attr) => {
          if (attr === 'transform') {
            return interpolateTransformSvg(begValue, endValue)
          }

          return interpolate(begValue, endValue)
        }}
        
        >
          {(nodes) => {
             //console.log(nodes)
            return (
            <g style={{fill: "white"}}>
             {nodes.map((d,i,arr) => {
               console.log(d)
               console.log(i)
               console.log(arr)
               return (
                 <circle r={4} cx={x(d.data.x)} cy={y(d.data.y)}></circle>
               )
             })}
            </g>
          )}}
        
        </NodeGroup>
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
