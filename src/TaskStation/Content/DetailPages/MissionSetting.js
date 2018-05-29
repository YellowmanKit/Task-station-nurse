import React, { Component } from 'react';
import '../Content.css';
import axios from 'axios';

import MissionRow from '../../Items/MissionRow';

class MissionSetting extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasksSetting:[]
    }
  }

  componentDidMount(){
    this.loadTasksSetting();
  }

  loadTasksSetting(){
    axios.get(this.props.contentFunctions.getApi() + 'resident/simplified/ms/' + this.props.homeContent.residentId).then(res=>{
      //console.log(res.data);
      this.setState({
        tasksSetting: res.data,
      });
      //console.log(this.state.todayTasks);
    });
  }

  renderTaskList(){
    return this.state.tasksSetting.map((_task,i)=>{
      return(
        <MissionRow
        key={i}
        task={_task}
        homeContent={this.props.homeContent}
        contentFunctions={this.props.contentFunctions} />
      )
    });
  }

  render(){

    if(this.state.tasksSetting[0] === undefined){
      return <div/>;
    }

    let _style = {
      width: '100%',
      height: this.props.height,

      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let items = ['任務','完成次數','給予'];

    return(
      <div style={_style}>
        <div className="listTopBar">
          <div className="listTopBarItemFlex3"> {items[0]} </div>
          <div className="listTopBarItem"> {items[1]} </div>
          <div className="listTopBarItem"> {items[2]} </div>
         </div>
        {this.renderTaskList()}
      </div>
    )
  }

}

export default MissionSetting
