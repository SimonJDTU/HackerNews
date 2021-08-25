import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {hackerStory} from './types';

interface displayObject {
  item: hackerStory;
}

const HackerNewsComp: FC<displayObject> = ({item}) => {
  return (
    <View style={styles.card}>
      <MyText>Story title: {item.title}</MyText>
      <MyText>Story URL: {item.url}</MyText>
      <MyText>Story timestamp: {new Date(item.time).toLocaleString()}</MyText>
      <MyText>Story score: {item.score}</MyText>
      <MyText>Written by: {item.by}</MyText>
      <MyText>Who has: {item.karma} karma</MyText>
    </View>
  );
};

const MyText: FC = props => {
  return <Text numberOfLines={1}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
});

export default HackerNewsComp;
