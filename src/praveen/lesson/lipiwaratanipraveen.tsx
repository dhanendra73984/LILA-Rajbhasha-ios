import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const lipiwaratanipraveen = (props: any) => {
  const { ApiResponse, Package, Medium  ,selectedLessonIndex} = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
 
  const Sectiontitle=langWiseWords[46]
  const titleoflessonindex = langWiseWords[75];//headertitle

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine the total number of pages here
        // Assuming you have a fixed total number or you fetch it from somewhere
        const total = 5; // Change this to the actual total number of pages
        setTotalPages(total);
  
        const response = await axios.get(
          `https://lilaonmobile.rb-aai.in/LILAMobileData/Praveen//LipiWartani/LipiWartani_${currentPage}.htm`,{ timeout: 500000 }
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

  //header navigation 
  const handleBackPressforhome = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };


  return (
    <View style={{ flex: 1 }}>

<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
             <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPressforhome}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{selectedLessonIndex}</Text>

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View> 
          </SafeAreaView>
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

export default lipiwaratanipraveen;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    
    
   
  },
  arrowIcon: {
    backgroundColor: '#EAF0F1',
    borderRadius: 1, // Adjust the border radius to your preference
    padding: 2,
    borderWidth: 2, // Add border width
    borderColor: 'black', // Add border color
    elevation:3,
    
   
  },
  buttondesign:{

  },
  
});
