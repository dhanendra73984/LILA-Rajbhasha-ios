import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

interface AlphabetGridprabodhProps {
  ApiResponse: any;
  Package: any;
  Medium: any;
}



const AlphabetGridprabodh: React.FC<AlphabetGridprabodhProps> = ({ ApiResponse, Package, Medium,},props:any) => {
    const [visibleToast, setVisibleToast] = useState(false);
  
    // Define Hindi alphabets from अ to ज्ञ
    const hindiAlphabets = [
      'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ','अं','अः',
      'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
      'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
      'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
      'क्ष', 'त्र', 'ज्ञ','श्र' , 'ड़' , 'ढ़.' , 'फ़', 'ज़',
    ];
   

   


    const renderItem: ({ item, index }: { item: string; index: number }) => JSX.Element = ({ item, index }) => {
      const handlePress = async () => {
        try {
          // Perform the Axios POST request
          const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getDictionaryAlbhabet/', {
            LangSelected: Medium, // Assuming Medium is the variable representing LangSelected
            PackSelected: Package, // Assuming Package is the variable representing PackSelected
            Alphabet: index + 1, // Assuming index starts from 0, add 1 to match the expected Alphabet value
          });
      
          // Handle the response as needed
          // console.log('Axios Response:', response.data);
      
          // Navigate to another component (DictionaryList)
          props.navigation.navigate('Dictionarylist', {
            ApiResponseofAlphabet: response.data,
            Package: Package,
            Medium: Medium,
            Index: index + 1, // Passing the index + 1 to the next component
          });
        } catch (error) {
          // Handle errors
          console.error('Axios Error:', error);
        }
      };
    
      return (
        <TouchableOpacity
          style={styles.tile}
          onPress={handlePress}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      );
    }; 
      
    
  
    return (
      <View>
        <FlatList
          data={hindiAlphabets}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={5}
          contentContainerStyle={styles.gridContainer}
        />
  
       
      </View>
    );
  };
  
  const TILE_SIZE = 50; // Adjust this value to set the desired tile size

  const styles = StyleSheet.create({
    gridContainer: {
      padding: 18,
    },
    tile: {
      width: TILE_SIZE,
      height: TILE_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      margin: 13,//margin fro the letters
      marginBottom:0,
      elevation:1,
      backgroundColor: '#0D6EFD',
      borderRadius: 5,
    },
    text: {
        color: 'white', // White text color,
      fontSize: 18,
    },
    toast: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: 10,
        borderRadius: 5,
      },
  });
  
  export default AlphabetGridprabodh;

