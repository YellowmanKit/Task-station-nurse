import React, { Component } from 'react';
import './Content.css';
//import axios from 'axios';

import NavBar from '../Items/NavBar';
import TodayMission from './DetailPages/TodayMission';
import MissionSetting from './DetailPages/MissionSetting';
import ResidentInfo from './DetailPages/ResidentInfo';

class Detail extends Component {

  constructor(props){
    super(props);
    this.state = {
      todayTasks:[],

      catagories: [
        {
          key: 'todayMission',
          name: '今日任務'
        },
        {
          key: 'missionSetting',
          name: '任務設定'
        },
        {
          key: 'residentInfo',
          name: '院友資料'
        }
      ]
    }
  }

  render(){

    //console.log(this.state.tempAssign)

    let detailStyle = {
      width: '80%',
      height: '' + this.props.height + 'px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      marginTop: '100px'
    }

    let sepStyle = {
      width: '100%',
      height: '2px',
      backgroundColor: 'black',
      opacity: 0.25
    }

    let content =
    this.props.detailStatus.onPage === 'todayMission'?
    <TodayMission
    homeContent={this.props.homeContent}
    contentFunctions={this.props.contentFunctions}/>:

    this.props.detailStatus.onPage === 'missionSetting'?
    <MissionSetting
    homeContent={this.props.homeContent}
    height={this.props.height}
    contentFunctions={this.props.contentFunctions}/>:

    this.props.detailStatus.onPage === 'residentInfo'?
    <ResidentInfo
    homeContent={this.props.homeContent}
    height={this.props.height}
    contentFunctions={this.props.contentFunctions}/>:
    <div/>;

    return(
      <div style={detailStyle}>
        <div style={sepStyle}/>
        <NavBar catagories={this.state.catagories} detailStatus={this.props.detailStatus} contentFunctions={this.props.contentFunctions}/>
        <div style={sepStyle}/>
        {content}
      </div>
    )
  }

}

export default Detail;
