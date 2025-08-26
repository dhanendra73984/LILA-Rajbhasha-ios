import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import SoundPlayer from 'react-native-sound-player';
import { Button } from 'react-native';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');

const Tabledemo = () => {


  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const playSound = () => {
    try {
      SoundPlayer.playUrl('https://www.soundjay.com/buttons/sounds/beep-01a.mp3');
      console.log('Sound started playing');
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  };

  const signatureRef = useRef<SignatureViewRef | null>(null);

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  return (
    <View style={{ flex: 1 }}>




      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tabledemo</Text>

        <View style={styles.tableWrapper}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row data={['A', 'B']} />
            <Rows data={[['1', '2'], ['3', '4']]} />
          </Table>
        </View>

        <Button title="Play Sound" onPress={playSound} />

        <View style={styles.signatureContainer}>
          <SignatureCanvas
            ref={signatureRef}
            style={styles.signatureCanvas}
            webStyle={`
              .m-signature-pad--footer { display: none; }
              body,html {
                margin: 0; 
                padding: 0; 
                height: 100%;
                width: 100%;
              }
              .m-signature-pad {
                box-shadow: none;
                border: none;
                height: 100%;
              }
              canvas {
                height: 100% !important;
                width: 100% !important;
              }
            `}
          />
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </ScrollView>


      <View style={styles.containerm}>
      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>Show Modal</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>👋 Hello from Modal!</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Hide</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    </View>
  );
};

export default Tabledemo;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableWrapper: {
    marginBottom: 20,
  },
  signatureContainer: {
    height: height * 0.4,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  signatureCanvas: {
    flex: 1,
  },
  clearButton: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  containerm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8
  },
  closeButtonText: {
    color: 'white'
  }
});





