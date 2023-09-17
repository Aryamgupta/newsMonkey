import React, { Component } from 'react';
import loading from './loading.gif';
export class Spiiner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img height=''  src={loading} alt="" />
      </div>
    );
  }
}

export default Spiiner;
