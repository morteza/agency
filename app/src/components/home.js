/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PieChart from 'react-native-pie-chart';

export default class HomeScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'خانه',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="pie-chart" size={26} color={ focused ? 'rgb(0,0,0)' : 'rgb(204,204,204)'}/>
    ),
  };

  render() {
    //TODO improve charting
    const progress = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={[styles.header,styles.rtl]}>
            به هیپنوتیزمِ شناختی خوش آمدید!
          </Text>
          <Text style={[styles.content,styles.rtl]}>
            برای شروع، به صفحهٔ جلسات مراجعه کنید.
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={[styles.header,,styles.rtl]}>نمودار پیشرفت</Text>
          <PieChart
            chart_wh={250}
            series={progress}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FCFCFC'}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    paddingTop: 30
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  rtl: {
    fontFamily: 'Samim'
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});