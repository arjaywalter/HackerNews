import React, { useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import TimeAgo from 'react-native-timeago';

import { getTopStories } from '../store/reducers/storySlice';

function Home({ navigation }) {
  const dispatch = useDispatch();
  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    data,
  } = useSelector(state => state.story);

  useEffect(() => {
    dispatch(getTopStories({}));
  }, []);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const renderItem = ({ item }) => {
    const { title, url, time, score, id, by, karma } = item;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{title} *{score}</Text>
        <Text>by {by} ({karma})</Text>
        {!_.isEmpty(url) && <Text style={styles.url}
          onPress={() => Linking.openURL(url)}>
          {url}
        </Text>}
        <TimeAgo time={time * 1000} />
      </View>
    );
  };

  const renderList = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );

  return renderList();
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 8,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  url: { color: 'blue' },
});

export default Home;
