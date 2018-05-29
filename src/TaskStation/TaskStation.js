import React, { Component } from 'react';
import './TaskStation.css';
import Content from './Content/Content';
import axios from 'axios';

//const apiServer = 'http://localhost:3000/api/';
const loginServer = 'http://10.0.48.21:8004/api/';
//const apiServer = 'http://10.0.48.21:8009/api/';
const apiServer = 'http://13.229.71.2:8001/endpoint/';

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
    var winFeature =
        'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open('Result.html','null',winFeature);
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
        logStatus={this.state.logStatus}
        mainFunctions={this.state.mainFunctions}/>
      </div>
    );
  }
}

export default TaskStation;
