import React, { Component } from 'react';
import axios from 'axios';
import TaskChart from './TaskChart';

class ResidentInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.initResidentInfo();
  }

  async initResidentInfo(){
    if(this.props.homeContent === undefined){
      return;
    }
    var now = new Date();
    var api =
    this.props.contentFunctions.getApi() +
    'resident/quarter/performance/' +
    this.props.homeContent.residentId +
    '/2018-01-01/' + now.getFullYear() + '-12-31';

    //console.log(api)

    axios.get(api).then(res=>{
      //console.log(res.data);
      var _seasonProfiles = [];
      if(Array.isArray(res.data)){
        _seasonProfiles = res.data;
      }else{
        _seasonProfiles.push(res.data);
      }
      var _seasonOptions = [];
      var _selectedSeasonProfile = {};
      var _selectedSeason = '';
      for(var i=_seasonProfiles.length - 1;i>=0;i--){
        var now = new Date();
        var start = new Date(_seasonProfiles[i].quarterFrom);
        var end = new Date(_seasonProfiles[i].quarterTo);
        //console.log(start);
        //console.log(end);
        _seasonOptions.push(this.generateSeasonName(start,end));
        //if(now > start && now < end){
        if(now > start){
          _selectedSeasonProfile = _seasonProfiles[i];
          _selectedSeason = this.generateSeasonName(start,end)
        }
      }
      var isLoaded = _seasonProfiles.length > 0 && _selectedSeasonProfile !== {};
      this.setState({
        seasonProfiles: _seasonProfiles,
        selectedSeasonProfile: _selectedSeasonProfile,
        seasonOptions: _seasonOptions,
        selectedSeason: _selectedSeason,
        loaded: isLoaded
      });
      //console.log(this.state);
    });
    //console.log(this.state);
  }

  generateSeasonName(start,end){
    var year = start.getFullYear();
    var startMonth = start.getMonth() + 1;
    var endMonth = end.getMonth() + 1;
    return year + '/ ' + startMonth + ' - ' + endMonth + '月';
  }

  onSeasonSelected(event){
    const _selectedSeason = event.target.value;
    //console.log(_selectedSeason);

    var _selectedSeasonProfile = {};
    for(var i=0;i<this.state.seasonProfiles.length;i++){
      if(this.generateSeasonName(new Date(this.state.seasonProfiles[i].quarterFrom),new Date(this.state.seasonProfiles[i].quarterTo)) === _selectedSeason){
        _selectedSeasonProfile = this.state.seasonProfiles[i];
      }
    }
    this.setState({
      selectedSeason: _selectedSeason,
      selectedSeasonProfile: _selectedSeasonProfile
    })
  }

  render(){

    let containerStyle={
      width: '100%',
      height: '700px',
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let hintStyle = {
      fontFamily: 'adobestdb',
      fontSize: '2em',
      lineHeight: 1.65,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#989898',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      flex: 1,
      margin: 15
    }

    if(!this.state.loaded){
      return(
        <div style={containerStyle}>
          <div style={Object.assign({},hintStyle,{textAlign: 'left'})}>
            * 該院友沒有任務記錄。
          </div>
        </div>
      )
    }

    let headerStyle = {
      width: '100%',
      height: '75px',
      backgroundColor: '#C5C4C3',
      display: 'flex',
      flexFlow: 'row nowrap',

      fontFamily: 'adobestdb',
      fontWeight: 'bold',
      textAlign: 'center',
    }

    let items = ['每季成就','任務完成總數(每週)'];

    let itemStyle1 = {
      flex: 3,
      height: '75px',
      fontSize: '2.5em',
      color: '#fffaf2',
      backgroundColor: '#989898'
    }

    let itemStyle2 = Object.assign({},itemStyle1);
    itemStyle2.flex = 5;
    itemStyle2.marginLeft = 2;

    let header =
    <div style={headerStyle}>
      <div style={itemStyle1}>{items[0]}</div>
      <div style={itemStyle2}>{items[1]}</div>
    </div>

    let subcontainerStyle={
      width: '100%',
      height: '625px',
      backgroundColor: '#C5C4C3',
      display: 'flex',
      flexFlow: 'row nowrap'
    }

    let subLeftStyle={
      flex: 3,
      display: 'flex',
      flexFlow: 'column nowrap',
      marginRight: 2
    }

    let subRightStyle={
      flex: 5,
      backgroundColor:'#fffaf2',
      marginRight: 2,
      display: 'flex'
    }

    let typeOptions = this.state.seasonOptions.map((type,i)=>{
      return <option key={type}>{type}</option>
    });

    let periodSelect =
    <select style={{
      fontFamily: 'adobestdb',
      fontSize: '1.6em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#898989',
      margin: '15px',

      flex: 1}}
      value={this.state.selectedSeason}
      onChange={this.onSeasonSelected.bind(this)}>
      {typeOptions}
    </select>;

    let scoreText = '' + this.state.selectedSeasonProfile.stamp;
    let levelText = '' + this.state.selectedSeasonProfile.grade.gradeName;
    let completedCount = '' + this.state.selectedSeasonProfile.completeTask;

    let textStyle1 = {
      fontFamily: 'adobestdb',
      fontSize: '4em',
      lineHeight: 1.95,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#6D6B6A',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      flex: 6
    }
    let textStyle2 = Object.assign({},textStyle1);
    textStyle2.fontSize = '2em';
    textStyle2.lineHeight = 1.25;
    textStyle2.flex = 3;
    let textStyle3 = Object.assign({},textStyle1);
    textStyle3.fontSize = '4em';

    return(
      <div style={containerStyle}>
        {header}
        <div style={subcontainerStyle}>
          <div style={subLeftStyle}>
            <div style={{flex: 2,display: 'flex',backgroundColor:'#fffaf2'}}>
              {periodSelect}
            </div>
            <div style={{flex: 5,display: 'flex',backgroundColor:'#fffaf2'}}>
              <div style={{flex: 1,display: 'flex',flexFlow:'row nowrap',margin:'0px 15px 5px 15px'}}>
                <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#EAD1DB',margin:5,borderRadius: 7}}>
                  <div style={textStyle1}>
                    {scoreText}
                  </div>
                  <div style={textStyle2}>
                    印花
                  </div>
                </div>
                <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#F7E0AF',margin:5,borderRadius: 7}}>
                  <div style={textStyle3}>
                    {levelText}
                  </div>
                  <div style={textStyle2}>
                    等級
                  </div>
                </div>
              </div>
            </div>
            <div style={{flex: 5,display: 'flex',backgroundColor:'#fffaf2'}}>
              <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#F5F4C6',margin:'0px 20px 5px 20px',borderRadius: 7}}>
                <div style={textStyle1}>
                  {completedCount}
                </div>
                <div style={textStyle2}>
                  任務完成次數
                </div>
              </div>
            </div>
            <div style={{flex: 3,display: 'flex',backgroundColor:'#fffaf2'}}>
              <div style={hintStyle}>
                *每三個月會重新計算一次印花、等級及任務完成次數。
              </div>
            </div>
          </div>
          <div style={subRightStyle}>
            <TaskChart
            contentFunctions={this.props.contentFunctions}
            homeContent={this.props.homeContent}
            selectedSeasonProfile={this.state.selectedSeasonProfile}/>
          </div>
        </div>
      </div>
    )
  }

}

export default ResidentInfo;
