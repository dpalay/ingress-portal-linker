import React from 'react'
import { Row, Col } from 'antd'

interface IData  { x: number; y: number; title: string; key: number; }

const DebugInfo = (props: {selected: number, data: IData[], whichAnchor: string, valueOfSlider: number}) => {

  const data = props.data
  const selected = props.selected
  const selectedPortal = data[selected]
    return (
      <div className="ingress-frame padded">
        <Row>
        <Col span={12}>

      <div className="debug ingress-button">
        props:
      <ul>
          <li>Which Anchor: {props.whichAnchor}</li>
          <li>value of slider: {props.valueOfSlider}</li>
          <li>Data
          <ol>
              {data && data.map(((d, i) => (<li className={i === props.selected ? "selected" : "notSelected"} key={i}> {d.title}</li>)))}
            </ol>
          </li>
        </ul>
      </div>
        </Col>
        <Col span={12}>
        <div className="debug ingress-button">
        state:
      <ul>
          <li>Selected Value: {selected}</li>
          <li>Selected Name: {selectedPortal && selectedPortal.title}</li>
        </ul>
      </div>
        </Col>
      </Row>
      </div>
    )

}

export default DebugInfo