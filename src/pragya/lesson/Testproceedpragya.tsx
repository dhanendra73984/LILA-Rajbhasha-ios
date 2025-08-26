import React, { useState, useEffect } from 'react';
import { Button, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Testproceedpragya = (props: any) => {
  const { ApiResponse, Package, Medium, selectedLessonIndex,title, } = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[56];
  
  const titleoflessonindex = langWiseWords[75];//headertitle
  const [modifiedArray, setModifiedArray] = useState<string[]>([]);
 

  const [instructionData, setInstructionData] = useState<any[]>([]);
  const [testData, setTestData] = useState<any[]>([]);
    // Add a state variable to store the original data
    const [originalExercisesTables, setOriginalExercisesTables] = useState<string[]>([]);

    //header navigation
    const handleBackPress = () => {
        navigation.goBack();}; 
      const navigation = useNavigation();
      
      const handleHomePress = () => {
        const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
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
              },{ timeout: 500000 }
            );
      
            // Assuming data is an array
            const testData = responseTestInfo.data;
            setTestData(testData);
      
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


            //data of test information

            const originalData = responseTestInfo.data;
            const originalExercisesTables = originalData
            .map((item: { ExercisesTables: string | string[]; }) => item.ExercisesTables);
  
              setOriginalExercisesTables(originalExercisesTables);
      
            // Your existing code for filtering and sorting
            const filteredExercisesTables = testData
              .filter((item: { ExercisesTables: string | string[]; }) => 
                item.ExercisesTables &&
                (
                  (item.ExercisesTables.includes("TestChoice") || 
                  item.ExercisesTables.includes("TestChoiceClue") || 
                  item.ExercisesTables.includes("TrueFalse")) &&
                  item.ExercisesTables !== `PragyatT${selectedLessonIndex}`
                )
              )
              .map((item: { ExercisesTables: string; }) => item.ExercisesTables.replace(new RegExp(`^PragyatT${selectedLessonIndex}`), ''));
            
              console.log("LOG orignal array  filtered ", filteredExercisesTables);

              const modifiedArray = filteredExercisesTables.map((item: string) => item.replace(/\d/g, ''));

              
      


            console.log("LOG original array ", originalExercisesTables);
            console.log('modifiedarray list  ', modifiedArray);
           
            
      
            

            setModifiedArray(modifiedArray);


          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        // Call the fetchData function when the component mounts
        fetchData();
      }, []);



  

  const renderInitialIntro = () => {
    const initialIntroData = instructionData.find((item) => item.SectionName === 'InitialIntro');
    if (initialIntroData) {
      return (
        <View style={styles.scrollView}>
        <ScrollView >
           
          <Text style={styles.introtext}>{initialIntroData.LangWiseWords}</Text>
          
         
        </ScrollView>
        </View>
      );
    }
    return null;
  };





  const handleProceedPress = () => {
   
  
      

        
          // Navigate to TestChoiceControl component
          props.navigation.navigate('Teststartpragya', { ApiResponse, Package, Medium, selectedLessonIndex,modifiedArray,originalExercisesTables });
          
        
 
  };
  


  return (


    <View style={{flex:1}}>
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


    <ImageBackground
      source={require('../../../assets/img/bg.png')}
      style={styles.backgroundImage}>
         

         <Text style={styles.title}>{langWiseWords[104]}</Text>
              <View style={styles.horizontaline}></View>




        {renderInitialIntro()}
        <View style={styles.horizontalinefortext}></View>
        
        <TouchableOpacity onPress={handleProceedPress} style={styles.proceedButton}>
            <Text style={styles.proceedButtonText}>{langWiseWords[144]}</Text>
          </TouchableOpacity>
        




      <View style={{ flex: 1}}>
      
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

export default Testproceedpragya;

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


});
