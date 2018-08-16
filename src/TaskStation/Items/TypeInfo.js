import React, { Component } from 'react';
import TypeInfoImg from 'TaskStation/Images/ETSC029.png';

class TypeInfo extends Component {

  render(){
    if(!this.props.show){
      return null;
    }
    const height = this.props.contentFunctions.getHeight();
    const style = {
      width: window.innerWidth,
      height: height,
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      cursor: 'pointer'
    }
    const imgStyle = {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.65
    }
    return(
      <div style={style} onClick={this.props.contentFunctions.toggleTypeInfo}>
        <div style={{width: '100%', height: window.innerHeight*0.2}}/>
        <img src={TypeInfoImg} style={imgStyle} alt=''/>
      </div>
    )
  }

}

export default TypeInfo;
