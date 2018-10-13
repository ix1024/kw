import React, { Component } from 'react';
//import logo from './logo.svg';<img src={logo} className="App-logo" alt="logo" />
import { Layout,Menu,Icon } from 'antd';
import './App.css';
//import locale from 'antd/lib/date-picker/locale/zh_CN';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import { connect } from "react-redux";
const { Header, Footer, Sider, Content ,Breadcrumb} = Layout;
const About =()=>{
  return (
    <div>About</div>
  );
}
class App extends Component {
  render() {
    return (
      
      <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <Link className="nav-text" to="/" style={{display:'inline',color:'#fff'}}>
              Home
              </Link>
              
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              
              <Link className="nav-text" to="/about" style={{display:'inline',color:'#fff'}}>
              about
              </Link>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header>asdfa</Header>
          <Content>
           
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </Router>
       
    );
  }
}
const mapStateToProps=(store)=>{
  return {};
};
const mapDispatchToProps=(dispatch)=>{
  return {
    
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
