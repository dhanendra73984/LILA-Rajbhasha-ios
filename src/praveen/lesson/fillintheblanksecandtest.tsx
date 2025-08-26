import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, processColor } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-charts-wrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

const fillintheblanksecandtest = (props: any) => {
  const {
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    title,
    trueFalseCounter1,
    fillInBlanksCounter1,
    testChoiceCounter1,
    fillInBlanksCounter2,
    testChoiceCounter2,
    trueFalseCounter2,
    trueFalseCounter3,
    testChoiceCounter3,
    fillInBlanksCounter3,
    orignalessonindex

  } = props.route.params;

  const langWiseWords = ApiResponse.map((item: any) => item.LangWiseWords);
  
  const Sectiontitle = langWiseWords[56];
  
  const titleoflessonindex = langWiseWords[75];//headertitle

  const counters = [
    { label: 'TrueFalse1', value: trueFalseCounter1 },
    { label: 'FillInBlanks1', value: fillInBlanksCounter1 },
    { label: 'TestChoice1', value: testChoiceCounter1 },
    { label: 'FillInBlanks2', value: fillInBlanksCounter2 },
    { label: 'TestChoice2', value: testChoiceCounter2 },
    { label: 'TrueFalse2', value: trueFalseCounter2 },
    { label: 'TrueFalse3', value: trueFalseCounter3 },
    { label: 'TestChoice3', value: testChoiceCounter3 },
    { label: 'FillInBlanks3', value: fillInBlanksCounter3 }
  ];

  // Sort the array in descending order based on counter values
  counters.sort((a, b) => b.value - a.value);

  // Get the top three counters
  const topCounters = counters.slice(0, 3);

  const data = {
    dataSets: [
      {
        values: topCounters.map(counter => ({ y: counter.value * 10 })),
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
    valueFormatter: topCounters.map((_, index) => `${index + 1}`),
    position: 'BOTTOM' as const,
    granularityEnabled: true,
    granularity: 1,
    axisMaximum: 3,
    axisMinimum: -1,
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

  // header navigation
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    props.navigation.navigate('Homepraveen', { Package, Medium, ApiResponse });
  };

  const tableHead = [langWiseWords[110], langWiseWords[149]];
  const originalTableData = [
    ['1', topCounters[0].value * 10],
    ['2', topCounters[1].value * 10],
    ['3', topCounters[2].value * 10],
  ];

  const tableData = originalTableData.flatMap(([unit, scorecard]) => [
    [unit, scorecard],
    [null, '50'],
  ]);

  const score = topCounters.reduce((sum, counter) => sum + counter.value * 10, 0);
  const totalScore = 150;
  const tableHeadforscorecard = [`${langWiseWords[154]}: ${score}/${totalScore}`];
  let rowData = [];

  if (score > 60) {
    rowData = [['']];
  } else {
    rowData = [langWiseWords[155]];
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          {/* <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" /> */}
        </TouchableOpacity>
        {Package === 'Prabodh' ? (
            <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
          ) : (
            orignalessonindex < 5 ? (
              <Text style={styles.headerTitle}>{titleoflessonindex}:{orignalessonindex}</Text>
            ) : (
              <Text style={styles.headerTitle}>{titleoflessonindex}:{selectedLessonIndex}</Text>
            )
          )}
        <TouchableOpacity onPress={handleHomePress}>
          <MaterialIcons style={styles.headerIcon} name="home" size={32} color="white" />
        </TouchableOpacity>
      </View>
      </SafeAreaView>

      <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>{langWiseWords[149]}</Text>
        <View style={styles.horizontaline}></View>

        <View style={styles.container2}>
          <Table borderStyle={{ borderWidth: 0.2, borderColor: 'black', backgroundColor: '#f1f8ff' }}>
            <Row data={tableHeadforscorecard} style={styles.head1} textStyle={styles.text1} />
            <Row data={rowData} textStyle={[styles.text2, { color: 'red' }]} />
          </Table>
        </View>

        <View style={styles.container1}>
          <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>

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

export default fillintheblanksecandtest;
