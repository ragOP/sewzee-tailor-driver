import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import {Appbar} from 'react-native-paper';

const GenderPreferences = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [basePrices, setBasePrices] = useState([]);
  const [customPrices, setCustomPrices] = useState([]);

  const handleGenderChange = value => {
    setGender(value);
    setCheckedItems([]);
    setBasePrices([]);
    setCustomPrices([]);
  };

  const handleCheckboxChange = index => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];

    const newBasePrices = [...basePrices];
    const newCustomPrices = [...customPrices];

    if (!newCheckedItems[index]) {
      newBasePrices[index] = '';
      newCustomPrices[index] = '';
    }

    setCheckedItems(newCheckedItems);
    setBasePrices(newBasePrices);
    setCustomPrices(newCustomPrices);
  };

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
        <Appbar.Content titleStyle={styles.header} title="Gender Prefences" />
      </PaperAppBar>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.radioContainer}>
            <CheckBox
              tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
              value={gender === 'men'}
              onValueChange={() => handleGenderChange('men')}
            />
            <Text style={styles.radioLabel}>Men</Text>

            <CheckBox
              tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
              value={gender === 'women'}
              onValueChange={() => handleGenderChange('women')}
            />
            <Text style={styles.radioLabel}>Women</Text>

            <CheckBox
              tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
              value={gender === 'both'}
              onValueChange={() => handleGenderChange('both')}
            />
            <Text style={styles.radioLabel}>Both</Text>
          </View>

          {gender === 'men' && (
            <View style={styles.checkboxContainer}>
              <CheckBox
                tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                value={checkedItems[0] || false}
                onValueChange={() => handleCheckboxChange(0)}
              />
              <Text style={styles.checkboxLabel}>Kurta</Text>

              {checkedItems[0] && (
                <>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                      value={checkedItems[1] || false}
                      onValueChange={() => handleCheckboxChange(1)}
                    />
                    <Text style={styles.checkboxLabel}>Straight Kurta</Text>

                    {checkedItems[1] && (
                      <>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Base Price"
                          keyboardType="numeric"
                          value={basePrices[1]}
                          onChangeText={text => {
                            const newBasePrices = [...basePrices];
                            newBasePrices[1] = text;
                            setBasePrices(newBasePrices);
                          }}
                        />
                        <CheckBox
                          tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                          value={checkedItems[2] || false}
                          onValueChange={() => handleCheckboxChange(2)}
                        />
                        <Text style={styles.checkboxLabel}>Length</Text>
                        {checkedItems[2] && (
                          <>
                            <Text style={styles.checkboxLabel}>Short</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="Enter Custom Price"
                              keyboardType="numeric"
                              value={customPrices[0]}
                              onChangeText={text => {
                                const newCustomPrices = [...customPrices];
                                newCustomPrices[0] = text;
                                setCustomPrices(newCustomPrices);
                              }}
                            />
                            <Text style={styles.checkboxLabel}>Long</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="Enter Custom Price"
                              keyboardType="numeric"
                              value={customPrices[1]}
                              onChangeText={text => {
                                const newCustomPrices = [...customPrices];
                                newCustomPrices[1] = text;
                                setCustomPrices(newCustomPrices);
                              }}
                            />
                          </>
                        )}
                      </>
                    )}
                  </View>
                </>
              )}
            </View>
          )}

          {gender === 'women' && (
            <View style={styles.checkboxContainer}>
              <CheckBox
                tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                value={checkedItems[0] || false}
                onValueChange={() => handleCheckboxChange(0)}
              />
              <Text style={styles.checkboxLabel}>Lehanga</Text>

              {checkedItems[0] && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Base Price"
                    keyboardType="numeric"
                    value={basePrices[0]}
                    onChangeText={text => {
                      const newBasePrices = [...basePrices];
                      newBasePrices[0] = text;
                      setBasePrices(newBasePrices);
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Custom Price"
                    keyboardType="numeric"
                    value={customPrices[0]}
                    onChangeText={text => {
                      const newCustomPrices = [...customPrices];
                      newCustomPrices[0] = text;
                      setCustomPrices(newCustomPrices);
                    }}
                  />
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                      value={checkedItems[1] || false}
                      onValueChange={() => handleCheckboxChange(1)}
                    />
                    <Text style={styles.checkboxLabel}>Anarkali Lehanga</Text>

                    {checkedItems[1] && (
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Base Price"
                        keyboardType="numeric"
                        value={basePrices[1]}
                        onChangeText={text => {
                          const newBasePrices = [...basePrices];
                          newBasePrices[1] = text;
                          setBasePrices(newBasePrices);
                        }}
                      />
                    )}
                  </View>
                </>
              )}
            </View>
          )}

          {gender === 'both' && (
            <View>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                  value={checkedItems[0] || false}
                  onValueChange={() => handleCheckboxChange(0)}
                />
                <Text style={styles.checkboxLabel}>Lehenga</Text>

                {checkedItems[0] && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Base Price"
                      keyboardType="numeric"
                      value={basePrices[0]}
                      onChangeText={text => {
                        const newBasePrices = [...basePrices];
                        newBasePrices[0] = text;
                        setBasePrices(newBasePrices);
                      }}
                    />
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                        value={checkedItems[1] || false}
                        onValueChange={() => handleCheckboxChange(1)}
                      />
                      <Text style={styles.checkboxLabel}>Anarkali Lehanga</Text>

                      {checkedItems[1] && (
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Base Price"
                          keyboardType="numeric"
                          value={basePrices[1]}
                          onChangeText={text => {
                            const newBasePrices = [...basePrices];
                            newBasePrices[1] = text;
                            setBasePrices(newBasePrices);
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                        value={checkedItems[2] || false}
                        onValueChange={() => handleCheckboxChange(2)}
                      />
                      <Text style={styles.checkboxLabel}>Sharra Lehanga</Text>

                      {checkedItems[2] && (
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Base Price"
                          keyboardType="numeric"
                          value={basePrices[2]}
                          onChangeText={text => {
                            const newBasePrices = [...basePrices];
                            newBasePrices[2] = text;
                            setBasePrices(newBasePrices);
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        tintColors={{true: '#7d5ffe', false: '#7d5ffe'}}
                        value={checkedItems[3] || false}
                        onValueChange={() => handleCheckboxChange(3)}
                      />
                      <Text style={styles.checkboxLabel}>CutWay Lehanga</Text>

                      {checkedItems[3] && (
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Base Price"
                          keyboardType="numeric"
                          value={basePrices[3]}
                          onChangeText={text => {
                            const newBasePrices = [...basePrices];
                            newBasePrices[3] = text;
                            setBasePrices(newBasePrices);
                          }}
                        />
                      )}
                    </View>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.continue}>
        <Text style={styles.text}>SUBMIT</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,

    marginLeft: 55,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  input: {
    height: 44,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#7d5ffe',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 99,
    marginLeft: 8,
    marginBottom: 10,
  },
});

export default GenderPreferences;
