import { Button, FlatList, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Commanlyusedwordpragya = (props: any) => {


    const navigation = useNavigation();
    const { ApiResponse, Package, Medium } = props.route.params;   
    // Assuming ApiResponse is an array
    const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
  
    // Fetch data at specific indexes
     const selectext = langWiseWords[70];
    const instructionofdictionary = langWiseWords[157];
  
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

  const data = [
    'आम प्रयोग के पदबंद',
    'कार्यालयीन टिप्पणियाँ',
    'मंत्रालय एवं कार्यालय के नाम',
    'पदनाम',
    'पारिभाषिक शब्दावली',
  ];

  //popup handling for mantralya nad karyalaya 
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const showConfirmationModal = (item: string) => {
    setSelectedItem(item);
    setConfirmationModalVisible(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };


  const handleConfirmation = () => {
    // User confirmed, navigate to the desired screen
    props.navigation.navigate('Mantralyakaryalaya', {
      ApiResponse,
      Package,
      Medium,
      title: selectedItem,
      selectedOption: selectedOption, // Include the selected option
    });
    // Close the modal
    hideConfirmationModal();
  };


  //popup handle for padnaam 

  const [selectedPadnamOption, setSelectedPadnamOption] = useState<string | null>(null);
const [isPadnamModalVisible, setPadnamModalVisible] = useState(false);
const [padnamOptions, setPadnamOptions] = useState<string[]>([]);

const hidePadnamModal = () => {
  setPadnamModalVisible(false);
  setSelectedPadnamOption(null);
};
const handlePadnamConfirmation = () => {
  // User confirmed, navigate to the desired screen
  props.navigation.navigate('Mantralyakaryalaya', {
    ApiResponse,
    Package,
    Medium,
    title: selectedItem,
    selectedOption: selectedPadnamOption,
  });
  // Close the modal
  hidePadnamModal();
};

const handlePadnamOptionPress = (option: string) => {
  setSelectedPadnamOption(option);
};


  const handleListItemPress = (item: string) => {
    switch (item) {
      case 'आम प्रयोग के पदबंद':
        props.navigation.navigate('Aamprayogkepadbandhtitles', {
            ApiResponse, Package, Medium,
          title:item
        });
        break;
      case 'कार्यालयीन टिप्पणियाँ':
        props.navigation.navigate('Karylayintippani', {
            ApiResponse, Package, Medium,
          title:item
        });
        break;
      case 'मंत्रालय एवं कार्यालय के नाम':
        // props.navigation.navigate('Mantralyakaryalaya', {
        //     ApiResponse, Package, Medium,
        //   title:item
        // });
        showConfirmationModal(item);
        break;
        case 'पदनाम':
          setPadnamOptions(['मंत्रालय',
          'कार्यालय',
          'निदेशालय',
          'रेल्वे',
          'ऑडिट व लेखा विभाग',
          'डाक व तार विभाग',
          'सामान्य',
          'सेना',
          'वायु सेना',
          'नौसेना']);
          setPadnamModalVisible(true);
          break;

      case 'पारिभाषिक शब्दावली':
        props.navigation.navigate('Aamprayogkepadbandhtitles', {
            ApiResponse, Package, Medium,
          title:item
        });
        break;
      default:
        // Handle other cases if needed
        break;
    }
  };
 
  

  return (

    <View style={{ flex: 1 }}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>  
    {/* Your header */}
                <View style={styles.header}>
                {/* Left side - Back icon */}
                <TouchableOpacity  onPress={handleBackPress}>
                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Menu</Text>

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
      <View style={{  alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
       
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleListItemPress(item)}>
            <View style={styles.listItem}>
              <Text style={{ fontSize: 16, color: 'white',textAlign:'center' }} >{item}</Text>
            </View>
            </TouchableOpacity>
            
          )}
        />
        {/* <Text>{Package}{Medium}</Text>
        <Button
          title="go to Aamprayogkepadbandhtitles"
          onPress={() => {
            props.navigation.navigate('Aamprayogkepadbandhtitles');
          }}
        />
        <Button
          title="go to Karylayintippani"
          onPress={() => {
            props.navigation.navigate('Karylayintippani');
          }}
        />
        <Button
          title="go to Mantralyakaryalaya"
          onPress={() => {
            props.navigation.navigate('Mantralyakaryalaya');
          }}
        />
        <Button
          title="go to Padnam"
          onPress={() => {
            props.navigation.navigate('Padnam');
          }}
        />
        <Button
          title="go to Paribhashikshabdavalititles"
          onPress={() => {
            props.navigation.navigate('Paribhashikshabdavalititles');
          }}
        /> */}
       {/* this is for mantralya and karyalaya */}
       <Modal
        transparent={true}
        animationType="slide"
        visible={isConfirmationModalVisible}
        onRequestClose={hideConfirmationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectext}:</Text>

            <TouchableOpacity
                onPress={() => setSelectedOption('मंत्रालय')}
                style={[
                  styles.option,
                  selectedOption === 'मंत्रालय' && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>मंत्रालय</Text>
              </TouchableOpacity>
              <View style={styles.horizontaline}></View>

              <TouchableOpacity
                onPress={() => setSelectedOption('कार्यालय')}
                style={[
                  styles.option,
                  selectedOption === 'कार्यालय' && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>कार्यालय</Text>
              </TouchableOpacity>


            {/* {selectedOption && (
              <Text style={styles.selectedItemText}>{selectedOption}</Text>
            )} */}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={hideConfirmationModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{langWiseWords[163]}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleConfirmation} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{langWiseWords[70]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
            </Modal>

       {/* this is for padnam */}

       <Modal
        transparent={true}
        animationType="slide"
        visible={isPadnamModalVisible}
        onRequestClose={hidePadnamModal}
      >
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>{selectext}:</Text>

      {padnamOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePadnamOptionPress(option)}
          style={[
            styles.option,
            selectedPadnamOption === option && styles.selectedOption,
          ]}
        >
          
          <Text style={styles.optionText}>{option}</Text>
          <View style={styles.horizontaline}></View>
        </TouchableOpacity>
      ))}

      {/* {selectedPadnamOption && (
        <Text style={styles.selectedItemText}>{selectedPadnamOption}</Text>
      )} */}

      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={hidePadnamModal} style={styles.modalButton}>
          <Text style={styles.modalButtonText}>{langWiseWords[163]}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePadnamConfirmation} style={styles.modalButton}>
          <Text style={styles.modalButtonText}>{langWiseWords[70]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  listItem: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
    paddingLeft:'20%',
    paddingRight:'20%',
    

  
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width:'90%'
   
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color:'black'
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop:10
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#0D6EFD',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },

  selectedItemText: {
    fontSize: 18,
    marginTop: 10,
    color: 'black', // Adjust the color as needed
  },

  option: {
    paddingVertical: 10,
  },
  selectedOption: {
    backgroundColor: '#DAE0E2', // Adjust the color as needed
    borderRadius: 5,
  },
  optionText: {
    textAlign: 'left', // Set text alignment to the left
    fontSize: 16,
    color: '#000', // Adjust the color as needed
    padding:5
  },
  horizontaline: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 1,
    
    
  }

});

export default Commanlyusedwordpragya;
