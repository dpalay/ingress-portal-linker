import React, { useState, useReducer } from "react";
import Layout from "antd/es/layout";
import { Row, Col } from "antd/es/grid";
import "./App.css";
import myClickFunction from "../../Utils/events";
import Viz from "../Viz/Viz";
import TestControl from "../TestControl/TestControl";
import AnchorSelect from "../AnchorSelect/AnchorSelect";


type IDirection = "East" | "West" | "North" | "South"


const directionDefault: IDirection = "West"
const { Header, Footer, Content, Sider } = Layout;

const initialState = { count: 3 };

const handleClickReducer = (
  state: { count: number },
  action: { type: string }
) => {
  switch (action.type) {
    case "increment":
      return { count: Math.min(20, state.count + 1) };
    case "decrement":
      return { count: Math.max(0, state.count - 1) };
    default:
      throw new Error();
  }
};

const App: React.FC = () => {
  const [value, dispatch] = useReducer(handleClickReducer, initialState);
  const [whichAnchor, setWhichAnchor] = useState(directionDefault as IDirection)

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
          </Sider>
          <Content className="ingress-frame dark-back">
            <Row type="flex">
              <Col>
                <TestControl
                  text="Add a ball"
                  value={value.count}
                  handleclick={() => dispatch({ type: "increment" })}
                />
              </Col>
              <Col>
                <TestControl
                  text="Remove a ball"
                  value={value.count}
                  handleclick={() => dispatch({ type: "decrement" })}
                />
              </Col>
            </Row>
            <Row type="flex">
              <Col span="24">
                <Viz data={value} whichAnchor={whichAnchor} />
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
