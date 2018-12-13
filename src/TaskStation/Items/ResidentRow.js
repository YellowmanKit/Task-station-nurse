import React, { Component } from 'react';
import './Item.css';
import axios from 'axios';

class ResidentRow extends Component {

  constructor(props){
    super(props);
    this.state={
      resTypes: props.contentFunctions.getResType(),
      currentResType: props.homeContent.residentTypeId
    }
    this.profile = this.props.contentFunctions.getProfileByMemId(this.props.homeContent.residentId);
  }

  /*tryHandleSelectResType(event){
    const selectedValue = event.target.value;
    this.props.contentFunctions.setModal('waitForConfirm',()=>{this.handleSelectResType(selectedValue)});
  }*/

  handleSelectResType(event){
    const selectedValue = event.target.value;
    //console.log(selectedValue)
    var _typeid = 0;
    for(var i=0;i<this.state.resTypes.length;i++){
      if(this.state.resTypes[i].typeName === selectedValue){
        _typeid = this.state.resTypes[i].id;
      }
    }

    axios.put(this.props.contentFunctions.getApi() + 'resident/type/update',{},{headers:{residentid:this.props.homeContent.residentId,typeid:_typeid}})
    .then(res=>{
      //console.log(res)
    });
    this.setState({
      currentResType: _typeid
    });
  }

  render(){

    if(this.state.resTypes === undefined){
      return <div/>
    }

    let typeOptions = this.state.resTypes.map((type,i)=>{
      return <option
              key={i}
              style={{
                color: type.id === 1? '#0EAB9F': type.id === 2?'#D5515C': type.id === 3?'#E8AE2B': '#6D6B6A',
                textAlign: 'center'
              }}>{type.typeName}</option>
    });

    let residentRowStyle = {
      width: '100%',
      height: '75px',
      backgroundColor: '#C5C4C3',
      display: 'flex',
      flexFlow: 'row nowrap',
    }

    let residentRowItemStyle = {
      flex: 10,
      height: '73px',
      backgroundColor: '#fffaf2',

      fontFamily: 'adobestdb',
      fontSize: '2.5em',
      fontWeight: 'bold',
      color: '#6D6B6A',
      textAlign: 'center',
      lineHeight: 1,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      marginTop: '1px',
      marginLeft: '1px',
      marginRight: '1px',
      marginBottom: '1px'
    }
    //console.log(this.props.homeContent);
    return(
      <div style={Object.assign({},residentRowStyle)}>
        <div style={residentRowItemStyle}>
          {this.profile && this.profile.BedNo}
        </div>
        <div style={residentRowItemStyle}>
          {this.props.homeContent.residentName }
        </div>
        <div style={residentRowItemStyle}>
          {this.props.homeContent.stamp}
        </div>
        <div style={residentRowItemStyle}>
          {this.props.homeContent.gradeName}
        </div>
        <div style={Object.assign({},residentRowItemStyle,{flex: 5})}>
          <select style={{
            fontFamily: 'adobestdb',
            fontSize: '0.9em',
            fontWeight: 'bold',
            textAlign: 'center',
            color:
            this.state.currentResType === 1? '#0EAB9F':
            this.state.currentResType === 2?'#D5515C':
            this.state.currentResType === 3?'#E8AE2B':
            '#6D6B6A',

            width: '150px',
            height: '60px'

          }} value={this.state.resTypes[this.state.currentResType].typeName} onChange={this.handleSelectResType.bind(this)}>
            {typeOptions}
          </select>
        </div>
        <div style={residentRowItemStyle}>
          <button className="detailButton" onClick={()=>{this.props.contentFunctions.showDetail(this.props.homeContent)}}/>
        </div>
      </div>
    )
  }
}

export default ResidentRow;
