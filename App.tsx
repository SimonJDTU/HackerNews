import React, {FC, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HackerNewsComp from './src/HackerNewsComp';
import {fetchRandomHackerNews} from './src/HackerNewsService';
import {hackerStory} from './src/types';

const App = () => {
  const [data, setData] = useState<hackerStory[]>();

  useEffect(() => {
    fetchRandomHackerNews().then(hackerNews => {
      if (hackerNews !== null) {
        setData(hackerNews);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => <HackerNewsComp item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#c0c0c0',
  },
  contentContainer: {
    margin: 8,
  },
});

export default App;
