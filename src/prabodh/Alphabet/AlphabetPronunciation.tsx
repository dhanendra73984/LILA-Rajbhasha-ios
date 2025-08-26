import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SoundPlayer from 'react-native-sound-player';

const AlphabetPronunciation = (proos:any) => {

  const hindiAlphabets = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ','अं','अः',
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    'क्ष', 'त्र', 'ज्ञ','श्र' , 'ड़' , 'ढ़.' , 'फ़', 'ज़',
  ];
 

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const handleItemPress = async () => {
      try {
        const url = `https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Alphabet/Audio/Letter${index + 1}.mp3`;
  
        // Play the sound file using react-native-sound-player
        SoundPlayer.playUrl(url);
  
        // Handle other actions if needed
        console.log(`Pressed on ${item}`);
        console.log('Playing audio file:', url);
      } catch (error) {
        console.error('Error playing audio file:', error);
      }
    };
  
    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.tile}>
          <Text style={styles.text}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground
        source={require('../../../assets/img/bg.png')}
        style={styles.backgroundImage}>

           <View style={styles.container}>
              <FlatList
                data={hindiAlphabets}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={5}
                contentContainerStyle={styles.gridContainer}
              />
              </View>

    

    </ImageBackground>
    </View>
  )
}

export default AlphabetPronunciation
const TILE_SIZE = 50;
const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: '3%',//margin fro the letters
    marginBottom:3,
    elevation:1,
    backgroundColor: '#0D6EFD',
    borderRadius: 5,
  },
  text: {
      color: 'white', // White text color,
    fontSize: 16,
  },
  gridContainer: {
    padding: 10,
  },
  container:{
    justifyContent:'center',
    alignContent:'center'
  }
})