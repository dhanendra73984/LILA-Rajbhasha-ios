import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
//for applying it 
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
const Spinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set visible to false after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ImageBackground source={require('../../assets/img/bg.png')} style={styles.backgroundImage}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 100, width: 100 }}>
        <ActivityIndicator size="large" color="#0D6EFD" />
      </View>
    </View>
    </ImageBackground>

  );
};

export default Spinner;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 40, 
        marginBottom:10// Adjust the amount of space as needed
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },})
