import React, { Component } from 'react';
import axios from 'axios';

import leftArrow from '../../Images/greyarrow.png';
import rightArrow from '../../Images/greyarrowright.png';

class TaskChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      history: {},
      selectedDate: new Date(this.props.selectedSeasonProfile.quarterFrom),
      chartDates: this.setChartDates(new Date(this.props.selectedSeasonProfile.quarterFrom)),
      barsLength: [0,0,0,0,0,0,0],
      months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    }
    this.loadHistory();
  }

  componentWillReceiveProps(newProps){
    //console.log('componentWillReceiveProps')
    var newChartDates = this.setChartDates(new Date(newProps.selectedSeasonProfile.quarterFrom));
    this.setState({
      selectedDate: new Date(newProps.selectedSeasonProfile.quarterFrom),
      chartDates: newChartDates
    });
    this.setBarsLength(newChartDates);
  }

  setChartDates(date){
    //console.log(date);
    var _chartDates = [null,null,null,null,null,null,null];

    var date2 = new Date(date);
    date.setDate(date.getDate() - 1);

    var day = date2.getDay();

    for(var i = day;i < 7;i++){
      _chartDates[i] = new Date(date.setDate(date.getDate() + 1));
    }
    for(var j = day - 1;j >= 0;j--){
      _chartDates[j] = new Date(date2.setDate(date2.getDate() - 1));
    }
    //console.log(_chartDates);
    return _chartDates;
  }

  switchMonth(event){
    //console.log(event.target.value);
    var index = this.state.months.indexOf(event.target.value);
    var newSelectedDate = new Date(this.state.selectedDate.setMonth(index,1));
    //console.log(new Date(newSelectedDate));
    const newChartDates = this.setChartDates(new Date(newSelectedDate));
    this.setState({
      selectedDate: new Date(newSelectedDate),
      chartDates: newChartDates
    });
    this.setBarsLength(newChartDates);
  }

  switchWeek(next){
    var step = next?7:-7;
    var _chartDates = Object.assign([],this.state.chartDates);

    for(var i=0;i<7;i++){
      _chartDates[i] = new Date(_chartDates[i].setDate(_chartDates[i].getDate() + step));
    }
    //console.log(_chartDates)
    this.setState({
      selectedDate: new Date(this.state.selectedDate.setDate(this.state.selectedDate.getDate() + step)),
      chartDates: _chartDates
    });
    this.setBarsLength(_chartDates);
  }

  async loadHistory(){
    var api =
    this.props.contentFunctions.getApi() +
    'resident/daily/tasks/statistic/' +
    this.props.homeContent.residentId
    + '/2018-04-01/' + this.props.contentFunctions.getDateString(new Date());

    //api = 'http://13.229.71.2:8001/endpoint/resident/daily/tasks/statistic/TT2000001/2018-04-01/2018-06-30';

    //console.log(api);

    const _history = await axios.get(api);

    //console.log(_history)
    this.setState({
      history: _history.data
    });
    this.setBarsLength(this.state.chartDates);
    //console.log(this.state.history)
  }

  setBarsLength(chartDates){
    if(this.state.history === null){
      return;
    }
    var logs = this.state.history;
    if(logs.length === 0){
      return;
    }
    var _barsLength = [0,0,0,0,0,0,0];
    for(var i=0;i<logs.length;i++){
      for(var j=0;j<7;j++){
        if(this.sameDay(new Date(logs[i].taskGenDate), new Date(chartDates[j]))){
          _barsLength[j] = logs[i].finishTask;
        }
      }
    }
    this.setState({
      barsLength: _barsLength
    });
  }

  sameDay(d1, d2) {
    //console.log(d1)
    //console.log(d2)
    return(
    d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate());
  }

  renderBar(length){
    return(
      <div style={{flex: 1,display: 'flex',flexFlow: 'column nowrap'}}>
        <div style={{flex: length === 3?1:0,backgroundColor: 'transparent'}}>
        </div>
        <div style={{flex: length >= 2?1:0,backgroundColor: '#77CBC6'}}>
        </div>
        <div style={{flex: length >= 1?1:0,backgroundColor: '#77CBC6'}}>
        </div>
      </div>
    )
  }

  renderDate(date,textStyle){
    if(!date){
      return <div/>
    }
    const weekdays = ['日','一','二','三','四','五','六'];
    return(
      <div style={{flex: 1,display: 'flex',flexFlow: 'column nowrap',marginTop: '40px',marginBottom: '20px'}}>
        <div style={Object.assign({},textStyle,{flex: 1,textAlign: 'center',fontSize: '2em'})}>
          {weekdays[date.getDay()]}
        </div>
        <div style={Object.assign({},textStyle,{flex: 1,textAlign: 'center',fontSize: '1.75em'})}>
          {date.getDate() + '/' + (date.getMonth() + 1)}
        </div>
      </div>
    )
  }

  render(){

    let containerStyle = {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap',
      marginLeft: '5%',
      marginRight: '5%'
    }

    let subcontainerStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
    }

    let textStyle = {
      fontFamily: 'adobestdb',
      fontSize: '1.65em',
      fontWeight: 'bold',
      lineHeight: 1,
      textAlign: 'right',
      color: '#6D6B6A',
      overflow: "hidden",
      textOverflow: 'ellipsis'
    }

    let chartYear =
    <div style={Object.assign({},textStyle,{flex: 1})}>
      {this.state.selectedDate.getFullYear() + '年'}
    </div>;

    let monthOptions = this.state.months.map((type,i)=>{
      return <option key={type}>{type}</option>
    });

    let monthSelect =
    <select style={{
      fontFamily: 'adobestdb',
      fontSize: '1.2em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#898989',

      flex: 1}}
      value= {this.state.months[this.state.selectedDate.getMonth()]}
      onChange={this.switchMonth.bind(this)}>
      {monthOptions}
    </select>;

    let columnStyle={
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let yaxisItems = ['1','2','3'];
    let yaxis = yaxisItems.map((item,i)=>{
      return(
        <div style={Object.assign({},textStyle,{flex: 1})} key={i}>{item}</div>
      )
    })

    let leftRightBtnStyle={
      width: '1.75vw',
      height: '1.75vw',
      backgroundColor: 'transparent',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      border: 'none',
      cursor: 'pointer'
    }

    return(
      <div style={containerStyle}>
        <div style={Object.assign({},subcontainerStyle,{flex: 1})}>
          <div style={{display: 'flex',flex: 5,alignItems: 'center',marginRight: '5px'}}>
            {chartYear}
          </div>
          <div style={{display: 'flex',flex: 1,marginTop: '25px',marginBottom: '25px'}}>
            {monthSelect}
          </div>
        </div>
        <div style={Object.assign({},subcontainerStyle,{flex: 4,backgroundColor: '#C5C4C3'})}>
          <div style={Object.assign({},subcontainerStyle,{flex: 1,backgroundColor: '#fffaf2',marginBottom: 2})}>
            <div style={columnStyle}>
              {yaxis}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[0])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[1])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[2])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[3])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[4])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[5])}
            </div>
            <div style={columnStyle}>
            </div>
            <div style={columnStyle}>
              {this.renderBar(this.state.barsLength[6])}
            </div>
            <div style={columnStyle}>
            </div>
          </div>
        </div>
        <div style={Object.assign({},subcontainerStyle,{flex: 2})}>
          <div style={columnStyle}>
          </div>
          <div style={Object.assign({},columnStyle,{justifyContent: 'center',alignItems: 'flex-start'})}>
            <button style={Object.assign({},leftRightBtnStyle,{backgroundImage: 'url(' + leftArrow + ')'})} onClick={()=>{this.switchWeek(false)}}/>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[0],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[1],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[2],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[3],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[4],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[5],textStyle)}
          </div>
          <div style={columnStyle}>
          </div>
          <div style={columnStyle}>
            {this.renderDate(this.state.chartDates[6],textStyle)}
          </div>
          <div style={Object.assign({},columnStyle,{justifyContent: 'center',alignItems: 'flex-end'})}>
            <button style={Object.assign({},leftRightBtnStyle,{backgroundImage: 'url(' + rightArrow + ')'})}  onClick={()=>{this.switchWeek(true)}}/>
          </div>
        </div>
      </div>
    )
  }

}

export default TaskChart;
