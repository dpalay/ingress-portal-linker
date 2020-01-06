import React, { useState, useReducer, useMemo, useEffect } from "react";
import { Row, Col, Layout, Button } from "antd";
import "./App.css";
import Viz from "../Viz/Viz";
import AnchorSelect from "../AnchorSelect/AnchorSelect";
import PrimarySelect from "../PrimarySelect/PrimarySelect";
import rawPortals from "../../Utils/Data/data";
import DebugInfo from "../DebugInfo/DebugInfo";
import PortalEntry from "../PortalEntry/PortalEntry";
import Portal from "../../Utils/Objects/Portal";
import CardResults from "../CardResults/CardResults";
import Link from "../../Utils/Objects/Link";

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

const anchorDefault: IDirection = "West";
const primaryDefault: IDirection = "North";
const { Header, Footer, Content } = Layout;
const initialCount = rawPortals.length;

const App: React.FC = () => {
  const [whichAnchor, setWhichAnchor] = useState(
    anchorDefault as IDirection
  );
  const [whichPrimary, setWhichPrimary] = useState(
    primaryDefault as IDirection
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

  const anchor: Portal = useMemo(() => data.reduce((prev, cur, i, arr) => {
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
  }), [data,whichAnchor])

  const [allLinks, setAllLinks] = useState<Link[]>([])


  useEffect(() => {
    console.log("data")
    console.log(data)

    const sortedAvailablePortals = data.filter(
      portal => portal.key !== anchor.key
    );

    console.log("anchor")
    console.log(anchor)
    console.log("allAvailablePortals")
    console.log(sortedAvailablePortals)

    switch (whichAnchor) {
      case "West":
      case "East":
        sortedAvailablePortals.forEach(p => (p.slope = anchor));
        break;
      case "North":
      case "South":
        sortedAvailablePortals.forEach(p => (p.specialSlope = anchor));
        break;
      default:
        break;
    }

    sortedAvailablePortals.sort(
      (a, b) => {
        switch (whichPrimary) {
          case "East":
          case "North":
            return a.slopeFromAnchor - b.slopeFromAnchor

          case "South":
          case "West":
            return b.slopeFromAnchor - a.slopeFromAnchor


          default:
            return 0;
        }
      }
    );
    
    console.log("sortedAvailablePortals")
    console.log(sortedAvailablePortals)

    let tmpAllLinks = sortedAvailablePortals.map(
      (p: Portal): Link => {
        return new Link(p, anchor);
      }
    );
    setAllLinks(tmpAllLinks)

    console.log("AllLinks")
    console.log(allLinks)
    console.log(tmpAllLinks)

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
        const tmpLink = new Link(sourcePortal, destPortal);
        if (!tmpAllLinks.some(link => link.intersect(tmpLink))) {
          tmpAllLinks.push(tmpLink);
        }
      }
    }
    console.log(tmpAllLinks)
    setAllLinks(tmpAllLinks);
  }, [data, whichAnchor, whichPrimary])

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
                      title={"Anchor Portal"}
                      which={whichAnchor}
                      setWhich={setWhichAnchor}
                    />
                  </Col>
                  <Col lg={{ span: 10 }} md={{ span: 20 }}>
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
                whichPrimary={whichPrimary}
                setSelected={setSelected}
                shouldGenerateLinks={shouldGenerateLinks}
                setShouldGenerateLinks={setShouldGenerateLinks}
                allLinks={allLinks}
                anchor={anchor}

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
