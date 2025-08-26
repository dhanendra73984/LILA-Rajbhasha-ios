import { Button, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Excerciseprabodh = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex,title} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[13]
  const titleoflessonindex = langWiseWords[75];
  const [exercises, setExercises] = useState<any[]>([]);


 
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getEx_Info/',
        {
          LangSelected: Medium,
          packagename: 'Prabodh',//custmise this if needed
          lessonnumber: selectedLessonIndex,
        }
      );

      // Update state with the fetched exercises
      setExercises(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);


  const handleItemPress = (exercise: any,index: number) => {
    // console.log('Pressed item:', exercise.Exercise_name);
    console.log(`Exercise for ${Medium}:`, exercise[`${Medium}Exercise`]);
  
    // Extract the desired part from the exercise[`${Medium}Exercise`] string
    const exerciseContent = exercise[`${Medium}Exercise`];
  
    // Extracting category
    const regex = new RegExp(`Prabodhth${selectedLessonIndex}(.*)`);
    const match = exerciseContent.match(regex);
    const extractedWord = match ? match[1] : '';
    console.log('Exercise category:', extractedWord);
  
    // Conditionally navigate based on extractedWord
    if (extractedWord.startsWith('FillClues')) {
      // Navigate to FillClues component
      props.navigation.navigate('Fillintheclues', {
        exerciseName: exercise.Exercise_name,
        exerciseContent: exerciseContent,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        
      });
    }
     else if (extractedWord.startsWith('FillBlnks')) {
      // Navigate to Fillintheblack component
      props.navigation.navigate('Excersicetemplate', {
        exerciseName: exercise.Exercise_name,
        exerciseContent: exerciseContent,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        
      });
    } 
    else if (extractedWord.startsWith('Translation')) {
      // Navigate to Fillintheblack component
      props.navigation.navigate('Translation', {
        exerciseName: exercise.Exercise_name,
        exerciseContent: exerciseContent,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        
      });
    } 
    else if (extractedWord.startsWith('Transform')) {
      // Navigate to Transform component
      props.navigation.navigate('Transform', {
        exerciseName: exercise.Exercise_name,
        exerciseContent: exerciseContent,
        ApiResponse,
        Package,
        Medium,
        selectedLessonIndex,
        
      });
    } else {
      // Handle other cases or provide a default navigation
      console.warn('Unhandled exercise category:', extractedWord);
    }
  };

   // props.navigation.navigate('Excersicetemplate', {
    //   exerciseName: exercise.Exercise_name,
    //   exerciseContent: exercise[`${Medium}Exercise`],
    //   ApiResponse,
    //   Package,
    //   Medium,
    //   selectedLessonIndex,
    // });


  return (

    <View style={{flex:1}}>
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

        <ImageBackground
        source={require('../../../assets/img/bg.png')} // Provide the path to your image
        style={styles.backgroundImage}>

              <Text style={styles.title}>{Sectiontitle}</Text>
              <View style={styles.horizontaline}></View>


             {/* rendering excercise list */}
             
             <FlatList
              data={exercises}
              keyExtractor={(item) => item.exid.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.flatListItem}
                  onPress={() => handleItemPress(item, index)}
                >
                  <Text style={styles.flatListItemText}>{`${Sectiontitle} ${index + 1}`}</Text>
                </TouchableOpacity>
              )}
            />


    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
            <Text style={{ fontSize: 20 }}>excersize list here </Text>
            <Button
                title="go to excersize templates"
                onPress={() => {
                    props.navigation.navigate('Excersicetemplate');
                }
                }
            />
           
     </View> */}
     </ImageBackground>
     </View>
  )
}

export default Excerciseprabodh

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,

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
  text: {
    fontSize: 20,
    marginBottom: 10,
    // Additional text styling if needed
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    marginLeft:'43%',
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
  flatListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  flatListItemText: {
    fontSize:16,
    color:'black'
    // Additional text styling for flat list items if needed
  },
})