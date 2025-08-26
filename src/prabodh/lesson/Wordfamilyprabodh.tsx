import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';

const Wordfamilyprabodh = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex,title,orignalessonindex} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[54]
  const titleoflessonindex = langWiseWords[75];//headertitle
  const [langWiseWordsInst, setLangWiseWordsInst] = useState<string | null>(null);//instruction
  
 
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };

            

            const [combinedData, setCombinedData] = useState<any[]>([]);

            useEffect(() => {
              const fetchData = async () => {
                try {
                  const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/GetLessonWordStudy/', {
                    LangSelected: Medium,
                    PackSelected: Package,
                    tableNumber: selectedLessonIndex,
                  },{timeout:500000});
          
                  // Assuming the response contains data, you can update the state accordingly
                  // setCombinedData(response.data.map((item: any) => ({
                  //   id: item.RecId,
                  //   // combinedWords: `${item.Hindi?.replace('|', '\n')} ${item.LangWiseWords?.replace('|', ' ').replace('|', '')}`,
                  //   hindi: item.Hindi?.replace('|', ''), // Add a newline character for each "|"
                  //   langWiseWords: item.LangWiseWords?.replace('|', ' ').replace('|', ''),
                  //   // Add other properties as needed
                  //   // Add other properties as needed
                  // }))
                  // );
                  setCombinedData(
                    response.data.map((item: any) => ({
                      id: item.RecId,
                      hindi: item.Hindi?.replace('|', ' ').replace(/\|/g, ' '), // Replace first occurrence with newline, then replace all others with space
                      langWiseWords: item.LangWiseWords?.replace('|', ' ').replace(/\|/g, ' '), // Replace first occurrence with space, then replace all others with space
                    }))
                  );
                  setLangWiseWordsInst(response.data[0]?.LangWiseWordsInst);
          
                } catch (error) {
                  console.error('Error fetching data:', error);
                  // Handle errors as needed
                }
              };
          
              fetchData(); // Call fetchData when the component mounts
            }, []);

  




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
              {langWiseWordsInst && <Text style={styles.titleofinstruction}>{langWiseWordsInst}</Text>}
              
              




           
              <FlatList
              data={combinedData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.items}>{item.hindi}</Text>
                  <Text style={styles.items}>{item.langWiseWords}</Text>
                  {/* Add other UI elements as needed */}
                </View>
              )}
            />

            

          <View>
           
          </View>
          </ImageBackground>
    </View>
  )
}

export default Wordfamilyprabodh

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
    marginBottom:20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    marginLeft:'40%',
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
  }
})