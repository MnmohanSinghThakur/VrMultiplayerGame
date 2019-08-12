// import React from 'react';
// import * as Ably from 'ably';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-360';

// export default class Hello360 extends React.Component {
//   render() {
//     return (
//       <View style={styles.panel}>
//         <View style={styles.greetingBox}>
//           <Text style={styles.greeting}>
//             Welcome to React 360
//           </Text>
//         </View>
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   panel: {
//     // Fill the entire surface
//     width: 1000,
//     height: 600,
//     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   greetingBox: {
//     padding: 20,
//     backgroundColor: '#000000',
//     borderColor: '#639dda',
//     borderWidth: 2,
//   },
//   greeting: {
//     fontSize: 30,
//   },
// });

// AppRegistry.registerComponent('Hello360', () => Hello360);
import React from 'react';
import * as Ably from 'ably';
import {
  AppRegistry,
  Environment,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

class Background extends React.Component {
  constructor(props) {
    super();
    Environment.setBackgroundImage(props.uri, {format: props.format});
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uri !== this.props.uri ||
      nextProps.format !== this.props.format
    ) {
      Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
    }
  }

  render() {
    return null;
  }
}

class Slideshow extends React.Component {
  state = {
    index: 0,
    r1Text: '<',
    r2Text: '>',
    r3Text: '<',
    r4Text: '>',
    r5Text: '<',
    r6Text: '>',
    r7Text: '<',
    r8Text: '>',
    r9Text: '>',
    player: '',
    won:'',
  };

  _prevPhoto = () => {
    let next = this.state.index - 1;
    if (next < 0) {
      next += this.props.photos.length;
    }
    this.setState({
      index: next,
    });
  };
  _r1Button = () =>  {
    this._buttonClicked('r1');
  }
  _r2Button = () =>  {
    this._buttonClicked('r2');
  }
  _r3Button = () => {
    this._buttonClicked('r3');
  }
  _r4Button = () => {
    this._buttonClicked('r4');
  } 
  _r5Button = () =>  {
    this._buttonClicked('r5');
  }
  _r6Button = () => {
    this._buttonClicked('r6');
  }  
  _r7Button = () => {
    this._buttonClicked('r7');
  }  
  _r8Button = () => {
    this._buttonClicked('r8');
  }  
  _r9Button = () => {
    this._buttonClicked('r9');
  }  
  _firstPlayerSelected = () => {
    this.setState({player:'p1'});
  } 
  _secondPlayerSelected = () => {
    this.setState({player:'p2'});
  } 
  _checkIfAnyoneWon = () => {
    if(this.state.r1Text=='<' && this.state.r2Text=='<' && this.state.r3Text=='<'){
      return true;
    }
    if(this.state.r4Text=='<' && this.state.r5Text=='<' && this.state.r6Text=='<'){
      return true;
    }
    if(this.state.r7Text=='<' && this.state.r8Text=='<' && this.state.r9Text=='<'){
      return true;
    }
    if(this.state.r1Text=='>' && this.state.r2Text=='>' && this.state.r3Text=='>'){
      return true;
    }
    if(this.state.r4Text=='>' && this.state.r5Text=='>' && this.state.r6Text=='>'){
      return true;
    }
    if(this.state.r7Text=='>' && this.state.r8Text=='>' && this.state.r9Text=='>'){
      return true;
    }
    return false;
  }
  _buttonClicked = (buttonNumber) => {
    var ably = new Ably.Realtime('X_0TBQ.7cS0EQ:-TaethfSHyZ7JEza');
    channel = ably.channels.get('quickstart');
      ably.connection.on('connected', () => {
        console.log("That was simple, you're now connected to Ably in realtime");
        channel.publish('greeting', buttonNumber);
        console.log("published")
      });
      // this.setState({
      //   index: this.state.index + 1,
      // });    
  };

  render() {
    const current = this.props.photos[
      this.state.index % this.props.photos.length
    ];
    var element=null;
    if(this.state.player===''){
      element=(
      <View style={styles.wrapper}>
        <Background uri={current.uri} format={current.format} />
          <View style={styles.controls}>
            <VrButton onClick={this._firstPlayerSelected} style={styles.button}>
              <Text style={styles.buttonText}>{'p1'}</Text>
            </VrButton>
            <VrButton onClick={this._secondPlayerSelected} style={styles.button}>
              <Text style={styles.buttonText}>{'p2'}</Text>
            </VrButton>
          </View>
      </View>
      );
    }
    else{
    console.log(this._checkIfAnyoneWon());
    if(this._checkIfAnyoneWon()){
      element=(
      <View style={styles.wrapper}>
      <Background uri={current.uri} format={current.format} />
        <View style={styles.controls}>
          <Text style={styles.title}>{"Game Over..."}</Text>
        </View>
      </View>
      );     
    }
    else {
    element=(
      <View style={styles.wrapper}>
        <Background uri={current.uri} format={current.format} />
          <View style={styles.controls}>
            <VrButton onClick={this._r1Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r1Text}</Text>
            </VrButton>
          
            <VrButton onClick={this._r2Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r2Text}</Text>
            </VrButton>
            <VrButton onClick={this._r3Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r3Text}</Text>
            </VrButton>
            <VrButton onClick={this._r4Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r4Text}</Text>
            </VrButton>
            <VrButton onClick={this._r5Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r5Text}</Text>
            </VrButton>
            <VrButton onClick={this._r6Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r6Text}</Text>
            </VrButton>
            <VrButton onClick={this._r7Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r7Text}</Text>
            </VrButton>
            <VrButton onClick={this._r8Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r8Text}</Text>
            </VrButton>
            <VrButton onClick={this._r9Button} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.r9Text}</Text>
            </VrButton>
          </View>
      </View>
    );
    }
  }
  return element;
}
  componentDidMount(){
      var ably = new Ably.Realtime('X_0TBQ.7cS0EQ:-TaethfSHyZ7JEza');
      channel = ably.channels.get('quickstart');
      channel.subscribe('greeting', (message)=> {
        console.log("Received a greeting message in realtime: " + message.data);
        switch(message.data){
          case 'r1':
            if(this.state.r1Text==='<')this.setState({r1Text:">"});
            else this.setState({r1Text:'<'});
            break;
          case 'r2':
            if(this.state.r2Text==='<')this.setState({r2Text:">"});
            else this.setState({r2Text:'<'});
            break;
          case 'r3':
            if(this.state.r3Text==='<')this.setState({r3Text:">"});
            else this.setState({r3Text:'<'});
            break;
          case 'r4':
            if(this.state.r4Text==='<')this.setState({r4Text:">"});
            else this.setState({r4Text:'<'});
            break;
          case 'r5':
            if(this.state.r5Text==='<')this.setState({r5Text:">"});
            else this.setState({r5Text:'<'});
            break;
          case 'r6':
            if(this.state.r6Text==='<')this.setState({r6Text:">"});
            else this.setState({r6Text:'<'});
            break;
          case 'r7':
            if(this.state.r7Text==='<')this.setState({r7Text:">"});
            else this.setState({r7Text:'<'});
            break;
          case 'r8':
            if(this.state.r8Text==='<')this.setState({r8Text:">"});
            else this.setState({r8Text:'<'});
            break;
          case 'r9':
            if(this.state.r9Text==='<')this.setState({r9Text:">"});
            else this.setState({r9Text:'<'});
            break;
        }

        this.setState({
          index: this.state.index + 1,
        });
      });
      console.log("Set up subscription");
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    width: 1000,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    flexWrap:'wrap',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    alignContent:'space-around',
    width: 400,
    height:400,
    padding: 10,
  },
  title: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 36,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 100,
    height:100,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
AppRegistry.registerComponent('SlideshowSample', () => Slideshow);

// var ably = new Ably.Realtime('X_0TBQ.7cS0EQ:-TaethfSHyZ7JEza');
// channel = ably.channels.get('quickstart');
// // channel.subscribe('greeting', (message)=> {
// //   console.log("Received a greeting message in realtime: " + message.data);
// // });
// ably.connection.on('connected', () => {
//   console.log("That was simple, you're now connected to Ably in realtime");
//   channel.publish('greeting', 'hello!');
//   console.log("published")
// });

