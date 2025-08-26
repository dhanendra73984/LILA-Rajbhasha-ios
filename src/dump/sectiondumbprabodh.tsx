import { Button, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WebView from 'react-native-webview';

const Sectionprabodh = (props:any) => {
    const {ApiResponse,Package,Medium,selectedLessonIndex} = props.route.params;
    const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);
    const Sectiontitle=langWiseWords[286]
    const indexesToShow = [46, 51, 52, 53, 54, 20, 55, 13, 56];

    const data = indexesToShow.map((index, i) => ({
        id: (i + 1).toString(),
        title: langWiseWords[index],
      }));
       // Fetch data at specific indexes
     const titleoflessonindex = langWiseWords[75];

    //   const renderItem = ({ item }: any) => (
        


    //     <View style={styles.item}>
    //       <Text style={styles.displaytext}>{item.title}</Text>
    //     </View>
    //   );
    
     //https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Grammar/English/Grammar${selectedLessonIndex}_1.htm
    
    const renderItem = ({ item, selectedLessonIndex }: any) => {
        
    
        
    
        return (
          <View style={styles.item}>
            <Text style={styles.displaytext}>{item.title}</Text>
          </View>
        );
      };
      
  
  
    const handleBackPress = () => {
      navigation.goBack();
    };
  
  
    
    const navigation = useNavigation();
    
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
    };
  

 return (
 <View style={{flex:1}}>
        <View style={styles.header}>
                {/* Left side - Back icon */}
                <TouchableOpacity  onPress={handleBackPress}>
                  <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>

                {/* Right side - Home icon this screen dosnt have this  */}
                <TouchableOpacity onPress={handleHomePress}>
                <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" />
                </TouchableOpacity>
         </View>


        <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>

        <View style={styles.container}>
                {/* Title */}
                <Text style={styles.title}>{Sectiontitle}</Text>
                <View style={styles.horizontaline}></View>

                {/* FlatList */}
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                </View>
         





                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20 }}>sections are implemented here  </Text>
                        <Text>{Package}{Medium}{selectedLessonIndex}</Text>
                        <View style={styles.buttonContainer}>
                        <Button
                            title="go to Objectiveprabodh "
                            onPress={() => {
                                props.navigation.navigate('Objectiveprabodh');
                            }
                            }
                        />

                        <Button
                            title="go to Structureprabodh "
                            onPress={() => {
                                props.navigation.navigate('Structureprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Narrativeprabodh"
                            onPress={() => {
                                props.navigation.navigate('Narrativeprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Newwordprabodh"
                            onPress={() => {
                                props.navigation.navigate('Newwordprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Wordfamilyprabodh"
                            onPress={() => {
                                props.navigation.navigate('Wordfamilyprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Grammerprabodh"
                            onPress={() => {
                                props.navigation.navigate('Grammerprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Practiceprabodh"
                            onPress={() => {
                                props.navigation.navigate('Practiceprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Excerciseprabodh"
                            onPress={() => {
                                props.navigation.navigate('Excerciseprabodh');
                            }
                            }
                        />
                        <Button
                            title="go to  Testprabodh"
                            onPress={() => {
                                props.navigation.navigate('Testprabodh');
                            }
                            }
                        />
                        </View>
                    
                </View> */}

         </ImageBackground>
</View>
)
}

export default Sectionprabodh

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 40, 
        marginBottom:10// Adjust the amount of space as needed
      },
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
        justifyContent: 'center', // Center content vertically
        margin: 30,
        marginTop:'2%'
        
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10, // Adjust the margin based on your preference
        marginLeft:'43%',
        color:'black'
      },
    // sectionTitle: {
    //     fontSize: 18,
    //     color:'black',
    //     textAlign: 'left',
    //     marginTop: 10,
    //     marginBottom: 5,
    //     marginLeft:10
    //   },
      item: {
        padding: 6,
        borderWidth: 2,
        borderColor: '#0D6EFD', // Blue border color
        marginBottom: 25,
        alignItems: 'center',
      },
      displaytext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      horizontaline:{
        height: 4,
        backgroundColor: '#0D6EFD',
        marginTop:1,
        marginBottom:30,
        margin:-30
       
      }
})