import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {displayObject} from './types';

const HackerNewsComp: FC<displayObject> = ({item}) => {
  return (
    <View style={styles.card}>
      <Text>Story title: {item.title}</Text>
      <Text>Story URL: {item.url}</Text>
      <Text>Story timestamp: {new Date(item.time).toLocaleString()}</Text>
      <Text>Story score: {item.score}</Text>
      <Text>Written by: {item.by}</Text>
      <Text>Who has: {item.karma} karma</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
});

export default HackerNewsComp;
