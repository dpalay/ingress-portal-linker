import React, { useEffect, useRef, useState } from "react";
import "./Viz.css";
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";
import { useWindowSize } from "@react-hook/window-size";
import { Row, Col } from "antd";
interface IProps {
  data?: {
    guid: string;
    title: string;
    coordinates: { lat: string; lng: string };
    link: { intel: string; gmap: string };
    image: string;
  }[],
  size: {width: number, height: number},
  svg: SVGSVGElement;
}

const Viz: React.FC<IProps> = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  
  


  useEffect(() => {
    let {height, width } = props.size;
    let svg = d3.select(props.svg)
    
    let test = [0,1,2,3,4,5]
      // set height of SVG
      svg.attr("height", height);

      /**
       * DEBUG INFO
       */
      svg.selectAll("g.debug").remove();
      svg
        .append("g")
        .attr("class", "debug")
        .attr(
          "transform",
          `translate(${width / 2},${height / 2})`
        )
        .append("text")
        .style("stroke", "var(--l8")
        .text(
          `Debug Stuff`
        );

      // get data from props
      const data = props.data || [];
      //const data = portalDataset.slice(0,val)

      // Typescript stuff
      //let xExtent = d3.extent(data, d => d.x);
      //let yExtent = d3.extent(data, d => d.y);

      //setup ranges
      let x = d3
        .scaleLinear()
        //.domain([xExtent[0] || 0, xExtent[1] || 1])
        .domain([0, test.length-1])
        //.range([margin.left, width - margin.right]);
        .range([0,width])
      let y = d3
        .scaleLinear()
        //.domain([yExtent[0] || 0, yExtent[1] || 1])
        .domain([0, 5])
        .range([height,0]);
/*
      let gridScale = d3
        .scaleLinear()
        .domain([xExtent[0] || 0, xExtent[1] || 1])
        .range([1, 8]);
        let colorScale = d3
        // @ts-ignore
        .scaleLinear().domain([0, 1, 2, 3, 4, 5, 6, 7, 8]).range(["#333","#fece5a","#ffa630","#ff7315","#e40000","#fd2992","#eb26cd","#c124e0","#9627f4"]);
        
    */

      svg.selectAll("line").remove();
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", height)
        .style("stroke", "white");
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("x2", width)
        .attr("y2", 0)
        .style("stroke", "white");

      let circles = svg
        .selectAll("g#circles")
        .data([1])
        .enter()
        .append("g")
        .attr("id", "circles");

      circles
        .selectAll("circle")
        .data(test)
        .join(
          enter =>
            enter
              .append("circle")
              .attr("class", "new")
              .attr("r", 1)
              .attr("transform", `translate(${width / 2},${height / 2})`)
              .style("fill", "white")
              //.style("fill", d => colorScale(gridScale(d.x)))
              .call(enter =>
                enter
                  .transition()
                  .delay((d, i) => i * 10)
                  .duration(1500)
                  .attr("r", 5)
                  .attr("transform", (d, i) => `translate(${x(d)},${y(d)})`)
              ),
          update =>
            update.attr("class", "updated").call(update =>
              update
                .transition()
                .duration(500)
                .attr("r", 5)
                .attr("transform", (d, i) => `translate(${x(d)},${y(d)})`)
                //.style("fill", d => colorScale(gridScale(d.x)))
            )
        );
        /*

      // Start of Voronoi stuff
      const delaunay = Delaunay.from(
        data.map(datum => [x(datum.x), y(datum.y)])
      );
      const voronoi = delaunay.voronoi([0, 0, width, height]);
      let polyGenerator = voronoi.cellPolygons();

      let polygons = [];
      let isRunning = true;
      while (isRunning) {
        let polygon = polyGenerator.next();
        polygons.push(polygon.value);
        isRunning = !polygon.done;
      }
      polygons.pop();

      let gpoly = svg
        .selectAll("#GPoly")
        .data([1])
        .enter()
        .append("g")
        .attr("id", "GPoly");

      gpoly
        .selectAll("polygon")
        .data(polygons)
        .enter()
        .append("polygon")
        .attr("points", d =>
          //@ts-ignore
          d.map(point => [point[0], point[1]]).join(" ")
        )
        .attr("style", (d, i) => `fill: black; opacity: ${0}; stroke: white`)
        .on("click", (d, i, ary) => {
          setSelected(i);
        });
      /*
        .on("mouseover", (d, i, arr) => {
          //console.log(d3.event);
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
        })
        */

      // End of varonoi section
    
  }, [props.data]);
  return (
    <>
      
    </>
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

/*

      /**
       * DEBUG INFO
       *
      svg.selectAll("g.debug").data([1]).enter()
        .append("g")
        .attr("class", "debug")
        .classed("level_2", true)
        .attr("transform", "translate(400,80)")
        .text(width);

      /**
       * Starting the Dataset for the circles
       *
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
      update_group_with_data.append("text").text(d => d.title);
      //@ts-ignore
      // the merge returns the g, not the circle
      update_enter.merge(update);
      // This should happen to both old and new
      //.attr("r", Math.random()*15 + 5)
      */
