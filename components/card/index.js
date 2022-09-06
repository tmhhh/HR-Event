import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const Card = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.contentWrapper}>
        <View style={styles.circle}></View>
        <Text style={styles.content}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
    </View>
  );
};

export default Card;
const cardBorderRadius = 20;
const circle = 40;
const styles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width / 3,
    marginBottom: 10,

    shadowColor: 'black',
    // IOS
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Android
    elevation: 7,
    marginHorizontal: 'auto',
  },
  header: {
    height: 50,
    backgroundColor: '#FDECF2',
  },

  contentWrapper: {
    borderRadius: cardBorderRadius,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: 'white',
    transform: [{translateY: -10}],
  },
  circle: {
    backgroundColor: '#EA4C88',
    width: circle,
    borderRadius: circle / 2,
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
    transform: [{translateY: -circle / 2}],
    left: 10,
  },
  content: {
    fontSize: 14,
  },
});
