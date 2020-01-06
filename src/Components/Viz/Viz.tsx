import React, { useEffect, useRef } from "react";
import "./Viz.css";
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";
import useResizeOberver from "../../Utils/Hooks/useResizeObserver";
import Portal from "../../Utils/Objects/Portal";
import Link from "../../Utils/Objects/Link";

type IDirection = "East" | "West" | "North" | "South";

interface IProps {
  whichAnchor: IDirection;
  whichPrimary: IDirection;
  data?: Portal[];
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  anchor: Portal;
  allLinks: Link[];
}
const colorRange = [
  "#333",
  "#fece5a",
  "#ffa630",
  "#ff7315",
  "#e40000",
  "#fd2992",
  "#eb26cd",
  "#c124e0",
  "#9627f4"
];
const Viz: React.FC<IProps> = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeOberver(wrapperRef);

  const {
    setSelected,
    whichAnchor,
    whichPrimary,
    anchor,
    allLinks
  } = props;

  useEffect(() => {
    if (!svgRef.current) return;
    if (!dimensions) return;
    if (!wrapperRef.current) return;

    let height = dimensions.height;
    let width = dimensions.width;

    const svg = d3.select(svgRef.current);
    //const height = 800;
    //const width = 1200;
    const margin = {
      top: 20,
      bottom: 20,
      left: 50,
      right: 50
    };

    // get data from props
    const data = props.data || [new Portal(0, 0, "NO DATA", 0)];;
    //const data = portalDataset.slice(0,val)

    // Typescript stuff
    let xExtent = d3.extent(data, d => d.x);
    let yExtent = d3.extent(data, d => d.y);

    //setup ranges
    let x = d3
      .scaleLinear()
      .domain([xExtent[0] || 0, xExtent[1] || 1])
      //.domain([0, portalDataset.length])
      .range([margin.left, width - margin.right]);

    let y = d3
      .scaleLinear()
      .domain([yExtent[0] || 0, yExtent[1] || 1])
      //.domain([0, 1])
      .range([height - margin.bottom, margin.top]);

    let gridScale = d3
      .scaleLinear()
      .domain([xExtent[0] || 0, xExtent[1] || 1])
      .range([1, 8]);

    let colorScale = d3
      .scaleLinear()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8])
      // @ts-ignore
      .range(colorRange);

    let circles = svg
      .selectAll("g#circles")
      .data([1])
      .join(
        enter =>
          enter
            .append("g")
            .attr("id", "circles")
            .classed("new", true),
        update => update.classed("updated", true)
      );

    circles
      .selectAll("circle")
      .data(data)
      .join(
        enter => {
          return (
            enter
              .append("circle")
              .attr("r", 1)
              //.attr("transform",`translate(${height/2},${width/2})`)
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .call(enter =>
                enter
                  .transition()
                  //.delay((d, i) => i * 10)
                  .duration(500)
                  .attr("r", 5)
                  //.attr("transform",(d,i) => `translate(${x(d.x)},${y(d.y)})`)
                  .attr("cx", d => x(d.x))
                  .attr("cy", d => y(d.y))
                  .style("fill", d => colorScale(gridScale(d.x)))
              )
          );
        },
        update => {
          return update.attr("class", "updated").call(update =>
            update
              .transition()
              .duration(500)
              .attr("r", 5)
              //.attr("transform",(d,i) => `translate(${x(d.x)},${y(d.y)})`)
              .attr("cx", d => x(d.x))
              .attr("cy", d => y(d.y))
              .style("fill", d => colorScale(gridScale(d.x)))
          );
        },
        exit =>
          exit.call(exit =>
            exit
              .transition()
              .duration(500)
              .attr("r", 0)
          )
      );

    // Start of Voronoi stuff
    const delaunay = Delaunay.from(data.map(datum => [x(datum.x), y(datum.y)]));
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
      .join(
        enter =>
          enter
            .append("g")
            .attr("id", "GPoly")
            .classed("new", true),
        update => update.classed("updated", true)
      );

    gpoly
      .selectAll("polygon")
      .data(polygons)
      .join("polygon")
      .attr("points", d =>
        //@ts-ignore
        d.map(point => [point[0], point[1]]).join(" ")
      )
      .attr("style", (d, i) => `fill: black; opacity: ${0.05}; stroke: white`)
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
          .attr("style", () => `fill: black; opacity: ${0.05}; stroke: white`);
      })
      .on("click", (d, i, ary) => {
        setSelected(i);
      });

    // End of varonoi section

    //Start of links section

    //if (shouldGenerateLinks) {

    // Find Anchor portal
    
    svg
      .selectAll("line.link")
      .data(allLinks)
      .join(
        enter => {
          return enter
            .append("line")
            .attr("class", "link")
            .attr("x1", x(anchor.x))
            .attr("x2", x(anchor.x))
            .attr("y1", y(anchor.y))
            .attr("y2", y(anchor.y))
            .style("stroke", "blue")
            .call(enter =>
              enter
                .transition()
                //.delay((d, i) => i * 10)
                .duration(500)
                .attr("x1", d => x(d.line.p1.x))
                .attr("x2", d => x(d.line.p2.x))
                .attr("y1", d => y(d.line.p1.y))
                .attr("y2", d => y(d.line.p2.y))
            );
        },
        update => {
          return update.call(update =>
            update
              .transition()
              .duration(500)
              .attr("x1", d => x(d.line.p1.x))
              .attr("x2", d => x(d.line.p2.x))
              .attr("y1", d => y(d.line.p1.y))
              .attr("y2", d => y(d.line.p2.y))
          );
        }
      );

    //d3.selectAll<d3.BaseType, Portal>("circle").sort((a,b) => a.y-b.y)
    //d3.selectAll<d3.BaseType,Portal>("circle").order()
    // Order the other portals

    //

    // }
  }, [whichAnchor, dimensions, whichPrimary, props.data, allLinks, anchor.x, anchor.y]);
  return (
    <>
      <div className="viz" ref={wrapperRef}>
        <svg
          className="d3-component ingress-frame"
          ref={svgRef}
          style={{ marginLeft: "1%", width: "98%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default Viz;
