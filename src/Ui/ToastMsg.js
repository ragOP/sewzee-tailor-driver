import {showMessage, hideMessage} from 'react-native-flash-message';

export const ToastMsg = (message, type) => {
  showMessage({
    message: message,
    type: type ? type : 'danger', //'danger', 'success', 'info','warning'
  });
};
