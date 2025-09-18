import React, { lazy, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Introduction from './Introduction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import TracePractice from './TracePractice';
// import TraceHalfConsonant from './TraceHalfConsonant';
// import TraceMaatraa from './TraceMaatraa';
// import WriteWords from './WriteWords';
// import TraceAlphabet from './TraceAlphabet';
// import AWF from './AWF';
// import Maatra from './Maatra';
// import Execercisetwo from './Execercisetwo';
// import WordOrder from './WordOrder';
// import WordFormation from './WordFormation';
// import Exerciseone from './Exerciseone';
// import Objective from './Objective';
// import Pronunciation from './Pronunciation';
// import AlphabeticalOrder from './AlphabeticalOrder';
// import AlphabetPronunciation from './AlphabetPronunciation';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../../components/Spinner';


const AlphabetPronunciation = lazy(() => import('./AlphabetPronunciation'));
const Introduction = lazy(() => import('./Introduction'));
const AlphabeticalOrder = lazy(() => import('./AlphabeticalOrder'));
const Pronunciation = lazy(() => import('./Pronunciation'));
const TracePractice = lazy(() => import('./TracePractice'));
const TraceHalfConsonant = lazy(() => import('./TraceHalfConsonant'));
const TraceMaatraa = lazy(() => import('./TraceMaatraa'));
const WriteWords = lazy(() => import('./WriteWords'));
const TraceAlphabet = lazy(() => import('./TraceAlphabet'));
const AWF = lazy(() => import('./AWF'));
const Maatra = lazy(() => import('./Maatra'));
const Execercisetwo = lazy(() => import('./Execercisetwo'));
const WordOrder = lazy(() => import('./WordOrder'));
const WordFormation = lazy(() => import('./WordFormation'));
const Exerciseone = lazy(() => import('./Exerciseone'));
const Objective = lazy(() => import('./Objective'));
//this is aplhabet index screen which conatinas drower only 

const Drawer = createDrawerNavigator();

function Alphabet(props:any) {

  const navigation=useNavigation();

  const {ApiResponse,Package,Medium} = props.route.params;//coming from parent component 
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);//for mapping index
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  // Function to handle the home button press 
  const handleHomePress = () => {
    // Navigate to the home screen or the desired screen
   props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };
 
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate data loading for 2 seconds (replace with your actual loading logic)
  //   const loadData = async () => {
  //     // Simulate an API call or any other time-consuming operation
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     setLoading(false);
  //   };

  //   loadData();
  // }, []);
  // if (loading) {
  //   // Show the Spinner while loading
  //   return <Spinner />;
  // }

  return (
    
    <View style={{flex:1}}>

          



    <ImageBackground
      source={require('../../../assets/img/bg.png')}
      style={styles.backgroundImage}
    >





     {/* drower navigator this is time taking lookinto readmefile which is stored in backup projects  */}
     <Drawer.Navigator
          initialRouteName={langWiseWords[119]}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0D6EFD', 
            },
            headerTintColor: 'white', 
            headerTitleAlign: 'center', 
            drawerItemStyle: {
              marginVertical: 0, // Adjust the vertical margin as needed
              marginHorizontal: 0,
              paddingVertical: 0, // Remove vertical padding
              paddingHorizontal: 0, // Remove horizontal padding
            },
          }}
        >


  {/* Other screens in the drawer list */}
  <Drawer.Screen
    name={langWiseWords[256]}
    component={AlphabetPronunciation}
    initialParams={{  Package, Medium, ApiResponse}}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../../../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 4,
            // Optional: If you want to make it a circular background
          }}
        >
          <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
            {langWiseWords[256]}
          </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home', { Package, Medium, ApiResponse });
          }}
        />
      ),
      headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
      
    })}
  />

  {/* Other screens in the drawer list */}
  <Drawer.Screen
    name={langWiseWords[119] + ' '}
    component={Introduction}
    initialParams={{  Package, Medium, ApiResponse}}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../../../assets/img/bg.png')}
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 4,
            // Optional: If you want to make it a circular background
          }}
        >
          <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
            {langWiseWords[119]}
          </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home', { Package, Medium, ApiResponse });
          }}
        />
      ),
      headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
    })}
  />
            <Drawer.Screen
              name={langWiseWords[204]}
              initialParams={{ Package, Medium, ApiResponse }}
              component={AlphabeticalOrder}
              options={({ navigation }) => ({
                drawerLabel: () => (
                  <ImageBackground
                    source={require('../../../assets/img/bg.png')}
                    style={{
                      width: '120%',  // Set the width as per your design
                      height: 'auto',
                      margin: -13,
                      borderRadius: 4,
                      // Optional: If you want to make it a circular background
                    }}
                  >
                    <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                      {langWiseWords[204]}
                    </Text>
                  </ImageBackground>
                ),
                headerRight: () => (
                  <MaterialIcons
                    name="home"
                    size={30}
                    color="white"
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      // Add any navigation logic for the home icon
                      navigation.navigate('Home', { Package, Medium, ApiResponse });
                    }}
                  />
                ),
                headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
              })}
            />


        <Drawer.Screen
          name={langWiseWords[10]}initialParams={{  Package, Medium, ApiResponse}}
          component={Pronunciation}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[10]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[219]}
          component={Exerciseone}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[219]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[31]}initialParams={{  Package, Medium, ApiResponse}}
          component={WordFormation}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[31]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[147]}initialParams={{  Package, Medium, ApiResponse}}
          component={WordOrder}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[147]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[220]}
          component={Execercisetwo}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[220]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[205]}
          component={Maatra}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[205]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[206]}
          component={AWF}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[206]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[9]}
          component={TraceAlphabet}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[9]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[34]}
          component={WriteWords}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[34]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[11]}
          component={TraceMaatraa}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[11]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
        <Drawer.Screen
          name={langWiseWords[37]}
          component={TraceHalfConsonant}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[37]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />

        
        <Drawer.Screen
          name={langWiseWords[285]}
          component={TracePractice}initialParams={{  Package, Medium, ApiResponse}}
          options={({ navigation }) => ({
            drawerLabel: () => (
              <ImageBackground
                source={require('../../../assets/img/bg.png')}
                style={{
                  width: '120%',  // Set the width as per your design
                  height: 'auto',
                  margin: -13,
                  borderRadius: 4,
                  // Optional: If you want to make it a circular background
                }}
              >
                <Text style={{ color: 'black', fontSize: 15, margin: 16 }}>
                  {langWiseWords[285]}
                </Text>
              </ImageBackground>
            ),
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => {
                  // Add any navigation logic for the home icon
                  navigation.navigate('Home', { Package, Medium, ApiResponse });
                }}
              />
            ),
            headerTitle: langWiseWords[119],  // Set the header title to langWiseWords[119]
          })}
        />
                
        {/* Extra list items just for scrolling purpose remove it when alphabet works is finished ..........start */}


        

           

         {/* Extra list items just for scrolling purpose remove it when alphabet works is finished .............end */}

       



        {/* This screen will be the initial route but not shown in the drawer list       */}
          <Drawer.Screen
            name={langWiseWords[119]}
            component={Objective}
            initialParams={{ hideFromDrawer: true , Package, Medium, ApiResponse}}
            options={{
              drawerLabel: () => null, // Hide the label in the drawer list
              headerRight: () => (
                <MaterialIcons
                  name="home"
                  size={30}
                  color="white"
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    props.navigation.navigate('Home', { Package, Medium, ApiResponse });
                  }}
                />
              ),
            }}
          />
      </Drawer.Navigator>
      
    </ImageBackground>

    </View>
  );
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
});

export default Alphabet;
