import React, { Component } from 'react';
import './modal.scss';

export class ModalChoose extends Component {
  clickOk = () => {
    this.props.stateModalChoose(false);
    this.props.onDelete(this.props.id);
    this.props.stateModalConfirm(true);
  };

  clickCancel = () => {
    this.props.stateModalChoose(false);
  };

  render() {
    return (
      <div className='overlay'>
        <div className='modal'>
          <div className='label'>
            Are you sure you want to invite user with id = {this.props.id}?
          </div>
          <div className='btnBlock'>
            <div className='btn btnOk' onClick={this.clickOk}>
              YES
            </div>
            <div className='btn btnCancel' onClick={this.clickCancel}>
              NO
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ModalConfirm extends Component {
  clickOk = () => {
    this.props.stateModalConfirm(false);
  };

  render() {
    return (
      <div className='overlay'>
        <div className='modal'>
          <div className='label'>Invitation sent</div>
          <div className='btnBlock'>
            <div className='btn btnOk' onClick={this.clickOk}>
              OK
            </div>
          </div>
        </div>
      </div>
    );
  }
}
