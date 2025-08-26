import { Button, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { JSX, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Lessonpragya = (props:any) => {

  const [visibleToast, setVisibleToast] = useState(false);

  // Define lesson categories
  const pathLessons = Array.from({ length: 6 }, (_, index) => (index + 1).toString());
  const poorakLessons = Array.from({ length: 12 }, (_, index) => (index + 7).toString());
  const parisithLessons = Array.from({ length: 3 }, (_, index) => (index + 19).toString());
  const poorakLessonsorignal = Array.from({ length: 10 }, (_, index) => (index + 1).toString());
  const {ApiResponse,Package,Medium} = props.route.params;
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);

  // Fetch data at specific indexes
   const titleoflessonindex = langWiseWords[57];


  const handleBackPress = () => {
    navigation.goBack();
  };


  
  const navigation = useNavigation();
  
  const handleHomePress = () => {
    props.navigation.navigate('Homepragya',{Package,Medium,ApiResponse});
  };

  
  




  const renderItem: ({ item, index }: { item: string; index: number }) => JSX.Element = ({ item, index }) => {
    // Render regular lessons
    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => {
          setVisibleToast(true);
          // ToastAndroid.show(`Lesson Pressed: ${item}`, ToastAndroid.SHORT);
  
          // Check if item is in the range of 1 to 6, then navigate to 'Sactionpragya'
          if (parseInt(item) >= 1 && parseInt(item) <= 6) {
            props.navigation.navigate('Sactionpragya', { selectedLessonIndex: item, Package, Medium, ApiResponse });
          } else {
            // Navigate to 'Sectionsecandpragya' for other items
            props.navigation.navigate('Sectionsecandpragya', { selectedLessonIndex: item, Package, Medium, ApiResponse });
          }
        }}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  };
  
  const renderItepoorak: ({ item, index }: { item: string; index: number }) => JSX.Element = ({ item, index }) => {
    // Render regular lessons
    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => {
          setVisibleToast(true);
          // ToastAndroid.show(`Lesson Pressed: ${item}`, ToastAndroid.SHORT);
          
          // Check if item is 1 or 2, then navigate to 'Parisith'
        
            // Navigate to 'Sectionprabodh' for other items
            props.navigation.navigate('Poorakpragya', { selectedLessonIndex: item, Package, Medium, ApiResponse });
          
        }}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    
    <View style={{flex:1}}>
       <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
           <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{titleoflessonindex}</Text>

        {/* Right side - Home icon this screen dosnt have this  */}
        <TouchableOpacity onPress={handleHomePress}>
          <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" />
        </TouchableOpacity>
      </View>
      </SafeAreaView>



    <ImageBackground
    source={require('../../../assets/img/bg.png')} // Provide the path to your image
    style={styles.backgroundImage}>
          
               <View >
              
                
               <Text style={styles.sectionTitle}>कार्यालयीन परिवेश पर आधारित पाठ</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.container}>

                  <FlatList
                    data={pathLessons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={5}
                    contentContainerStyle={styles.gridContainer}
                  />

                </View>  
                <Text style={styles.sectionTitle}>मसौदा लेखन</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.container}>

                  <FlatList
                    data={poorakLessons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={5}
                    contentContainerStyle={styles.gridContainer}
                  />

                  </View>


                <Text style={styles.sectionTitle}>टिप्पणी लेखन अभ्यास</Text>
                <View style={styles.horizontalLine} />
                  <View style={styles.container1}>

                  <FlatList
                    data={parisithLessons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={5}
                    contentContainerStyle={styles.gridContainer}
                  />
                  </View>

                  <Text style={styles.sectionTitle}>पूरकपाठ</Text>
                  <View style={styles.horizontalLine} />
                  <View style={styles.container}>
           
                  <FlatList
                    data={poorakLessonsorignal}
                    renderItem={renderItepoorak}
                    keyExtractor={(item) => item}
                    numColumns={5}
                    contentContainerStyle={styles.gridContainer}
                  />

                 </View> 
                
               
            

              </View>
             
             



          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>index of prabodh lesson are here </Text>
                  <Button
                      title="go to sections of prabodh "
                      onPress={() => {
                          props.navigation.navigate('Sectionprabodh');
                      }
                      }
                  />
                
          </View> */}
     </ImageBackground>
     </View>
     
  )
}

export default Lessonpragya
const TILE_SIZE = 50; // Adjust this value to set the desired tile size

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  container1:{
    justifyContent:'center',
    marginLeft:'4%'
    
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
  gridContainer: {
    padding: 5,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: '#0D6EFD',
    margin: 11, // margin for the letters
    marginTop:0,
    
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  toast: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color:'black',
    textAlign: 'left',
   
    marginBottom: 2,
    marginLeft:10
  },
  horizontalLine: {
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:0,
    margin:-20
    
  },

})