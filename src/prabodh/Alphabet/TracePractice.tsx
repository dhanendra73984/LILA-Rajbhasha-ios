import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';

const SketchPad = () => {
  const signatureRef = useRef<SignatureViewRef | null>(null);

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../../../assets/img/bg.png')}
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <SignatureCanvas
        ref={signatureRef}
        style={styles.signatureCanvas}
      />
      <View style={styles.hideinbuiltbuttons}>
        
      <Image source={require('../../../assets/img/bg.png')} style={styles.backgroundimageforclearimage} />
       
      </View>

      <View style={styles.clearButtonContainer}>
        <TouchableOpacity onPress={handleClear}>
          {/* <Text>Clear</Text> */}
          <Image source={require('../../../assets/img/clear.jpg')} style={styles.clearButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
    
    </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width:'80%', // Center items vertically
    margin:'10%',
    marginTop:'20%'
  },
  signatureCanvas: {
    flex: 1,
    width: '100%',
    
    
   
  },
  clearButtonContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    marginTop:300
  },
  hideinbuiltbuttons:{
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    marginTop:300,
    backgroundColor: 'white',
    height:'6%',
    width:'100%'

  },
  clearButtonImage: {
    width: 50, // Adjust the width of the image as needed
    height: 50, // Adjust the height of the image as needed
    backgroundColor:'black',
    borderRadius:4
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    
  },
  backgroundimageforclearimage:{
    marginLeft:'-20%',
    width: '140%',
    height:500,
    marginTop:-10

  }
});

export default SketchPad;
