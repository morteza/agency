import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  I18nManager,
  TouchableHighlight,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ProgressCircle from 'react-native-progress/Circle';

import Button from 'apsl-react-native-button';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import styles from '../styles';

class HomeScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'خانه',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="pie-chart" size={26} color={ focused ? 'rgb(0,0,0)' : 'rgb(204,204,204)'}/>
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: false,
      preventRTLWorkaroundRestart: false
    };

  }

  async loadProgress() {

  }

  async signup(email, pass) {
      try {
        //await firebase.auth().createUserWithEmailAndPassword(email, pass);
        //console.warn("Account created");
      } catch (error) {
          console.log(error.toString())
      }
  }

  componentWillMount() {

    var self = this;

    global.storage.load({
      key: 'configs',
      autoSync: true
    }).then(ret => {      
      self.setState({preventRTLWorkaroundRestart: ret.preventRTLWorkaroundRestart});
  
      if (!ret.preventRTLWorkaroundRestart && !I18nManager.isRTL) {
        this.props.navigation.navigate('Restart');
      }

    }).catch(err => {
      global.storage.save({
        key: 'configs',
        data: {
          preventRTLWorkaroundRestart: true
        }
      });
      if (!I18nManager.isRTL) {
        this.props.navigation.navigate('Restart');
      }
    });



  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 80, height: 80}}
              source={require('../images/logo.png')}/>
            <Text style={[styles.title,{textAlign: 'center',paddingLeft: 5, paddingRight: 5, marginLeft:0, marginRight: 0},styles.rtl]}>
              هیپنوتیزم شناختی
            </Text>
          </View>

          <Text style={[styles.instructions,styles.rtl]}>
            خوش آمدید! از بخش «جلسه‌ها» شروع کنید و به صوت‌های هیپنوتیزم گوش دهید.
            امتیازِ پیشرفت شما بعد از اجرای کامل یک جلسه و پاسخ به پرسش‌های آن افزایش می‌یابد.
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={[styles.title,styles.rtl]}>پیشرفت شما</Text>
          <ProgressCircle 
            color="#2ecc71"
            thickness={20}
            direction='counter-clockwise'
            size={Dimensions.get('window').width/2}
            progress={this.state.progress}
            formatText={(progress) => this.getProgressText(progress)}
            indeterminate={this.state.indeterminate}
            showsText={true} />
        </View>

        <Button
          style={[{marginTop: 20, marginBottom: 30},styles.transparentButton]}
          textStyle={[styles.buttonText, styles.rtl, {color: 'grey'}]}
          onPress={() => this.props.navigation.navigate('ContactUs')}>
          تماس با ما
        </Button>
      </ScrollView>
    );
  }

  getProgressText() {
    return <Text style={styles.rtl}>{this.state.progress*100}</Text>
  }

  updateProgress(progress) {
    //TODO calc progress
    setTimeout(() => {
      this.setState({ progress: progress/100});
    }, 500);
  }

  componentDidMount() {
    this.updateProgress(62);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadProgress: () => {
      dispatch(Actions.loadProgress())
    }
  }
}

export default connect(state => ({ state: state.progress }), mapDispatchToProps)(HomeScreen);