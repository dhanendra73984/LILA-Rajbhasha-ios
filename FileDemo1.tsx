import React from 'react';
import { View, StyleSheet, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

const FileDemo = () => {
  return (
    <View style={styles.container}>
      <LineChart
        style={styles.chart}
        data={{
          dataSets: [
            {
              values: [{ y: 10 }, { y: 20 }, { y: 15 }, { y: 30 }],
              label: 'Line Data',
              config: {
                color: processColor('blue'),
                drawValues: false,
                lineWidth: 2,
              },
            },
          ],
        }}
        chartDescription={{ text: '' }}
        xAxis={{ enabled: true, drawGridLines: false }}
        yAxis={{
          left: { enabled: true, drawGridLines: false },
          right: { enabled: false },
        }}
        legend={{ enabled: true }}
        marker={{
          enabled: true,
          markerColor: processColor('red'),
          textColor: processColor('white'),
        }}
        touchEnabled={true}
        dragEnabled={true}
        scaleEnabled={true}
        scaleXEnabled={true}
        scaleYEnabled={true}
        pinchZoom={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    height: 300,
    width: '90%',
    backgroundColor: 'lightgray',
  },
});

export default FileDemo;
