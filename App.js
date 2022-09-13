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
    title:
      'Your recruiters struggle to find potential and qualified candidates',
    primaryColor: '#FDECF2',
    solution:
      'Interest Profile and Preference Profile from the candidates will help your recruiters understand more about them',
    propose: 'bravoGROWTH (Interest Profile - Preference Profile)',
    source: image1,
  },
  {
    id: 2,
    title: 'Your recruiters struggle to manage the recruitment process',
    primaryColor: '#F2F2F2',
    solution:
      'Your recruiters can track the recruitment stage of each candidate easily in bravoTALENT',
    propose: 'bravoTALENT',
    source: image2,
  },
  {
    id: 3,
    title:
      'Your managers and team leaders struggle to understand team members and their potential strengths and motivation grow',
    primaryColor: '#FEF4E0',
    solution: `In bravoGROWTH, you can understand your employee's profiles, abilities as well as how they are fit into the team`,
    propose: 'bravoGROWTH (TeamMap, Interest Profile - Preference Profile)',
    source: image3,
  },
  {
    id: 4,
    title:
      'It takes too much time to manage the candidate’s info and CV manually',
    primaryColor: '#D9E5FF',
    solution:
      'With our AI support, your recruiters can easily add candidates into the system by uploading their CVs',
    propose: 'bravoTALENT',
    source: image4,
  },
  {
    id: 5,
    title:
      'It takes too much effort to manage large volumes of candidate CVs received from different job boards',
    primaryColor: '#FFFCE6',
    solution:
      'We support integration with different job boards to scan CVs from them and centralize the candidates into bravoTALENT platform',
    propose: 'bravoTALENT',
    source: image5,
  },
  {
    id: 6,
    title:
      'Generating performance/insight reports manually takes too much time.',
    primaryColor: '#d7e9f7',
    solution:
      'In bravoINSIGHTS, you are supported with our built-in dashboards. You can also customize and add the dashboards following your needs',
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
    }).catch(err);

    //xanoServerRequest
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:Sq3HGbWD/add-question', {
      method: 'POST',
      body: JSON.stringify({question_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err);
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
