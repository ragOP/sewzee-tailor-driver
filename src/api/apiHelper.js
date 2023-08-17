import {
  API_FAILED,
  INTERNET_FAILED,
  JSON_HEADER,
  BASE_URL,
  kPost,
  USER_TYPE,
  kErrorCode,
  kGet,
  kDel,
} from './commonValue';
// import {isNetworkAvailable} from './network';
import { Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const post = async ({url, data}, includeToken = true) => {
  // const isConnected = await isNetworkAvailable();
  // if (isConnected === false) {
  //   return INTERNET_FAILED;
  // }

  let headers = {
    ...JSON_HEADER,
  };

  if (includeToken) {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }
  }

  let params = {
    method: 'POST',
    redirect: 'follow',
    headers,
    body: JSON.stringify(data),
  };

  console.log('Api url-------', BASE_URL + url);
  console.log('Api params------', params);

  try {
    Keyboard.dismiss()
    let status = 200;
    const response = await fetch(BASE_URL + url, params);
    status = response.status;
    const json = await response.json();
    json.status = json.Success === false ? kErrorCode : status;
    console.log('Api response------', json);
    return json;
  } catch (error) {
    Keyboard.dismiss()
    console.log(
      'Api Failed-----',
      error,
      '------------' + url,
    );
    return API_FAILED;
  } finally {
    Keyboard.dismiss()
    // console.log('Api finally----------------------');
  }
};

// api.js

export const get = async (url) => {
  console.log('API url---',BASE_URL + url);
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      redirect: 'follow',
    };

    const response = await fetch( BASE_URL + url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await  response.json();
    console.log('API Response--',result);
    return result;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const put = async (url, data) => {
  console.log('API url---', BASE_URL + url);
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json', // Assuming you are sending JSON data
      },
      body: JSON.stringify(data), // Convert the data to JSON string and send in the request body
      redirect: 'follow',
    };
    console.log('Api params------', requestOptions);
    const response = await fetch(BASE_URL + url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('API Response--', result);
    return result;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const patch = async (url, data) => {
  console.log('API url---', BASE_URL + url);
  console.log('API data---', data);
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const requestOptions = {
      method: 'PATCH', // Use PATCH method for partial updates
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json', // Assuming you are sending JSON data
      },
      body: JSON.stringify(data), // Convert the data to JSON string and send in the request body
      redirect: 'follow',
    };

    const response = await fetch(BASE_URL + url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('API Response--', result);
    console.log('Api params------', requestOptions);
    return result;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const del = async (url) => {
  console.log('API url---', BASE_URL + url);
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };

    const response = await fetch(BASE_URL + url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('API Response--', result);
    return result;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};





// const objToQueryString = (obj) => {
//   if (obj) {
//     const keyValuePairs = [];
//     for (const key in obj) {
//       if (obj[key]) {
//         keyValuePairs.push(
//           encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
//         );
//       }
//     }
//     return keyValuePairs.length > 0 ? '?' + keyValuePairs.join('&') : '';
//   }
//   return '';
// };



// export const get = async ({url, data}) => {
//   let headers = {
//     ...JSON_HEADER,
//   };
//   const userToken = await AsyncStorage.getItem('userToken');
//   const isConnected = await isNetworkAvailable();
//   if (isConnected === false) {
//     return INTERNET_FAILED;
//   }
//   let params = {
//     method: kGet,
//     headers: {
//       ...JSON_HEADER,
//       ...(global.userToken && {
//         Authorization: 'Bearer ' + userToken,
//         user_type: USER_TYPE,
//       }),
//     },
//   };
//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers,
//   };
//   let apiUrl = BASE_URL + url + objToQueryString(data);
//   console.log('Api url------', apiUrl);
//   console.log('Api params-------', requestOptions);

//   try {
//     let status = 200;
//     const response = await fetch(apiUrl, requestOptions);
//     status = response.status;
//     const json = await response.json();
//     json.status = json.Success === false ? kErrorCode : status;
//     // console.log('Api response----------------------', json);

//     // if (json.status == 404) {
//     //     Helper.logout(true)
//     //     return json
//     // }
//     return json;
//   } catch (error) {
//     console.log('Api Failed-------', error);
//     return API_FAILED;
//   } finally {
//     // console.log('Api finally----------------------');
//   }
// };

// export const del = async ({url, data}) => {
//   let params = {
//     method: kDel,
//     headers: {
//       ...JSON_HEADER,
//       ...(global.userToken && {
//         Authorization: 'Bearer ' + global.userToken,
//         user_type: USER_TYPE,
//       }),
//     },
//   };
//   let apiUrl = BASE_URL + url + objToQueryString(data);
//   console.log('Api url-------', apiUrl);
//   console.log('Api params-------', params);

//   try {
//     let status = 200;
//     const response = await fetch(apiUrl, params);
//     status = response.status;
//     const json = await response.json();
//     json.status = json.errorcode != 0 ? kErrorCode : status;
//     console.log('Api response-------', json);

//     // if (json.status == 404) {
//     //     Helper.logout(true)
//     //     return json
//     // }
//     return json;
//   } catch (error) {
//     console.log(
//       'Api Failed----------',
//       error,
//       '------------' + url,
//     );
//     return API_FAILED;
//   } finally {
//     //console.log('Api finally----------------------');
//   }
// };
