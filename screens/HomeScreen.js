import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [sportsMovies, setSportsMovies] = useState([]);
  const sliderRef = useRef(null);
  const navigation = useNavigation();
  const sliderInterval = useRef(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Debugging line
        setMovies(data);

        // Filters for categories
        const popular = data.filter((item) => item.show.rating.average >= 6);
        const comedy = data.filter((item) => item.show.genres.includes('Comedy'));
        const sports = data.filter((item) => item.show.genres.includes('Sports'));

        console.log('Sports Movies:', sports); // Debugging line

        setPopularMovies(popular);
        setComedyMovies(comedy);
        setSportsMovies(sports);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (popularMovies.length > 0) {
      let currentIndex = 0;
      sliderInterval.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % popularMovies.length;
        sliderRef.current?.scrollToIndex({ index: currentIndex, animated: true });
      }, 2000);
    }
    return () => clearInterval(sliderInterval.current);
  }, [popularMovies]);

  const renderSliderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.sliderItem, { width: screenWidth, height: screenHeight * 0.4 }]}
      onPress={() => navigation.navigate('DetailsScreen', { movie: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.original }}
        style={[styles.sliderImage, { width: screenWidth, height: screenHeight * 0.4 }]}
        resizeMode="cover"
      />
      <Text style={styles.sliderTitle}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  const renderHorizontalMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('DetailsScreen', { movie: item.show })}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Trending Movies Title */}
      <Text style={styles.trendingTitle}>Trending Movies</Text>

      {/* Movie Slider */}
      {popularMovies.length > 0 && (
        <FlatList
          ref={sliderRef}
          data={popularMovies}
          renderItem={renderSliderItem}
          keyExtractor={(item) => item.show.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        />
      )}

      {/* Popular Movies Section */}
      <Text style={styles.sectionHeading}>Popular on Platform</Text>
      <FlatList
        data={popularMovies}
        renderItem={renderHorizontalMovie}
        keyExtractor={(item) => item.show.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalMovieList}
      />

      {/* Comedy Movies Section */}
      <Text style={styles.sectionHeading}>Comedy Movies</Text>
      <FlatList
        data={comedyMovies}
        renderItem={renderHorizontalMovie}
        keyExtractor={(item) => item.show.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalMovieList}
      />

      {/* Sports Movies Section */}
      <Text style={styles.sectionHeading}>Sports Movies</Text>
      <FlatList
        data={sportsMovies}
        renderItem={renderHorizontalMovie}
        keyExtractor={(item) => item.show.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalMovieList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  trendingTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    borderRadius: 8,
  },
  sliderTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sectionHeading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalMovieList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  movieCard: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default HomeScreen;