// SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet } from 'react-native';

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMovies = (query) => {
    if (!query) {
      setMovies([]); // Clear results when query is empty
      return;
    }

    setLoading(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data || []); // Safely handle null or undefined response
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  const renderItem = ({ item }) => {
    if (!item || !item.show) return null; // Safeguard against incomplete data

    const { image, name, summary } = item.show;

    // Safely sanitize summary
    const sanitizedSummary = summary
      ? summary.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
      : 'No description available';

    return (
      <View style={styles.card}>
        {image?.medium ? (
          <Image source={{ uri: image.medium }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]} />
        )}
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
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            searchQuery && (
              <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
            )
          }
        />
      )}
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
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
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
  placeholderImage: {
    backgroundColor: 'darkgray',
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

export default SearchScreen;
