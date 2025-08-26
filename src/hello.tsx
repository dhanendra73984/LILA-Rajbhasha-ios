import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import WebView from 'react-native-webview';

interface DateData {
  time: string;
  milliseconds_since_epoch: number;
  date: string;
}

const hello = () => {
  const [dateData, setDateData] = useState<DateData | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  // useEffect(() => {
  //   // Axios GET request to get date information
  //   axios.get('https://date.jsontest.com')
  //     .then((response: AxiosResponse<DateData>) => {
  //       setDateData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching date data:', error);
  //     });
  // }, []); // Empty dependency array means this effect runs once after the initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Objective/English/Objective48.htm`);
        // Assuming the response data is a string, you may need to parse it based on your API
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    
       <View style={styles.container}>
              {htmlContent && (
                  <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    javaScriptEnabled={true}
                    bouncesZoom={true}
                    scalesPageToFit={false}
                    style={{ backgroundColor: 'transparent' }}
                    containerStyle={{ flex: 1, padding: 4, marginRight: 8 }}
                  />
                )}
            </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default hello;
