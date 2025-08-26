import { FlatList, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Aamprayogkepadbandh = (props: any) => {
  const { ApiResponseofAlphabet, Index, ApiResponse, Package, Medium,title } = props.route.params;
    // Assuming ApiResponseofAlphabet is an array and Index is a valid index
    const selectedData = ApiResponseofAlphabet[Index];

 

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(ApiResponseofAlphabet);

  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
   const searchTitle = langWiseWords[257]
   // Split the string by space and get the second part
   const textAfterSpace = searchTitle.split(' ')[1];

  useEffect(() => {
    // Update filteredData whenever ApiResponseofAlphabet or search changes
    const filteredResult = ApiResponseofAlphabet.filter(
      (item: { HWord: string; LangWiseWords: string; }) =>
        item.HWord.toLowerCase().includes(search.toLowerCase()) ||
        item.LangWiseWords.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredResult);
  }, [ApiResponseofAlphabet, search]);



  // Extracting HWord values from ApiResponseofAlphabet
  const hWordList = ApiResponseofAlphabet.map((item: { HWord: any; }) => item.HWord);

  // Render each item in the FlatList
  // const renderItem = ({ item }: { item: string }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.itemText}>{item}</Text>
  //   </View>
  // );


  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleTextChange = (text: string) => {
    setSearchText(text);

    // Check if the entered text is not empty and contains non-Hindi characters
    const hindiRegex = /^[\u0900-\u097F\s]+$/;
    if (text && !hindiRegex.test(text)) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };



  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.flatListItem}
      onPress={() => handleFlatListItemPress(item)}
    >
      <Text style={styles.itemText}>{item.HWord}</Text>
    </TouchableOpacity>
  );

  const handleFlatListItemPress = (item: any) => {
    // Handle the press event, and update the selected item state
    setSelectedItem(item);
  };



    // Function to handle the back button press
    const navigation = useNavigation();
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
                  <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" />
                </TouchableOpacity>
              </View>
              </SafeAreaView>






          <ImageBackground
            source={require('../../../assets/img/bg.png')} // Provide the path to your image
            style={styles.backgroundImage}
          >
            <View>
              {/* <Text>Aam prayog ke padbandh handle here with translation</Text> */}
              {/* Display selected item */}

              
              <View style={styles.rowContainer}>
              <Text style={styles.labelText}>{textAfterSpace}</Text>
              <TextInput
              style={styles.searchBar}
              placeholder="Type here in Hindi"
              value={searchText}
              onChangeText={handleTextChange}
            />
            </View>

            <View style={styles.horizontaline}></View>



            

            <View style={styles.rowContainer}>
                <Text style={styles.labelText}>{langWiseWords[6]}:</Text>
                {ApiResponseofAlphabet.length > 0 ? (
                  selectedItem ? (
                    <Text style={styles.selectedItemText}>{selectedItem.LangWiseWords}</Text>
                  ) : (
                    <Text></Text>
                  )
                ) : (
                  <Text style={styles.selectedItemText}>{langWiseWords[23]}</Text>
                )}
              </View>

            <View style={styles.horizontaline1}></View>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.HWord}
                renderItem={renderItem}
              />


            {/* <FlatList
              data={filteredData}
              keyExtractor={(item) => item.HWord}
              renderItem={({ item }) => (
                <View style={styles.flatListItem}>
                  <Text style={styles.itemText}>{item.HWord}</Text>
                </View>
              )}
            /> */}
            {/* Modal to display the message */}
            <Modal
              visible={showModal}
              animationType="slide"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modletext1}>Please type in Hindi only</Text>
                  <Text style={styles.modletext}>From the Home screen,tap Apps  {'>'} Settings {'>'} Input language & Input</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            </View>
          </ImageBackground>

          </View>
  );
};

export default Aamprayogkepadbandh;

const styles = StyleSheet.create({
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  item: {
   
    padding: 3,
    paddingBottom:15,
    marginVertical: 8,
    
    marginLeft:4,
    borderRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
   
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
    
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white', // Set the background color to white
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius:4,
    elevation:2,
    width:'90%'
  },
  flatListItem: {
    paddingVertical: 15, // Adjust the padding as needed
    marginLeft: 4,
    borderRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%', // Adjust the width as needed
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modletext:{
    color: 'black',
    fontSize: 14,
    textAlign:'center'
  },
  modletext1:{
    color: 'black',
    fontSize: 14,
    textAlign:'center',
    fontWeight:'bold'
  },
  selectedItemContainer: {
    backgroundColor: '#0D6EFD', // Background color
    padding: 10, // Padding around the selected item
    marginVertical: 10, // Vertical margin
    borderRadius: 5, // Border radius for rounded corners
  },

  selectedItemText: {
    color: 'blue', // Text color
    fontSize: 16, // Font size
  
    fontWeight:'bold'
  },
  rowContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically in the center
    marginVertical: 10, // Vertical margin
    marginLeft:10,
    width:'80%'
    
  },

  labelText: {
    marginRight: 10, // Margin to separate label from text
    fontSize: 16, // Font size for the label
    color:'black',
    fontWeight:'bold'
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },
  horizontaline1:{
    height: 1,
    backgroundColor: '#ccc',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  }
});
