import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Card = ({ imageSource, name }:any) => {
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowOffset: { width: 1, height: 1 }, // Shadow for iOS
    shadowColor: 'black', // Shadow for iOS
    shadowOpacity: 0.3, // Shadow for iOS
    margin: 10,
    alignItems: 'center',
    marginHorizontal:40
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color:'black'
  },
});

export default Card;
