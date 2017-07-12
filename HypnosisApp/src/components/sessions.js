import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {
  Card,
  CardAction,
  CardContent,
  CardTitle
} from 'react-native-card-view';

import Button from 'apsl-react-native-button';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import styles from '../styles';

export default class SessionsScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'جلسه‌ها',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="earphones" size={32} color={ focused ? 'rgb(0,0,0)' : 'rgb(204,204,204)'}/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      refreshing: false
    }
    this.reloadSessions = this.reloadSessions.bind(this);
    this.openSession = this.openSession.bind(this);
    this.reloadSessions(false);
  }

  renderCard = (session) => {
    return(
      <Card key={session.id}>
        <CardTitle>
          <Text style={[styles.sessionsCardTitle,styles.rtl]}>{session.title}</Text>
        </CardTitle>
        <CardContent>
          <Text style={[styles.sessionsCardContent,styles.rtl]}>{session.description}</Text>
        </CardContent>
        
          <Button
            style={styles.positive}
            textStyle={styles.buttonText}
            onPress={() => this.openSession(session)}>
              شروع
          </Button>
      </Card>
    );
  }

  reloadSessions = (forceReload) => {

    if (forceReload) {
      global.storage.remove({key:'sessions'});
    }

    var self = this;
    global.storage.load({
      key: 'sessions',
      autoSync: true
    }).then(ret => {
      self.setState({sessions: ret.sessions});
    }).catch(err => {
      console.error(err);
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.setState({sessions: []});
    this.reloadSessions(true);
    this.setState({refreshing: false});

  }

  openSession = (session) => {
    var id = session.id;

    if (!session.preSurvey || session.preSurvey.questions.length==0) {
      this.props.navigation.navigate('SessionInfo',{session: session});
      return;
    }

    this.props.navigation.navigate('Questions',{postSession: false, session: session});
  }

  render() {

    return (
      <ScrollView style={[styles.container,styles.sessionsScrollView]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <Text style={[styles.sessionsTopInstructions, styles.rtl]}>
با گوش دادن به جلسه‌های موجود و کسب امتیاز، جلسه‌های ستاره‌دار، به رایگان برایتان قابل دسترس می‌شود.
        </Text>
        <View style={{flex: 1}}>
          {this.state.sessions.map(this.renderCard)}
        </View>
      </ScrollView>
    );
  }
}
