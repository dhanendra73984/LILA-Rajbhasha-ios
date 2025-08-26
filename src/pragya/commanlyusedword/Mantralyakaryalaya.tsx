import { FlatList, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Mantralyakaryalaya = (props: any) => {
  const { ApiResponse,Package, Medium, title, selectedOption } = props.route.params;
  // Assuming ApiResponseofAlphabet is an array
  const [ApiResponseofAlphabet, setApiResponseofAlphabet] = useState<any[]>([]);
  const [ApiResponseOfMantralaya, setApiResponseOfMantralaya] = useState<any[]>([]);

  useEffect(() => {
    const optionToValueMap: { [key: string]: string } = {
      'मंत्रालय': 'Ministry',
      'कार्यालय': 'Offices',
      'निदेशालय': 'Directorate',
      'रेल्वे': 'RailWay',
      'ऑडिट व लेखा विभाग': 'DeptAcctAudit',
      'डाक व तार विभाग': 'PostalTeleDept',
      'सामान्य': 'General',
      'सेना': 'Army',
      'वायु सेना': 'AirForce',
      'नौसेना': 'Navy',
    };
  
    const correspondingValue = optionToValueMap[selectedOption] || 'Ministry';
  
    axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getVocabularyData/', {
      LangSelected: Medium,
      PackSelected: Package,
      GenCategory: correspondingValue,
      SectionName: ''
    },{timeout:500000})
      .then(response => {
        setApiResponseOfMantralaya(response.data.slice(1)); // Eliminate the first item
        setApiResponseofAlphabet(response.data.slice(1)); // Eliminate the first item
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [selectedOption]);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(ApiResponseofAlphabet);

  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const searchTitle = langWiseWords[257];
  const textAfterSpace = searchTitle.split(' ')[1];//for dictionary serch text
  

  useEffect(() => {
    const filteredResult = ApiResponseofAlphabet.filter(
      (item: { HWord: string; LangWiseWords: string }) =>
        item.HWord.toLowerCase().includes(search.toLowerCase()) ||
        item.LangWiseWords.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredResult);
  }, [ApiResponseofAlphabet, search]);

  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleTextChange = (text: string) => {
    setSearchText(text);

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
    setSelectedItem(item);
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    props.navigation.navigate('Homepragya', { Package, Medium, ApiResponse });
  };




  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedOption || 'मंत्रालय'}</Text>
        <TouchableOpacity onPress={handleHomePress}>
          <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <ImageBackground
        source={require('../../../assets/img/bg.png')}
        style={styles.backgroundImage}
      >
        <View>
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
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modletext1}>Please type in Hindi only</Text>
                <Text style={styles.modletext}>From the Home screen, tap Apps {'>'} Settings {'>'} Input language & Input</Text>
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
export default Mantralyakaryalaya;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#0D6EFD',
    height: 60,
  },
  headerIcon: {
    width: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  flatListItem: {
    paddingVertical: 15, // Adjust the padding as needed
    marginLeft: 8,
    borderRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 4,
    elevation: 2,
    width: '90%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
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
  modletext: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  modletext1: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedItemText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
    width: '80%',
    
  },
  labelText: {
    marginRight: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  horizontaline: {
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop: 1,
    marginBottom: 10,
    margin: -30,
  },
  horizontaline1: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 1,
    marginBottom: 10,
    margin: -30,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    
  },
});
