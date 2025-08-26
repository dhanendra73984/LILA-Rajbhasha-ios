import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import VideoPlayer from 'react-native-video-player';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


type SubtitleData = {
  text: string;
  duration: number;
  startTime: number; // Add startTime property
  endTime: number;   // Add endTime property
};

const Narrativepragya = (props:any) => {
  // const {Package,Medium,selectedLessonIndex,orignalessonindex} = props.route.params;
  const Package = "Prabodh";
const selectedLessonIndex = 26;
const Medium = "English"; // If needed


  const [subtitles, setSubtitles] = useState<SubtitleData[]>([]);
  const [englishSubtitles, setEnglishSubtitles] = useState<SubtitleData[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(0);

  const [isHindiTextVisible, setIsHindiTextVisible] = useState(false);
  const [isEnglishTextVisible, setIsEnglishTextVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [currentSubtitleTimer, setCurrentSubtitleTimer] = useState<NodeJS.Timeout | null>(null);

  const [combinedWords, setCombinedWords] = useState<{ hindi: string; english: string }[]>([]);




   
  //header navigation
  const handleBackPress = () => {
    navigation.goBack();}; 
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    const homeScreen = Package === 'Prabodh' ? 'Home' : 'Homepragya';
    props.navigation.navigate(homeScreen,{Package,Medium});
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

  const tableData = {
    head: ['ID', 'Name', 'Age'],  // Column headers
    data: [                       // Row data
      ['1', 'John', '35'],
      ['2', 'Sarah', '28'],
      ['3', 'Mike', '42']
    ]
  };

  return (


    <View style={{flex:1}}>
     <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

              

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>

          


    <View>

    <VideoPlayer
        source={{ uri: `https://lilaonmobile.rb-aai.in/LILAMobileData/LessonsVideo/${Package.toLowerCase()}/${Package}${selectedLessonIndex}.mp4` }} // Corrected prop name
        videoWidth={1200}
        videoHeight={900}
        autoplay={true} // Ensure boolean is explicitly set
        onProgress={handleVideoProgress}
      /> 
      
      <View style={styles.buttonRow}>
        {/* Toggle button for Hindi text visibility */}
        
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
