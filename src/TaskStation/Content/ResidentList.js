import React, { Component } from 'react';
import './Content.css';
import ResidentRow from '../Items/ResidentRow';

class ResidentList extends Component {

  renderListTopBarItems(){
    let barItems = ['姓名','印花','等級','類型','詳細資料'];
    let itemFlex = [10,10,10,5,10];

    let listTopBarItemStyle = {
      height: '75px',

      fontFamily: 'adobestdb',
      fontSize: '2.5em',
      fontWeight: 'bold',
      color: '#fffaf2',
      textAlign: 'center'
    }
    return barItems.map((item,i)=>{
      return <div key={item} style={Object.assign({},listTopBarItemStyle,{flex: itemFlex[i]})}> {item} </div>
    })
  }

  renderResidentList(){
    return this.props.homeContent.map(_homeContent=>{
      return(
        <ResidentRow
        key={_homeContent.residentId}
        homeContent={_homeContent}
        contentFunctions={this.props.contentFunctions}/>
      );
    })
  }

  render(){
    if(this.props.homeContent[0] === undefined){
      return(
        <div/>
      )
    }

    let subcontentStyle = {
      width: '80%',
      height: '' + this.props.height + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap'
    }

    return(
      <div style={subcontentStyle}>
        <div className="remarkArea">*每三個月會重新計算一次等級及印花</div>
        <div className="listTopBar"> {this.renderListTopBarItems()} </div>
        {this.renderResidentList()}
      </div>
    )
  }
}

export default ResidentList;
