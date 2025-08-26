
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';

const Apendixpragya = (props: any) => {
  const { ApiResponse, Package, Medium } = props.route.params;
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const navigation = useNavigation();

  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  const titleofappendix = langWiseWords[261];

  const handleValueChange = async (itemValue: string) => {
    setSelectedValue(itemValue);

    if (itemValue) {
      try {
        const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/Appendix/${itemValue}.htm`,{timeout:500000});
        const fetchedHtmlContent = response.data;
        console.log('Fetched HTML Content:', fetchedHtmlContent); // Log HTML content to console
        setHtmlContent(fetchedHtmlContent);
      } catch (error: any) {
        console.error('Axios Error:', error.message);
        // Handle the error
      }
    }
  };

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
        <Text style={styles.headerTitle}>{titleofappendix}</Text>
        <TouchableOpacity onPress={handleHomePress}>
          <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
        </TouchableOpacity>
      </View>
      </SafeAreaView>

      

      <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.containerofimage}>
      
        <View style={styles.container}>
          
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select an option" value="" />
            <Picker.Item label="कार्यसूची" value="Karyasuchi" />
            <Picker.Item label="विज्ञापन" value="Vigyapan" />
            <Picker.Item label="निविदा" value="Nivida" />
            <Picker.Item label="ई-मेल" value="email" />
          </Picker>


          {/* <Text style={styles.selectedText}>Selected Item: {selectedValue}</Text> */}


        </View>

        
      

           
       
       {htmlContent ? (
            <WebView source={{ html: htmlContent }} scalesPageToFit={false} style={{ backgroundColor: 'transparent' }} containerStyle={{ flex: 1, padding: 4, marginRight: 8,marginTop:'5%' }}/>
          ) : null}
      </ImageBackground>
      
    </View>
  );
};

export default Apendixpragya;

const styles = StyleSheet.create({
  container: {
   
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  containerofimage: {
    flex: 1,
  },


  picker: {
    backgroundColor: '#DAE0E2',
    color: 'black',
    width: '100%',
    borderRadius: 10,
    fontSize: 10, // This won't affect much, mostly `itemStyle` does
    height: 40, // 👈 Decrease the picker height here
  },
  pickerItem: {
    fontSize: 14, // 👈 You can set this lower too, e.g., 12
    height: 40, // 👈 Optional: this can also help
    color: 'black',
  },
  selectedText: {
    marginTop: 10,
    color: 'black',
    fontSize: 14, // Adjust the font size as needed
  },
  webview: {
    flex:1
  },
});
