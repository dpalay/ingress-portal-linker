import React from 'react'
import { Row, Col } from 'antd'

const DebugInfo = (props: {selected: number, data: { x: number; y: number; title: string; key: number; }[], whichAnchor: string, valueOfSlider: number}) => {

    return (
        <Row>
        <Col span={12}>
      <div className="debug ingress-button">
        props:
      <ul>
          <li>Which Anchor: {props.whichAnchor}</li>
          <li>value of slider: {props.valueOfSlider}</li>
          <li>Data
          <ul>
              {props.data && props.data.map(((d, i) => (<li className={i === props.selected ? "selected" : "notSelected"} key={i}> {i + 1}:{d.title}</li>)))}
            </ul>
          </li>
        </ul>
      </div>
        </Col>
        <Col span={12}>
        <div className="debug ingress-button">
        state:
      <ul>
          <li>Selected Value: {props.selected}</li>
          <li>Selected Name: {props.data && props.data.filter((d,i) => i === props.selected)[0].title}</li>
        </ul>
      </div>
        </Col>
      </Row>
    )

}

export default DebugInfo