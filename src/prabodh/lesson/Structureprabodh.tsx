import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


const Structureprabodh = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex,title,orignalessonindex} = props.route.params;
  const [currentIndex, setCurrentIndex] = useState(0);//for rendering structure
  const [currentHindiIndex, setCurrentHindiIndex] = useState(0);//for rendering sentence 
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[51];
  const titleoflessonindex = langWiseWords[75];

  const [hindiWords, setHindiWords] = useState<string[]>([]);
  const [languageWiseWords, setLanguageWiseWords] = useState<string[]>([]);

  //for maneging counts 
  const [hindiButtonCount, setHindiButtonCount] = useState(1);//for sentence count
  const [languageButtonCount, setLanguageButtonCount] = useState(1);//for structure count 




  
 
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };


  //request for data 
  const [apiData, setApiData] = useState<any[]>([]); // State to store API response
  // Extract strings between < > and separated by |
  const extractWords = (text = '') => {
    const matches = text.match(/<([^>]*)>/);
    return matches ? matches[1].split('|').map(word => word.trim()) : [];
  };

  useEffect(() => {
    // Example usage in your useEffect
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getStructureExposure/',
          {
            LangSelected: Medium,
            packagename: Package,
            lessonnumber: selectedLessonIndex,
          },{timeout:500000}
        );

        // Handle the response
        setApiData(response.data);

        // Extract words from the first data entry
        const newHindiWords = extractWords(response.data[0]?.Hindi);
        const newLanguageWiseWords = extractWords(response.data[0]?.languagewisedata);

        // Update the state with the new words
        setHindiWords(newHindiWords);
        setLanguageWiseWords(newLanguageWiseWords);

        // Log the extracted words
        console.log('Hindi Words:', newHindiWords);
        console.log('Language Wise Words:', newLanguageWiseWords);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLessonIndex]);

  const handleNext = () => {
    // Empty the arrays before moving to the next data entry
    setHindiWords([]);
    setLanguageWiseWords([]);

    setCurrentIndex((prevIndex) => (prevIndex + 1) % apiData.length);
    setLanguageButtonCount((prevCount) => prevCount + 1);
  };

  const handlePrevious = () => {
    // Empty the arrays before moving to the previous data entry
    setHindiWords([]);
    setLanguageWiseWords([]);

    setCurrentIndex((prevIndex) => (prevIndex - 1 + apiData.length) % apiData.length);
    setLanguageButtonCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    // Log the extracted words when the currentIndex changes
    const newHindiWords = extractWords(apiData[currentIndex]?.Hindi);
    const newLanguageWiseWords = extractWords(apiData[currentIndex]?.languagewisedata);

    // Update the state with the new words
    setHindiWords(newHindiWords);
    setLanguageWiseWords(newLanguageWiseWords);

    // Log the extracted words
    console.log('Hindi Words:', newHindiWords);
    console.log('Language Wise Words:', newLanguageWiseWords);
  }, [currentIndex, apiData]);


  // Function to process text with <...> tags
  
// Function to process text with <...> tags
const handleHindiNext = () => {
  // Move to the next data entry for Hindi text
  setCurrentHindiIndex((prevIndex) => (prevIndex + 1) % hindiWords.length);
  setHindiButtonCount((prevCount) => prevCount + 1);
};

const handleHindiPrev = () => {
  // Move to the previous data entry for Hindi text
  setCurrentHindiIndex((prevIndex) => (prevIndex - 1 + hindiWords.length) % hindiWords.length);
  setHindiButtonCount((prevCount) => prevCount - 1);
};
//this is for setting hindi words 
const processTextWithTags = (text: any, newHindiWords: string[], currentHindiIndex: number) => {
  if (!text || !newHindiWords || newHindiWords.length === 0) {
    return [];
  }

  const parts = text.split(/<([^>]*)>/);

  return parts.map((part: any, index: any) => {
    // Check if the part is inside <...> tags
    if (index % 2 === 1) {
      // Return the current index value from newHindiWords for items inside <...> tags
      const newIndex = currentHindiIndex % newHindiWords.length;
      return (
        <Text key={index} style={{ color: 'red' }}>
          {' ' + newHindiWords[newIndex] + ' '}
        </Text>
      );
    }

    // Show normal text
    return (
      <Text key={index} style={{ color: 'black' }}>
        {part.trim()}
      </Text>
    );
  });
};

 //this is for english words 
 const processTextWithTagsforenglish = (text: any, newLanguageWiseWords: string[], currentHindiIndex: number) => {
  if (!text || !newLanguageWiseWords || newLanguageWiseWords.length === 0) {
    return [];
  }

  const parts = text.split(/<([^>]*)>/);

  return parts.map((part: any, index: any) => {
    // Check if the part is inside <...> tags
    if (index % 2 === 1) {
      // Return the current index value from newLanguageWiseWords for items inside <...> tags
      const newIndex = currentHindiIndex % newLanguageWiseWords.length;
      return (
        <Text key={index} style={{ color: 'red' }}>
          {' ' + newLanguageWiseWords[newIndex] + ' '}
        </Text>
      );
    }

    // Show normal text
    return (
      <Text key={index} style={{ color: 'black' }}>
        {part.trim()}
      </Text>
    );
  });
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



        

             

                <View style={styles.container}>
                <Text style={styles.instruction}>{apiData[0]?.languagewiseinst}</Text>

                <View style={styles.horizontalinefortext}></View>
            
                     <View style ={styles.textcontainer}>
                     


                      <View key={apiData[currentIndex]?.RecId}>


                        {/* Process and render languagewisedata text */}
                      <Text style={styles.translation}>
                        {processTextWithTagsforenglish(apiData[currentIndex]?.languagewisedata, languageWiseWords, currentHindiIndex)}
                      </Text>
                        {/* Process and render Hindi text */}
                        <Text style={styles.subtitle}>
                        {processTextWithTags(apiData[currentIndex]?.Hindi, hindiWords, currentHindiIndex)}
                      </Text>

                      </View>




              
                     </View>
                      {/* Add buttons  */}
                <View style={styles.horizontalinefortext}></View>

                <View style={styles.textandbuttons}>
                   <Text style={styles.countstyle}>{langWiseWords[61]}: {hindiButtonCount} /{langWiseWords[95]}: {languageButtonCount}</Text>
                         



                      <View style={styles.navigationButtons}>
                            <TouchableOpacity onPress={handleHindiPrev} disabled={currentHindiIndex === 0}>
                              <Text style={styles.navigationTextforsentence}>{langWiseWords[96]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleHindiNext} disabled={currentHindiIndex === hindiWords.length - 1}>
                              <Text style={styles.navigationTextforsentence}>{langWiseWords[60]}</Text>
                            </TouchableOpacity>
                      </View>

                    <View style={styles.navigationButtons}>
                            <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
                              <Text style={styles.navigationTextforstructure}>{langWiseWords[62]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNext} disabled={currentIndex === apiData.length - 1}>
                              <Text style={styles.navigationTextforstructure}>{langWiseWords[63]}</Text>
                            </TouchableOpacity>
                    </View>

                  </View>  


              
                </View>


            


          {/* <View>
            <Text>Structure Exposure</Text>
          </View> */}
          </ImageBackground>
    </View>
  )
}

export default Structureprabodh

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
    padding: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:'center',
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

  //structure container styling 

  instruction:{
    color:'black',
    fontSize: 14,
    fontWeight:'bold',
    lineHeight:20,
    margin:5,
    marginBottom:10,
    textAlign:'left'
  },

  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:20,
    elevation:3  
  },

  textcontainer:{
   padding:0,
   margin:5,
   height:150,
   alignContent:'center'
  },

  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginLeft:'10%',
    marginRight:'10%'
    
  },
  navigationTextforsentence: {
    fontSize: 14,
    color: 'white',
    backgroundColor:'#0D6EFD',
    width:'auto',
    padding:6,
    textAlign:'center',
    borderRadius:4

  },
  navigationTextforstructure: {
    fontSize: 14,
    color: 'white',
    backgroundColor:'#25CCF7',
    width:'auto',
    padding:6,
    textAlign:'center',
    borderRadius:4

  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black',
  },
  translation: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
    fontWeight: 'bold',
    textAlign:'left'
  },
  countstyle:{
    color:'black',
    fontSize: 14,  
    margin:4,
    alignContent:'center',
    textAlign:'center',
    fontWeight:'500',
    

  },
  textandbuttons:{
    marginTop:0,
  }
})