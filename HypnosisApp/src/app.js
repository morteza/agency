import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  I18nManager,
} from 'react-native';

import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';

import defaultSessions from './sessions.default';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

//import ScrollableTabView from 'react-native-scrollable-tab-view';

import HomeScreen from './components/home';
import HelpScreen from './components/help';
import SessionsScreen from './components/sessions';
import AboutScreen from './components/about.js';
import PlayerScreen from './components/player.js';
import QuestionsScreen from './components/questions';
import SessionInfoScreen from './components/sessionInfo.js';

//import IconTabBar from './components/icontabbar';


const AppTabNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Sessions: { screen: SessionsScreen },
  Help: { screen: HelpScreen }
}, {
  lazy: false,
  //tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: 'rgb(0,0,0)',
    inactiveTintColor: 'rgb(204,204,204)',
    showIcon: true,
    showLabel: true,
    style: {
      backgroundColor: '#FCFCFC',
      height: 80,
      borderWidth: 0,
      padding: 0
    },
    tabStyle: {
      margin: 0
    },
    labelStyle: {
      fontFamily: 'samim',
      fontSize: 14,
      paddingBottom: 5
    },
    iconStyle: {
      width: 35,
      height: 30
    }
  },
});

const HypnosisApp = StackNavigator({
  Tabs: { screen: AppTabNavigator },  
  About: { screen: AboutScreen },
  Player: { screen: PlayerScreen },
  SessionInfo: { screen: SessionInfoScreen },
  Questions: { screen: QuestionsScreen }
},{
  initialRouteName: 'Tabs',
  headerMode: 'none',
  mode: 'modal'
});

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);



global.storage = new Storage({
	// maximum capacity, default 1000 
	size: 1000,
	storageBackend: AsyncStorage,
  enableCache: false,
	defaultExpires: null,
	sync : {
    sessions(params){
      loadDefaultSessions(params);
    }
	}
})


loadDefaultSessions = function(params) {
  //global.storage.remove({key:'sessions'});
  global.storage.save({
    key: 'sessions',
    data: defaultSessions
  });
  params.resolve(defaultSessions);

}

AppRegistry.registerComponent('HypnosisApp', () => HypnosisApp);