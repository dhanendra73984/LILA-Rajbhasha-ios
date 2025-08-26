import React, { useState } from 'react';
import { FlatList, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';

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

  const renderItem = ({ index }: { index: number }) => {
    const handleItemPress = () => {
      // You can replace this URL with your actual video URL
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
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={hindiAlphabets}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={5}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
        <View style={{margin:20}}>
          <Modal
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            {selectedVideo && (
              <Video
                source={{ uri: selectedVideo ?? '' }}
                style={styles.videoPlayer}
                controls
                onEnd={() => {
                  setSelectedVideo(null);
                  setModalVisible(false);
                }}
              />
            )}
            {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity> */}
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
    margin: 13,
    marginBottom: 0,
    elevation: 1,
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


  modalContainer: {
    width: 400, // Set your desired width
    height: 300, // Set your desired height
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    

    borderRadius: 10, // Optional: Add border radius for rounded corners
  },
  
  // videoPlayer: {
  //   width: '100%', // Adjust as needed
  //   height: '100%', // Adjust as needed
  //   alignSelf: 'center',
  //   resizeMode: 'stretch', // Stretch the video
  // },
  videoPlayer: {
    width:'100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover', // Maintain aspect ratio and cover the entire space
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
