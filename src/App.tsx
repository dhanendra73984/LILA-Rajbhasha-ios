import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from './HomeScreen';
import Homechnagescreen from './Homechnagescreen';
import AboutScreen from './AboutScreen';
import backgroundImage from './components/BackgroundImage';


//prabodh ui imported here 
import home from './prabodh/home/home';
import Vocablary from './prabodh/vocablary/Vocablary';
import Lesson from './prabodh/lesson/Lesson';
import Dictionarytitles from './prabodh/dictionary/Dictionarytitles';
import Dictionarylist from './prabodh/dictionary/Dictionarylist';
import Introduction from './prabodh/Alphabet/Introduction';
//prabodh alphabets
import Alphabet from './prabodh/Alphabet/Alphabet';
import AlphabeticalOrder from './prabodh/Alphabet/AlphabeticalOrder';
import AlphabetPronunciation from './prabodh/Alphabet/AlphabetPronunciation';
import AWF from './prabodh/Alphabet/AWF';
import Execercisetwo from './prabodh/Alphabet/Execercisetwo';
import Maatra from './prabodh/Alphabet/Maatra';
import Pronunciation from './prabodh/Alphabet/Pronunciation';
import TraceAlphabet from './prabodh/Alphabet/TraceAlphabet';
import TraceHalfConsonant from './prabodh/Alphabet/TraceHalfConsonant';
import TraceMaatraa from './prabodh/Alphabet/TraceMaatraa';
import TracePractice from './prabodh/Alphabet/TracePractice';
import WordFormation from './prabodh/Alphabet/WordFormation';
import WordOrder from './prabodh/Alphabet/WordOrder';
import WriteWords from './prabodh/Alphabet/WriteWords';
//prabodh lessons

import Objectiveprabodh from './prabodh/lesson/Objectiveprabodh';
import Structureprabodh from './prabodh/lesson/Structureprabodh';
import Narrativeprabodh from './prabodh/lesson/Narrativeprabodh';
import Newwordprabodh from './prabodh/lesson/Newwordprabodh';
import Wordfamilyprabodh from './prabodh/lesson/Wordfamilyprabodh';
import Grammerprabodh from './prabodh/lesson/Grammerprabodh';
import Practiceprabodh from './prabodh/lesson/Practiceprabodh';
import Excerciseprabodh from './prabodh/lesson/Excerciseprabodh';
import Testprabodh from './prabodh/lesson/Testprabodh';
import Testproceedprabodh from './prabodh/lesson/Testproceedprabodh';
import Teststartprabodh from './prabodh/lesson/Teststartprabodh';
import Testsaction from './prabodh/lesson/Testsaction';
import Sectionprabodh from './prabodh/lesson/Sectionprabodh';
import Excersicetemplate from './prabodh/lesson/Excersicetemplate';

//Vocabllery saction of prabodh

import Designationprabodh from './prabodh/vocablary/designation/Designationprabodh';
import Ministryprabodh from './prabodh/vocablary/ministry/Ministryprabodh';
import Officerprabodh from './prabodh/vocablary/officers/Officerprabodh';
import Genralvbprabodhindex from './prabodh/vocablary/generalvb/Genralvbprabodhindex';
import Wordmeaningprabodh from './prabodh/vocablary/generalvb/Wordmeaningprabodh';
import Ecerciseonevbprabodh from './prabodh/vocablary/generalvb/Ecerciseonevbprabodh';
import Ecercisetwovbprabodh from './prabodh/vocablary/generalvb/Ecercisetwovbprabodh';
import Ecercisethreevbprabodh from './prabodh/vocablary/generalvb/Ecercisethreevbprabodh';
import Ecercisefourvbprabodh from './prabodh/vocablary/generalvb/Ecercisefourvbprabodh';
import Ecercisejumblevbprabodh from './prabodh/vocablary/generalvb/Ecercisejumblevbprabodh';


//praveen screen are imported here 

import Homepraveen from './praveen/home/Homepraveen';
import Dictionarytitlespraveen from './praveen/dictionary/Dictionarytitlespraveen';
import Dictionarylistpraveen from './praveen/dictionary/Dictionarylistpraveen';
import Lessonpraveen from './praveen/lesson/Lessonpraveen';
import Objectivepraveen from './praveen/lesson/Objectivepraveen';
import Sectionpraveen from './praveen/lesson/Sectionpraveen';
import Structurepraveen from './praveen/lesson/Structurepraveen';
import Narrativepraveen from './praveen/lesson/Narrativepraveen';
import Newwordpraveen from './praveen/lesson/Newwordpraveen';
import Wordfamilypraveen from './praveen/lesson/Wordfamilypraveen';
import Grammerpraveen from './praveen/lesson/Grammerpraveen';
import Practicepraveen from './praveen/lesson/Practicepraveen';
import Excercisepraveen from './praveen/lesson/Excercisepraveen';
import Excersicetemplatepraveen from './praveen/lesson/Excersicetemplatepraveen';
import Testproceedpraveen from './praveen/lesson/Testproceedpraveen';
import Teststartpraveen from './praveen/lesson/Teststartpraveen';
import Testsactionpraveen from './praveen/lesson/Testsactionpraveen';

//pragya imports are here
import Homepragya from './pragya/home/Homepragya';
import Dictionarytitlespragya from './pragya/dictionary/Dictionarytitlespragya';
import Dictionarylistpragya from './pragya/dictionary/Dictionarylistpragya';


//commanly used words
import Commanlyusedwordpragya from './pragya/commanlyusedword/Commanlyusedwordpragya';
import Aamprayogkepadbandh from './pragya/commanlyusedword/Aamprayogkepadbandh';
import Aamprayogkepadbandhtitles from './pragya/commanlyusedword/Aamprayogkepadbandhtitles';
import Karylayintippani from './pragya/commanlyusedword/Karylayintippani';
import Mantralyakaryalaya from './pragya/commanlyusedword/Mantralyakaryalaya';
import Padnam from './pragya/commanlyusedword/Padnam';
import Paribhashikshabdavalititles from './pragya/commanlyusedword/Paribhashikshabdavalititles';
import Paribhashiksabdavali from './pragya/commanlyusedword/Paribhashiksabdavali';


//lesson of pragya imported here....
import Sactionpragya from './pragya/lesson/Sactionpragya'
import Objectivepragya from './pragya/lesson/Objectivepragya';
import Contentexposurepragya from './pragya/lesson/Contentexposurepragya';
import Contenttextpragya from './pragya/lesson/Contenttextpragya';
import Vocabularypragya from './pragya/lesson/Vocabularypragya';
import Sentencepatternpragya from './pragya/lesson/Sentencepatternpragya';
import Practicepragya from './pragya/lesson/Practicepragya';
import Sampleletterspraggya from './pragya/lesson/Sampleletterspraggya';
import Situtationspragya from './pragya/lesson/Situtationspragya';
import Excercisepragya from './pragya/lesson/Excercisepragya';
import Tesxtpragya from './pragya/lesson/Tesxtpragya';
import Exerciselistpragya from './pragya/lesson/Exerciselistpragya';
import Testproceedpragya from './pragya/lesson/Testproceedpragya';
import Teststartpragya from './pragya/lesson/Teststartpragya';
import Lessonpragya from './pragya/lesson/Lessonpragya';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomAlert from './components/CustomAlert';
import Customeheaderback from './components/Customeheaderback';
import Apendixpragya from './pragya/appendix/Apendixpragya';
import 'react-native-gesture-handler';
import Parisithlesson from './prabodh/lesson/Parisithlesson';
import Fillintheclues from './prabodh/lesson/Fillintheclues';
import Translation from './prabodh/lesson/Translation';
import Transform from './prabodh/lesson/Transform';
import Testjumbleinstruction from './prabodh/lesson/Testjumbleinstruction';
import Testjumbleprabodh from './prabodh/lesson/Testjumbleprabodh';
import Testtruflaseinstruction from './prabodh/lesson/Testtruflaseinstruction';
import Testtruefalse from './prabodh/lesson/Testtruefalse';
import lipiwaratanipraveen from './praveen/lesson/lipiwaratanipraveen';
import Testfillintheblankspraveen from './praveen/lesson/Testfillintheblankspraveen';
import Testmcqinstructionpraveen from './praveen/lesson/Testmcqinstructionpraveen';
import Testmcqpraveen from './praveen/lesson/Testmcqpraveen';
import fillintheblanksecondtestpraveen from './praveen/lesson/fillintheblanksecondtestpraveen';
import Testtruefalsepraveen from './praveen/lesson/Testtruefalsepraveen';
import Testtrufalsestart from './praveen/lesson/Testtrufalsestart';
import fillintheblanksecandtest from './praveen/lesson/fillintheblanksecandtest';
import Poorakpragya from './pragya/lesson/Poorakpragya';
import Structureexposurepragya from './pragya/lesson/Structureexposurepragya';
import Sectionsecandpragya from './pragya/lesson/Sectionsecandpragya';
import Narrativepragya from './pragya/lesson/Narrativepragya';
import Newwordspragya from './pragya/lesson/Newwordspragya';
import Wordfamilypragya from './pragya/lesson/Wordfamilypragya';
import Grammerpragya from './pragya/lesson/Grammerpragya';
import Fillinthecluespragya from './pragya/lesson/Fillinthecluespragya';
import Translationpragya from './pragya/lesson/Translationpragya';
import Transformpragya from './pragya/lesson/Transformpragya';
import Testmcqinstructionpragya from './pragya/lesson/Testmcqinstructionpragya';
import Testmcqpragya from './pragya/lesson/Testmcqpragya';
import Testtruefalseinstruntionpragya from './pragya/lesson/Testtruefalseinstruntionpragya';
import Testtruefalsepragya from './pragya/lesson/Testtruefalsepragya';
import Scorecardpragya from './pragya/lesson/Scorecardpragya';


import hello from './hello';










const Stack = createNativeStackNavigator();

const App = () => {


 



 

  return (
    <ImageBackground
    source={require('../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
  > 
  {/* it is front home screen of the application */}
       <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen            
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: '' ,
            headerStyle:{ backgroundColor:'#0D6EFD'},    
        }}
          />

          <Stack.Screen            
            name="hello"
            component={hello}
            options={{ title: ' ' ,
            headerStyle:{ backgroundColor:'#0D6EFD'},    
        }}
          />

          {/* this is setting or medium and package changin screen */}
          <Stack.Screen
            name="Homechnagescreen"
            component={Homechnagescreen}
            options={{
              header: ({ navigation }) => (
                <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
                  <View style={styles.header}>
                    <View style={styles.headerIcon}>
                      <MaterialIcons
                        name="chevron-left"
                        size={32}
                        color="white"
                        onPress={() => {
                          navigation.goBack();
                        }}
                      />
                    </View>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <View style={styles.headerIcon} />
                  </View>
                </SafeAreaView>
              ),
            }}
          />
          {/* prabodh section start here */}
          <Stack.Screen
            name="Home"
            component={home}
            
            options={{title:'',headerShown:false}}
          />{/* it is home screen of prabodh */}
          

          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{ title: 'Introduction of prabodh' ,headerShown:false }}
          />

          <Stack.Screen
            name="Dictionarytitles"
            component={Dictionarytitles}
            options={{ title: 'Dictionarytitles' ,headerShown: false}}//for hiding header 
          />
          
          <Stack.Screen
            name="Dictionarylist"
            component={Dictionarylist}
            options={{ title: 'Dictionarylist',headerShown:false }}
           
          />
          
          
         

          <Stack.Screen
            name="Vocablary"
            component={Vocablary}
            options={{ title: 'Vocablary' ,headerShown:false}}
          />
           <Stack.Screen
            name="Designationprabodh"
            component={Designationprabodh}
            options={{ title: 'Designationprabodh',headerShown:false }}
          />
           <Stack.Screen
            name="Ministryprabodh"
            component={Ministryprabodh}
            options={{ title: 'Ministryprabodh',headerShown:false  }}
          />
           <Stack.Screen
            name="Officerprabodh"
            component={Officerprabodh}
            options={{ title: 'Officerprabodh',headerShown:false  }}
          />
           <Stack.Screen
            name="Genralvbprabodhindex"
            component={Genralvbprabodhindex}
            options={{ title: 'Genralvbprabodhindex',headerShown:false  }}
          />
          <Stack.Screen
            name="Wordmeaningprabodh"
            component={Wordmeaningprabodh}
            options={{ title: 'Wordmeaningprabodh',headerShown:false }}
          />
          <Stack.Screen
            name="Ecerciseonevbprabodh"
            component={Ecerciseonevbprabodh}
            options={{ title: 'Ecerciseonevbprabodh'  ,headerShown:false}}
          />
          <Stack.Screen
            name="Ecercisetwovbprabodh"
            component={Ecercisetwovbprabodh}
            options={{ title: 'Ecercisetwovbprabodh' ,headerShown:false }}
          />
          <Stack.Screen
            name="Ecercisethreevbprabodh"
            component={Ecercisethreevbprabodh}
            options={{ title: 'Ecercisethreevbprabodh' ,headerShown:false }}
          />
          <Stack.Screen
            name="Ecercisefourvbprabodh"
            component={Ecercisefourvbprabodh}
            options={{ title: 'Ecercisefourvbprabodh' ,headerShown:false }}
          />
           <Stack.Screen
            name="Ecercisejumblevbprabodh"
            component={Ecercisejumblevbprabodh}
            options={{ title: 'Ecercisejumblevbprabodh' ,headerShown:false  }}
          />
          <Stack.Screen
            name="Lesson"
            component={Lesson}
            options={{ title: 'Lesson' ,headerShown:false  }}
          />
           <Stack.Screen
            name="Sectionprabodh"
            component={Sectionprabodh}
            options={{ title: 'Sectionprabodh',headerShown:false }}
          />
          <Stack.Screen
            name="Parisithlesson"
            component={Parisithlesson}
            options={{ title: 'Parisithlesson',headerShown:false }}
          />
           <Stack.Screen
            name="Objectiveprabodh"
            component={Objectiveprabodh}
            options={{ title: 'Objectiveprabodh',headerShown:false }}
          />
           <Stack.Screen
            name="Structureprabodh"
            component={Structureprabodh}
            options={{ title: 'Structureprabodh',headerShown:false }}
          />
           <Stack.Screen
            name="Narrativeprabodh"
            component={Narrativeprabodh}
            options={{ title: 'Narrativeprabodh' ,headerShown:false }}
          />
           <Stack.Screen
            name="Newwordprabodh"
            component={Newwordprabodh}
            options={{ title: 'Newwordprabodh',headerShown:false }}
          />
           <Stack.Screen
            name="Wordfamilyprabodh"
            component={Wordfamilyprabodh}
            options={{ title: 'Wordfamilyprabodh' ,headerShown:false}}
          />
           <Stack.Screen
            name="Grammerprabodh"
            component={Grammerprabodh}
            options={{ title: 'Grammerprabodh' ,headerShown:false}}
          />
           <Stack.Screen
            name="Practiceprabodh"
            component={Practiceprabodh}
            options={{ title: 'Practiceprabodh',headerShown:false }}
          />
           <Stack.Screen
            name="Excerciseprabodh"
            component={Excerciseprabodh}
            options={{ title: 'Excerciseprabodh',headerShown:false }}
          />
          {/* this is fill in the blanks */}
          <Stack.Screen
            name="Excersicetemplate"
            component={Excersicetemplate}
            options={{ title: 'Excersicetemplate' ,headerShown:false }}
          />
          <Stack.Screen
            name="Fillintheclues"
            component={Fillintheclues}
            options={{ title: 'Fillintheclues',headerShown:false }}
          />
            <Stack.Screen
            name="Translation"
            component={Translation}
            options={{ title: 'Translation' ,headerShown:false}}
          />
          <Stack.Screen
            name="Transform"
            component={Transform}
            options={{ title: 'Transform'  ,headerShown:false}}
          />
          
           
          
           <Stack.Screen
            name="Testproceedprabodh"
            component={Testproceedprabodh}
            options={{ title: 'Testproceedprabodh' ,headerShown:false }}
          />
           {/* instruction for fill in the blanks */}
           <Stack.Screen
            name="Teststartprabodh"
            component={Teststartprabodh}
            options={{ title: 'Teststartprabodh' ,headerShown:false  }}
          />
           {/* test for fill in the blanks */}
           <Stack.Screen
            name="Testsaction"
            component={Testsaction}
            options={{ title: 'Testsaction',headerShown:false }}
          />
          <Stack.Screen
            name="Testprabodh"
            component={Testprabodh}
            options={{ title: 'Testprabodh' ,headerShown:false }}
          />
           <Stack.Screen
            name="Testjumbleinstruction"
            component={Testjumbleinstruction}
            options={{ title: 'Testjumbleinstruction' ,headerShown:false }}
          />
            <Stack.Screen
            name="Testjumbleprabodh"
            component={Testjumbleprabodh}
            options={{ title: 'Testjumbleprabodh'  ,headerShown:false}}
          />
          <Stack.Screen
            name="Testtruflaseinstruction"
            component={Testtruflaseinstruction}
            options={{ title: 'Testtruflaseinstruction'  ,headerShown:false }}
          />
          <Stack.Screen
            name="Testtruefalse"
            component={Testtruefalse}
            options={{ title: 'Testtruefalse'  ,headerShown:false}}
          />



          {/* alphabet scation of prabodh */}
          <Stack.Screen
            name="Alphabet"
            component={Alphabet}
            options={{ title: 'Alphabet' ,headerShown:false}}
          />
          <Stack.Screen
            name="AlphabeticalOrder"
            component={AlphabeticalOrder}
            options={{ title: 'AlphabeticalOrder' }}
          />
          <Stack.Screen
            name="AlphabetPronunciation"
            component={AlphabetPronunciation}
            options={{ title: 'AlphabetPronunciation' }}
          />
          <Stack.Screen
            name="AWF"
            component={AWF}
            options={{ title: 'AWF' }}
          />
          <Stack.Screen
            name="Execercisetwo"
            component={Execercisetwo}
            options={{ title: 'Execercisetwo' }}
          />
          <Stack.Screen
            name="Execerciseone"
            component={Execercisetwo}
            options={{ title: 'Execerciseone' }}
          />
          <Stack.Screen
            name="Maatra"
            component={Maatra}
            options={{ title: 'Maatra' }}
          />
          <Stack.Screen
            name="Pronunciation"
            component={Pronunciation}
            options={{ title: 'Pronunciation' }}
          />
          <Stack.Screen
            name="TraceAlphabet"
            component={TraceAlphabet}
            options={{ title: 'TraceAlphabet' }}
          />
          <Stack.Screen
            name="TraceHalfConsonant"
            component={TraceHalfConsonant}
            options={{ title: 'TraceHalfConsonant' }}
          />
          <Stack.Screen
            name="TraceMaatraa"
            component={TraceMaatraa}
            options={{ title: 'TraceMaatraa' }}
          />
          <Stack.Screen
            name="TracePractice"
            component={TracePractice}
            options={{ title: 'TracePractice' }}
          />
          <Stack.Screen
            name="WordFormation"
            component={WordFormation}
            options={{ title: 'WordFormation' }}
          />
          <Stack.Screen
            name="WordOrder"
            component={WordOrder}
            options={{ title: 'WordOrder' }}
          />
          <Stack.Screen
            name="WriteWords"
            component={WriteWords}
            options={{ title: 'WriteWords' }}
          />






        
        {/* prabodh saction end here..................
        praveen saction start here......................
          */}
         <Stack.Screen
            name="Homepraveen"
            component={Homepraveen}
             options={{ title: 'Homepraveen',headerShown:false }}
            // options={{
            //   header: ({ navigation }) => (
            //     <View style={styles.header}>
            //       <View style={styles.headerIcon}>
            //         <MaterialIcons
            //           name="close"
            //           size={32}
            //           color="white"
            //           onPress={() => {         
                                      
            //             Alert.alert(
            //               'Do you want to close LILA App?',
            //               '',
            //               [
            //                 {
            //                   text: 'Cancel',
            //                   style: 'cancel',
                              
            //                  // This will be the default cancel button
            //                 },
            //                 {
            //                   text: 'Exit',
            //                   style: 'destructive', // This will make the button blue (destructive)
            //                   onPress: () => {
                                
            //                     RNExitApp.exitApp();
            //                   },
            //                 },
            //               ],
            //               { cancelable: false }
            //             );    
            //           }
            //           }
                      
            //         />
            //       </View>
            //       <Text style={styles.headerTitle}>प्रवीण</Text>
            //       <View style={styles.headerIcon}>
            //         <MaterialIcons
            //           name="settings"
            //           size={32}
            //           color="white"
            //           onPress={() => {
            //             // Handle home navigation logic here
            //             // Handle exit logic here
            //              navigation.navigate('Homechnagescreen');
            //           }}
            //         />
            //       </View>
            //     </View>
            //   ),
            // }}
          />
          <Stack.Screen
            name="Dictionarytitlespraveen"
            component={Dictionarytitlespraveen}
            options={{ title: 'Dictionarytitlespraveen',headerShown:false }}
          />
          <Stack.Screen
            name="Dictionarylistpraveen"
            component={Dictionarylistpraveen}
            options={{ title: 'Dictionarylistpraveen',headerShown:false }}
          />
          <Stack.Screen
            name="Lessonpraveen"
            component={Lessonpraveen}
            options={{ title: 'Lessonpraveen',headerShown:false  }}
          />
          <Stack.Screen
            name="lipiwaratanipraveen"
            component={lipiwaratanipraveen}
            options={{ title: 'lipiwaratanipraveen',headerShown:false  }}
          />
          <Stack.Screen
            name="Sectionpraveen"
            component={Sectionpraveen}
            options={{ title: 'Sectionpraveen' }}
          />
           <Stack.Screen
            name="Objectivepraveen"
            component={Objectivepraveen}
            options={{ title: 'Objectivepraveen' }}
          />
          
          <Stack.Screen
            name="Structurepraveen"
            component={Structurepraveen}
            options={{ title: 'Structurepraveen' }}
          />
          
          <Stack.Screen
            name="Narrativepraveen"
            component={Narrativepraveen}
            options={{ title: 'Narrativepraveen' }}
          />
          <Stack.Screen
            name="Newwordpraveen"
            component={Newwordpraveen}
            options={{ title: 'Newwordpraveen' }}
          />
          
          <Stack.Screen
            name="Wordfamilypraveen"
            component={Wordfamilypraveen}
            options={{ title: 'Wordfamilypraveen' }}
          />
          
          <Stack.Screen
            name="Grammerpraveen"
            component={Grammerpraveen}
            options={{ title: 'Grammerpraveen',headerShown:false }}
          />

           <Stack.Screen
            name="Practicepraveen"
            component={Practicepraveen}
            options={{ title: 'Practicepraveen' }}
          />
          
          <Stack.Screen
            name="Excercisepraveen"
            component={Excercisepraveen}
            options={{ title: 'Excercisepraveen',headerShown:false }}
          />
           <Stack.Screen
            name="Excersicetemplatepraveen"
            component={Excersicetemplatepraveen}
            options={{ title: 'Excersicetemplatepraveen' }}
          />
           <Stack.Screen
            name="Testproceedpraveen"
            component={Testproceedpraveen}
            options={{ title: 'Testproceedpraveen' ,headerShown:false }}
          />

          <Stack.Screen
            name="Testfillintheblankspraveen"
            component={Testfillintheblankspraveen}
            options={{ title: 'Testfillintheblankspraveen' ,headerShown:false }}
          />

           <Stack.Screen
            name="Teststartpraveen"
            component={Teststartpraveen}
            options={{ title: 'Teststartpraveen',headerShown:false }}
          />
            <Stack.Screen
            name="Testmcqinstructionpraveen"
            component={Testmcqinstructionpraveen}
            options={{ title: 'Testmcqinstructionpraveen',headerShown:false }}
          />
          <Stack.Screen
            name="Testmcqpraveen"
            component={Testmcqpraveen}
            options={{ title: 'Testmcqpraveen',headerShown:false }}
          />
          <Stack.Screen
            name="fillintheblanksecondtestpraveen"
            component={fillintheblanksecondtestpraveen}
            options={{ title: 'fillintheblanksecondtestpraveen',headerShown:false }}
          />
          <Stack.Screen
            name="fillintheblanksecandtest"
            component={fillintheblanksecandtest}
            options={{ title: 'fillintheblanksecandtest',headerShown:false }}
          />
           <Stack.Screen
            name="Testtruefalsepraveen"
            component={Testtruefalsepraveen}
            options={{ title: 'Testtruefalsepraveen',headerShown:false }}
          />
          <Stack.Screen
            name="Testtrufalsestart"
            component={Testtrufalsestart}
            options={{ title: 'Testtrufalsestart',headerShown:false }}
          />

           <Stack.Screen
            name="Testsactionpraveen"
            component={Testsactionpraveen}
            options={{ title: 'Testsactionpraveen' }}
          />

          {/* pragya saction start from here................ */}
          <Stack.Screen
            name="Homepragya"
            component={Homepragya}
             options={{ title: 'Homepragya',headerShown:false }}
            // options={{
            //   header: ({ navigation }) => (
            //     <View style={styles.header}>
            //       <View style={styles.headerIcon}>
            //         <MaterialIcons
            //           name="close"
            //           size={32}
            //           color="white"
            //           onPress={() => {                       
            //             Alert.alert(
            //               'Do you want to close LILA App?',
            //               '',
            //               [
            //                 {
            //                   text: 'Cancel',
            //                   style: 'cancel',
                              
            //                  // This will be the default cancel button
            //                 },
            //                 {
            //                   text: 'Exit',
            //                   style: 'destructive', // This will make the button blue (destructive)
            //                   onPress: () => {
                                
            //                     RNExitApp.exitApp();
            //                   },
            //                 },
            //               ],
            //               { cancelable: false }
            //             );    
            //           }
            //           }
                      
            //         />
            //       </View>
            //       <Text style={styles.headerTitle}>प्राज्ञ</Text>
            //       <View style={styles.headerIcon}>
            //         <MaterialIcons
            //           name="settings"
            //           size={32}
            //           color="white"
            //           onPress={() => {
            //             // Handle home navigation logic here
            //             // Handle exit logic here
            //              navigation.navigate('Homechnagescreen');
            //           }}
            //         />
            //       </View>
            //     </View>
            //   ),
            // }}
          />

            <Stack.Screen
            name="Dictionarytitlespragya"
            component={Dictionarytitlespragya}
            options={{ title: 'Dictionarytitlespragya',headerShown:false }}
          />
           <Stack.Screen
            name="Dictionarylistpragya"
            component={Dictionarylistpragya}
            options={{ title: 'Dictionarylistpragya',headerShown:false }}
          />
            <Stack.Screen
            name="Apendixpragya"
            component={Apendixpragya}
            options={{ title: 'Apendixpragya' ,headerShown:false}}
          />
          
          
          <Stack.Screen
            name="Commanlyusedwordpragya"
            component={Commanlyusedwordpragya}
            options={{ title: 'Commanlyusedwordpragya' ,headerShown:false}}
          />
          
          <Stack.Screen
            name="Aamprayogkepadbandhtitles"
            component={Aamprayogkepadbandhtitles}
            options={{ title: 'Aamprayogkepadbandhtitles' ,headerShown:false}}
          />

          <Stack.Screen
            name="Aamprayogkepadbandh"
            component={Aamprayogkepadbandh}
            options={{ title: 'Aamprayogkepadbandh', headerShown:false }}
          />
          
          <Stack.Screen
            name="Karylayintippani"
            component={Karylayintippani}
            options={{ title: 'Karylayintippani' ,headerShown:false}}
          />
            <Stack.Screen
            name="Mantralyakaryalaya"
            component={Mantralyakaryalaya}
            options={{ title: 'Mantralyakaryalaya' ,headerShown:false}}
          />
             <Stack.Screen
            name="Paribhashikshabdavalititles"
            component={Paribhashikshabdavalititles}
            options={{ title: 'Paribhashikshabdavalititles' }}
          />

          <Stack.Screen
            name="Paribhashiksabdavali"
            component={Paribhashiksabdavali}
            options={{ title: 'Paribhashiksabdavali' }}
          />

          
          <Stack.Screen
            name="Padnam"
            component={Padnam}
            options={{ title: 'Padnam' }}
          />
          

         
          <Stack.Screen
            name="Sactionpragya"
            component={Sactionpragya}
            options={{ title: 'Sactionpragya'  ,headerShown:false}}
          />

         <Stack.Screen
            name="Sectionsecandpragya"
            component={Sectionsecandpragya}
            options={{ title: 'Sectionsecandpragya'  ,headerShown:false}}
          />

       <Stack.Screen
            name="Structureexposurepragya"
            component={Structureexposurepragya}
            options={{ title: 'Structureexposurepragya'  ,headerShown:false}}
          />

          <Stack.Screen
            name="Lessonpragya"
            component={Lessonpragya}
            options={{ title: 'Lessonpragya'  ,headerShown:false}}
          />

          <Stack.Screen
            name="Poorakpragya"
            component={Poorakpragya}
            options={{ title: 'Poorakpragya'  ,headerShown:false}}
          />

          <Stack.Screen
            name="Narrativepragya"
            component={Narrativepragya}
            options={{ title: 'Narrativepragya'  ,headerShown:false}}
          />
          <Stack.Screen
            name="Newwordspragya"
            component={Newwordspragya}
            options={{ title: 'Newwordspragya'  ,headerShown:false}}
          />

            <Stack.Screen
            name="Wordfamilypragya"
            component={Wordfamilypragya}
            options={{ title: 'Wordfamilypragya'  ,headerShown:false}}
          />
          
            <Stack.Screen
            name="Grammerpragya"
            component={Grammerpragya}
            options={{ title: 'Grammerpragya'  ,headerShown:false}}
          />



          

          
           <Stack.Screen
            name="Objectivepragya"
            component={Objectivepragya}
            options={{ title: 'Objectivepragya' ,headerShown:false }}
          />
          <Stack.Screen
            name="Contentexposurepragya"
            component={Contentexposurepragya}
            options={{ title: 'Contentexposurepragya' }}
          />
          <Stack.Screen
            name="Contenttextpragya"
            component={Contenttextpragya}
            options={{ title: 'Contenttextpragya' ,headerShown:false}}
          />
          <Stack.Screen
            name="Vocabularypragya"
            component={Vocabularypragya}
            options={{ title: 'Vocabularypragya' ,headerShown:false }}
          />
           <Stack.Screen
            name="Sentencepatternpragya"
            component={Sentencepatternpragya}
            options={{ title: 'Sentencepatternpragya' ,headerShown:false }}
          />
           <Stack.Screen
            name="Practicepragya"
            component={Practicepragya}
            options={{ title: 'Practicepragya',headerShown:false }}
          />
          <Stack.Screen
            name="Sampleletterspraggya"
            component={Sampleletterspraggya}
            options={{ title: 'Sampleletterspraggya'  ,headerShown:false}}
          />
          <Stack.Screen
            name="Situtationspragya"
            component={Situtationspragya}
            options={{ title: 'Situtationspragya' ,headerShown:false }}
          />
          <Stack.Screen
            name="Exerciselistpragya"
            component={Exerciselistpragya}
            options={{ title: 'Exerciselistpragya',headerShown:false }}
          />
          <Stack.Screen
            name="Excercisepragya"
            component={Excercisepragya}
            options={{ title: 'Excercisepragya',headerShown:false }}
          />
          <Stack.Screen
            name="Fillinthecluespragya"
            component={Fillinthecluespragya}
            options={{ title: 'Fillinthecluespragya',headerShown:false }}
          />
          <Stack.Screen
            name="Translationpragya"
            component={Translationpragya}
            options={{ title: 'Translationpragya',headerShown:false }}
          />
          <Stack.Screen
            name="Transformpragya"
            component={Transformpragya}
            options={{ title: 'Transformpragya',headerShown:false }}
          />

           <Stack.Screen
            name="Testproceedpragya"
            component={Testproceedpragya}
            options={{ title: 'Testproceedpragya' ,headerShown:false }}
          />

           <Stack.Screen
            name="Teststartpragya"
            component={Teststartpragya}
            options={{ title: 'Teststartpragya' ,headerShown:false }}
          />

          
           <Stack.Screen
            name="Tesxtpragya"
            component={Tesxtpragya}
            options={{ title: 'Tesxtpragya' ,headerShown:false }}
          />
          <Stack.Screen
            name="Testmcqinstructionpragya"
            component={Testmcqinstructionpragya}
            options={{ title: 'Testmcqinstructionpragya' ,headerShown:false }}
          />

          <Stack.Screen
            name="Testmcqpragya"
            component={Testmcqpragya}
            options={{ title: 'Testmcqpragya' ,headerShown:false }}
          />

            <Stack.Screen
            name="Testtruefalseinstruntionpragya"
            component={Testtruefalseinstruntionpragya}
            options={{ title: 'Testtruefalseinstruntionpragya' ,headerShown:false }}
          />
            <Stack.Screen
            name="Testtruefalsepragya"
            component={Testtruefalsepragya}
            options={{ title: 'Testtruefalsepragya' ,headerShown:false }}
          />

            <Stack.Screen
            name="Scorecardpragya"
            component={Scorecardpragya}
            options={{ title: 'Scorecardpragya' ,headerShown:false }}
          />



        </Stack.Navigator>
      </NavigationContainer>
      </ImageBackground>

    
    // <ImageBackground
    //   source={require('../assets/bg.png')} // Provide the path to your image
    //   style={styles.backgroundImage}
    // >
      
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="Home"
    //         component={HomeScreen}
    //         options={{ title: 'Home' }}
    //       />
    //       <Stack.Screen
    //         name="About"
    //         component={AboutScreen}
    //         options={{ title: 'About' }}
    //       />
         
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    height: 60,
    backgroundColor: '#0D6EFD',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight:'bold'
  },
  headerIcon: {
    width: 30,
    alignItems: 'center',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    padding:10,
    elevation:4,
    
  },
  modalContainer: {
   
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  }
});

export default App;
