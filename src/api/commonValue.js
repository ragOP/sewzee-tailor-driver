const BASE_URL = 'https://sewzee.onrender.com/api/'; 
const ABOUT_PAGE = 'HOme/AboutApi';
const PRIVACY_POLICY = 'HOme/PrivacyPolicyApi';
const FAQ = 'HOme/FAQApi';
const TandC_PAGE = '/HOme/TermsandConditionsApi?privacypolicy=2&IsShowHeader=1';

const USER_TYPE = 1; //'Patients'
const APP_NAME = 'KayaWell';
const GOOGLE_PLACE_KEY = 'AIzaSyDHcmiduScZm3pGCDheCN9t61qZwZzGLH8';

const kInternetError = "You're offline \n Please check internet connection.";
const kSorryError = 'Sorry, something went wrong.';
const kRegistrationMsg =
  'Your registration is successful. We have sent an email with a confirmation link to your email address. In order to complete the registration process, please click the confirmation link.';
const kLogout = 'Are you sure you want to logout?';

//languageCode
const EnglishCode = 'English';
const HindiCode = 'हिन्दी';

//Constant value
const med_strength_length = 3;

const kStatus = 'status';
const kMessage = 'message';
const kTrue = 200;
const kErrorCode = 500;
const kUserNotFound = 404;
const kFalse = 'false';
const kPost = 'post';
const kGet = 'get';
const kDel = 'DELETE';
const kUserToken = 'user_token';
const kUserData = 'user_data';
const kUserRole = 'user_role';
const kPatientRoleId = '1';
const kDoctorRoleId = '2';
const kUserNotificationData = 'UserNotificationInfo';
const kReminderNotification = 'ReminderNotification';

const JSON_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const MULTI_PART_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};
const API_FAILED = {
  status: 'false',
  message: kSorryError,
};
const INTERNET_FAILED = {
  status: 'false',
  message: kInternetError,
};

const durationArr = [
  {id: '15', label: '15 Min', value: '15'},
  {id: '30', label: '30 Min', value: '30'},
  {id: '45', label: '45 Min', value: '45'},
  {id: '1', label: '1 Hour', value: '1'},
  {id: '1.15', label: '1.15 Hours', value: '1.15'},
  {id: '1.30', label: '1.30 Hours', value: '1.30'},
  {id: '1.45', label: '1.45 Hours', value: '1.45'},
  {id: '2', label: '2 Hours', value: '2'},
]


const time = [
  {id: '0:00', label: '0:00', value: '00:00'},
  {id: '0:30', label: '0:30', value: '00:30'},
  {id: '1:00', label: '1:00', value: '01:00'},
  {id: '1:30', label: '1:30', value: '01:30'},
  {id: '2:00', label: '2:00', value: '02:00'},
  {id: '2:30', label: '2:30', value: '02:30'},
  {id: '3:00', label: '3:00', value: '03:00'},
  {id: '3:30', label: '3:30', value: '03:30'},
  {id: '4:00', label: '4:00', value: '04:00'},
  {id: '4:30', label: '4:30', value: '04:30'},
  {id: '5:00', label: '5:00', value: '05:00'},
  {id: '5:30', label: '5:30', value: '05:30'},
  {id: '6:00', label: '6:00', value: '06:00'},
  {id: '6:30', label: '6:30', value: '06:30'},
  {id: '7:00', label: '7:00', value: '07:00'},
  {id: '7:30', label: '7:30', value: '07:30'},
  {id: '8:00', label: '8:00', value: '08:00'},
  {id: '8:30', label: '8:30', value: '08:30'},
  {id: '9:00', label: '9:00', value: '09:00'},
  {id: '9:30', label: '9:30', value: '09:30'},
  {id: '10:00', label: '10:00', value: '10:00'},
  {id: '10:30', label: '10:30', value: '10:30'},
  {id: '11:00', label: '11:00', value: '11:00'},
  {id: '11:30', label: '11:30', value: '11:30'},
  {id: '12:00', label: '12:00', value: '12:00'},
  {id: '12:30', label: '12:30', value: '12:30'},
  {id: '13:00', label: '13:00', value: '13:00'},
  {id: '13:30', label: '13:30', value: '13:30'},
  {id: '14:00', label: '14:00', value: '14:00'},
  {id: '14:30', label: '14:30', value: '14:30'},
  {id: '15:00', label: '15:00', value: '15:00'},
  {id: '15:30', label: '15:30', value: '15:30'},
  {id: '16:00', label: '16:00', value: '16:00'},
  {id: '16:30', label: '16:30', value: '16:30'},
  {id: '17:00', label: '17:00', value: '17:00'},
  {id: '17:30', label: '17:30', value: '17:30'},
  {id: '18:00', label: '18:00', value: '18:00'},
  {id: '18:30', label: '18:30', value: '18:30'},
  {id: '19:00', label: '19:00', value: '19:00'},
  {id: '19:30', label: '19:30', value: '19:30'},
  {id: '20:00', label: '20:00', value: '20:00'},
  {id: '20:30', label: '20:30', value: '20:30'},
  {id: '21:00', label: '21:00', value: '21:00'},
  {id: '21:30', label: '21:30', value: '21:30'},
  {id: '22:00', label: '22:00', value: '22:00'},
  {id: '22:30', label: '22:30', value: '22:30'},
  {id: '23:00', label: '23:00', value: '23:00'},
  {id: '23:30', label: '23:30', value: '23:30'},
];

export {
  BASE_URL,
  USER_TYPE,
  JSON_HEADER,
  MULTI_PART_HEADER,
  INTERNET_FAILED,
  API_FAILED,
  kStatus,
  kTrue,
  kFalse,
  kMessage,
  kInternetError,
  kSorryError,
  kPost,
  kGet,
  kDel,
  kUserData,
  kErrorCode,
  kUserNotFound,
  kUserToken,
  APP_NAME,
  kRegistrationMsg,
  kLogout,
  kUserNotificationData,
  kReminderNotification,
  GOOGLE_PLACE_KEY,
  EnglishCode,
  HindiCode,
  med_strength_length,
  ABOUT_PAGE,
  PRIVACY_POLICY,
  FAQ,
  TandC_PAGE,
  kUserRole,
  kPatientRoleId,
  kDoctorRoleId,
  time,
  durationArr
};
