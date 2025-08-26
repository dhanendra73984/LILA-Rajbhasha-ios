import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';
interface Lesson {
  EnglishInst: any;
  Hindi: any;
  RecId: number;
  // ... (other properties)
  PageCount: string;
}

const Grammerprabodh = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex,pageCounts,orignalessonindex} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[20]
  const titleoflessonindex = langWiseWords[75];//headertitle

 
  
 
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };
  

  
 

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const updateSelectedIndex = Package === 'Prabodh' ? selectedLessonIndex - 26 : selectedLessonIndex-1;

  // Check if updateSelectedIndex is within the valid range
  if (updateSelectedIndex >= 0 && updateSelectedIndex < pageCounts.length) {
    // Use updateSelectedIndex as an index to access the value from pageCounts

    const selectedPageCount = pageCounts[updateSelectedIndex];
    

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Determine the total number of pages here
          // Assuming you have a fixed total number or you fetch it from somewhere
          const total = selectedPageCount; // Change this to the actual total number of pages
          setTotalPages(total);
  
          const response = await axios.get(
            `https://lilaonmobile.rb-aai.in/LILAMobileData/${Package}/Grammar/${Medium}/Grammar${selectedLessonIndex}_${currentPage}.htm`,{timeout:500000}
          );
          setHtmlContent(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [Package, Medium, currentPage]);
    
    console.log('Selected Page Count:', selectedPageCount);










    } else {
    console.log('Invalid index, cannot retrieve selected Page Count.');
  }

  const handleNextPress = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleBackPressofhtml = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };
 


            

           



  




  return (

    <View style={{ flex: 1 }}>

<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
          <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            {/* <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text> */}
                  {Package === 'Prabodh' ? (
              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
            ) : (
              orignalessonindex < 5 ? (
                <Text style={styles.headerTitle}>{titleoflessonindex}:{orignalessonindex}</Text>
              ) : (
                <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
              )
            )}

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>



        <ImageBackground
          source={require('../../../assets/img/bg.png')} // Provide the path to your image
          style={styles.backgroundImage}>

              <Text style={styles.title}>{Sectiontitle}</Text>
              <View style={styles.horizontaline}></View>
              {/* <Text>{Package}{Medium}{selectedLessonIndex}{updateSelectedIndex}</Text> */}
             
              {/* <Text>{`Page Counts: ${pageCounts.join(', ')}`}</Text>
              {selectedLessonIndex !== undefined && (
                  <Text>{`Page Count for Lesson ${selectedLessonIndex}: ${pageCounts[selectedLessonIndex - 1]}`}</Text>
                )} */}


      <View style={styles.containerforhtml}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttondesign}>
            {currentPage > 1 && (
              <MaterialIcons
                name="arrow-back"
                size={20}
                color="black"
                onPress={handleBackPressofhtml}
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
              containerStyle={{ flex: 1, padding: 0, marginRight: 0 }}
            />
          )}
      </View>
              




           


            

          <View>
           
          </View>
          {/* <Text>{pageCounts}</Text> */}
          </ImageBackground>
    </View>
  )
}

export default Grammerprabodh

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
  titleofinstruction:{
    fontSize: 15,
    fontWeight: 'bold',
    color:'black',
    marginLeft:8,
    marginBottom:20,
    textAlign:'left'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:"center",
    color:'black',
    marginTop:5
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  items:{
    fontSize:16,
    color:'black'
  },

  containerforhtml: {
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

  }
})