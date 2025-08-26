import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WebView from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//welcome to the alphabet page  page 


const Exerciseone = (props: any) => {
  const { ApiResponse, Package, Medium } = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [exercise, setExercise] = useState<string>('Exercise_1_1');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (exercise: string) => {
    try {
      const response = await axios.get(
        `https://lilaonmobile.rb-aai.in/LILAMobileData/${Package}/Alphabet/${Medium}/${exercise}.html`
      );
      setHtmlContent(response.data);
      setExercise(exercise);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('Exercise_1_1');
  }, [Package, Medium]);

  const handleBackPress = () => {
    fetchData('Exercise_1_1');
  };

  const handleArrowPress = () => {
    fetchData('Exercise_1_2');
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/bg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {exercise === 'Exercise_1_2' && (
            <View style={styles.backArrowContainer}>
              <MaterialIcons
                name="arrow-back"
                size={21}
                color="black"
                onPress={handleBackPress}
              />
            </View>
          )}

          <View style={styles.arrowContainer}>
            <MaterialIcons
              name="arrow-forward"
              size={21}
              color="black"
              onPress={handleArrowPress}
            />
          </View>

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
      </ImageBackground>
    </View>
  );
};

export default Exerciseone

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EAF0F1',
    borderRadius: 1, // Adjust the border radius to your preference
    padding: 2,
    borderWidth: 2, // Add border width
    borderColor: 'black', // Add border color
    elevation:5
  },
    backArrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EAF0F1',
    borderRadius: 1,
    padding: 2,
    borderWidth: 2,
    borderColor: 'black',
    elevation: 5,
  },
 
})