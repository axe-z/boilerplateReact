import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;


const ControlTimer = React.createClass({

  onStatusChange(newStatus){  //currying

     return () => {
       this.props.onStatusChange(newStatus)
     };

  },
  componentWillReceiveProps(newProps){
    console.log('component will receivenewProps: ' + newProps.countDownStatus)
  },
  render() {
    let { countDownStatus } = this.props;
    // let testMount = () =>  { ///fn isMounted , quand le module est a l ecran
    //   if(this.isMounted){
    //
    //   //  console.log(this)
    //   }
  //  }
    let renderStartStopButton = () => {
      if(countDownStatus === 'started'){
        return (
          <div>
            <button className='bb' onClick={this.onStatusChange('paused')}>Pause</button>
            <button className="bb" onClick={this.onStatusChange('stopped')}>Clear</button>
          </div>
        )
      } else if (countDownStatus !== 'started') {
          return (
            <div>
              <button className="bb" onClick={this.onStatusChange('started')}>Start</button>
              <button className="bb" onClick={this.onStatusChange('stopped')}>Clear</button>
            </div>
          )
          }
          }
          return (
          <div className="controls">
            {renderStartStopButton()}
          </div>
          )
          }
          });


export default ControlTimer
