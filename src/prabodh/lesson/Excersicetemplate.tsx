import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fillintheblank from './Fillintheblank';
import Transform from './Transform';
import Translation from './Translation';
import Fillintheclues from './Fillintheclues';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

//this is fill in the blanks section





const Excersicetemplate = (props:any) => {



  


  const {
    exerciseName,
    exerciseContent,//holdes the data for excercise 
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    index,
    orignalessonindex
  } = props.route.params;

  
  const [fillBlanksData, setFillBlanksData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResultModalVisible, setResultModalVisible] = useState(false);//for modle 
  const [isCorrectAnswerVisible, setCorrectAnswerVisible] = useState(false);
  const [resultModalText, setResultModalText] = useState('');//for congrats/sorry popup 
  const [resultModalSecandText, setResultModalSecandText] = useState('');//for Answer is correct //tryagain
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const Sectiontitle = langWiseWords[13];
  const titleoflessonindex = langWiseWords[75];//lesson

  var exerciseNumberMatch = exerciseName.match(/\d+/);
  var exerciseNumber = exerciseNumberMatch ? parseInt(exerciseNumberMatch[0]) : null;
 

   //header navigation
   const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepraveen';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getFillBlanks/',
          {
            LangSelected: Medium,
            tablename: exerciseContent,
          },{timeout:500000}
        );

        setFillBlanksData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fillBlanksData]);

 

 
 

  const getCurrentCorrectAnswer = () => {
    return fillBlanksData[currentIndex]?.HAnswer || '';
  };

const handleNext = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % fillBlanksData.length);
  setSelectedChoice(null);
  setCorrectAnswerVisible(false);
  setResultModalVisible(false);
};

const handlePrev = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? fillBlanksData.length - 1 : prevIndex - 1
  );
  setSelectedChoice(null);
  setCorrectAnswerVisible(false);
  setResultModalVisible(false);
};

const handleChoicePress = (choice: string) => {
  if (!isCorrectAnswerVisible) {
    setSelectedChoice(choice);
    checkAnswer(choice);
  }
};

const checkAnswer = (choice: string) => {
  const correctAnswer = getCurrentCorrectAnswer();
  const isCorrect = choice === correctAnswer;
  setResultModalText(isCorrect ? langWiseWords[89] : langWiseWords[87]);
  setResultModalSecandText(isCorrect ? langWiseWords[88] : langWiseWords[84]);
  setCorrectAnswerVisible(isCorrect);
  setResultModalVisible(true);
};

const hideResultModal = () => {
  setResultModalVisible(false);
};






  return (
  <View style={{flex:1}}>
    
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


            <Text style={styles.title}>{Sectiontitle}:-{exerciseNumber}</Text>
            <View style={styles.horizontaline}></View>




      
        
              <View style={styles.container}>

              <Text style={styles.instruction}>{fillBlanksData[0]?.LangWiseWords}</Text>
              

              <View style={styles.horizontalinefortext}></View>

              <View style={{height:200}}>
                <Text style={styles.sentence}>
                  {currentIndex + 1}. {fillBlanksData[currentIndex]?.HSentence}
                </Text>
                <View style={styles.choicesContainer}>
                  {fillBlanksData[currentIndex]?.HChoices.split('|').map((choice: string, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.choiceContainer}
                      onPress={() => handleChoicePress(choice)}
                      disabled={isCorrectAnswerVisible} // Disable the button if the correct answer is visible
                    >
                      <Icon
                        name={
                          selectedChoice === choice
                            ? 'radio-button-checked'
                            : 'radio-button-unchecked'
                        }
                        size={20}
                        color="#2F363F"
                      />
                      <Text style={[styles.choice, selectedChoice === choice && styles.selectedChoiceText]}>
                        {choice}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                </View>
               


                <View style={styles.answerContainer}>
                    <Text style={{color:'black',marginLeft:5,marginBottom:6}}>{langWiseWords[81]} </Text>
                    {isCorrectAnswerVisible && (
                      <Text style={styles.correctAnswerText}>
                        {getCurrentCorrectAnswer()}
                      </Text>
                    )}
                  </View>
                      
                 <View style={styles.horizontalinefortext}></View>

                 <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={handlePrev}>
                        <Text style={styles.navigationButton}>{langWiseWords[90]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleNext}>
                        <Text style={styles.navigationButton}>{langWiseWords[19]}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              {/* <Text>{langWiseWords[89]}-{langWiseWords[88]}-{langWiseWords[87]}-{langWiseWords[84]}-{langWiseWords[75]}</Text> */}



                    <Modal isVisible={isResultModalVisible} onBackdropPress={hideResultModal}>
                    <View style={styles.resultModalContainer}>
                      <Text style={styles.resultModalText}>{resultModalText}</Text>
                      <Text style={styles.resultModalsecandText}>{resultModalSecandText}</Text>
                      <TouchableOpacity onPress={hideResultModal}>
                        <Text style={styles.resultModalCloseButton}>{langWiseWords[45]}</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  

    </ImageBackground>


    </View>
  )
}

export default Excersicetemplate

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
  instruction:{
    color:'black',
    fontSize: 14,
    fontWeight:'bold',
    lineHeight:20,
    margin:5,
    marginBottom:10,
    textAlign:"left"
  },
 
  sentence: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
    color:'blue',
    fontWeight:'bold',
    marginLeft:'3%'
  },


  navigationButton: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,   
    width:50,
    backgroundColor:'#0D6EFD',
    textAlign:'center',
    marginHorizontal:3,
    padding:2,
    borderRadius:4

  },

  choicesContainer: {
    flexDirection: 'column',
    marginBottom: 30,
  
  },
  choice: {
    fontSize: 16,
    marginRight: 12,
    color:'blue',
    fontWeight:'bold',
    
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:'4%'
 
  },
  selectedChoiceText: {
    fontWeight: 'bold', // Style for the selected choice
  },
  selectedText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  correctAnswerText: {
   
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom:5
    
  },

  //model styling 
  resultModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,

  },
  resultModalsecandText:{
    color:'black',
    fontSize: 16,
  

    marginBottom:10,
    textAlign:'left'
    
  },
  resultModalText: {
    color:'black',
    fontSize: 16,
    fontWeight:'bold',

    marginBottom:10,
    textAlign:'center'
  },
  resultModalCloseButton: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    width:'100%',
    backgroundColor:'#0D6EFD',
    textAlign:'center',
    padding:4,
    borderRadius:4
  },

  horizontalinefortext:{
    height: 1,
    backgroundColor: '#99AAAB',
    
    marginBottom:40,
    elevation:3  
  },
  buttonContainer: {
    flexDirection: 'row',    
    marginTop: 10,
    marginLeft:'1%'
    
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Optional: Align items vertically in the center
    marginVertical: 10,    // Optional: Add some vertical margin
  },

})