import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, processColor } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-charts-wrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

const Testprabodh = (props:any) => {


  const { ApiResponse, Package, Medium, selectedLessonIndex, title, correctAnswersCountoffillintheblacks, correctCountofjumble, correctCounteroftruflase} = props.route.params;
  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);//for fetching data




  const data = {
    dataSets: [
      {
        values: [{ y: correctAnswersCountoffillintheblacks*10 }, { y: correctCountofjumble*10 }, { y: correctCounteroftruflase*10 }],
        label: 'Sample Bar Data',
        config: {
          color: processColor('#c06a6a'),
          barShadowColor: processColor('lightgrey'),
          highlightAlpha: 90,
          highlightColor: processColor('#c06a6a'),
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter: ['1', '2', '3'],
    position: 'BOTTOM' as const,
    granularityEnabled: true,
    granularity: 1,
    axisMaximum: 3,
    axisMinimum: -1, // Adjusted to introduce space before the first bar
    centerAxisLabels: true,
    textSize: 14,
  } as const;

  const yAxis = {
    left: {
      drawGridLines: false,
    },
    right: {
      drawGridLines: false,
    },
  };

  const navigation = useNavigation();

     //header navigation
     const handleBackPress = () => {
      navigation.goBack();}; 
    
    
    const handleHomePress = () => {
      props.navigation.navigate('Home',{Package,Medium,ApiResponse});
    };

 //table start here ........
 const tableHead = [langWiseWords[110], langWiseWords[149]];
 const originalTableData = [
   ['1', correctAnswersCountoffillintheblacks*10],
   ['2', correctCountofjumble*10],
   ['3', correctCounteroftruflase*10],
 ];

    // Add an empty row after each data row in Scorecard column
   // Create a new array with an additional row for each data point in the second column


  // Create a new array with two rows for each unit in the Scorecard column
  const tableData = originalTableData.flatMap(([unit, scorecard]) => [
    [unit, scorecard],
    [null, '50'], // Additional row with static value '50'
  ]);
  const score = correctAnswersCountoffillintheblacks*10 + correctCountofjumble*10 + correctCounteroftruflase*10 ;
  const totalScore = 150;
  const tableHeadforscorecard = [`${langWiseWords[154]}: ${score}/${totalScore}`];
  let rowData = [];

  if (score > 60) {
    rowData = [['']];
  } else {
    // Render an empty space if the score is not greater than 60
    rowData = [langWiseWords[155]];
  }
  return (
    <View style={{flex:1}}>
<SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>
          <View style={styles.header}>
            {/* Left side - Back icon */}
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{langWiseWords[75]}:{selectedLessonIndex}</Text>

            {/* Right side - Home icon this screen doesn't have this */}
            <TouchableOpacity onPress={handleHomePress}>
              <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
            </TouchableOpacity>
          </View>

          </SafeAreaView>

          <ImageBackground
            source={require('../../../assets/img/bg.png')}
            style={styles.backgroundImage}>

             <Text style={styles.title}>{langWiseWords[149]}</Text>
              <View style={styles.horizontaline}></View>

              <View style={styles.container2}>
            <Table borderStyle={{ borderWidth: 0.2, borderColor: 'black' ,backgroundColor: '#f1f8ff',}}>
              <Row data={tableHeadforscorecard} style={styles.head1} textStyle={styles.text1} />
              <Row data={rowData} textStyle={[styles.text2, { color: 'red' }]} />
            </Table>
            </View>
             

              <View style={styles.container1}>
              <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows data={tableData} textStyle={styles.text} />
              </Table>
            </View>

          
          {/* <Text>hello</Text> */}



          <View style={styles.container}>
            <BarChart
              style={styles.chart}
              data={data}
              xAxis={xAxis as any}
              yAxis={yAxis}
              chartDescription={{ text: '' }}
              legend={{ enabled: false }}
            />
          </View>

    </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin:10,
    borderRadius:4,
    padding:5
  },
  chart: {
    width: 300,
    height: 200,
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
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1, // ensures it expands
},
   title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust the margin based on your preference
   textAlign:'center',
    color:'black',
    marginTop:5
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Adjust the margin based on your preference 

    marginLeft:5,
    color:'black',
   
  },
  horizontaline:{
    height: 4,
    backgroundColor: '#0D6EFD',
    marginTop:1,
    marginBottom:10,
    margin:-30
   
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  container1: {  padding:5,backgroundColor: '#E0E029' ,margin:10,borderRadius:5},
  head: { height: 30, backgroundColor: '#E0E029' },
  text: { margin: 2, textAlign: 'center',color:'black',fontWeight:'bold' },

  container2: {  backgroundColor: '#f1f8ff' ,margin:10,borderRadius:5},
  head1: { height: 35, backgroundColor: '#f1f8ff' },
  text1: { margin: 2, color:'black',fontWeight:'bold' ,textAlign:'left' },
  text2: { margin: 2,color:'black',fontWeight:'bold',textAlign:'left' },
  

});

export default Testprabodh;
