/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/

import React, {Component} from 'react';
import GlobalHeader from '../Components/GlobalHeader';
import SlideShow from '../Components/SlideShow';
import {View, StyleSheet, ScrollView} from 'react-native';
import RecommendationArea from '../Components/RecommendationArea';
import ClassificationOfGoods from '../Components/ClassificationOfGoods';
import {Button} from 'react-native-elements';

export default class MainPages extends Component {
  private props: any;
  render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <GlobalHeader navigation={this.props.navigation} />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
          <ClassificationOfGoods />
        </View>
        <View style={styles.headerContainer} />
        <View style={styles.slideshowContainer} />
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.recommendationAreaContainer}>
          <RecommendationArea navigation={this.props.navigation} />
        </View>
        <View style={styles.headerContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('detailPage')}
            title=" MyHomeScreen ----> open drawer"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF0F5',
  },
  headerContainer: {
    flex: 1,
  },
  slideshowContainer: {
    flex: 5,
  },
  ClassificationContainer: {
    flex: 3,
  },
  recommendationAreaContainer: {
    flex: 20,
  },
});
