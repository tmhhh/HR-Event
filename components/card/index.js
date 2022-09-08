import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Card = ({id, title, primaryColor, orientation, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          aspectRatio: orientation === 'PORTRAIT' ? 1 / 1.5 : 2,
        },
      ]}>
      <View style={[styles.header, {backgroundColor: primaryColor}]} />
      <View style={styles.contentWrapper}>
        <Text style={styles.content}>{`${id}. ${title}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const cardBorderRadius = 20;

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
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: cardBorderRadius,
    transform: [{translateY: -10}],
    backgroundColor: '#FFF',
  },
  content: {
    fontWeight: '600',
    fontSize: 20,
  },
});
