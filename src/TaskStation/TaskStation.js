import React, { Component } from 'react';
import './TaskStation.css';
import Content from './Content/Content';
import axios from 'axios';

const loginServer = process.env.REACT_APP_LOGIN_API;
const apiServer =  process.env.REACT_APP_API;
const apiServer2 =  process.env.REACT_APP_API2;

class TaskStation extends Component {

  constructor(props){
    super(props);
    this.state = {
      logStatus: {
        loginFailed: false,
        logged: false,
      },
      mainFunctions:{
        login: this.login.bind(this),
        logout: this.logout.bind(this),
      }
    }
  }

  login(password){
    axios.get(loginServer + 'login/' + password).then(res=>{
      //console.log(res);
      this.setState({
        logStatus:{
          loginFailed: !res.data.verified,
          logged: res.data.verified
        }
      });
    }).catch(err=>{
      this.setState({
        logStatus:{
          loginFailed: true,
          logged: false
        }
      });
    });
  }

  logout(){
    window.location.reload()
  }

  render() {

    return (
      <div>
        <Content
        apiServer={apiServer}
        apiServer2={apiServer2}
        logStatus={this.state.logStatus}
        mainFunctions={this.state.mainFunctions}/>
      </div>
    );
  }
}

export default TaskStation;
