import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientProgressBar = ({ progress }) => {
  const gradientColors = ['#FF7A00', '#7D5FFE'];
  const borderRadius = 5; 
  const clampedProgress = Math.min(Math.max(progress, 0), 97);
  const fillWidth = (clampedProgress * (borderRadius * 2)) / 100;

  return (
    <View style={styles.progressBarContainer}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}  
        style={[styles.progressBar, { borderRadius }]}
      >
        <View
          style={[
            styles.progressIndicator,
            {
              width: `${clampedProgress}%`,
              borderRadius: borderRadius,
            },
          ]}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
  },
  progressIndicator: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 4,
    top: 3,
    left: 3,
  },
});

export default GradientProgressBar;

