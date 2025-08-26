import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';
import Sound from 'react-native-sound';

const Poorakpragya = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[46]
  const titleoflessonindex = langWiseWords[75];//headertitle
  const [htmlContent, setHtmlContent] = useState<string | null>(null);


 
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/Pragya/SuppLessons/Lesson${selectedLessonIndex}.htm`,{timeout:500000});
        // Assuming the response data is a string, you may need to parse it based on your API
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedLessonIndex, Medium]);

  
  const [sound, setSound] = useState<Sound | null>(null);

  // Function to play the sound
  const playSound = () => {
    const soundFile = `https://lilaonmobile.rb-aai.in/LILAMobileData/PoorakPath/Poorak${selectedLessonIndex}.mp3`;
    const newSound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Error loading sound:', error);
      } else {
        setSound(newSound);
        newSound.play(() => {
          newSound.release();
        });
      }
    });
  };




  return (

    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>  
          <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>


            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>



        <ImageBackground
          source={require('../../../assets/img/bg.png')} // Provide the path to your image
          style={styles.backgroundImage}>

              <Text style={styles.title}>पूरकपाठ</Text>
              <View style={styles.horizontaline}></View>

              <View style={styles.audioControls}>

                    <TouchableOpacity onPress={playSound} >
                                <MaterialIcons name="volume-up" size={32} color="black" />
                    </TouchableOpacity>
                        

                    <TouchableOpacity onPress={() => { if (sound) sound.pause(); }} style={{ marginLeft: 'auto' }}>
                            <MaterialIcons name="volume-off" size={32} color="black" />
                    </TouchableOpacity>

               </View>






            <View style={styles.container}>
              {htmlContent && (
                  <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    javaScriptEnabled={true}
                    bouncesZoom={true}
                    scalesPageToFit={false}
                    style={{ backgroundColor: 'transparent' }}
                    containerStyle={{ flex: 1, padding: 4, marginRight: 8 }}
                  />
                )}
            </View>

          {/* <View>
            <Text>Objectiveprabodh</Text>
          </View> */}
          </ImageBackground>
    </View>
  )
}

export default Poorakpragya

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
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
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1, // ensures it expands
},
   container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:'center',
    color:'black',
    marginTop:5
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
})