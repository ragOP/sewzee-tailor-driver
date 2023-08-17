import messaging from '@react-native-firebase/messaging';

// Request permission for receiving notifications
messaging().requestPermission()
  .then(() => {
    console.log('Notification permission granted');
  })
  .catch((error) => {
    console.log('Notification permission rejected', error);
  });

// Get the FCM token
messaging().getToken()
  .then((token) => {
    console.log('FCM Token:', token);
    // You can send this token to your server to send push notifications
  })
  .catch((error) => {
    console.log('Error fetching FCM token', error);
  });

// Listen for FCM token refreshes
const unsubscribe = messaging().onTokenRefresh((token) => {
  console.log('FCM Token Refreshed:', token);
  // You may want to send the new token to your server
});

// Remember to unsubscribe from the listener when your component unmounts
// For example, in a class component, you can use componentWillUnmount():
componentWillUnmount() {
  unsubscribe();
}
