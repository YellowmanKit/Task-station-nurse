import React, { Component } from 'react';
import './Content.css';
import axios from 'axios';

import Background from '../Images/bg.jpg';
import contentBg from '../Images/Content_bg.png';
import BG_Taskstation from '../Images/taskstation_bg.png';
import taskstationIcon from '../Images/taskstation_icon.png';

import ResidentList from './ResidentList';
import Detail from './Detail';
import Modal from '../Items/Modal';
import TypeInfo from '../Items/TypeInfo';

class Content extends Component {

  constructor(props){
    super(props);
    this.state = {
      height: 0,
      noPassword: false,
      loadedCount: 0,

      showDetail: false,
      showTypeInfo: false,

      resType:[],
      homeContent:[],
      profiles: [],
      detailToCheck: {
        homeContent: {}
      },
      detailStatus:{
        onPage: 'todayMission'
      },
      contentFunctions:{
        //loadTaskstationStatus: this.loadTaskstationStatus.bind(this),
        getDateString: this.getDateString.bind(this),
        getApi: this.getApi.bind(this),
        getHeight: this.getHeight.bind(this),
        getResType: this.getResType.bind(this),

        getProfileByMemId: this.getProfileByMemId.bind(this),

        showDetail: this.showDetail.bind(this),
        switchDetailPage: this.switchDetailPage.bind(this),

        setModal: this.setModal.bind(this),
        toggleTypeInfo: this.toggleTypeInfo.bind(this)
      },
      modalStatus: {
        status: 'none',
        onConfirm: null
      }
    }
    //this.loadAppData();
  }

  componentWillReceiveProps(newProps){
    //console.log('componentWillReceiveProps');
    this.loadApp();
  }

  toggleTypeInfo(){
    this.setState({
      showTypeInfo: !this.state.showTypeInfo
    })
  }

  loadApp(){
    this.setState({
      loadedCount: 0
    });
    this.loadResType();
    this.loadHomeContent();
  }

  loadHomeContent(){
    axios.get(this.props.apiServer + 'resident/type/content').then(res=>{
      //console.log(res.data);
      this.setState({
        homeContent: res.data,
        loadedCount: this.state.loadedCount + 1
      });
      //console.log(this.state.homeContent);
    });

    axios.get(this.props.apiServer2 + 'getResBedPrfl/').then(res=>{
      console.log(res.data);
      this.setState({
        profiles: res.data.ResBedPrfl,
        loadedCount: this.state.loadedCount + 1
      });
    });
  }

  loadResType(){
    axios.get(this.props.apiServer + 'resident/type').then(res=>{
      //console.log(res.data);
      this.setState({
        resType: res.data,
        loadedCount: this.state.loadedCount + 1
      });
      //console.log(this.state.resType);
    });
  }

  getResType(){
    //console.log(this.state.resType)
    return this.state.resType;
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  getApi(){
    return this.props.apiServer;
  }

  setModal(_status,_onConfirm){
    this.setState({
      modalStatus:{
        status: _status,
        onConfirm: _onConfirm
      }
    })
  }

  getHeight(){
    if(!this.props.logStatus.logged){
      return this.state.height > 900? this.state.height:900;
    }
    var extraHeight = 0;
    if(this.state.showDetail && this.state.detailStatus.onPage === 'missionSetting'){
      extraHeight += (25) * 100;
    }
    if(!this.state.showDetail && this.state.homeContent.length > 9){
      extraHeight += (this.state.homeContent.length - 9) * 75;
    }
    var baseHeight = this.state.height;
    baseHeight = this.state.height > 1000? this.state.height:1000;
    return baseHeight + extraHeight;
  }

  handleTopRightButton(){
    if(this.state.showDetail){
      this.loadApp();
      this.setState({
        showDetail: false,
        detailStatus: {
          onPage: 'todayMission'
        }
      });
    }else if(this.props.logStatus.logged){
      this.tryLogout();
    }
  }

  tryLogout(){
    this.setState({
      modalStatus: {
        status: 'confirmLogout',
        onConfirm: this.props.mainFunctions.logout
      }
    })
  }

  passwordSubmitted(event){
    event.preventDefault();
    let pw = document.getElementById("pw").value;
    if(pw !== ""){
      this.props.mainFunctions.login(pw);
      this.setState({
        noPassword: false
      });
    }else{
      this.setState({
        noPassword: true
      });
    }
  }

  getDateString(date) {
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //console.log(dateStr);
    //return '2018-02-08';
    return dateStr;
  }

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  showDetail(_homeContent){
    this.setState({
      showDetail: true,
      detailToCheck: {
        homeContent: _homeContent
      }
    });
  }

  switchDetailPage(page){
    this.setState({
      detailStatus:{
        onPage: page
      }
    })
  }

  getProfileByMemId(memId){
    const profiles = this.state.profiles;
    for(var i=0;i<profiles.length;i++){
      if(memId === profiles[i].MemID){
        return profiles[i];
      }
    }
    return null;
  }

  render() {

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    if(this.props.logStatus.logged && this.state.loadedCount < 3){
      return <div/>
    }

    let bigboardStyle = {
      width: '100%',
      height: '' + this.getHeight() + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',

      backgroundImage: 'url(' + Background + ')',
      backgroundSize: 'cover'
    };

    let contentStyle = {
      width: '100%',
      height: '' + this.getHeight() + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',


      backgroundImage: 'url(' + contentBg + ')',
      backgroundSize: 'contain'
    }

    if(this.props.logStatus.logged){

      //let profileName = this.state.showDetail? ' - ' + this.state.detailToCheck.profile.ElderName:'';

      //let title = '每日小任務' + profileName;
      let title = '每日小任務';
      if(this.state.showDetail){
        title += ' (' + this.state.detailToCheck.homeContent.residentName + ')';
      }

      let iconStyle = {
        minWidth: '70px',
        minHeight: '70px',
        backgroundImage: 'url(' + taskstationIcon + ')',
        backgroundSize:'contain',
        backgroundRepeat: 'no-repeat'
      }

      let titleArea =
      <div className="TitleArea">
        <div style={iconStyle}></div>
        <p className="title">{title}</p>
      </div>;

      let topLeftButton =
      <button className="topRightButton" onClick={this.handleTopRightButton.bind(this)} />;

      let headerStyle = {
        width: '100%',
        height: '90px',
        backgroundColor: '#6D6B6A',
        display: 'flex',
        justifyContent: 'center'
      }

      let header =
      <header style={headerStyle}>{topLeftButton}{titleArea}</header>;

      let subcontent = !this.state.showDetail?
      <ResidentList
      homeContent={this.state.homeContent}
      contentFunctions={this.state.contentFunctions}
      height={this.getHeight() - 90}/>:
      <div/>;

      if(this.state.showDetail){
        return(
          <div style={bigboardStyle}>
            <div style={contentStyle}>
              {header}
              <Detail
              detailStatus={this.state.detailStatus}
              homeContent={this.state.detailToCheck.homeContent}
              contentFunctions={this.state.contentFunctions}
              height={this.getHeight() - 190}/>
            </div>
            <Modal modalStatus={this.state.modalStatus} onCancel={()=>{this.setModal('none',null)}} height={this.getHeight()}/>
          </div>
        )
      }

      return (
        <div style={bigboardStyle}>
          <div style={contentStyle}>
            {header}
            {subcontent}
          </div>
          <Modal modalStatus={this.state.modalStatus} onCancel={()=>{this.setModal('none',null)}} height={this.getHeight()}/>
          <TypeInfo show={this.state.showTypeInfo} contentFunctions={this.state.contentFunctions}/>
        </div>
      );
    }

    let loginContentStyle = {
      width: '450px',
      height: '400px',
      margin: 'auto',
      marginTop: '200px',

      backgroundImage: "url(" + BG_Taskstation + ")",
      backgroundSize: 'contain'
    }

    let loginFailedMessage =
    this.state.noPassword? <div className="NoPasswordMessage"/>:
    this.props.logStatus.loginFailed? <div className="LoginFailedMessage"/>:
    null;

    return (
      <div style={bigboardStyle}>
        <div style={loginContentStyle}>
          <form className="LoginInfo" onSubmit={this.passwordSubmitted.bind(this)}>
            <input id="pw" className="password" type="password" placeholder="密碼"/>
            {loginFailedMessage}
            <input className="submitPassword" type="submit" value="" />
          </form>
        </div>
      </div>
    );
  }

}

export default Content;
