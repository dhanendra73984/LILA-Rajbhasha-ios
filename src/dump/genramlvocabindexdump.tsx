import { Button, FlatList, Image, ImageBackground, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
LogBox.ignoreAllLogs(); 
interface ServerData {
  LangWiseWords: string | null;
  
  // Add other properties if your server response contains them
}

const Genralvbprabodhindex : React.FC = (props:any) => {

    const navigation = useNavigation();
      // Extract the picker values from props
  const Package = props.route.params.Package;
  const Medium = props.route.params.Medium;
  const { ApiResponse } =  props.route.params;

  

  const [langWiseWordsToRender, setLangWiseWordsToRender] = useState<string[]>([]);
  useEffect(() => {
    if (ApiResponse && ApiResponse.length > 0) {
      const indicesToPrint  = [207, 227, 209, 210, 217, 213, 212, 208, 211, 221, 214, 215, 216, 218, 228];

      const wordsToRender = indicesToPrint
        .filter(index => index >= 0 && index < ApiResponse.length)
        .map(index => ApiResponse[index]?.LangWiseWords);

      setLangWiseWordsToRender(wordsToRender);

    }
  }, [ApiResponse]);

    // const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
    // const titleofgenralvocablary = langWiseWords[14];
   
    
       // Assuming you have an array of image sources (replace these with your actual image sources)
        const staticImages = [
            require('../../../../assets/img/animal.jpg'),
            require('../../../../assets/img/bird.jpg'),
            require('../../../../assets/img/bodyparts_1.jpg'),
            require('../../../../assets/img/colour.jpg'),
            require('../../../../assets/img/cardinal_number.jpg'),
            require('../../../../assets/img/December.jpg'),
            require('../../../../assets/img/flowers.jpg'),
            require('../../../../assets/img/fruits.jpg'),
            require('../../../../assets/img/Mangalwar.jpg'),
            require('../../../../assets/img/musical_instrument.jpg'),
            require('../../../../assets/img/places.jpg'),
            require('../../../../assets/img/relations.jpg'),
            require('../../../../assets/img/river.jpg'),
            require('../../../../assets/img/seasons.jpg'),
            require('../../../../assets/img/common_verbs_1.jpg'),

            // Add the remaining images here
        ];
       



    const handleBackPress = () => {
        navigation.goBack();
      };
      // Function to handle the home button press 
      const handleHomePress = () => {
        // Navigate to the home screen or the desired screen
       props.navigation.navigate('Home',{Package,Medium,ApiResponse});
      };


      //for pop up model handling 
      const [isModalVisible, setModalVisible] = useState(false);
      const [selectedItemText, setSelectedItemText] = useState('');
      const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    
      const handleItemPress = (item: string, index: number) => {
        setSelectedItemText(item);
        setSelectedItemIndex(index);
        console.log(index)
        setModalVisible(true);
      };


       // Render item for FlatList
       // Render item for FlatList
       // Render item for FlatList for image and text
       const renderItem = ({ item, index }: any) => {
        const imageSource = staticImages[index % staticImages.length];
      
        // Log the index value
        // console.log("Index:", index);
      
        return (
          <TouchableOpacity onPress={() => handleItemPress(item, index)}>
            <View style={styles.itemContainer}>
              <Image source={imageSource} style={styles.imageforcard} />
              <Text key={index} style={styles.name}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        );
      };


      const handleSelectPress = (index: number | null) => {
        // Handle the selection based on the index
        console.log("Selected index:", index);
        if (index !== null) {
          // Navigate to WordMeaningScreen
          props.navigation.navigate('Wordmeaningprabodh', { ApiResponse, Package, Medium,selectedItemText,selectedItemIndex });
          setModalVisible(false);
        }
        // Add your logic here based on the selected index
      };
       //navigation start here ............,........
      // const navigation = useNavigation();
        const handleItemPressofpopbox=(item: string)=> {
                  //selectedItemText is text and selectedItemIndex which is select from General vocablery index for making request to another component becouse another component "GenCategory" object is holding only static data so we have to map that with static array into anothere componentn ............
                    const wordmeaning =ApiResponse[12]?.LangWiseWords
                    const Excercise1=ApiResponse[219]?.LangWiseWords
                    const Excercise2=ApiResponse[220]?.LangWiseWords
                    const Excercise3=ApiResponse[223]?.LangWiseWords
                    const Excercise4=ApiResponse[224]?.LangWiseWords
                    const Excercise5=ApiResponse[226]?.LangWiseWords
                    console.log(item)
                    const Excerciseforriverandrelation=ApiResponse[223]?.LangWiseWords.replace(/\d-?$/, '')
                     
                    if (item === wordmeaning) {
                      // Navigate to WordMeaningScreen
                      props.navigation.navigate('Wordmeaningprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex });
                    }else if (item === Excercise1) {
                      // Navigate to Excercise1Screen
                      props.navigation.navigate('Ecerciseonevbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex  });
                    } else if (item === Excercise2) {
                      // Navigate to Excercise2Screen
                      props. navigation.navigate('Ecercisetwovbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex });
                    } else if (item === Excercise3) {
                      // Navigate to Excercise3Screen
                      props. navigation.navigate('Ecercisethreevbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex  });
                    } else if (item === Excercise4) {
                      // Navigate to Excercise4Screen
                      props.navigation.navigate('Ecercisefourvbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex });
                    } else if (item === Excercise5) {
                      // Navigate to Excercise5Screen
                      props.navigation.navigate('Ecercisejumblevbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex  });
                    }
                    else if (item === Excerciseforriverandrelation) {
                      // Navigate to Excercise5Screen
                      props.navigation.navigate('Ecercisethreevbprabodh',{ ApiResponse,Package,Medium,selectedItemText,selectedItemIndex  });
                    }
                    setModalVisible(false);


        }

         // //handling flatlist navigation end here .........


     
  
// Add this helper function to render items for selected conditions.......to populate into popup boxes 
            const renderItemForSelected = (item:any) => (
              <TouchableOpacity onPress={() => handleItemPressofpopbox(item)}>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );

        const getModalDataByIndex = (index: number | null) => {
          if (index !== null) {
            if ([0, 1, 3, 6, 7].includes(index)) {
              return [
                ApiResponse[12]?.LangWiseWords,
                ApiResponse[219]?.LangWiseWords,
                ApiResponse[220]?.LangWiseWords,
                ApiResponse[223]?.LangWiseWords,
                ApiResponse[224]?.LangWiseWords,
                ApiResponse[226]?.LangWiseWords,
              ];
            } else if ([11, 12].includes(index)) {
              return [
                ApiResponse[12]?.LangWiseWords,
                ApiResponse[223]?.LangWiseWords.replace(/\d-?$/, ''),
              ];
            } else if ([2, 4, 5, 8, 9, 10, 14].includes(index)) {
              return [
                ApiResponse[12]?.LangWiseWords,
                ApiResponse[219]?.LangWiseWords,
                ApiResponse[220]?.LangWiseWords,
                ApiResponse[223]?.LangWiseWords,
                ApiResponse[224]?.LangWiseWords,
              ];
            } else if (index === 13) {
              return [ApiResponse[12]?.LangWiseWords];
            }
          }
        
          return []; // Return an empty array for other conditions or when index is null
        };

        // const getModalDataByIndex = (index: number | null) => {
        //   if (index !== null) {
        //     let data = [];
            
        //     if ([0, 1, 3, 6, 7].includes(index)) {
        //       data = [
        //         ApiResponse[12]?.LangWiseWords,
        //         ApiResponse[219]?.LangWiseWords,
        //         ApiResponse[220]?.LangWiseWords,
        //         ApiResponse[223]?.LangWiseWords,
        //         ApiResponse[224]?.LangWiseWords,
        //         ApiResponse[226]?.LangWiseWords,
        //       ];
        //     } else if ([11, 12].includes(index)) {
        //       data = [
        //         ApiResponse[12]?.LangWiseWords,
        //         ApiResponse[223]?.LangWiseWords.replace(/\d$/, ''),
        //       ];
        
        //       // Filter out elements ending with a number specifically for this section
        //       // data = data.map(item => item.replace(/\d$/, ''));
        //     } else if ([2, 4, 5, 8, 9, 10, 14].includes(index)) {
        //       data = [
        //         ApiResponse[12]?.LangWiseWords,
        //         ApiResponse[219]?.LangWiseWords,
        //         ApiResponse[220]?.LangWiseWords,
        //         ApiResponse[223]?.LangWiseWords,
        //         ApiResponse[224]?.LangWiseWords,
        //       ];
        //     } else if (index === 13) {
        //       data = [ApiResponse[12]?.LangWiseWords];
        //     }
        
        //     return data;
        //   }
        
        //   return []; // Return an empty array for other conditions or when index is null
        // };
        


        
        
        

     


  return (
    // <View>
    //   <Text>Genralvb prabodh index are here we have to handle onclick-:poplist inside index then  navigate to list view</Text>
    // </View>
    <View style={{flex:1}}>

        <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        {/* it is just index of title that i fetch  */}
        <Text style={styles.headerTitle}>{ApiResponse[14]?.LangWiseWords}</Text>

        {/*page dosnt have right side heder button Right side - Home icon */}
        <TouchableOpacity onPress={handleHomePress}>
          {/* <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" /> */}
        </TouchableOpacity>
        </View>

    <ImageBackground
    source={require('../../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}
     >

         <View style={styles.container}>
          <View style={styles.cardcontainer}>
            <FlatList
              data={langWiseWordsToRender}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // Change this to 3 for a 3x3 grid
            />



             {/* Modal for showing pressed item text */}
   
              
              



          </View>

          

        </View>

        <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {/* title of popupbox */}
                    <Text style={styles.titleforpopup}>{ApiResponse[14]?.LangWiseWords}</Text>
                    {/* <Text style={styles.indexoflist}>{selectedItemText}</Text>    */}
                    <Text style={styles.indexoflist}>{ApiResponse[70]?.LangWiseWords}:</Text>  

                        <FlatList
                            data={getModalDataByIndex(selectedItemIndex)}
                            renderItem={({ item }) => renderItemForSelected(item)}
                            keyExtractor={(item, index) => index.toString()}
                            // extraData={getModalDataByIndex(selectedItemIndex)} 
                          />

                    <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <View style={styles.cancelButton}>
                          {/* cancel butto index mapping  */}
                          <Text style={styles.buttonText}>{ApiResponse[163]?.LangWiseWords}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleSelectPress(selectedItemIndex)}>
                        <View style={styles.selectButton}>
                          {/* select button index mapping */}
                          <Text style={[styles.buttonText, { color: 'white' }]}>{ApiResponse[70]?.LangWiseWords}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>






                



    </ImageBackground>


    </View>
  )
}

export default Genralvbprabodhindex

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
         fontSize: 20, // Adjust the font size as needed
       },
       container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        marginRight:'-10%',
        marginTop:'4%'
        
      },

    
    itemContainer: {
      margin: 2,
      alignItems: 'center',
      marginHorizontal: 20, // Adjust the spacing as needed
      width: '40%', // Adjust the width for a 3x3 grid
    },
    imageforcard: {
      width: 100, // Adjust the width for a 3x3 grid
      height: 100,
      borderRadius: 2,
      resizeMode: 'cover',
    },
    name: {
      fontSize: 11,
      fontWeight: 'bold',
      marginTop: 2,
      color: 'black',
    },

    //model styling 
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 15, // Adjust the padding as needed
      borderRadius: 10,
      alignItems: 'stretch',
      width: '95%', // Adjust the width as needed
      height: 'auto', // Adjust the height as needed
    },
    titleforpopup:{
      fontSize: 18,
      color:'black',
      fontWeight:'bold',
      textAlign:'center',
      marginBottom:5
    },
    indexoflist:{
      color:'black',
      fontSize:15,
      textAlign:'left'
      
    },
    listItem: {
      paddingVertical: 8, // Adjust the padding as needed
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
      alignItems: 'flex-start',
      
    },
    listItemText: {
      fontSize: 17,
      color:'black'
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15, // Adjust the margin as needed
      width: '100%',
    },
    cancelButton: {
      backgroundColor: 'white',
      padding: 8, // Adjust the padding as needed
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      width:100,
      textAlign:'center',
      
    },
    selectButton: {
      backgroundColor: '#0D6EFD',
      padding: 8, // Adjust the padding as needed
      borderRadius: 5,
      width:100,
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 14, // Adjust the font size as needed
      textAlign:'center',
      color:'black'
    },
    
      
})