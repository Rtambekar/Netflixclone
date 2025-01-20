import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  const { name, image, summary } = movie;

  // Sanitize summary to remove HTML tags
  const sanitizedSummary = summary
    ? summary.replace(/<\/?[^>]+(>|$)/g, '')
    : 'No description available';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {image?.original && (
          <Image
            source={{ uri: image.original }}
            style={styles.movieImage}
            resizeMode="contain" // Ensures the full image is visible
          />
        )}
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{sanitizedSummary}</Text>
      </ScrollView>
    </View>
  );
};

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Ensures consistent background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  movieImage: {
    width: screenWidth - 32, // Adjust width to leave padding
    height: (screenWidth - 32) * 1.5, // Maintain a 2:3 aspect ratio
    alignSelf: 'center', // Center the image horizontally
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
});

export default DetailsScreen;
