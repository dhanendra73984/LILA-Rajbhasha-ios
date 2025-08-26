import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface Sentence {
  usermailid: null;
  password: null;
  SentenceId: number;
  LSentence: null;
  HSentence: string;
  SentenceSound: string;
  tableNumber: number;
  LangSelected: null;
  PackageSelected: null;
  LangWiseWords: string;
  Hindi: null;
  English: null;
  Assamese: null;
  Bodo: null;
  Bangla: null;
  Gujarati: null;
  Kannada: null;
  Kashmiri: null;
  Malayalam: null;
  Manipuri: null;
  Marathi: null;
  Nepalese: null;
  Oriya: null;
  Punjabi: null;
  Tamil: null;
  Telugu: null;
}

const Sentencepatternpragya = (props:any) => {
  const { ApiResponse, Package, Medium , selectedLessonIndex,} = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[280]
  const titleoflessonindex = langWiseWords[75];
  const [responseData, setResponseData] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuggestionActive, setIsSuggestionActive] = useState<boolean>(false);
  const [suggestionData, setSuggestionData] = useState<string>('');
  const [sound, setSound] = useState<Sound | null>(null);

  const handleBackPresshome = () => {
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
  

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/GetSentence/';
      const requestData = {
        LangSelected: Medium,
        tableNumber: selectedLessonIndex,
      };

      try {
        const response = await axios.post<Sentence[]>(endpoint, requestData,{timeout:500000});
        const data = response.data;
        setResponseData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      // Release the sound when the component unmounts
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  const handleNextPress = () => {
    if (currentIndex < responseData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsSuggestionActive(false); // Reset suggestion state when navigating to the next sentence
      stopSound(); // Stop the sound when navigating to the next sentence
    }
  };

  const handlePrevPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsSuggestionActive(false); // Reset suggestion state when navigating to the previous sentence
      stopSound(); // Stop the sound when navigating to the previous sentence
    }
  };

  const handleSuggestionPress = () => {
    if (currentIndex < responseData.length) {
      setIsSuggestionActive(true);
      setSuggestionData(responseData[currentIndex].LangWiseWords);
    }
  };

  const playSound = () => {
    if (sound) {
      sound.release();
    }

    const soundPath = `https://lilaonmobile.rb-aai.in/LILAMobileData/SentPattern/${responseData[currentIndex].SentenceSound.replace('.wav', '.mp3')}`;
    

    const newSound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Error loading sound:', error);
      } else {
        setSound(newSound);
        newSound.play(() => {
          newSound.release();
        });
      }
    });
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
    }
  };

  return (

    <View style={{ flex: 1 }}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>  
    <View style={styles.header}>
     {/* Left side - Back icon */}
     <TouchableOpacity onPress={handleBackPresshome}>
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

    <ImageBackground
      source={require('../../../assets/img/bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <View style={{height:100}}>

            <Text  style={styles.quetionText} key={responseData[currentIndex].SentenceId}>
              {responseData[currentIndex].HSentence}
            </Text>
            </View>

            <View style={styles.horizontaline1}></View>


           <View style={{height:150}}>
            {isSuggestionActive && (
              <Text style={styles.suggestionText}>
                {suggestionData}
              </Text>
            )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handlePrevPress} disabled={currentIndex === 0}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSuggestionPress}>
                <Text style={styles.buttonText}>Suggestion</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleNextPress} disabled={currentIndex === responseData.length - 1}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.soundButtonContainer}>
              <TouchableOpacity style={styles.soundButton} onPress={playSound}>
                <Text style={styles.buttonText1}>Play Sound</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.soundButton} onPress={stopSound}>
                <Text style={styles.buttonText1}>Stop Sound</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>

    </View>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  
  noLettersText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight:'bold'
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
    margin:5
    

    
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  soundButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    
    
  },
  button: {
    backgroundColor: '#0D6EFD',
    padding: 8,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  soundButton: {
    backgroundColor: '#25CCF7',
    padding: 5,
    borderRadius: 5,
    marginHorizontal:10
  },
  buttonText1: {
    color: 'white',
    fontSize: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  quetionText: {
    marginTop: "5%",
    fontSize: 16,
    color: 'black',
    fontWeight:'bold'
  },
  suggestionText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    fontWeight:'bold'
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:30,
    margin:-30
   
  },
  horizontaline1:{
    height: 2,
    backgroundColor: '#ccc',
    marginTop:10,
    marginBottom:10,
    margin:-30
   
  },


  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    textAlign:'center',
    color:'black',
    marginTop:2
  },
});



export default Sentencepatternpragya;


