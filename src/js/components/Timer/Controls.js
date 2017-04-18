import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;


const Controls = React.createClass({

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
        return <button   className='bb' onClick={this.onStatusChange('paused')}>Pause</button>
          } else if (countDownStatus === 'paused') {
          return <button className="bb" onClick={this.onStatusChange('started')}>Start</button>
          }
          }
          return (
          <div className="controls">
            {renderStartStopButton()}
            <button className="bb" onClick={this.onStatusChange('stopped')}>Clear</button>
            {/*  {testMount()}  quand le module est a l ecran  */}
          </div>
          )
          }
          });


export default Controls
