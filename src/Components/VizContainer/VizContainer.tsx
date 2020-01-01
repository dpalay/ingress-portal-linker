import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useWindowSize } from "@react-hook/window-size";
import { Row, Col } from "antd";
import Viz from "../Viz/Viz";



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



const VizContainer: React.FC<IProps> = (props: IProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [selected, setSelected] = useState(0);
    const [w, h] = useWindowSize(0, 0, { wait: 800 });

    if (props.data && svgRef.current) {
        let val = props.valueOfSlider;
        const svg = d3.select(svgRef.current);
        //const height = 800;
        //const width = 1200;
        const margin = {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        };
    }

    return (
        <>
        <div className="viz">
        <svg
          className="d3-component ingress-frame"
          ref={svgRef}
          style={{ marginLeft: "1%", width: "98%", height: `${h-200}` }}
        >
        {svgRef.current && 
        (
        <Viz data={props.data} size={{width: svgRef.current.clientWidth, height: h-200}} svg={svgRef.current} />
        )
        }
        </svg>
      </div>
      <Row>
        <Col span={12}>
          <div className="debug ingress-button">
            props:
            <ul>
              <li>Which Anchor: {props.whichAnchor}</li>
              <li>value of slider: {props.valueOfSlider}</li>
              <li>
                Data
                <ul>
                  {props.data &&
                    props.data.map((d, i) => (
                      <li
                        className={i === selected ? "selected" : "notSelected"}
                        key={i}
                      >
                        {" "}
                        {i + 1}:{d.title}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        </Col>
        <Col span={12}>
          <div className="debug ingress-button">
            state:
            <ul>
              <li>Selected Value: {selected}</li>
              <li>
                Selected Name:{" "}
                {props.data &&
                  props.data.filter((d, i) => i === selected)[0].title}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
        </>
    )
}




export default VizContainer;