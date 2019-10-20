import React, { useState, useReducer } from "react";
import { Row, Col, Layout } from "antd";
import "./App.css";
import myClickFunction from "../../Utils/events";
import Viz from "../Viz/Viz";
import TestControl from "../TestControl/TestControl";
import AnchorSelect from "../AnchorSelect/AnchorSelect";
import rawPortals from "../../Utils/Data/data";
import PortalInput from "../PortalInput/PortalInput";
import {IDirection} from "../../Utils/Types/myTypes"

const directionDefault: IDirection = "West";
const { Header, Footer, Content, Sider } = Layout;

const initialCount = 3;

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
  const [portalList, setPortalList] = useState("")

  return (
    <div>
      <Layout>
        <Header className="ingress-frame dark-back">
          <h2>Dave's Portal Linker</h2>
        </Header>
        <Layout>
          <Sider className="ingress-frame">
            <Row type="flex" justify="center">
              <Col span={20}>
                <AnchorSelect which={whichAnchor} setWhich={setWhichAnchor} />
              </Col>
            </Row>
            <Row type="flex" justify="center">
            <Col span={20}>
              <PortalInput portalList={portalList} setPortalList={() => setPortalList}></PortalInput>

            </Col>
            </Row>
          </Sider>
          <Content className="ingress-frame dark-back">
            <Row type="flex">
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
            <Row type="flex">
              <Col span={24}>
                <Viz
                  data={rawPortals}
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
