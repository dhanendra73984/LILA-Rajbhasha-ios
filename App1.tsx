import * as React from 'react';
import { Button, View, Text, StyleSheet, processColor,Alert, ActivityIndicator, BackHandler, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import  { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sound from 'react-native-sound';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  RecordBackType,
  PlayBackType
} from 'react-native-audio-recorder-player';






// Extend the type definitions to include duration
// Extend the type definitions to include duration

``


// Define the types for your screens
type RootDrawerParamList = {
  Home: undefined; // No parameters expected for the Home screen
  Notifications: undefined; // No parameters expected for the Notifications screen
  About: undefined; // ✅ Add About here
  Tabledemo:undefined;
  FileDemo:undefined
};

// Define the type for the `navigation` prop
type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
type NotificationsScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Notifications'>;



// Props for the HomeScreen component
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Props for the NotificationsScreen component
interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
}
import VideoPlayer, { VideoPlayerRef } from 'react-native-video-player';
import AboutScreen from './AboutScreen';
import Tabledemo from './Tabledemo';
import FileDemo from './FileDemo';



type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};


import { LineChart, PieChart } from 'react-native-charts-wrapper';

interface ChartData {
  x: number;
  y: number;
}

// Home Screen Component
function HomeScreen({ navigation }: HomeScreenProps) {


  
  const [data, setData] = useState<Post | null>(null);
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const soundRef = useRef<Sound | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('apple');






//video player 
const videoRef = useRef(null);
const [isLoading, setIsLoading] = useState(true);
const [isPaused, setIsPaused] = useState(false);
const [progress, setProgress] = useState(0);

const handleLoad = () => {
  setIsLoading(false);
};

const handleError = (error: any) => {
  console.log('Video error:', error);
  setIsLoading(false);
};

const togglePlayPause = () => {
  setIsPaused(!isPaused);
};










  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.release(); // Release any previous instance
    }

    soundRef.current = new Sound(
      'https://lilaonmobile.rb-aai.in/LILAMobileData/DictSound/akbar.mp3',
      undefined, // Use undefined instead of null
      (error) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        soundRef.current?.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
        });
      }
    );
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

 
  

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        // setData(response.data); // Set the response data
        setLoadings(false); // Stop loading
      })
      .catch(err => {
        setError(err.message); // Set error message
        setLoadings(false); // Stop loading
      });
  }, []);

  const playerRef = useRef<VideoPlayerRef>(null);


  


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

 
{/* 
      <VideoPlayer
            ref={playerRef}
            endWithThumbnail
            thumbnail={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
            }}
            source={{
              uri: 'https://lilaonmobile.rb-aai.in/LILAMobileData/LessonsVideo/prabodh/Prabodh27.mp4',
            }}
            onError={(e) => console.log(e)}
            showDuration={true}
          /> */}


      
      {/* <Video
          ref={videoRef}
          source={{ uri: 'https://lilaonmobile.rb-aai.in/LILAMobileData/LessonsVideo/prabodh/Prabodh27.mp4' }}
          style={styles.video}
          paused={isPaused}
          resizeMode="contain"
          onLoad={handleLoad}
          onError={handleError}
          onProgress={({ currentTime, seekableDuration }) => {
            setProgress(currentTime / seekableDuration);
          }}
          controls={false} // We'll build custom controls
        /> */}




      {/* <View style={styles.containerr}>
      <Text style={styles.label}>Select a Fruit:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="Banana" value="banana" />
        <Picker.Item label="Orange" value="orange" />
      </Picker>
      <Text style={styles.selectedText}>You selected: {selectedValue}</Text>
    </View> */}




      <Button title="Play Sound" onPress={playSound} />
    
      <Icon name="rocket" size={30} color="#900" onPress={playSound} />

    
 



      <View style={styles.container}>

    
      
      



      
    </View>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

// Notifications Screen Component
function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const [showWebView, setShowWebView] = useState(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);

  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recordPath, setRecordPath] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);





  useEffect(() => {
   
    
    return () => {
      if (isRecording) stopRecording();
      if (isPlaying) stopPlaying();
    };
  }, []);

  const startRecording = async (): Promise<void> => {
    try {
      console.log('[1] Attempting to start recording...');
      
      const path = await audioRecorderPlayer.startRecorder();
      console.log('[2] Recording started successfully at path:', path);
      
      audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
        console.log('[3] Recording progress - currentPosition:', e.currentPosition);
        setCurrentPosition(e.currentPosition);
      });
      
      setRecordPath(path);
      setIsRecording(true);
      console.log('[4] Recording state updated - isRecording: true');
      
    } catch (error) {
      console.error('[X] Recording failed:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };
  
  const stopRecording = async (): Promise<void> => {
    try {
      console.log('[1] Attempting to stop recording...');
      
      const result = await audioRecorderPlayer.stopRecorder();
      console.log('[2] Recording stopped successfully. Result:', result);
      
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      console.log('[3] Recording state updated - isRecording: false');
      
    } catch (error) {
      console.error('[X] Stop recording failed:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };
  
  const startPlaying = async (): Promise<void> => {
    try {
      console.log('[1] Attempting to start playback...');
      
      if (!recordPath) {
        console.warn('[X] No recording available to play');
        return;
      }
      
      console.log('[2] Playing recording from path:', recordPath);
      const path = await audioRecorderPlayer.startPlayer(recordPath);
      console.log('[3] Playback started successfully at path:', path);
      
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('[4] Playback progress -', {
          currentPosition: e.currentPosition,
          duration: e.duration
        });
        
        setCurrentPosition(e.currentPosition);
        setDuration(e.duration);
        
        if (e.currentPosition === e.duration) {
          console.log('[5] Playback completed automatically');
          stopPlaying();
        }
      });
      
      setIsPlaying(true);
      console.log('[6] Playback state updated - isPlaying: true');
      
    } catch (error) {
      console.error('[X] Playback failed:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };
  
  const stopPlaying = async (): Promise<void> => {
    try {
      console.log('[1] Attempting to stop playback...');
      
      await audioRecorderPlayer.stopPlayer();
      console.log('[2] Playback stopped successfully');
      
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
      console.log('[3] Playback state updated - isPlaying: false');
      
    } catch (error) {
      console.error('[X] Stop playback failed:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };


  return (
    <View style={styles.container}>


      




      {showWebView ? (
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: 'https://www.google.com' }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoad={() => console.log("WebView loaded successfully!")}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error:", nativeEvent);
              setWebViewError(nativeEvent.description);
            }}
          />
          {webViewError && <Text style={styles.errorText}>Error: {webViewError}</Text>}
          <Button title="Close WebView" onPress={() => setShowWebView(false)} />
          <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Notifications Screen</Text>
          <Button title="Open WebView" onPress={() => setShowWebView(true)} />
          <Button title="Go Back Home" onPress={() => navigation.navigate('Home')} />
        </>
      )}



     {/* <Text>Audio Recorder & Player</Text>
      
     <Text>Audio Recorder & Player</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
      
      {recordPath ? (
        <View style={styles.buttonContainer}>
          <Button
            title={isPlaying ? 'Stop Playing' : 'Start Playing'}
            onPress={isPlaying ? stopPlaying : startPlaying}
            disabled={!recordPath}
          />
        </View>
      ) : null}
      
      <Text>Current Position: {currentPosition} ms</Text>
      <Text>Duration: {duration} ms</Text>
      <Text>File Path: {recordPath}</Text> */}

    </View>
  );
}



// Home Screen Component


 






// Create the Drawer Navigator
const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} /> 
        <Drawer.Screen name="Tabledemo" component={Tabledemo} /> 
        <Drawer.Screen name="FileDemo" component={FileDemo} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}





const styles = StyleSheet.create({
  
  data: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  webviewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },

  containerr: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 12, marginBottom: 5 },
  picker: { height: 30, width: 100 },
  selectedText: { fontSize: 8, marginTop: 10 },

 
  videoContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '90%',
    height: 250,
  },

  containerrr: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  chart: {
    flex: 1
  }



});