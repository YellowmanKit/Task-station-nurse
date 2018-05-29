import React, { Component } from 'react';
import './Item.css';
import mask from '../Images/mask.png';
import Button from './Button';

class Modal extends Component {

  render(){

    if(this.props.modalStatus.status === 'none'){
      return(
        <div/>
      )
    }

    let modalStyle = {
      width: '100%',
      height: this.props.height + 'px',
      backgroundImage: "url(" + mask + ")",
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }

    const status = this.props.modalStatus.status;

    let buttons =
    status === 'waitForConfirm' || 'waitForConfirm_MissionRow'?
    <div className="ConfirmButtonsArea">
      <Button buttonClassName="confirmButton" onButtonClicked={this.props.modalStatus.onConfirm}/>
      <Button buttonClassName="cancelButton" onButtonClicked={this.props.onCancel}/>
    </div>:
    status === 'uploading'?
    <div className="ConfirmButtonsArea"/>:
    status === 'uploaded'?
    <div className="ConfirmButtonsArea">
      <Button buttonClassName="confirmButton"  onButtonClicked={this.props.modalStatus.onConfirm}/>
    </div>:
    status === 'confirmLogout'?
    <div className="ConfirmButtonsArea">
      <Button buttonClassName="confirmButton" onButtonClicked={this.props.modalStatus.onConfirm}/>
      <Button buttonClassName="cancelButton" onButtonClicked={this.props.onCancel}/>
    </div>:
    <div className="ConfirmButtonsArea">
      <Button buttonClassName="cancelButton" onButtonClicked={this.props.onCancel}/>
    </div>;

    let message =
    status === 'waitForConfirm'?
    <p className="ModalMessage">
      確定變更院友類型?
    </p>:
    status === 'waitForConfirm_MissionRow'?
    <p className="ModalMessage">
      確定變更任務指派設定?
    </p>:
    status === 'uploading'?
    <p className="ModalMessage">
      儲存中，請稍等...
    </p>:
    status === 'uploaded'?
    <p className="ModalMessage">
      已成功更改!
    </p>:
    status === 'failed'?
    <p className="ModalMessage">
      上傳失敗，請再試一次!
    </p>:
    status === 'confirmLogout'?
    <p className="ModalMessage">
        確定登出?
    </p>:
    '';

    return(
      <div style={modalStyle}>
        <div className="dialogBox">
            {message}
            {buttons}
        </div>
      </div>
    )
  }

}

export default Modal;
