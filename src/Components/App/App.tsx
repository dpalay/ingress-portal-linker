/// <reference path="../../react-vis.d.ts"/> 
import React, { useState, useReducer } from 'react';
import Layout from 'antd/es/layout';
import './App.css';
import './style.css'
import myClickFunction from '../../Utils/events'
import TestControl from '../TestControl/TestControl';
import {XAxis, YAxis, HorizontalGridLines, MarkSeries, FlexibleXYPlot, CustomSVGSeries} from 'react-vis'
import data from '../../Data/PortalList'
import allLinks from '../../Data/allLinks'
import {scaleLinear} from 'd3-scale'

let {Highlight} = require('react-vis')
interface IDrawLocation{
  left: number
  right: number
  top: number
  bottom: number
}

const {Header, Footer, Content, Sider} = Layout

const initialState = {count: 0}

  const handleClickReducer = (state: {count: number}, action: {type: string})  => {
    switch (action.type){
      case 'increment':
        return {count: Math.min(20, state.count + 1)};
      case 'decrement':
        return {count: Math.max(0,state.count - 1)};
      default:
        throw new Error();
    }
  }

const App: React.FC = () => {
  
    let [lastDrawLocation, setLastDrawLocation] = useState({} as IDrawLocation)
    let [value, dispatch] = useReducer(handleClickReducer, initialState);

  return (
    <div>
      <Layout>
        <Header>
        </Header>
        <Layout>
          <Sider>

          </Sider>
          <Content>
            <TestControl text="Add a ball" value={value.count} handleclick={() => dispatch({type: 'increment'})}/>
            <TestControl text="Remove a ball" value={value.count} handleclick={() => dispatch({type: 'decrement'})}/>
            <FlexibleXYPlot
            animation
            xDomain={
              (lastDrawLocation && lastDrawLocation.left && lastDrawLocation.right ) && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
            yDomain={
              (lastDrawLocation && lastDrawLocation.bottom && lastDrawLocation.top) && [
                lastDrawLocation.bottom,
                lastDrawLocation.top
              ]
            }
  width={600}
  height={600}>
  <HorizontalGridLines />
  <MarkSeries data={data.map(datum => {return {x: datum.coordinates.lng, y: datum.coordinates.lat}})}></MarkSeries>
  
  <XAxis />
  <YAxis />

  <Highlight
              onBrushEnd={(area: IDrawLocation) => setLastDrawLocation(area)}
              onDrag={(area: IDrawLocation) => {
                setLastDrawLocation({
                    bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                    left: lastDrawLocation.left - (area.right - area.left),
                    right: lastDrawLocation.right - (area.right - area.left),
                    top: lastDrawLocation.top + (area.top - area.bottom)
                  })
                }}
            />

<CustomSVGSeries data={allLinks.map(link => {
  //@ts-ignore
let xScale = scaleLinear().domain(xDomain).range(xRange)
return(
  {x:link.source.x, y:link.source.y, customComponent: 'circle'}
)

})}>

</CustomSVGSeries>
</FlexibleXYPlot>
          </Content>
        </Layout>
        <Footer>

        </Footer>
      </Layout>
    </div>
  );
}

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