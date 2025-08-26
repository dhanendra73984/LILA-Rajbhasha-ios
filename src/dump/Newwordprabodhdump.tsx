import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Modal from 'react-native-modal';

type NewWordItem = {
  word: string;
  isFirst: boolean;
};

const Newwordprabodh = (props:any) => {

  const {ApiResponse,Package,Medium,selectedLessonIndex,title} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  const Sectiontitle=langWiseWords[53]
  const titleoflessonindex = langWiseWords[75];//headertitle

    //header navigation
    const handleBackPress = () => {
      navigation.goBack();}; 
    const navigation = useNavigation();
    
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
    };

    const [newWords, setNewWords] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getLessonWiseNewWords/';
  
          const requestData = {
            LangSelected: props.route.params.Medium,
            PackSelected: props.route.params.Package,
            LessonNo: props.route.params.selectedLessonIndex.toString(),
          };
  
          const response = await axios.post(apiUrl, requestData);
  
          // Extract HNewWords from the response and split it into an array
          const hNewWordsArray = response.data
          .flatMap((item: any) => {
            const words = item.HNewWords.split(/,| \| /).map((word: string, index: number) => {
              // Mark the first word of each category and trim spaces
              return { word: word.trim(), isFirst: index === 0 };
            });
            return words;
          });
        
        setNewWords(hNewWordsArray);
  
          // Update state with the array of HNewWords
          setNewWords(hNewWordsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [props.route.params.Medium, props.route.params.Package, props.route.params.selectedLessonIndex]);
  
  //modle start here..............
  const [selectedItem, setSelectedItem] = useState<NewWordItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemClick = (item: NewWordItem) => {
    console.log('Item clicked:', item);

    setSelectedItem(item);
    setIsModalVisible(true);

    // Add your logic for handling the click event here
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
   //for word click on listitems 
  //  const handleItemClick = (item:any) => {
  //   console.log('Item clicked:', item);
  
  //   // Show toast message
  //   ToastAndroid.showWithGravityAndOffset(
  //     `Clicked Item: ${item.word}`,
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50
  //   );
  
  //   // Add your logic for handling the click event here
  // };


  return (
    <View style={{ flex: 1 }}>
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




            <View style={styles.container}>
            <FlatList
              data={newWords}
              keyExtractor={(word, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={item.isFirst ? undefined : () => handleItemClick(item)}>
                  <View style={[styles.wordContainer, item.isFirst && styles.firstItem]}>
                    <Text style={item.isFirst ? styles.firstItemText : styles.wordText}>{item.word}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />




            {/* modle start here..... */}

            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
              <View style={styles.modalContent}>
                <Text>{selectedItem ? `Clicked Item: ${selectedItem.word}` : ''}</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>


            
            </View>

          {/* <View>
            <Text>Objectiveprabodh</Text>
          </View> */}
          </ImageBackground>
    </View>
  )
}
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
   
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
    marginLeft:'40%',
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
  //flatlist design 
  flatListContainer: {
    padding: 1,
  },
  wordContainer: {
    padding: 10,
   
    
    borderWidth: 0.5, // Add this line for border
    borderColor: 'black', // Add this line for border color
  },
  wordText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  firstItem: {
    backgroundColor: '#0D6EFD',
    // height:40  //if you want to adjust that hight of specific clored item 
  },
  firstItemText: {
    fontSize: 18,
    color: 'white',  // Adjust the color for the first word
    textAlign: 'left',
    fontWeight:'bold'
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },


})
export default Newwordprabodh