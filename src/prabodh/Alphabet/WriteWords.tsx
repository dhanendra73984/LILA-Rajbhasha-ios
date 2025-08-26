import React, { useState } from 'react';
import { FlatList, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player'; // Replace with the actual library you're using

const WriteWords = (proos:any) => {

  const hindiAlphabets = [
    'अक्टूबर', 'उल्लू', 'कमल', 'ग्रीष्म', 'चश्मा' ,'दुल्हन' ,'धन' , 'धनुर्धर' ,'ध्यान', 'पत्थर', 'प्रणाम' ,'प्रधान', 'ब्रह्मपुत्र' ,'भय' ,'रस्सी', 'लकड़ी' ,'वात' ,'सघन' ,'सभ्य' ,'सभा'
  ];
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const handleItemPress = () => {
      const videoUrl = `https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Alphabet/Video/Word${index + 1}.mp4`;
      setSelectedVideo(videoUrl);
      setModalVisible(true);
    };
  
    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.tile}>
        <View style={styles.innerBox}>
          <Text style={styles.text}>{item}</Text>
          </View>
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
         <View style={{marginTop:20}}>
              <FlatList
                data={hindiAlphabets}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.gridContainer}
              />

         </View>

         <View style={{ margin: 20 }}>
         <Modal
              visible={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
              animationType="slide"
              transparent={true}
            >
              <View
                style={[styles.blueBackground]}
                onTouchStart={() => setControlsVisible(true)} // Show controls on touch
              >
                {selectedVideo && (
                    <VideoPlayer
                      source={{ uri: selectedVideo }}
                      videoWidth={100} // Set the video width to the window width
                      videoHeight={80} // Set the video height to the window height
                      autoplay
                      showDuration={true}
                      controlsTimeout={2000}
                      disableControlsAutoHide={true}
                      defaultMuted={true}
                      disableSeek={true}
                      pauseOnPress={true}
                      style={{ alignSelf: 'stretch' }}
                      fullScreenOnLongPress={true} // Enable full-screen on long press
                      onEnd={() => {
                        setSelectedVideo(null);
                        setModalVisible(false);
                      }}
                      onError={(error) => {
                        console.error('VideoPlayer error:', error);
                        // Handle the error as needed
                      }}
                      onLoad={() => setControlsVisible(true)} // Show controls on video load
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <MaterialIcons name="close" size={12} color="white" />
                  </TouchableOpacity>
              </View>
            </Modal>
        </View>
         </View> 

    

    </ImageBackground>
    </View>
  )
}

export default WriteWords
const TILE_SIZE_HIGHT = 40;
const TILE_SIZE_WIDTH = 100;
const INNER_BOX_WIDTH = 80;
const INNER_BOX_HIGHT = 30;
const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  // #ffccff
  tile: {
    width: TILE_SIZE_WIDTH,
    height: TILE_SIZE_HIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F363F',
    margin: 8,
    marginBottom:0,
    
    backgroundColor: '#EAF0F1',
    

    
  },
  text: {
      color: 'black', // White text color,
    fontSize: 15,
    fontWeight:'bold'
  },
  gridContainer: {
    padding: 1,
  },
  innerBox: {
    width: INNER_BOX_WIDTH,
    height: INNER_BOX_HIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDA0DD', // semi-transparent white background#DDA0DD

    borderWidth: 0.8,
    borderColor: 'black',
    
  },
  blueBackground: {
    backgroundColor: 'white', // Add your desired background color
    marginTop:230
    
  },


  closeButton: {
    position: 'absolute',
    top: -20,
    right: 0,
    padding: 4,
    backgroundColor: 'black',
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    backgroundColor:'black'
  },
})