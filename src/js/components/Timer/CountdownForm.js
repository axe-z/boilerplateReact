import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;


const CountdownForm = React.createClass({

onSubmit(e){
  e.preventDefault();
  let strSecondes = this.refs.secondes.value

  if(strSecondes.match(/^[0-9]*$/) && strSecondes !== '') {
    console.log(strSecondes)
      this.refs.secondes.value = ''
    this.props.onSetCountdown(parseInt(strSecondes, 10));    ///pour envoyer a l autre component , on fait un func sur le props.
         //parseint pour remmetre le str en number. et base 10
  }///peut rentre juste des chiffres
},
      render() {
      
        return (
       <div>
         <form className="clocktime" ref="form" onSubmit={this.onSubmit}>
           <br />
           <input type="text" ref='secondes' className="search" placeholder="entrer le nombre de secondes"/>
           <br />
           <button type="submit" ref="but" className="submit">commencer</button>
         </form>
       </div>
        )
      }
});

export default CountdownForm
