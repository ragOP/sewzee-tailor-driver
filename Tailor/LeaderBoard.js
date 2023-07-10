import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import {Appbar} from 'react-native-paper';

const LeaderBoard = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Ajanta Tailor',
      orders: 20,
      rank: '',
    },
    {
      id: 2,
      name: 'Chola Tailor',
      orders: 25,
      rank: '',
    },
    {
      id: 3,
      name: 'Rajdhani Tailor',
      orders: 20,
      rank: '',
    },
    {
      id: 4,
      name: 'Prakash Tailor',
      orders: 60,
      rank: '',
    },
    {
      id: 5,
      name: 'A-1 Tailor',
      orders: 17,
      rank: '',
    },
    {
      id: 6,
      name: 'Famous Tailor',
      orders: 60,
      rank: '',
    },
    {
      id: 7,
      name: 'Sayem',
      orders: 14,
      rank: '',
    },
  ]);

  useEffect(() => {
    handle();
  }, []);
  const handle = () => {
    const sortedData = [...data].sort((a, b) => b.orders - a.orders);

    let rank = 1;
    let prevOrders = sortedData[0].orders;
    const rankedData = sortedData.map((item, index) => {
      if (index > 0 && item.orders !== prevOrders) {
        rank = rank + 1;
      }
      prevOrders = item.orders;
      return {...item, rank: rank};
    });

    setData(rankedData);
  };

  const [date, setDate] = React.useState(new Date());

  return (
    <>
      <PaperAppBar>
        <TouchableOpacity
          styling={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIconsItem
            name="arrow-back-ios"
            color={'#4F5663'}
            size={25}
          />
        </TouchableOpacity>
        <Appbar.Content titleStyle={styles.header} title="Leaderboard" />
      </PaperAppBar>

      <View style={styles.tailorContainer}>
        <Text>Rank</Text>
        <Text>Name</Text>
        <Text>Orders</Text>
      </View>
      <View style={styles.tailorContainer2}>
        <Text>5.</Text>
        <Text>Sayem</Text>
        <Text>14</Text>
      </View>

      {data.map((item, id) => (
        // console.log('data', item.orders)

        <View key={id} style={styles.tailorContainer3}>
          <Text>{item.rank}</Text>
          <Text>{item.name}</Text>
          <Text>{item.orders}</Text>
        </View>
      ))}
    </>
  );
};

export default LeaderBoard;
const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
  tailorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  tailorContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#7d5ffe',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  tailorContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#7d5ffe',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  header: {
  fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});
