import { ImageBackground, FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Define an interface for the response data object
interface ResponseDataItem {

  HWord: string;
  HQuestion: string | null;
  GenCategory: string | null;
  LangWiseGenCategory: string | null;
  LangWiseWords: string;
  LangWiseInstruction:string;
 
}


const Vocabularypragya = (props:any) => {

  const { ApiResponse, Package, Medium,title,selectedLessonIndex } = props.route.params;  
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[260]
  // State to hold the response data
  const [responseData, setResponseData] = useState<ResponseDataItem[]>([]);

  // State to hold the selected index
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
     // Function to handle the back button press
     const handleBackPress = () => {
      navigation.goBack();
    };
  
    // Function to handle the home button press
    const handleHomePress = () => {
      // Navigate to the home screen or the desired screen
      // props.navigation.goBack();
      // props.navigation.navigate('Homechnagescreen')
      props.navigation.navigate('Homepragya',{Package,Medium,ApiResponse});
    };

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getPragyaLessonVocab', {
          LangSelected: Medium,
          LessonNo:selectedLessonIndex

        },{ timeout: 500000 });
        // Set the response data to the state variable
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render item for FlatList
  const renderItem = ({ item, index }: { item: ResponseDataItem; index: number }) => (
    <View style={[styles.itemContainer, index === selectedItemIndex && styles.selectedItem]}>
      <Text 
        style={styles.word}
        onPress={() => setSelectedItemIndex(index === selectedItemIndex ? null : index)}
      >
        {item.HWord}
      </Text>
      {index === selectedItemIndex && (
        <View style={styles.langWiseWordsContainer}>
          <Text style={styles.langWiseWords}>{item.LangWiseWords}</Text>
        </View>
      )}
    </View>
  );

  return (

    <View style={{ flex: 1 }}>

    {/* Your header */}
    <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
                <View style={styles.header}>
                {/* Left side - Back icon */}
                <TouchableOpacity  onPress={handleBackPress}>
                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{title}</Text>


                {/* Right side - Home icon */}
                <TouchableOpacity onPress={handleHomePress}>
                {/* <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" /> */}
                </TouchableOpacity>
            </View>
            </SafeAreaView>

    <ImageBackground
      source={require('../../../assets/img/bg.png')}
      style={styles.backgroundImage}

       >

             <Text style={styles.title}>{Sectiontitle}</Text>
             <Text style={styles.title1}>{responseData[0]?.LangWiseInstruction}</Text>

              <View style={styles.horizontaline}></View>
      {isLoading ? (
        // Show loading indicator while data is being fetched
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        // Display the content when data is loaded
        <View>
          {/* <Text>karylayintippani handle here with downtrack translationnn{Medium}</Text> */}
          <FlatList
            data={responseData}
            renderItem={renderItem}
            keyExtractor={(item) => item.HWord}
            style={styles.flatList}
          />
        </View>
      )}
    </ImageBackground>

    </View>
  );
};

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
 
  flatList: {
    marginTop: 10,
   
  },

  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
   
  },
  selectedItem: {
    backgroundColor: '#EAF0F1', // Selected item background color
  },

  word: {
    fontSize: 16,
  
    color: 'black', // Text color
  },

  
  langWiseWordsContainer: {
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white background
    borderRadius:1,
    padding: 4,
    
  },
  langWiseWords: {
    fontSize: 16,
    color: 'black',
    textAlign:'left'
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    marginLeft:'2%',
    color:'black',
    marginTop:5
  },
});

export default Vocabularypragya;
