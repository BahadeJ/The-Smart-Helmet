import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTab from '../components/bottom-tab';

const Dashboard = () => {
  // Example data for charts
  const lineChartData = {
    labels: ['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00'],
    datasets: [
      {
        data: [40, 60, 80, 60, 70, 50, 90],
        color: () => `rgba(255, 165, 0, 0.6)`, // Orange
        strokeWidth: 2,
      },
      {
        data: [50, 70, 60, 80, 60, 70, 60],
        color: () => `rgba(135, 206, 250, 0.6)`, // Light blue
        strokeWidth: 2,
      },
    ],
  };

  const pieChartData = [
    { name: 'θ (theta rhythm)', percentage: 15, color: '#FFA07A', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'α (alpha rhythm)', percentage: 35, color: '#87CEFA', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'β (beta rhythm)', percentage: 50, color: '#FFD700', legendFontColor: '#333', legendFontSize: 12 },
  ];

  const concentrationData = {
    labels: [''],
    datasets: [
      {
        data: [10, 30, 20, 40, 50, 30, 70, 40],
        color: () => `rgba(0, 128, 255, 0.6)`, // Blue
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Icon name="chevron-back" size={24} color="#000" />
          <Text style={styles.date}>08.20.2024 - 4:00 PM</Text>
          <Icon name="chevron-forward" size={24} color="#000" />
        </View>

        {/* Brain Wave Activity Section */}
        <Text style={styles.sectionTitle}>BRAIN WAVE ACTIVITY</Text>
        <LineChart
          data={lineChartData}
          width={300} // Adjust according to your layout
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        {/* Rhythm Section */}
        <Text style={styles.sectionTitle}>RHYTHM</Text>
        <PieChart
          data={pieChartData}
          width={300} // Adjust according to your layout
          height={180}
          chartConfig={chartConfig}
          accessor="percentage"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        {/* Concentration Section */}
        <Text style={styles.sectionTitle}>CONCENTRATION</Text>
        <LineChart
          data={concentrationData}
          width={300}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        {/* State Section */}
        <Text style={styles.sectionTitle}>STATE</Text>
        <Text style={styles.stateText}>NON - DROWSY</Text>
      </ScrollView>

      {/* Footer Navigation */}
      <BottomTab activeTab="Dashboard"/>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 40,
  },
  chart: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  stateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFD700',
  },
});

export default Dashboard;