import React, { useState, useReducer } from 'react';
import Layout from 'antd/es/layout';
import './App.css';
import myClickFunction from '../../Utils/events'
import TestControl from '../TestControl/TestControl';
//@ts-ignore
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';



const {Header, Footer, Content, Sider} = Layout

const initialState = {count: 3}

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
            <XYPlot
  width={300}
  height={300}>
  <HorizontalGridLines />
  <LineSeries
    data={[
      {x: 1, y: 10},
      {x: 2, y: 5},
      {x: 3, y: 15}
    ]}/>
  <XAxis />
  <YAxis />
</XYPlot>
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