import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import VideoPlayer from 'react-native-video-player';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

type SubtitleData = {
  text: string;
  duration: number;
  startTime: number; // Add startTime property
  endTime: number;   // Add endTime property
};

const Narrativepragya = (props:any) => {
  const {ApiResponse,Package,Medium,selectedLessonIndex,orignalessonindex} = props.route.params;
  const [subtitles, setSubtitles] = useState<SubtitleData[]>([]);
  const [englishSubtitles, setEnglishSubtitles] = useState<SubtitleData[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(0);

  const [isHindiTextVisible, setIsHindiTextVisible] = useState(false);
  const [isEnglishTextVisible, setIsEnglishTextVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [currentSubtitleTimer, setCurrentSubtitleTimer] = useState<NodeJS.Timeout | null>(null);

  const [combinedWords, setCombinedWords] = useState<{ hindi: string; english: string }[]>([]);


  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[46]
  const titleoflessonindex = langWiseWords[75];//headertitle

   
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
    props.navigation.navigate(homeScreen,{Package,Medium,ApiResponse});
  };

  const toggleHindiTextVisibility = () => {
   
    // Disable English text when Hindi text is visible
    setIsEnglishTextVisible(false);
  };
  
  const toggleEnglishTextVisibility = () => {
  
    // Disable Hindi text when English text is visible
    setIsEnglishTextVisible(true);
   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const hindiResponse = await axios.get('https://lilaonmobile.rb-aai.in/LILAMobileData/VTT/${Package}27.vtt');
        // const englishResponse = await axios.get('https://lilaonmobile.rb-aai.in/LILAMobileData/VTT/PrabodhEnglish27.vtt');
        const hindiResponse = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/VTT/${Package}${selectedLessonIndex}.vtt`,{timeout:500000});
        const englishResponse = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/VTT/${Package}${Medium}${selectedLessonIndex}.vtt`,{timeout:500000});

        const hindiSubtitleData = parseSubtitleData(hindiResponse.data);
        const englishSubtitleData = parseSubtitleData(englishResponse.data);

        setSubtitles(hindiSubtitleData);
        setEnglishSubtitles(englishSubtitleData);

        // Extract Hindi and English words
        const combinedWordsList = hindiSubtitleData.map((hindiSubtitle, index) => ({
          hindi: hindiSubtitle.text,
          english: englishSubtitleData[index]?.text || '', // Use empty string if English subtitle not available
        }));

        setCombinedWords(combinedWordsList);

      } catch (error) {
        console.error('Error fetching subtitles:', error);
      }
    };

    fetchData();
  }, []);

  const handleVideoProgress = (progress: any) => {
    const currentTimeMillis = progress.currentTime * 1000;

    // Find the index of the subtitle corresponding to the current video time
    const currentIndex = subtitles.findIndex(
      (subtitle) =>
        currentTimeMillis >= subtitle.startTime && currentTimeMillis <= subtitle.endTime
    );

    if (currentIndex !== -1) {
      setCurrentSubtitleIndex(currentIndex);
    }
  };



  const displaySubtitles = (subtitleData: SubtitleData[]) => {
    let currentTime = 0;
  
    subtitleData.forEach(({ duration }, index) => {
      // Double the time and duration for the first subtitle
      const delay = index === 0 ? currentTime * 2 : currentTime;
      const adjustedDuration = index === 0 ? duration * 2 : duration;
  
      setTimeout(() => {
        setCurrentSubtitleIndex(index);
      }, delay);
  
      currentTime += adjustedDuration;
    });
  };

  
  


  const convertTimestampToMillis = (timestamp: string): number => {
    const [hh, mm, ss, ms] = timestamp.split(/[:.]/).map(Number);
    return hh * 3600000 + mm * 60000 + ss * 1000 + ms;
  };

  


  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);

    // Pause subtitle updates when video playback is paused
    if (currentSubtitleTimer && !isVideoPlaying) {
      clearInterval(currentSubtitleTimer);
      setCurrentSubtitleTimer(null);
    }
  };
 //model 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  //................................
  const parseSubtitleData = (subtitleText: string): SubtitleData[] => {
    const lines = subtitleText.split('\n');
  
    return lines.reduce<SubtitleData[]>((acc, line, index, array) => {
      if (line.includes('-->')) {
        const [startTime, endTime] = getSubtitleTimes(line);
        const text = array[index + 1];
        const duration = getSubtitleDuration(startTime, endTime);
  
        if (text && duration > 0) {
          acc.push({
            text,
            duration,
            startTime: convertTimestampToMillis(startTime),
            endTime: convertTimestampToMillis(endTime),
          });
        }
      }
      return acc;
    }, []);
  };
  
  const getSubtitleTimes = (timestampLine: string): [string, string] => {
    const [, startTime, endTime] =
      timestampLine.match(/(\d+:\d+:\d+\.\d+) --> (\d+:\d+:\d+\.\d+)/) || [];
    return [startTime, endTime];
  };
  
  const getSubtitleDuration = (startTime: string, endTime: string): number => {
    const startMillis = convertTimestampToMillis(startTime);
    const endMillis = convertTimestampToMillis(endTime);
    return endMillis - startMillis;
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
          source={require('../../../assets/img/bg.png')} // Provide the path to your image
          style={styles.backgroundImage}>



    <View>

    <VideoPlayer
        source={{ uri: `https://lilaonmobile.rb-aai.in/LILAMobileData/LessonsVideo/${Package.toLowerCase()}/${Package}${selectedLessonIndex}.mp4` }}
        videoWidth={1200}
        videoHeight={900}
        autoplay={true}
        onProgress={handleVideoProgress}
      />
      <View style={styles.buttonRow}>
        {/* Toggle button for Hindi text visibility */}
        <TouchableHighlight style={styles.button} onPress={toggleHindiTextVisibility}>
          <Text style={{fontSize:12,color:'white'}}>{langWiseWords[284]}</Text>
        </TouchableHighlight>

        {/* Toggle button for English text visibility */}
        <TouchableHighlight style={styles.button} onPress={toggleEnglishTextVisibility}>
          <Text style={{fontSize:12,color:'white'}}>{langWiseWords[255]}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={toggleModalVisibility}>
        <Text style={{fontSize:12,color:'white'}}>{langWiseWords[268]}</Text>
      </TouchableHighlight>
      </View>

      {/* Hindi text conditionally rendered based on visibility state */}
      
        <Text style={{fontSize:20,color:'black'}}>{subtitles[currentSubtitleIndex]?.text}</Text>
      



      {/* English text conditionally rendered based on visibility state */}
      {isEnglishTextVisible && (
        <Text style={{fontSize:20,color:'blue'}}>{englishSubtitles[currentSubtitleIndex]?.text}</Text>
      )}
      {/* <Text>Duration: {subtitles[currentSubtitleIndex]?.duration} milliseconds</Text> */}
      {/* <Text> {englishSubtitles[currentSubtitleIndex]?.text}</Text> */}
    </View>
          <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModalVisibility}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}></Text>
          <ScrollView>
            {combinedWords.map((wordPair, index) => (
              <View  key={index} style={{ borderBottomWidth: 0.2, borderBottomColor: 'black', paddingBottom: 8,paddingTop:4 }}>
                <Text style={{ marginRight: 8 ,color:'black',fontSize:16}}>{wordPair.hindi}</Text>
                <Text style={{ marginRight: 8 ,color:'black',fontSize:16}}>{wordPair.english}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Close button */}
          <TouchableHighlight onPress={toggleModalVisibility } style={styles.button}>
            <Text style={{color:'white',textAlign:'center',fontSize:16}}>{langWiseWords[45]}</Text>
          </TouchableHighlight>
        </View>
      </Modal>

    
    </ImageBackground>
    </View>
  );
};

export default Narrativepragya;

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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "center",
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#0D6EFD',
    padding: 4,
    margin: 2,
    borderRadius:4,
    elevation:3
    
  },
});
