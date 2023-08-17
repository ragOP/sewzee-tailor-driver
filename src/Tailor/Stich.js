import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PaperAppBar from '../Ui/PaperAppBar';
import MaterialIconsItem from '../Ui/MaterialIconsItem';
import { Appbar, Button } from 'react-native-paper';
import ImagePath from '../theme/imagePath';
import Fonts from '../theme/font';
import { apiHelper, commonValue, endpoints } from '../api';
import { get } from '../api/apiHelper';
import { ToastMsg } from '../Ui/ToastMsg';
import AppColor from '../theme/colors';
import Loader from '../Ui/Loader';

const genderArr = [
  'Men', 'Women', 'Both'
]


const Stich = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState()
  const [category, setCategory] = useState()
  const [basePrice, setBasePrice] = useState();
  const [subCategoryPrice, setSubCategoryPrice] = useState();
  const [subCategory, setSubCategory] = useState()
  const [labelPrices, setLabelPrices] = useState({});
  const [isStylesAvailable, setIsStylesAvailable] = useState(false);
  const [customization, setCustomization] = useState([])
  const [selectGender, setSelectGender] = useState(false);
  const [selectCategory, setSelectCategory] = useState(false);
  const [selectSubCategory, setSelectSubCategory] = useState(false);
  const [selectBasePrice, setSelectBasePrice] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState('');
  const [variationList, setVariationList] = useState('')
  const [activeGenderBtn, setActiveGenderBtn] = useState(null)
  const [activeCatBtn, setActiveCatBtn] = useState(null)
  const scrollViewRef = useRef(null);
  useEffect(() => {
    console.log('variationList==', subCategoryList);
    console.log('variationList==', variationList);
  }, [])

  const getCategoryApiCall = async (index) => {
    try {
      setIsLoading(true)
      let endpoint = '';
      if (index === 0) {
        endpoint = endpoints.TAILOR_GET_MEN_CATEGORY;
      } else if (index === 1) {
        endpoint = endpoints.TAILOR_GET_WOMEN_CATEGORY;
      } else if (index === 2) {
        endpoint = endpoints.TAILOR_GET_BOTH_CATEGORY;
      }

      if (endpoint !== '') {
        const response = await get(endpoint);
        if (response && response.data) {
          setCategoryList(response?.data)
          ToastMsg(response?.message, 'success');
        }
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubCategoryApiCall = async (id) => {
    try {
      setIsLoading(true)
      const response = await get(endpoints.TAILOR_GET_SUB_CATEGORY + id);
      if (response && response?.data) {
        if (response.data.length === 0) {
          ToastMsg('No Styles Available for this Category', 'success')
          setSelectBasePrice(true)
          // scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
          setSubCategoryList(response?.data)
          ToastMsg(response?.message, 'success');
          setSelectBasePrice(true)
          setIsStylesAvailable(true)
          // scrollViewRef.current.scrollToEnd({ animated: true });
          // setSelectCategory(true)
        }
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVariationsApiCall = async (id) => {
    try {
      setIsLoading(true)
      const response = await get(`tailor/customizations?category=${category}&subcategory=${id}`);
      if (response && response?.data) {
        if (response.data.length === 0) {
          ToastMsg('Style Price Added', 'success')
        } else {
          setVariationList(response?.data)
          ToastMsg(response?.message, 'success');
          setSelectSubCategory(true)
          scrollToVaritions()
        }
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const methodAddPrices = async () => {
    try {
      if (!type) {
        Alert.alert('Please Select Type')
      } else if (!category) {
        Alert.alert('Please Select Category')
      } else if (!basePrice) {
        Alert.alert('Please enter base price')
      } else if (type && category && basePrice) {
        console.log('data==',type , category , basePrice);
        setIsLoading(true)

        const response = await apiHelper.post({
          url:
            endpoints.TAILOR_POST_ADD_PRICES,
          data: {
            "type": type,
            "category": category,
            "price": basePrice,
            "subcategory": subCategory,
            "subprice": subCategory ? subCategoryPrice : null,
            "customization": []
          },
        });
        if (response.status != 400) {
          ToastMsg(response?.message, 'success');
          navigation.goBack()
        } else {
          ToastMsg(response?.message);
          navigation.goBack()
        }
      }
    } catch (error) {
      ToastMsg(commonValue?.kSorryError);
    } finally {
      setIsLoading(false);
    }
  };

  const methodAddPricesCustom = async () => {
    try {
      if (!type) {
        Alert.alert('Please Select Type')
      } else if (!category) {
        Alert.alert('Please Select Category')
      } else if (!basePrice) {
        Alert.alert('Please enter base price')
      } else if (type && category && basePrice) {
        console.log('data==',type , category , basePrice);
        setIsLoading(true)
  
        const customizationArray = variationList.map((variationItem) => (
          {
          type: variationItem.type,
          labels: variationItem.labels.map((labelItem) =>({
            name: labelItem.name,
            images: labelItem.images,
            price: labelPrices[labelItem.name] !== undefined && labelPrices[labelItem.name] !== ''
            ? parseFloat(labelPrices[labelItem.name])
            : 0,
          })),
        }))


        const response = await apiHelper.post({
          url:
            endpoints.TAILOR_POST_ADD_PRICES,
          data: {
            "type": type,
            "category": category,
            "price": basePrice,
            "subcategory": subCategory,
            "subprice": subCategory ? subCategoryPrice : "",
            "customization": variationList ? customizationArray :[]
          },
        });
        if (response.status != 400) {
          ToastMsg(response?.message, 'success');
          navigation.goBack()
        } else {
          ToastMsg(response?.message);
          navigation.goBack()
        }
      }
    } catch (error) {
      ToastMsg(commonValue?.kSorryError);
    } finally {
      setIsLoading(false);
    }
  };

  const methodSubmit = () => {
    if(Object.keys(labelPrices).length === 0){
      console.log('methodAddPrices');
      methodAddPrices()
    } else {
      console.log('methodAddPricesCustom');
      methodAddPricesCustom()
    }
  }

  const currentSubCategory = subCategoryList[currentIndex];

  const handleNext = () => {
    setSubCategoryPrice('')
    if (currentIndex < subCategoryList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setSubCategoryPrice('')
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitSubCategory = (id) => {
    console.log('id==', id);
    setSubCategory(id)
    getVariationsApiCall(id)
  }

  const methodGenderSelect = (index) => {
    console.log('index -', index);
    { index === 0 && setType('Men') || index === 1 && setType('Women') || index === 2 && setType('Both') }
    setSelectGender(true)              
    setActiveGenderBtn(index);
    setIsStylesAvailable(false)
    setActiveCatBtn('')
    setBasePrice('')
    setSelectBasePrice(false)
    getCategoryApiCall(index)
  }

  const methodCategorySelect = (id, index) => {
    console.log('id -', id);
    setCategory(id)
    setActiveCatBtn(index);
    setIsStylesAvailable(false)
    setBasePrice('')
    setSelectBasePrice(false)
    getSubCategoryApiCall(id)
    
  }

  const renderVariationList = () => {
    return (
      <View><Text style={[styles.headingText, {marginTop: 10, fontSize: 20}]}>Variations & Prices</Text>
      <FlatList
        data={variationList}
        renderItem={({ item, index }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.headingText}>{index + 1}.  {item?.type}</Text>
            <FlatList
              horizontal
              data={item.labels}
              renderItem={({ item }) => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                <View style={styles.horizontalListContainer}>
                    {/* <Image source={{ uri: item?.images }} style={styles.image} resizeMode="contain" /> */}
                  </View>
                  <Text style={styles.labelName}>{item?.name}</Text>
                  <TextInput
                      style={styles.priceInput}
                      placeholder="Price"
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setLabelPrices((prevPrices) => ({
                          ...prevPrices,
                          [item.name]: text,
                        }));
                      }}
                      value={labelPrices[item.name]}
                    />
                </View>
              )}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  };


  const scrollToBottom = () => {
    if (basePrice && isStylesAvailable ) {
      console.log('scroll');
      setSelectCategory(true)
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const scrollToVaritions = () => {
    if (scrollViewRef.current) {
      const windowHeight = Dimensions.get('window').height;
      const scrollToY = 2.3 * windowHeight;
      scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
      >
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
        <Appbar.Content titleStyle={styles.header} title="Customization & Preferences" />
      </PaperAppBar>

      <View style={{ flex: 1 }}>
     
        <ScrollView  ref={scrollViewRef} style={{ flex: 1, marginBottom: 10, paddingHorizontal: 15 }}>
          <Text style={styles.labelTxt}>I stich clothes for</Text>
          <View style={styles.btnContainer}>
            {genderArr?.map((gender, index) => (
              <TouchableOpacity
                style={index === activeGenderBtn ? styles.activeButton : styles.button}
                key={index} onPress={() => { methodGenderSelect(index) }}>
                <Text style={styles.labelTxt}>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectGender ?
            <>
              <Text style={styles.labelTxt}>I stich the following</Text>
              <View style={styles.btnContainer}>
                {categoryList?.map((item, index) => (
                  <TouchableOpacity
                    style={index === activeCatBtn ? styles.activeButton : styles.button}
                    key={index} onPress={() => { methodCategorySelect(item?.id, index) }}>
                    <Text style={styles.labelTxt}>{item?.category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
            : null}

          {selectBasePrice ?
            <View style={styles.basePriceContainer}>
              <Text style={styles.headingText}>Base Price : </Text>
              <TextInput
                style={styles.input}
                placeholder="Base Price"
                keyboardType="number-pad"
                onChangeText={(text) => setBasePrice(text)}
                value={basePrice}
              />
              {isStylesAvailable && <TouchableOpacity onPress={()=>scrollToBottom() }
               style={{ width: '30%',padding: 9, left: 10, justifyContent: 'center', backgroundColor : AppColor.green, borderRadius: 10 }}>
                    <Text style={{color: 'white', alignSelf: 'center'}}>Next</Text>
                  </TouchableOpacity>}
            </View> : null}


          {isStylesAvailable && selectCategory ?
            <>
              <Text style={styles.headingText}>Styles & Prices</Text>
              <View style={{ marginBottom: 10 }}>
                <View style={styles.sliderContainer}>
                  <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
                    <Image source={ImagePath.leftArrow} style={styles.image} resizeMode="contain" />
                  </TouchableOpacity>

                  <View style={styles.middleBox}>
                    {/* <Text style={styles.middleText}>{currentSubCategory?.images}</Text> */}
                  </View>

                  <TouchableOpacity onPress={handleNext} disabled={currentIndex === subCategoryList.length - 1}>
                    <Image source={ImagePath.rightArrow} style={styles.image} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', alignSelf: 'center', flex: 1 }}>
                  <View>
                    <Text style={styles.headingText}>{currentSubCategory?.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Price"
                      keyboardType="number-pad"
                      onChangeText={(text) => setSubCategoryPrice(text)}
                      value={subCategoryPrice}
                    />
                    <TouchableOpacity 
                    style={{ width: '30%',padding: 9, left: 10, justifyContent: 'center', backgroundColor : AppColor.green, borderRadius: 10 }}
                      onPress={() => { handleSubmitSubCategory(currentSubCategory?.id) }}
                    >
                      <Text style={{color: 'white', alignSelf: 'center'}}>{'Add Price'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
            : null}

          {selectSubCategory && renderVariationList()}

        </ScrollView>


      </View>

      <TouchableOpacity style={styles.editBtn} 
      onPress={methodSubmit}
      >  
        <Text style={{ textAlign: 'center', color: 'white' }}>SUBMIT</Text>
      </TouchableOpacity>
      {isLoading && <Loader />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  backButton: {
    padding: 5,
  },
  header: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  button: {
    width: '30%',
    margin: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    paddingVertical: 10
  },
  activeButton: {
    width: '30%',
    margin: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: AppColor.purple,
    paddingVertical: 10
  },
  submitBtn: {
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 5,
    marginHorizontal: 5
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleBox: {
    width: '65%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderColor: '#00000040',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    // borderWidth: 1
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 27,
    height: 28,
    marginRight: 5
  },
  headingText: {
    fontFamily: Fonts.Poppins.semiBold,
    fontSize: 15,
    color: '#000'
  },
  input: {
    height:37,
    color: '#333',
    borderWidth: 1,
    width: '30%',
    borderRadius: 10,
    paddingLeft: 10,

  },
  basePriceContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },

  horizontalListItem: {
    margin: 5,
  },
  labelName: {
    marginTop: 5,
    marginBottom: 2,
    fontFamily: Fonts.Poppins.semiBold,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    padding: 5,
    textAlign: 'center',
  },
  horizontalListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
    width: 200,
    height: 200
  },
  squareBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    width: '100%'
  },
  editBtn: {
    paddingVertical: 10,
    borderRadius: 5,
    bottom: 10,
    width: '92%',
    marginHorizontal: 15,
    backgroundColor: AppColor.purple
  },
  labelTxt: {
    color: '#000',
    fontSize: 13,
    fontFamily: Fonts.Poppins.regular,
  },
});

export default Stich;
