import React, { Component } from 'react';
import '../Content.css';
import axios from 'axios';

import completedIcon from '../../Images/completed.png';
import notCompletedIcon from '../../Images/notcompleted.png';

class TodayMission extends Component {

  constructor(props){
    super(props);
    this.state = {
      todayTasks: []
    }
  }

  componentDidMount(){
    this.loadTodayTask();
  }

  loadTodayTask(){
    axios.get(this.props.contentFunctions.getApi() + 'resident/daily/tasks/' + this.props.homeContent.residentId).then(res=>{
      //console.log(res.data);
      this.setState({
        todayTasks: res.data,
      });
      //console.log(this.state.todayTasks);
    });
  }

  renderMissionRow(index,task){

    //console.log(task)

    let _style = {
      width: '100%',
      height: '100px',

      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    }

    let nameTextStyle = {
      flex: 9,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'left',
      lineHeight: 1,
      color: task.independAssist? '#096887':'#EA7443',
    }

    let icon = task.complete? completedIcon:notCompletedIcon;

    let statusIconStyle = {
      width: '75px',
      height: '75px',
      backgroundImage: 'url(' + icon + ')',
      backgroundSize:'contain',
      backgroundRepeat: 'no-repeat'
    }

    let status = task.complete? '已完成':'未完成';

    let statusTextStyle = {
      flex: 1,

      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#6D6B6A',
      lineHeight: 1,
    }
    return(
      <div style={_style}>
        <div style={nameTextStyle}>{'' + index + '. ' + task.taskContent}</div>
        <div style={statusIconStyle}/>
        <div style={statusTextStyle}> {status} </div>
      </div>
    )
  }

  render(){

    if(this.state.todayTasks[0] === undefined){
      return <div/>
    }

    let _style = {
      width: '100%',
      height: '800px',

      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let sepStyle = {
      width: '100%',
      height: '1px',
      backgroundColor: 'black',
      opacity: 0.15
    }

    return(
      <div style={_style}>
        {this.renderMissionRow(1,this.state.todayTasks[0])}
        <div style={sepStyle}/>
        {this.renderMissionRow(2,this.state.todayTasks[1])}
        <div style={sepStyle}/>
        {this.renderMissionRow(3,this.state.todayTasks[2])}
      </div>
    )
  }

}

export default TodayMission;
