import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;
import Navigation from './Nav'






const Main = React.createClass({
  //
  componentDidMount(){  ///est
    let node =  findDOMNode(this);  ///retourne tout le div.
    TweenMax.from(node,1,{
      opacity: 0,  x:  300,  scale: 1.5,
      ease: Power4.easeInOut
    })
  },
  render() {
    return (
      <div>
        <div>
          <div>
            <Navigation />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

export default Main
