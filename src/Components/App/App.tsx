import React from 'react';
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import logo from '../../logo.svg';
import './App.css';
import myClickFunction from '../../Utils/events'
import Viz from '../Viz/Viz'

const {Header, Footer, Content, Sider} = Layout


const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <Header>
        </Header>
        <Layout>
          <Sider>

          </Sider>
          <Content>
            <Viz vizProps={[]} />
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