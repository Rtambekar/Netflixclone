// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
    const { movie } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: movie.image.medium }} style={styles.image} />
            <Text style={styles.title}>{movie.name}</Text>
            <Text>{movie.summary}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    image: { width: 300, height: 450 },
    title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
});

export default DetailsScreen;
