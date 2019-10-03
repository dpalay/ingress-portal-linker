import React, {useEffect} from 'react';
import './Viz.css';
import * as d3 from 'd3'

const Viz: React.FC<{vizProps:[]}> = (props)  => {
    useEffect(() => {
        draw(props)
    }, [props.vizProps.length])
    return (<div className="viz" />)

}

const draw = (props: any)  => {
    const svg = d3.select('.viz').append("svg")
    // set width/height of SVG
    svg.attr('width', 500).attr('height',500)
    const data = [1,2,3]
    svg.append("g").selectAll("circle").data(data).enter()
    .append("g").attr("transform", data => `translate(${data*100},200)`)
    .append("circle").attr("r", 10)

}



export default Viz