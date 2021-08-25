import React, {useEffect, useState} from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import HackerNewsComp from './src/HackerNewsComp';
import {fetchRandomHackerNews} from './src/HackerNewsService';
import {hackerStory} from './src/types';

const App = () => {
  const [data, setData] = useState<hackerStory[]>();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    setData([]);
    fetchRandomHackerNews().then(hackerNews => {
      if (hackerNews !== null) {
        setData(hackerNews);
      }
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <Button title={'Press for more News'} onPress={() => fetchNews()} />
        }
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
