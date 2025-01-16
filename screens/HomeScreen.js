// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.image} />
      <Text style={styles.title}>{item.show.name}</Text>
      <Text style={styles.summary}>{item.show.summary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'gray',
    margin: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  summary: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;
