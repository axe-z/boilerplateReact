import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;
import Clock from './Clock'
import ControlTimer from './ControlTimer';

const Timer = React.createClass({
  getInitialState(){
    return  {
     count: 0,   ///on fait un state, pour mofier une etat, 'est comme ca qu on doit rafraichhir le data
     countDownStatus: 'paused'
    }
  },
  componentDidMount(){  ///est semblable a componentWillMount, will ne trouveras pas le node
    let node =  findDOMNode(this);  ///retourne tout le div.
    let clock = node.children[0];

    TweenMax.set(node, { filter: 'blur(0px)'})

    var tl = new TimelineMax({paused: true});
    tl.from(node,2,{
      opacity: 0,  x:  -10,  delay: 0.9,  filter: 'blur(5px)', rotationY: 0, y: 300, scale: 2,
      ease: Expo.easeOut
    })
    tl.from(clock, 0.3, {
      rotationY: '180deg',
      delay: -1.5,
      ease: Power4.easeInOut
    })
   .play()
      },
  handleCountdown(strSecondes){  //recoit ce qui est envoye,strsecond vient de la form,
     this.setState({
       count: strSecondes ,   //c'est comme ca qu on doit rafraichhir le data
       countDownStatus: 'started'
     })
  },
  componentDidUpdate(prevProps, prevState){   ///va animer au moment que le state change
     if(this.state.countDownStatus !==  prevState.countDownStatus) {  // veut dire qu il y a eu transfo  de paused ou started,
         switch (this.state.countDownStatus){
           case 'started' :
           this.handleStart()
           break;
           case  'stopped' :
           this.setState({count: 0})
           case  'paused' :
           clearInterval( this.timerStart )  //this.timer , est pour avoir acces ici dnas le switch.
           this.timerStart =  undefined
           break
         }
       }
      },
  handleStatusChange(newStatus){
    this.setState({
      countDownStatus: newStatus
    })
  },
  componentWillUnmount(){  //va etre lancer quand le component se fait enlever de l ecran quand on sort de countdown.
    clearInterval( this.timerStart )  //this.timer , est pour avoir acces ici dnas le switch.
    this.timer =  undefined
    console.log('disparu!! ')  //si on va sur timer ca pop
  },
  handleStart(){
        this.timerStart = setInterval(() => {   //this.timer , est pour avoir acces ailleurs, pour l arreter.
        let newCount = this.state.count + 1;
        this.setState({
          count: newCount >= 0 ? newCount : 0
        })
        // if(newCount === 0) {
        //   this.setState({
        //      countDownStatus: 'paused'
        //   })
        //}
      }, 1000);
    },
  render() {
    let {count, countDownStatus} = this.state
    let renderControlArea = () => {
      if(countDownStatus) {
        return <ControlTimer countDownStatus={countDownStatus}  onStatusChange={this.handleStatusChange} /> ;
      }
    }
    return (
      <div className="component">

        <Clock totalSecondes={ count}/>
        {renderControlArea()}
        {/* <Controls onSetCountdown={this.handleCountdown}/> */}
        <h1>Timer App</h1>
      </div>
    )
  }
});

export default Timer
