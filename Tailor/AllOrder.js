import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllOrder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Orders</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Orders</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Orders</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rejected Orders</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AllOrder;
