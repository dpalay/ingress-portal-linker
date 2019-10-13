import React, { useEffect, useRef } from "react";
import "./Viz.css";
import * as d3 from "d3";
//@ts-ignore
import useDimensions from "react-use-dimensions";
import { appendFile } from "fs";
import { Delaunay } from "d3-delaunay";

type IDirection = "East" | "West" | "North" | "South";
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
  const d3Container = useRef(null);
  const [ref, { x, y, width, height }] = useDimensions();

  const portalDataset = (props.data &&
    props.data.map(datum => {
      return {
        x: +datum.coordinates.lng,
        y: +datum.coordinates.lat,
        title: datum.title
      };
    })) || [{ x: 0, y: 0, title: "null" }];

  useEffect(() => {
    if (props.data && d3Container.current) {
      let val = props.valueOfSlider;
      const svg = d3.select(d3Container.current);
      //@ts-ignore
      const height = 800;
      const width = 1200;
      const margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      };
      // set width/height of SVG
      svg.attr("width", width).attr("height", height);

      /**
       * DEBUG INFO
       */
      svg.selectAll("g.debug").data([1]).enter()
        .append("g")
        .attr("class", "debug")
        .classed("level_2", true)
        .attr("transform", "translate(400,80)")
        .text(width);

      /**
       * Starting the Dataset for the circles
       */
      // get data from props
      const data = portalDataset;
      //const data = portalDataset.slice(0,val)


      


      //setup ranges
      let x = d3
      .scaleLinear()
      //@ts-ignore
        .domain(d3.extent(portalDataset, d => d.x))
        .range([margin.left, width - margin.right]);
        let y = d3
        .scaleLinear()
        //@ts-ignore
        .domain(d3.extent(portalDataset, d => d.y))
        .range([height - margin.bottom, margin.top]);


        // Start of Voronoi stuff
      const delaunay = Delaunay.from(data.map(datum => [datum.x, datum.y]));
      const voronoi = delaunay.voronoi([-90, -180, 90, 180]);
      let polyGenerator = voronoi.cellPolygons();

      let polygons = [];
      let isRunning = true;
      while (isRunning) {
        let polygon = polyGenerator.next();
        polygons.push(polygon.value);
        isRunning = !polygon.done;
      }
      polygons.pop()

      let gpoly = svg.selectAll("#GPoly").data([1]).enter().append("g").attr("id", "GPoly");
      
      gpoly
        .selectAll("polygon")
        .data(polygons)
        .enter()
        .append("polygon")
        .attr("points", d =>
        //@ts-ignore
          d.map(point => [x(point[0]), y(point[1])]).join(" ")
        )
        .attr("style", (d, i) => `fill: black; opacity: ${0.05}; stroke: white`)
        .on("mouseover", (d, i, arr) => {
          console.log(d3.event);
          //tmp = arr[i];  // This would find the "this" for the event.  It's the node in the DOM
          d3.select(arr[i])
            .transition()
            .duration(300)
            .attr("style", () => `fill: blue; opacity: ${0.2}; stroke: white`);
        })
        .on("mouseleave", (d, i, arr) => {
          d3.select(arr[i])
            .transition()
            .duration(300)
            .attr(
              "style",
              () => `fill: black; opacity: ${0.05}; stroke: white`
            );
        });

        // End of varonoi section



      const update = svg.selectAll("g.circleContainer").data(data);

      // When removing an entry
      update.exit().remove();

      // update existing elements
      update
        .attr("new", "false")
        .transition()
        .duration(500)
        .ease(d3.easeQuadInOut)
        .attr(
          "transform",
          (datum, i, arr) => `translate(${x(datum.x)},${y(datum.y)})`
        )
        .style("fill", (d, i, arr) =>
          d3.interpolateRainbow((i + 1) / (arr.length + 1))
        )
        .style("stroke", "none");

      // Adding new elements
      let update_enter = update.enter();
      let update_group_with_data = update_enter
        .append("g")
        .attr("class", "circleContainer")
        .attr("new", "true")
        .attr(
          "transform",
          (datum, i, arr) => `translate(${x(datum.x)},${y(datum.y)})`
        )
        .style("fill", (d, i, arr) =>
          d3.interpolateRainbow((i + 1) / (arr.length + 1))
        )
        .style("stroke", "black")
        .data(data);

      update_group_with_data
        .append("circle")
        .attr("name", d => d.title)
        .attr("r", 0)
        .transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("r", 10);
      //update_group_with_data.append("text").text(d => d.title);
      //@ts-ignore
      // the merge returns the g, not the circle
      update_enter.merge(update);
      // This should happen to both old and new
      //.attr("r", Math.random()*15 + 5)
    }
  }, [props.data, props.valueOfSlider, d3Container.current, props.whichAnchor]);
  return (
    <div className="viz" ref={ref}>
      <svg className="d3-component ingress-frame" ref={d3Container} />
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
