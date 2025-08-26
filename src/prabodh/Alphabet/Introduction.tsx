import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WebView from 'react-native-webview';
//welcome to the alphabet page  page 


const Introduction = (props:any) => {

  const {ApiResponse,Package,Medium} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);//for mapping index
  
  
  const [htmlContent, setHtmlContent] = useState<string | null>(null);//for rendering html page 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lilaonmobile.rb-aai.in/LILAMobileData/${Package}/Alphabet/${Medium}/Alphabet.html`,{timeout:500000}
        );
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Package, Medium]);


  return (
      <View style={{flex:1}}>

    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}>


        <View style={styles.container}>
          
                  {htmlContent && (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              javaScriptEnabled={true} // Enable JavaScript for the WebView
              bouncesZoom={true}      // Allow the WebView content to be zoomed
              scalesPageToFit={false}  // Disable automatic scaling
              style={{ backgroundColor: 'transparent' }}  // Set background color to transparent
              containerStyle={{ flex: 1, padding: 4 ,marginRight:8}}  // Adjust container style as needed
            />
          )}
        </View>    


    </ImageBackground>
    </View>
  )
}

export default Introduction

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
 
})