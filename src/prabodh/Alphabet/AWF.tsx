import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AWF = (props: any) => {
  const { ApiResponse, Package, Medium } = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine the total number of pages here
      
        const total = 13; // Change this to the actual total number of pages
        setTotalPages(total);

        const response = await axios.get(
          `https://lilaonmobile.rb-aai.in/LILAMobileData/${Package}/Alphabet/${Medium}/Advance_Word_Formation_${currentPage}.html`,{timeout:500000}
        );
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Package, Medium, currentPage]);

  const handleNextPress = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleBackPress = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/bg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttondesign}>
            {currentPage > 1 && (
              <MaterialIcons
                name="arrow-back"
                size={20}
                color="black"
                onPress={handleBackPress}
                style={styles.arrowIcon}
              />
            )}
            </View>
            <View style={styles.buttondesign}>
            {currentPage < totalPages && (
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color="black"
                onPress={handleNextPress}
                style={styles.arrowIcon}
              />
            )}
            </View>
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

export default AWF;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    
    
   
  },
  arrowIcon: {
    backgroundColor: '#EAF0F1',
    borderRadius: 1, 
    padding: 2,
    borderWidth: 2, 
    borderColor: 'black', 
    elevation:3,
    
   
  },
  buttondesign:{

  }
});
