//DRIVER
const LOGIN_DRIVER = 'auth/driverLogin';
const DRIVER_ADD_DETAILS = 'auth/driverAdd'; 
const DRIVER_GET_PROFILE = 'driver/';
// const DRIVER_GET_ORDER_BY_ID = 'driver/order/';  
const DRIVER_GET_ONGOING_ORDERS = 'driver/request/ongoing';
const DRIVER_GET_PENDING_ORDERS = 'driver/request/pending';
const DRIVER_MANAGE_ORDERS = 'driver/request/';
// const DRIVER_GET_COMPLETED_ORDERS = 'driver/order/completed';
// const DRIVER_GET_REJECTED_ORDERS = 'driver/order/rejected';
const DRIVER_CLOCK_IN = 'driver/clockin';
const DRIVER_CLOCK_OUT = 'driver/clockout'; 
const DRIVER_ACTIVE_HOURS = 'driver/activeHours';   
const DRIVER_UPDATE_BANK = 'driver/bank'; 
const DRIVER_UPDATE_PROFILE = 'driver/profile';  


//TAILOR
const LOGIN_TAILOR = 'auth/tailorLogin';
const TAILOR_ADD_DETAILS = 'auth/tailorAdd'; 
const TAILOR_GET_PROFILE = 'tailor/';
const TAILOR_GET_ORDER_BY_ID = 'tailor/order/';  
const TAILOR_GET_ONGOING_ORDERS = 'tailor/order/ongoing';
const TAILOR_GET_PENDING_ORDERS = 'tailor/order/pending';
const TAILOR_GET_COMPLETED_ORDERS = 'tailor/order/completed';
const TAILOR_GET_REJECTED_ORDERS = 'tailor/order/rejected';
const TAILOR_CLOCK_IN = 'tailor/clockin';
const TAILOR_CLOCK_OUT = 'tailor/clockout'; 
const TAILOR_ACTIVE_HOURS = 'tailor/activeHours'; 
const TAILOR_UPDATE_BANK = 'tailor/update/bank'; 
const TAILOR_UPDATE_PROFILE = 'tailor/update/profile';  
  // TAILOR CUSTOM
const TAILOR_GET_MEN_CATEGORY = 'tailor/category?type=Men';
const TAILOR_GET_WOMEN_CATEGORY = 'tailor/category?type=Women';
const TAILOR_GET_BOTH_CATEGORY = 'tailor/category';
const TAILOR_GET_SUB_CATEGORY = 'tailor/subcategory?category=';
const TAILOR_GET_MY_PRICES = 'tailor/price';
const TAILOR_POST_ADD_PRICES = 'tailor/price/';
//Master API



export {
  LOGIN_DRIVER,
  DRIVER_ADD_DETAILS,
  LOGIN_TAILOR,
  TAILOR_ADD_DETAILS,
  TAILOR_GET_PROFILE,
  TAILOR_GET_ORDER_BY_ID,
  TAILOR_GET_ONGOING_ORDERS,
  TAILOR_GET_COMPLETED_ORDERS,
  TAILOR_GET_PENDING_ORDERS,
  TAILOR_GET_REJECTED_ORDERS,
  TAILOR_CLOCK_IN,
  TAILOR_CLOCK_OUT,
  TAILOR_ACTIVE_HOURS,
  TAILOR_UPDATE_BANK,
  TAILOR_UPDATE_PROFILE,
  DRIVER_GET_PROFILE,
  DRIVER_CLOCK_IN,
  DRIVER_CLOCK_OUT,
  DRIVER_ACTIVE_HOURS,
  DRIVER_UPDATE_BANK,
  DRIVER_UPDATE_PROFILE,
  // DRIVER_GET_ORDER_BY_ID,
  DRIVER_GET_ONGOING_ORDERS,
  DRIVER_GET_PENDING_ORDERS,
  DRIVER_MANAGE_ORDERS,
  // DRIVER_GET_COMPLETED_ORDERS,
  // DRIVER_GET_REJECTED_ORDERS,
  TAILOR_GET_MEN_CATEGORY,
  TAILOR_GET_WOMEN_CATEGORY,
  TAILOR_GET_BOTH_CATEGORY,
  TAILOR_GET_SUB_CATEGORY,
  // TAILOR_GET_CUSTOMIZATIONS,
  TAILOR_GET_MY_PRICES,
  TAILOR_POST_ADD_PRICES
};
