import React, { useState, useReducer } from "react";
import {Row, Col, Layout} from 'antd'
import "./App.css";
import myClickFunction from "../../Utils/events";
import Viz from "../Viz/Viz";
import TestControl from "../TestControl/TestControl";
import AnchorSelect from "../AnchorSelect/AnchorSelect";
import rawPortals from "../../Utils/Data/data";
import DebugInfo from "../DebugInfo/DebugInfo";

type IDirection = "East" | "West" | "North" | "South";

const directionDefault: IDirection = "West";
const { Header, Footer, Content } = Layout;
const initialCount = 100;

const data = rawPortals.map((datum, i) => {
  return {
    x: +datum.coordinates.lng,
    y: +datum.coordinates.lat,
    title: datum.title,
    key: i
  };
})
const handleClickReducer = (
  count:  number,
  action: { type: string }
) => {
  switch (action.type) {
    case "increment":
      return  Math.min(rawPortals.length, count + 1) ;
    case "decrement":
      return  Math.max(0, count - 1) ;
    default:
      throw new Error();
  }
};

const App: React.FC = () => {
  const [value, dispatch] = useReducer(handleClickReducer, initialCount);
  const [whichAnchor, setWhichAnchor] = useState(
    directionDefault as IDirection
  );

  return (
    <div>
      <Layout>
        <Header className="ingress-frame dark-back">
          <h2>Dave's Portal Linker</h2>
        </Header>
        <Layout>
          <Content className="ingress-frame dark-back">
          <Row type="flex">
              <Col>
              <Row>
                <Col>
                <AnchorSelect which={whichAnchor} setWhich={setWhichAnchor} />
              </Col>
              <Col span={1}>
              </Col>
              <Col>
                <TestControl
                  text="Add a ball"
                  value={value}
                  handleclick={() => dispatch({ type: "increment" })}
                  />
              </Col>
              <Col>
                <TestControl
                  text="Remove a ball"
                  value={value}
                  handleclick={() => dispatch({ type: "decrement" })}
                  />
              </Col>
                  </Row>
                  <Row>
                  <Col>
                  <DebugInfo selected={0} data={data} valueOfSlider={value} whichAnchor={whichAnchor}></DebugInfo>
                  </Col>
                    </Row>
                  </Col>
              <Col>
                <Viz
                  data={data}
                  valueOfSlider={value}
                  whichAnchor={whichAnchor}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer className="ingress-frame dark-back"></Footer>
      </Layout>
    </div>
  );
};

export default App;

/*

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >Learn React
        </a>

           <Button type="primary" onClick={myClickFunction}>Learn React</Button>
      </header>

    </div>*/
