import React, { useState, useReducer } from 'react';
import Layout from 'antd/es/layout';
import './App.css';
import myClickFunction from '../../Utils/events'
import Viz from '../Viz/Viz'
import TestControl from '../TestControl/TestControl';

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
        <Header className="ingress-frame dark-back">
          <h2>Dave's Portal Linker</h2>
        </Header>
        <Layout>
          <Sider className="ingress-frame">

          </Sider>
          <Content className="ingress-frame dark-back">
            <TestControl text="Add a ball" value={value.count} handleclick={() => dispatch({type: 'increment'})}/>
            <TestControl text="Remove a ball" value={value.count} handleclick={() => dispatch({type: 'decrement'})}/>
            <Viz data={[value]} />
          </Content>
        </Layout>
        <Footer className="ingress-frame dark-back">

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