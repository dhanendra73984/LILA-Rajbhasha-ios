import React, { JSX } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); 

import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  Homechnagescreen: undefined; // No parameters
};

type HomechangeStackNavigationProp = StackNavigationProp<RootStackParamList, 'Homechnagescreen'>;


const Dictionarytitles = (props:any) => {

  const hindiAlphabets = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ','अं','अः',
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    'क्ष', 'त्र', 'ज्ञ','श्र' , 'ड़' , 'ढ़.' , 'फ़', 'ज़',
  ];

  //  const navigation = useNavigation();
  const { ApiResponse, Package, Medium } = props.route.params;   
  // Assuming ApiResponse is an array
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);

  // Fetch data at specific indexes
   const titleofdictionary = langWiseWords[24];
  const instructionofdictionary = langWiseWords[157];

  // Function to handle the back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Function to handle the home button press
  // const handleHomePress = () => {
  //   // Navigate to the home screen or the desired screen
  //   // props.navigation.goBack();
  //   props.navigation.navigate('Homechnagescreen')
  // };
  const navigation = useNavigation<HomechangeStackNavigationProp>();
  
  const handleHomePress = () => {
    props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };




  const renderItem: ({ item, index }: { item: string; index: number }) => JSX.Element = ({ item, index }) => {
    const handlePress = async () => {
      try {
        // Perform the Axios POST request
        const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getDictionaryAlbhabet/', {
          LangSelected: Medium, // Assuming Medium is the variable representing LangSelected
          PackSelected: Package, // Assuming Package is the variable representing PackSelected
          Alphabet: index + 1, // Assuming index starts from 0, add 1 to match the expected Alphabet value
        },{timeout:500000});
    
        // Handle the response as needed
        // console.log('Axios Response:', response.data);
    
        // Navigate to another component (DictionaryList)
        props.navigation.navigate('Dictionarylist', {
          ApiResponseofAlphabet: response.data,
          ApiResponse,
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
    <View style={{ flex: 1 }}>
      {/* Your header */}

      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
      <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{titleofdictionary}</Text>

        {/* Right side - Home icon */}
        <TouchableOpacity onPress={handleHomePress}>
          <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" />
        </TouchableOpacity>
      </View>

      </SafeAreaView>

      {/* Your screen content */}
      <ImageBackground
        source={require('../../../assets/img/bg.png')} // Provide the path to your image
        style={styles.containerofimage}
      >
        {/* Your screen content goes here */}
      <ScrollView>
          <View>
          {/* title of dictionary */}
          <Text style={{margin:10,fontSize:14,textAlign:'justify',color:'black',fontWeight:'bold'}}>{titleofdictionary}</Text>
            {/* instruction for dictionary */}
            <Text style={{margin:10,fontSize:14,textAlign:'justify',color:'black',marginBottom:20,marginTop:18,lineHeight: 20,}}>{instructionofdictionary}</Text>
            
          
              
            
              
            </View>

            <View  style={styles.containeroftiles}>
              {/* renderring tiles of alphabet */}
              <FlatList
                data={hindiAlphabets}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={5}
                contentContainerStyle={styles.gridContainer}
              />
  
                
          

          
{/*             
            <Text>Package: {Package}</Text>
            <Text>Medium: {Medium}</Text> */}
            </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};



const TILE_SIZE = 50;

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#0D6EFD',
    paddingVertical: 12,  }
 ,
  headerIcon: {
    width: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20, // Adjust the font size as needed
  },
  containerofimage:{
    flex:1

  },
  cantaineroftiles:{

  }
,
  // titles container

  gridContainer: {
   
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: '2%',//margin fro the letters
    marginBottom:0,
    elevation:1,
    backgroundColor: '#0D6EFD',
    borderRadius: 5,
  },
  text: {
      color: 'white', // White text color,
    fontSize: 18,
  },

  // toast: {
  //     position: 'absolute',
  //     bottom: 20,
  //     left: 20,
  //     backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //     color: 'white',
  //     padding: 10,
  //     borderRadius: 5,
  //   },
  containeroftiles:{
    justifyContent:'center',
    alignItems:'center'
    
  },
  
})

export default Dictionarytitles;
