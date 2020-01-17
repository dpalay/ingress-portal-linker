import React, { useState, useMemo } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Row, Col, Layout, Button, Affix } from "antd";
import "./App.css";
import Viz from "../Viz/Viz";
import AnchorSelect from "../AnchorSelect/AnchorSelect";
import PrimarySelect from "../PrimarySelect/PrimarySelect";
import rawPortals from "../../Utils/Data/data";
import DebugInfo from "../DebugInfo/DebugInfo";
import PortalEntry from "../PortalEntry/PortalEntry";
import Portal from "../../Utils/Objects/Portal";
import CardResults from "../CardResults/CardResults";
import PortalLink from "../../Utils/Objects/Link";

type IDirection = "East" | "West" | "North" | "South";
interface ICompiledPortal {
  portal: Portal;
  linksFrom: PortalLink[];
  linksTo: PortalLink[];
  numKeys: number;
}
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

const anchorDefault: IDirection = "West";
const primaryDefault: IDirection = "North";
const { Header, Footer, Content } = Layout;

//const initialCount = 5

const App: React.FC = () => {
  const [whichAnchor, setWhichAnchor] = useState(anchorDefault as IDirection);
  const [whichPrimary, setWhichPrimary] = useState(
    primaryDefault as IDirection
  );
  const [selected, setSelected] = useState(0);
  const [rawData, setRawData] = useState<IRawData[]>(rawPortals);
  /*
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
    */
  const  initialCount = rawData.length;;
  const value = initialCount;

  const data: Portal[] = useMemo(
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

  //  const [allLinks, setAllLinks] = useState<Link[]>([])

  const [compiledPortalInfo, allLinks, anchor] = useMemo<
    [ICompiledPortal[], PortalLink[], Portal]
  >(() => {
    let anchor: Portal = data.reduce((prev, cur) => {
      switch (whichAnchor) {
        case "West":
          return prev.x <= cur.x ? prev : cur;
        case "East":
          return prev.x <= cur.x ? cur : prev;
        case "South":
          return prev.y <= cur.y ? prev : cur;
        case "North":
        default:
          return prev.y <= cur.y ? cur : prev;
      }
    });

    const sortedAvailablePortals = data.filter(
      portal => portal.key !== anchor.key
    );

    switch (whichAnchor) {
      case "East":
        sortedAvailablePortals.forEach(p => (p.slope = anchor));
        break;
      case "West":
        sortedAvailablePortals.forEach(p => (p.slope = anchor));
        // West is special due to geography
        sortedAvailablePortals.forEach(p => (p.slopeFromAnchor *= -1));
        break;
      case "North":
      case "South":
        sortedAvailablePortals.forEach(p => (p.specialSlope = anchor));
        break;
      default:
        break;
    }

    sortedAvailablePortals.sort((a, b) => {
      switch (whichPrimary) {
        case "East":
        case "North":
          return a.slopeFromAnchor - b.slopeFromAnchor;

        case "West":
        case "South":
          return b.slopeFromAnchor - a.slopeFromAnchor;

        default:
          return 0;
      }
    });

    let compiledPortalInfo: ICompiledPortal[] = [
      { portal: anchor, linksFrom: [], linksTo: [], numKeys: 0 },
      ...sortedAvailablePortals.map((p: Portal) => {
        return { portal: p, linksFrom: [], linksTo: [], numKeys: 0 };
      })
    ];

    let tmpAllLinks: PortalLink[] = [];

    sortedAvailablePortals.forEach((p: Portal, i: number) => {
      let tmpLink = new PortalLink(p, anchor);
      tmpAllLinks.push(tmpLink);
      compiledPortalInfo[0].linksTo.push(tmpLink);
      compiledPortalInfo[0].numKeys++;
      compiledPortalInfo[i + 1].linksFrom.push(tmpLink);
    });

    for (
      let sourcePortalIndex = 1;
      sourcePortalIndex < sortedAvailablePortals.length;
      sourcePortalIndex++
    ) {
      //console.log(`SourcePIndex: ${sourcePortalIndex}`)
      const sourcePortal = sortedAvailablePortals[sourcePortalIndex];
      for (
        let destPortalIndex = 0;
        destPortalIndex < sourcePortalIndex;
        destPortalIndex++
      ) {
        const destPortal = sortedAvailablePortals[destPortalIndex];
        const tmpLink = new PortalLink(sourcePortal, destPortal);
        if (!tmpAllLinks.some(link => link.intersect(tmpLink))) {
          tmpAllLinks.push(tmpLink);
          compiledPortalInfo[sourcePortalIndex + 1].linksFrom.push(tmpLink);
          compiledPortalInfo[destPortalIndex + 1].linksTo.push(tmpLink);
          compiledPortalInfo[destPortalIndex + 1].numKeys++;
        }
      }
    }

    return [compiledPortalInfo, tmpAllLinks, anchor];
  }, [data, whichAnchor, whichPrimary]);

  return (
    <Router>
      <div>
        <Layout>
          <Header className="ingress-frame dark-back">
            <Row type="flex" justify="center" gutter={2}>
              <Col>
              <Button onClick={(e) => console.log(e)}>{"Show sidebar"}</Button>
              </Col>
              <Col>
              <h2>Dave&apos;s Portal Linker</h2>
              </Col>
              <Col>
              </Col>
            </Row>
          </Header>

          <Content className="ingress-frame dark-back">
            <Row type="flex">
              <Col span={7}>
                {" "}
                {/**TODO: Make this a Drawer at some point in the future */}
                <div className={"ingress-frame padded"}>
                  <Row justify="center">
                    <Col lg={{span: 4, push:20}}>
                      <div className="ingress-text">
                      <Link to="/">Home</Link>
                      <Link to="/about">About</Link>
                      <Link to="/view">Show Map</Link>
                      </div>
                    </Col>
                    <Col lg={{ span: 10, pull: 4 }} md={{ span: 20 }}>
                      <AnchorSelect
                        title={"Anchor Portal"}
                        which={whichAnchor}
                        setWhich={setWhichAnchor}
                      />
                    </Col>
                    <Col lg={{ span: 10 , pull: 4}} md={{ span: 20 }}>
                      <PrimarySelect
                        title={"Start From Direction"}
                        which={whichPrimary}
                        setWhich={setWhichPrimary}
                        whichAnchor={whichAnchor}
                      />
                    </Col>
                  </Row>
                </div>
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
                    <CardResults compiledPortals={compiledPortalInfo} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DebugInfo
                      selected={selected}
                      data={data}
                      valueOfSlider={value}
                      whichAnchor={whichAnchor}
                    ></DebugInfo>
                  </Col>
                </Row>
              </Col>
              <Col span={17}>
              <Switch>
                <Route path="/view">

                <Affix offsetTop={10}>
                <Viz
                  data={data}
                  whichAnchor={whichAnchor}
                  whichPrimary={whichPrimary}
                  setSelected={setSelected}
                  allLinks={allLinks}
                  anchor={anchor}
                  />
                  </Affix>
                  </Route>
                  <Route path="/">
                    <div className="ingress-text">Home screen</div>
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Content>

          <Footer className="ingress-frame dark-back"></Footer>
        </Layout>
      </div>
    </Router>
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
