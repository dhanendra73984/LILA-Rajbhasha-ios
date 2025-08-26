import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import axios from 'axios';
// Home prabodh start here 

interface ServerData {
  LangWiseWords: string | null;
  // Add other properties if your server response contains them
}

const home = (props:any) => {
   
    

    // Extract the picker values from props
  const Package = props.route.params.Package;
  const Medium = props.route.params.Medium;

   
  
  // State to store the data fetched from the server
  const [data, setData] = useState<ServerData[]>([]);

  useEffect(() => {
    // Axios request to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getCaption/', {
          LangSelected: Medium, // Use the dynamic value from Medium
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Medium]); // Include Medium in the dependency array to react to changes in Medium

  // Indices to display names from the server response
  const displayIndices = [119, 57, 158, 24];

  // Extract names at specified indices from the server data
  const namesToDisplay = displayIndices.map((index) => data[index]?.LangWiseWords || 'DefaultName');

  // Static data for images
  const staticData = [
    {
      imageSource: require('../../../assets/img/alphabate.png'),
      name: namesToDisplay[0],
    },
    {
      imageSource: require('../../../assets/img/lessonn.png'),
      name: namesToDisplay[1],
    },
    {
      imageSource: require('../../../assets/img/vocabulari.png'),
      name: namesToDisplay[2],
    },
    {
      imageSource: require('../../../assets/img/wdictionary.png'),
      name: namesToDisplay[3],
    },
    // Add more static data objects as needed
  ];

  // //handling flatlist navigation.........
  // const handleItemPress = (item:any) => {
  //   // Handle the onPress event for the FlatList item
  //   console.log(`Pressed item: ${item.name}`);
  //   // You can add navigation logic or any other actions here
  //   // Use a switch statement or if-else conditions to navigate based on the pressed item
  // switch (item.name) {
  //   case 'Alphabet':
  //     props.navigation.navigate('AlphabetComponent');
  //     break;
  //   case 'Lessons':
  //     props.navigation.navigate('Lesson');
  //     break;
  //   case 'Vocabulary':
  //     props.navigation.navigate('Vocablary');
  //     break;
  //   case 'Dictionary':
  //     props.navigation.navigate('Dictionarytitles');
  //     break;
  //   default:
  //     // Handle other cases if needed
  // }
  // };

  const handleItemPress = (item: any, index: number) => {
    // Use the index to determine the corresponding component
    switch (index) {
      case 0:
        props.navigation.navigate('AlphabetComponent');
        break;
      case 1:
        props.navigation.navigate('Lesson');
        break;
      case 2:
        props.navigation.navigate('Vocablary');
        break;
      case 3:
        props.navigation.navigate('Dictionarytitles');
        break;
      default:
        // Handle other cases if needed
    }
  };

  
  return (
    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}>
      
    <View style={styles.container}>

    
    
     {/* Three Images in a Column logo... */}
     <View style={styles.rowContainer}>
          <Image
            source={require('../../../assets/img/logotext.png')}
            style={styles.image1}
          />
          <Image
            source={require('../../../assets/img/lionimg.png')}
            style={styles.image}
          />
          <Image
            source={require('../../../assets/img/cdac.png')}
            style={styles.image1}
          />
        </View>
             {/*  Images in a Column of logo lila hindi prabodh praveen pragya...... */}
        <View style={styles.columnContainer}>
          <Image
            source={require('../../../assets/img/logologin.png')}
            style={styles.image3}
          /> 
                  
        </View>

        <View style={styles.cardcontainer}>
                <FlatList
                numColumns={2}
                data={staticData}
                keyExtractor={(item, index) => index.toString()}
                
                //this code is for handling onclick on front screen item of prabodh
                renderItem={({ item ,index}) => (
                  <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                    <View style={styles.itemContainer}>
                      <Image source={item.imageSource} style={styles.imageforcard} />
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                columnWrapperStyle={styles.columnWrapper}
              />
            
       </View>

       

    
 
   {/* twomarrow start from here.......... */}
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

             {/* picking the value of picker and printing here  */}
           
            <Text style={{ fontSize: 10 }}>Home Screen of prabodh</Text>

                    <Text>Package Value: {Package}</Text>
                    <Text>Medium Value: {Medium}</Text>

            <Button
                title="go to introduction"
                onPress={() => {
                    props.navigation.navigate('Introduction');
                }
                }
            />
            <Button
                title="go to dictionary"
                onPress={() => {
                    props.navigation.navigate('Dictionarytitles');
                }
                }
            />
            <Button
                title="go to lesson"
                onPress={() => {
                    props.navigation.navigate('Lesson');
                }
                }
            />
            <Button
                title="go to Vocablary"
                onPress={() => {
                    props.navigation.navigate('Vocablary');
                }
                }
            />
     </View>
     
     </View>
     </ImageBackground>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row', // Display images in a row
    justifyContent: 'space-between', // Distribute space evenly between row images
    marginBottom: 20, // Add space between rows and columns
  },
  columnContainer: {
    flexDirection: 'column', // Display images in a column
    alignItems: 'center', // Center images in the column
  },
  image: {
    width: 110, // Set the desired width for the images
    height: 110, // Set the desired height for the images
    marginHorizontal: 10,
    marginTop:10 ,// Adjust the horizontal spacing between images
    borderRadius:10
  },
  image1: {
    width: 80, // Set the desired width for the images
    height: 80, // Set the desired height for the images
    marginHorizontal: 10,
    marginTop:20 ,// Adjust the horizontal spacing between images
    borderRadius:10
  },
  image3: {
    width:380, // Set the desired width for the images
   height: 110, // Set the desired height for the images
   borderRadius:4,
  
 },
 
 
 
cardcontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
itemContainer: {
  margin: 10, // Adjust the spacing as needed
  alignItems: 'center',
  marginHorizontal:40
},
imageforcard: {
  width: 120,
  height: 100,
  borderRadius: 10,
  resizeMode: 'cover',
},
name: {
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 5,
  color:'black'
},
columnWrapper: {
  marginHorizontal: 10, // Adjust the spacing between columns
},
     
})
export default home