import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Device from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
const isTablet = Device.isTablet();

const Card = ({title, boldTitle, boldPlaceAhead, orientation, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          aspectRatio: orientation === 'PORTRAIT' ? 1 / 2 : 1.3,
        },
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#20B4B3', '#3C7CBE']}
        style={styles.header}
      />
      <View style={styles.contentWrapper}>
        {!boldPlaceAhead ? (
          <Text style={styles.content}>
            {title}
            <Text style={[styles.content, styles.boldContent]}>
              {boldTitle}{' '}
            </Text>
          </Text>
        ) : (
          <Text style={styles.content}>
            <Text style={[styles.content, styles.boldContent]}>
              {boldTitle}{' '}
            </Text>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const cardBorderRadius = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: cardBorderRadius,
    backgroundColor: '#FFF',

    //SHADOW
    shadowColor: '#000',
    // IOS
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Android
    elevation: 7,
  },
  header: {
    flex: 1,
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
  },

  contentWrapper: {
    flex: 3,
    padding: 20,
    borderRadius: cardBorderRadius,
    transform: [{translateY: -10}],
    backgroundColor: '#FFF',
  },
  content: {
    fontWeight: '400',
    fontSize: isTablet ? 28 : 14,
  },
  boldContent: {
    fontWeight: '700',
  },
});
