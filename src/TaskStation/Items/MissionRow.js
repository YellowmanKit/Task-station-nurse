import React, { Component } from 'react';
import './Item.css';
import axios from 'axios';

import tickImg from '../Images/box_tick.png';
import noTickImg from '../Images/box.png';

class MissionRow extends Component {

  constructor(props){
    super(props);
    this.state = {
      checked: this.props.task.selected
    }
  }

  tryCheckboxClick(){
    this.props.contentFunctions.setModal('waitForConfirm_MissionRow',()=>{this.onCheckboxClicked()});
  }

  onCheckboxClicked(){
    axios.put(this.props.contentFunctions.getApi() + 'resident/select/ms/update/' + this.props.task.id).then(res=>{
      console.log(res.data);
    });
    this.setState({
      checked: !this.state.checked
    });
    //this.props.contentFunctions.setModal('none',null);
  }

  render(){

    let _style={
      width: '100%',
      height: '95px',
      display: 'flex',
      flexFlow: 'row nowrap',
      backgroundColor: '#C5C4C3'
    }

    let nameAreaStyle={
      flex: 3,
      backgroundColor: '#fffaf2',
      marginTop: 2,
      marginRight: 2,
      display: 'flex',
      alignItems: 'center'
    }

    let nameTextStyle = {
      flex: 1,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'left',
      lineHeight: '1',
      color: this.props.task.independAssist? '#096887':'#EA7443',
    }

    let countTextStyle = {
      flex: 1,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '90px',
      backgroundColor: '#fffaf2',
      marginTop: 2,
      marginRight: 2,
      color: '#6D6B6A',
    }

    let assignBtnAreaStyle={
      flex: 1,
      backgroundColor: '#fffaf2',
      marginTop: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    let img = this.state.checked? tickImg:noTickImg;

    let assignBtnStyle={
      width: '75px',
      height: '75px',
      backgroundColor: 'transparent',
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      border: 'none',
      cursor: 'pointer'
    }

    return(
      <div style={_style}>
        <div style={nameAreaStyle}>
          <div style={nameTextStyle}>{this.props.task.taskContent}</div>
        </div>
        <div style={countTextStyle}>{this.props.task.completeCount}</div>
        <div style={assignBtnAreaStyle}>
          <button style={assignBtnStyle} onClick={this.onCheckboxClicked.bind(this)}></button>
        </div>
      </div>
    )
  }

}

export default MissionRow;
