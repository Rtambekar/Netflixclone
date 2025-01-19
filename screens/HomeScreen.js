
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); // Initialize filtered movies
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = movies.filter((item) => 
      item.show.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const renderItem = ({ item }) => {
    const { image, name, summary } = item.show;

    // Safely handle and sanitize summary
    const sanitizedSummary = summary
      ? summary.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
      : 'No description available';

    return (
      <View style={styles.card}>
        <Image source={{ uri: image?.medium }} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.summary}>{sanitizedSummary}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a show..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMovies}
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
  searchBar: {
    height: 40,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'gray',
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
    textAlign: 'center',
  },
});

export default HomeScreen;
