import { ActivityIndicator, Button, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';

const Parisithlesson = (props:any) => {
    const {ApiResponse,Package,Medium,selectedLessonIndex} = props.route.params;
    const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
    const Sectiontitle=langWiseWords[288]
   
    const [htmlContent, setHtmlContent] = useState<string | null>(null); 
    const [loading, setLoading] = useState(true);
       // Fetch data at specific indexes
     const titleoflessonindex = langWiseWords[75];  
    const handleBackPress = () => {
      navigation.goBack();
    };   
    const navigation = useNavigation();   
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
      };

      useEffect(() => {
        // Make Axios request when component mounts
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Grammar/${Medium}/Grammar${selectedLessonIndex}_1.htm`,{timeout:500000});
            setHtmlContent(response.data);
          } catch (error) {
            console.error('Error fetching HTML content:', error);
          } finally {
            // Set loading to false after a 1-second delay

          }
        };
    
        fetchData();
      }, [selectedLessonIndex]); 
  

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
      
          <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>
            
              {/* Title */}
             
              <Text style={styles.title}>{Sectiontitle}</Text>
              <View style={styles.horizontaline}></View>

           <View style={styles.container}>  

            {/* {htmlContent && (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              javaScriptEnabled={true}
              bouncesZoom={true}
              scalesPageToFit={false}
              style={{ backgroundColor: 'transparent' }}
              containerStyle={{ flex: 1, padding: 4, marginRight: 8 }}
            />
          )} */}
          
    {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Render the HTML content using WebView once loading is complete
        htmlContent && (
            <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            bouncesZoom={true}
            scalesPageToFit={false}
            style={{ backgroundColor: 'transparent' }}
            containerStyle={{ flex: 1, padding: 4, marginRight: 8 }}
          />
        )
      )} */}
              <View style={styles.container}>
                      
              {htmlContent && (
                <WebView
                  originWhitelist={['*']}
                  source={{ html: htmlContent }}
                  javaScriptEnabled={true} // Enable JavaScript for the WebView
                  bouncesZoom={true}      // Allow the WebView content to be zoomed
                  scalesPageToFit={false}  // Disable automatic scaling
                  style={{ backgroundColor: 'transparent' }}  // Set background color to transparent
                  containerStyle={{ flex: 1, padding: 2 ,marginRight:0}}  // Adjust container style as needed
                />
              )}
            </View>

        
          </View>
              
  
      


      
              
            
          </ImageBackground>
        </View>
      );
}

export default Parisithlesson

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 40, 
        marginBottom:10// Adjust the amount of space as needed
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      container: {
        flex: 1,
        padding: 1,
        paddingTop:0,
        marginTop:-10
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
         fontSize: 20, // Adjust the font size as needed
       },
 
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10, // Adjust the margin based on your preference
        marginLeft:'41%',
        color:'black',
        marginTop:'2%'
      },
    // sectionTitle: {
    //     fontSize: 18,
    //     color:'black',
    //     textAlign: 'left',
    //     marginTop: 10,
    //     marginBottom: 5,
    //     marginLeft:10
    //   },
      item: {
        padding: 6,
        borderWidth: 2,
        borderColor: '#0D6EFD', // Blue border color
        marginBottom: 25,
        alignItems: 'center',
      },
      displaytext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      horizontaline:{
        height: 4,
        backgroundColor: '#0D6EFD',
        marginTop:1,
        marginBottom:30,
        margin:-30
       
      }
})