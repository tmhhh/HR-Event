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

const isTablet = Device.isTablet();
const App = () => {
  /  /;
  const getDeviceMode = () => {
    const {width, height} = Dimensions.get('window');
    return width < height ? 'PORTRAIT' : 'LANDSCAPE';
  };
  const [orientation, setOrientation] = useState(getDeviceMode());
  const flag = useRef(false);
  const [chosenCard, setChosenCard] = useState(null);
  const data = [
    {
      id: 1,
      title:
        'Your recruiters struggle to find potential and qualified candidates',
      primaryColor: '#FDECF2',
      solution:
        'Interest Profile and Preference Profile from the candidates will help your recruiters understand more about them',
      propose: 'bravoGROWTH (Interest Profile - Preference Profile)',
    },
    {
      id: 2,
      title: 'Your recruiters struggle to manage the recruitment process',
      primaryColor: '#F2F2F2',
      solution:
        'Your recruiters can track the recruitment stage of each candidate easily in bravoTALENT',
      propose: 'bravoTALENT',
    },
    {
      id: 3,
      title:
        'Your managers and team leaders struggle to understand team members and their potential strengths and motivation grow',
      primaryColor: '#FEF4E0',
      solution: `In bravoGROWTH, you can understand your employee's profiles, abilities as well as how they are fit into the team`,
      propose: 'bravoGROWTH (TeamMap, Interest Profile - Preference Profile)',
    },
    {
      id: 4,
      title:
        'It takes too much time to manage the candidate’s info and CV manually',
      primaryColor: '#D9E5FF',
      solution:
        'With our AI support, your recruiters can easily add candidates into the system by uploading their CVs',
      propose: 'bravoTALENT',
    },
    {
      id: 5,
      title:
        'It takes too much effort to manage large volumes of candidate CVs received from different job boards',
      primaryColor: '#FFFCE6',
      solution:
        'We support integration with different job boards to scan CVs from them and centralize the candidates into bravoTALENT platform',
      propose: 'bravoTALENT',
    },
    {
      id: 6,
      title:
        'Generating performance/insight reports manually takes too much time.',
      primaryColor: '#d7e9f7',
      solution:
        'In bravoINSIGHTS, you are supported with our built-in dashboards. You can also customize and add the dashboards following your needs',
      propose: 'bravoINSIGHTS',
    },
  ];

  /  /;
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
    });

    //xanoServerRequest
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:Sq3HGbWD/add-question', {
      method: 'POST',
      body: JSON.stringify({question_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
            <Text style={[styles.modalHeader, styles.modalText]}>
              Solution - {chosenCard?.propose}
            </Text>
            <View style={styles.modalView}>
              <Text numberOfLines={2} style={styles.modalText}>
                {chosenCard?.solution}
              </Text>
              <Image
                style={styles.modalImage}
                source={{
                  uri: 'data:image/jpeg;base64,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',
                }}
              />
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
    width: '95%',
    height: '80%',
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
    color: '#FFF',
    fontWeight: '600',
  },
  modalText: {
    padding: 10,
    fontSize: isTablet ? 20 : 14,
  },
  modalImage: {
    flex: 1,
    width: '100%',
  },
});
