import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Device from 'react-native-device-info';

import Card from './components/card';
import image1 from './img/01.png';
import image2 from './img/02.png';
import image3 from './img/03.png';
import image4 from './img/04.png';
import image5 from './img/05.png';
import image6 from './img/06.png';
const isTablet = Device.isTablet();
const data = [
  {
    id: 1,
    title: 'Your recruiters struggle to ',
    boldTitle: 'find potential and qualified candidates',
    boldPlaceAhead: false,
    propose: 'bravoGROWTH (Interest Profile - Preference Profile)',
    source: image1,
  },
  {
    id: 2,
    title: 'Your recruiters struggle to ',
    boldTitle: 'manage the recruitment process',
    boldPlaceAhead: false,
    propose: 'bravoTALENT',
    source: image2,
  },
  {
    id: 3,
    title: 'Your managers and team leaders struggle to ',
    boldTitle:
      'understand team members and their potential strengths and motivation',
    boldPlaceAhead: false,
    source: image3,
  },
  {
    id: 4,
    title: 'It takes too much time to ',
    boldTitle: 'manage the candidate’s info and CV manually',
    boldPlaceAhead: false,
    propose: 'bravoTALENT',
    source: image4,
  },
  {
    id: 5,
    title: 'It takes too much effort to ',
    boldTitle:
      'manage large volumes of candidate CVs received from different job boards',
    boldPlaceAhead: false,
    propose: 'bravoTALENT',
    source: image5,
  },
  {
    id: 6,
    title: 'takes too much time',
    boldTitle: 'Generating performance/insight reports manually',
    boldPlaceAhead: true,
    propose: 'bravoINSIGHTS',
    source: image6,
  },
];
const App = () => {
  const getDeviceMode = () => {
    const {width, height} = Dimensions.get('window');
    return width < height ? 'PORTRAIT' : 'LANDSCAPE';
  };
  const [orientation, setOrientation] = useState(getDeviceMode());
  const flag = useRef(false);
  const [chosenCard, setChosenCard] = useState(null);

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(getDeviceMode());
    });
  }, []);

  const handleOnPress = useCallback(async item => {
    if (flag.current) return;

    const {id: question_id} = item;
    flag.current = true;
    setChosenCard(item);

    //nodeServerRequest
    fetch('https://hr-event-osd.herokuapp.com/question', {
      method: 'POST',
      body: JSON.stringify({question_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => null);

    //xanoServerRequest
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:Sq3HGbWD/add-question', {
      method: 'POST',
      body: JSON.stringify({question_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => null);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar hidden />
        <FlatList
          scrollEnabled
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={3}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Card
              {...item}
              orientation={orientation}
              onPress={() => handleOnPress(item)}
            />
          )}
        />
      </View>
      <Modal
        visible={chosenCard !== null}
        animationType="fade"
        transparent={true}
        statusBarTranslucent>
        <Pressable
          onPress={() => {
            setChosenCard(null);
            flag.current = false;
          }}
          style={styles.centeredView}>
          <>
            <Text numberOfLines={1} style={styles.modalHeader}>
              Solution - {chosenCard?.propose}
            </Text>
            <View style={styles.modalView}>
              <Image style={styles.modalImage} source={chosenCard?.source} />
            </View>
          </>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },

  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    height: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    //SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: isTablet ? 20 : 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFF',
    paddingVertical: 10,
  },
  modalText: {
    padding: 10,
    fontSize: isTablet ? 18 : 14,
  },
  modalImage: {
    flex: 1,
    width: '100%',
  },
});
