import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;
import Clock from './Clock'
import CountdownForm from './CountdownForm';
import Controls from './Controls';


const Countdown = React.createClass({
 // createPerson(){  ///possible d'ajouter du data on this. mais ca reste ici, sur le fichier,
 //   this.axe = {
 //      prenom: 'Benoit',
 //      nom: 'Lafrance'
 //    }
 // },
  getInitialState(){
    return  {
     count: 0,   ///on fait un state, pour mofier une etat, 'est comme ca qu on doit rafraichhir le data
     countDownStatus: 'stopped'
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
  componentDidUpdate(prevProps, prevState){   ///va animer au moment que le state change

     if(this.state.countDownStatus !==  prevState.countDownStatus) {  // veut dire qu il y a eu transfo  de stpped ou started, ou..
         switch (this.state.countDownStatus){
           case 'started' :
           this.startTimer()
           break;
           case  'stopped' :
           this.setState({count: 0})
           case  'paused' :
           clearInterval( this.timer )  //this.timer , est pour avoir acces ici dnas le switch.
           this.timer =  undefined
           break
         }
       }
      },
    startTimer(){

        this.timer = setInterval(() => {   //this.timer , est pour avoir acces ailleurs, pour l arreter.
        let newCount = this.state.count - 1;
        this.setState({
          count: newCount >= 0 ? newCount : 0
        })

        if(newCount === 0) {
          this.setState({
             countDownStatus: 'stopped'
          })
        }
      }, 1000);


    },
    componentWillUpdate(){   ///va animer au moment que le state change  === componentDidUpdate pour anim
        let node =  findDOMNode(this);  ///retourne tout le div.
        TweenMax.from(node,0.99,{
          scale: 1.01,
          ease: Back.easeOut.config(10)
        })
      },
    componentWillUnmount(){  //va etre lancer quand le component se fait enlever de l ecran quand on sort de countdown.
      clearInterval( this.timer )  //this.timer , est pour avoir acces ici dnas le switch.
      this.timer =  undefined
      console.log('disparu!! ')  //si on va sur timer ca pop
    },
  handleCountdown(strSecondes){  //recoit ce qui est envoye,strsecond vient de la form,
     this.setState({
       count: strSecondes ,   //c'est comme ca qu on doit rafraichhir le data
       countDownStatus: 'started'
     })
  },
  handleStatusChange(newStatus){

    this.setState({
      countDownStatus: newStatus
    })
  },
  render() {
    let {count, countDownStatus} = this.state  // en le passant en props, control a acces au 'paused et started'
    let renderControlArea = () => {
      if(countDownStatus !== 'stopped') {
        return <Controls countDownStatus={countDownStatus}  onStatusChange={this.handleStatusChange} /> ;
      } else {
        return  <CountdownForm onSetCountdown={this.handleCountdown} />;
      }
    }
   
    $('input').on('click', function (){
      $(this).toggleClass('test');
      console.log(this)
    })
    return (
      <div className="component">
        <Clock totalSecondes={this.state.count} />
        {renderControlArea()}
        {/*   on recoit la props de submit, fait props, qui avec la fn s occupe du data */}
        <h1 className="countdown">Countdown App</h1>
        {/*   {this.createPerson()}  */}
      </div>
    )
  }
});

export default Countdown
