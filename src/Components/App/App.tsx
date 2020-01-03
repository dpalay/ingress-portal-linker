import React, { useState, useReducer, useMemo } from "react";
import { Row, Col, Layout, Button } from "antd";
import "./App.css";
import myClickFunction from "../../Utils/events";
import Viz from "../Viz/Viz";
import TestControl from "../TestControl/TestControl";
import AnchorSelect from "../AnchorSelect/AnchorSelect";
import rawPortals from "../../Utils/Data/data";
import DebugInfo from "../DebugInfo/DebugInfo";
import PortalEntry from "../PortalEntry/PortalEntry";
import Portal from "../../Utils/Objects/Portal";

type IDirection = "East" | "West" | "North" | "South";
interface IRawData {
  guid: string;
  title: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  link: {
    intel: string;
    gmap: string;
  };
  image: string;
}

const directionDefault: IDirection = "West";
const { Header, Footer, Content } = Layout;
const initialCount = 5;

const App: React.FC = () => {
  const [whichAnchor, setWhichAnchor] = useState(
    directionDefault as IDirection
  );
  const [selected, setSelected] = useState(0);
  const [rawData, setRawData] = useState<IRawData[]>(rawPortals);
  const [shouldGenerateLinks, setShouldGenerateLinks] = useState(false);

  const handleClickReducer = (count: number, action: { type: string }) => {
    switch (action.type) {
      case "increment":
        return Math.min(rawData.length, count + 1);
      case "incrementByTen":
        return Math.min(rawData.length, count + 10);
      case "decrement":
        return Math.max(1, count - 1);
      case "decrementByTen":
        return Math.max(1, count - 10);
      default:
        throw new Error();
    }
  };
  const [value, dispatch] = useReducer(handleClickReducer, initialCount);

  const data = useMemo(
    () =>
      rawData
        .map(
          (datum, i) =>
            new Portal(
              +datum.coordinates.lng,
              +datum.coordinates.lat,
              datum.title,
              i
            )
        )
        .slice(0, value),
    [rawData, value]
  );

  return (
    <div>
      <Layout>
        <Header className="ingress-frame dark-back">
          <Row type="flex">
            <Button>{"Show sidebar"}</Button>
            <h2>Dave's Portal Linker</h2>
          </Row>
        </Header>

        <Content className="ingress-frame dark-back">
          <Row type="flex">
            <Col span={7}>
              {" "}
              {/**TODO: Make this a Drawer at some point in the future */}
              <div className={"ingress-frame padded"}>
                <Row>
                  <Col lg={{ span: 10 }} md={{ span: 20 }}>
                    <AnchorSelect
                      which={whichAnchor}
                      setWhich={setWhichAnchor}
                    />
                  </Col>
                  <Col lg={{ span: 7 }} md={{ span: 10 }} sm={{ span: 20 }}>
                    <TestControl
                      text="Add a ball"
                      value={value}
                      handleclick={() => dispatch({ type: "increment" })}
                    />
                    <TestControl
                      text="Add 10 balls"
                      value={value}
                      handleclick={() => dispatch({ type: "incrementByTen" })}
                    />
                  </Col>
                  <Col lg={{ span: 7 }} md={{ span: 10 }} sm={{ span: 20 }}>
                    <TestControl
                      text="Remove a ball"
                      value={value}
                      handleclick={() => dispatch({ type: "decrement" })}
                    />
                    <TestControl
                      text="Remove 10 balls"
                      value={value}
                      handleclick={() => dispatch({ type: "decrementByTen" })}
                    />
                  </Col>
                </Row>
              </div>
              <Row type="flex" justify="center">
                <Col>
                  <Button
                    className="ingress-button"
                    type="primary"
                    title="GenerateLinks"
                    onClick={() => setShouldGenerateLinks(true)}
                  >
                    {"Generate Links"}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PortalEntry
                    text={JSON.stringify(rawPortals)}
                    rawData={rawData}
                    setRawData={setRawData}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <DebugInfo
                    selected={selected}
                    data={data}
                    valueOfSlider={value}
                    whichAnchor={whichAnchor}
                    shouldGenerateLinks={shouldGenerateLinks}
                  ></DebugInfo>
                </Col>
              </Row>
            </Col>
            <Col span={17}>
              <Viz
                data={data}
                whichAnchor={whichAnchor}
                setSelected={setSelected}
                shouldGenerateLinks={shouldGenerateLinks}
                setShouldGenerateLinks={setShouldGenerateLinks}
              />
            </Col>
          </Row>
        </Content>

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
