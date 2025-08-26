import { Button, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const Sactionpragya = (props:any) => {
    const {ApiResponse,Package,Medium,selectedLessonIndex} = props.route.params;
    const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
    const Sectiontitle=langWiseWords[286]
    const indexesToShow = [46, 51, 52, 53, 54, 20, 55, 13];

    const data = indexesToShow.map((index, i) => ({
        id: (i + 1).toString(),
        title: langWiseWords[index],
      }));
       // Fetch data at specific indexes
     const titleoflessonindex = langWiseWords[75];
    

  
    const handleBackPress = () => {
      navigation.goBack();
    };
  
  
    
    const navigation = useNavigation();
    
    const handleHomePress = () => {
      const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
    
      props.navigation.navigate(homeScreen, {
        Package,
        Medium,
        ApiResponse,
      });
    };

    //this is grammer count for lesson 
    const [pageCounts, setPageCounts] = useState<number[]>([]);
    
    useEffect(() => {
      const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getGrammarCount/';
      const requestData = {
        LangSelected: Medium,
        packagename: Package,
      };
    
      axios.post(apiUrl, requestData,{timeout:500000})
        .then(response => {
          const lessonData: Lesson[] = response.data;
          if (lessonData && lessonData.length > 0) {
            const pageCountValues: number[] = lessonData.map((lesson: Lesson) => parseInt(lesson.PageCount, 10));
            setPageCounts(pageCountValues);
            console.log('Updated pageCounts:', pageCountValues);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  

    //handle navigation of section index 
    const handleListItemPress = (title: string) => {
      // Define the mapping of titles to components
      const componentMapping: { [key: string]: string } = {
        [langWiseWords[46]]: 'Objectivepragya',
        [langWiseWords[51]]: 'Structureexposurepragya',
        [langWiseWords[52]]: 'Narrativepragya',
        [langWiseWords[53]]: 'Newwordspragya',
        [langWiseWords[54]]: 'Wordfamilypragya',
        [langWiseWords[20]]: 'Grammerpragya',
        [langWiseWords[55]]: 'Practicepragya',
        [langWiseWords[13]]:'Exerciselistpragya' ,
       
        // Add more mappings as needed
      };
    
      // Check if the pressed title exists in the mapping
      if (componentMapping[title]) {
        // Navigate to the corresponding component with necessary parameters
        props.navigation.navigate(componentMapping[title], {
          title,//for the page title not the header 
          ApiResponse,
          Package,
          Medium,
          selectedLessonIndex,
          pageCounts,
         
          
          // Add more parameters if needed
        });
      } else {
        // Handle the case where the title doesn't match any predefined indexes
        console.log(`Title not found in mapping: ${title}`);
      }
    };
  
     const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity onPress={() => handleListItemPress(item.title)}>
          <View style={styles.item}>
            <Text style={styles.displaytext}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
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


              {/* Conditionally render header title based on the package */}
 
              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>

      
            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>
      
          <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
              {/* Title */}
             
              <Text style={styles.title}>{Sectiontitle}</Text>
              <View style={styles.horizontaline}></View>
      

                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    />

      
              
            </View>
          </ImageBackground>
        </View>
      );
}

export default Sactionpragya

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 40, 
        marginBottom:10// Adjust the amount of space as needed
      },
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
         fontSize: 20, // Adjust the font size as needed
       },
       container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        margin: 30,
        marginTop:'2%'
        
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10, // Adjust the margin based on your preference
        textAlign:'center',
        color:'black'
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