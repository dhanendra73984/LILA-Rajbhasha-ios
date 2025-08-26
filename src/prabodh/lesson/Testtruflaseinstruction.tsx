import React, { useState, useEffect } from 'react';
import { Button, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Testtruflaseinstruction = (props: any) => {
  const { ApiResponse, Package, Medium, selectedLessonIndex, title,correctAnswersCountoffillintheblacks,correctCountofjumble ,correctAnswersRatiooffillintheblanks} = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[56];
  const lesson=langWiseWords[13]
  
  const titleoflessonindex = langWiseWords[75];//headertitle
  const [testData, setTestData] = useState<any[]>([]);

  const [instructionData, setInstructionData] = useState<any[]>([]);
  const [exercisesTablesData, setExercisesTablesData] = useState<string[]>([]);

    //header navigation
    const handleBackPress = () => {
        navigation.goBack();}; 
      const navigation = useNavigation();
      
      const handleHomePress = () => {
        const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
        props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
      };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make the first Axios request
        const responseTestInfo = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestInfo/',
          {
            packagename: Package,
            LangSelected: Medium,
            lessonnumber: selectedLessonIndex,
          },{timeout:500000}
        );

        // Assuming data is an array
        const testData = responseTestInfo.data;
        setTestData(testData);
        // Extracting all ExercisesTables values from the response
        const exercisesTablesValues = testData.map((item: { ExercisesTables: any; }) => item.ExercisesTables).filter(Boolean);
        setExercisesTablesData(exercisesTablesValues);


        // Make the second Axios request
        const responseInstruction = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTestInstruction/',
          {
            packagename: Package,
            LangSelected: Medium,
          }
        );

        // Assuming data is an array
        const instructionData = responseInstruction.data;
        setInstructionData(instructionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);


  const renderInitialIntro = () => {
    const fillInTheBlanksData = instructionData.find((item) => item.SectionName === 'TrueAndFalse');
  
    if (fillInTheBlanksData) {
      return (
        <View style={styles.scrollView}>
          <ScrollView>
            <Text style={styles.introtext}>{fillInTheBlanksData.LangWiseWords}</Text>
          </ScrollView>
        </View>
      );
    }
  
    return null;
  };
 
  
  const handleProceedPress = () => {
    props.navigation.navigate('Testtruefalse', {
      ApiResponse,
      Package,
      Medium,
      selectedLessonIndex,
      title,     
      exercisesTablesData,
      correctAnswersCountoffillintheblacks,correctCountofjumble,correctAnswersRatiooffillintheblanks,instructionData
    });
  };
  // const handleProceedPress = () => {
  //   props.navigation.navigate('Testjumbleinstruction', {
  //     ApiResponse,
  //     Package,
  //     Medium,
  //     selectedLessonIndex,
  //     title,     
  //     exercisesTablesData,
  //   });
  // };



  return (


    <View style={{flex:1}}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
        <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              {/* <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" /> */}
            </TouchableOpacity>

            <Text style={styles.headerTitle}></Text>

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>

    <ImageBackground
      source={require('../../../assets/img/bg.png')}
      style={styles.backgroundImage}>
         

         <Text style={styles.title}>{langWiseWords[75]}{':'}{selectedLessonIndex}</Text>
              <View style={styles.horizontaline}></View>
              <Text style={styles.title1}>{langWiseWords[56]}</Text>




        {renderInitialIntro()}
        <View style={styles.horizontalinefortext}></View>
        
        <TouchableOpacity onPress={handleProceedPress} style={styles.proceedButton}>
            <Text style={styles.proceedButtonText}>{langWiseWords[103]}</Text>
          </TouchableOpacity>

        




      <View style={{ flex: 1}}>
        {/* <Text>{correctCountofjumble}{correctAnswersCountoffillintheblacks}{correctAnswersRatiooffillintheblanks}</Text>
       */}
        {/* <Text style={{ fontSize: 20 }}>Index of prabodh lesson is here{selectedLessonIndex}</Text>
        <Button
          title="Go to sections of the test start"
          onPress={() => {
            props.navigation.navigate('Teststartprabodh');
          }}
        /> */}
        {/* You can now use the 'testData' state in your component */}
      </View>
      
    </ImageBackground>
    </View>
  );
};

export default Testtruflaseinstruction;

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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign: 'center',
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
  introtext: {
    textAlign:'justify',
    fontSize: 16,
    margin:10,
    color:'black'
   
  },

  scrollView: {
    height: 200, // Set the desired height
    backgroundColor: '#80C5C5'
  },
  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:10,
    elevation:3,  
    marginTop:30
  },
  proceedButton: {
    backgroundColor: '#E44236',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20, // Adjust the margin based on your preference
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    // Center-align the text
    color: 'black',
    textAlign: 'center',
    
  },

});
