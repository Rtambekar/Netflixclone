import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMovies = (query) => {
    if (!query) {
      setMovies([]);
      return;
    }

    setLoading(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((data) => setMovies(data || []))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  const renderItem = ({ item }) => {
    if (!item || !item.show) return null;

    const { image, name, summary } = item.show;

    const sanitizedSummary = summary
      ? summary.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
      : 'No description available';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DetailsScreen', { movie: item.show })}
      >
        {image?.medium ? (
          <Image source={{ uri: image.medium }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]} />
        )}
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.summary}>{sanitizedSummary}</Text>
      </TouchableOpacity>
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
    backgroundColor: '#121212',
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    marginHorizontal: 16,
    marginBottom: 10,
    borderColor: '#424242',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: '#1E1E1E',
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
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  placeholderImage: {
    backgroundColor: '#424242',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  summary: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default SearchScreen;
