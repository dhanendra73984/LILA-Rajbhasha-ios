import React, { useState } from 'react';
import { FlatList, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player'; // Replace with the actual library you're using

const TraceAlphabet = (props: any) => {
  const hindiAlphabets = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः',
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    'क्ष', 'त्र', 'ज्ञ', 'श्र', 'ड़', 'ढ़.', 'फ़', 'ज़',
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const renderItem = ({ index }: { index: number }) => {
    const handleItemPress = () => {
      const videoUrl = `https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Alphabet/Video/Letter${index + 1}.mp4`;
      setSelectedVideo(videoUrl);
      setModalVisible(true);
    };

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.tile}>
          <View style={styles.innerBox}>
            <Text style={styles.text}>{hindiAlphabets[index]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>
       
        <View style={styles.container}>
          <FlatList
            data={hindiAlphabets}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={5}
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
                onTouchStart={() => setControlsVisible(true)} 
              >
                {selectedVideo && (
                    <VideoPlayer
                      source={{ uri: selectedVideo }}
                      videoWidth={100}
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
      </ImageBackground>
    </View>
  );
};



export default TraceAlphabet;

const TILE_SIZE_HEIGHT = 30;
const TILE_SIZE_WIDTH = 55;
const INNER_BOX_WIDTH = 40;
const INNER_BOX_HEIGHT = 25;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  tile: {
    width: TILE_SIZE_WIDTH,
    height: TILE_SIZE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F363F',
    margin: 8,
    marginBottom: 0,
   
    backgroundColor: '#EAF0F1',
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridContainer: {
    padding: 1,
  },
  innerBox: {
    width: INNER_BOX_WIDTH,
    height: INNER_BOX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDA0DD',
    borderWidth: 0.8,
    borderColor: 'black',
  },


  
  // videoPlayer: {
  //   width: '100%', // Adjust as needed
  //   height: '100%', // Adjust as needed
  //   alignSelf: 'center',
  //   resizeMode: 'stretch', // Stretch the video
  // },
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
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
});
