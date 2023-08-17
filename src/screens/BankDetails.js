import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
const BankDetails = () => {
    const [bankData, setBankData] = useState({
        accountNo: '',
      ifscCode: '',
      bankBranchName: '',
      bankAddres: '',
      upi: '',
    });

  
    return (
      <View contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bank Details</Text>
  
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Account No*"
            value={bankData.accountNo}
            onChangeText={(text) =>
              setBankData({ ...bankData, accountNo: text })
            }
            required={true}
          />
  
          <TextInput
            style={styles.input}
            placeholder="IFSC Code *"
            value={bankData.ifscCode}
            onChangeText={(text) =>
                setBankData({ ...bankData, ifscCode: text })
            }
            required={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Branch Name*"
            value={bankData.bankBranchName}
            onChangeText={(text) =>
                setBankData({ ...bankData, bankBranchName: text })
            }
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Branch Address*"
            value={bankData.bankAddres}
            onChangeText={(text) =>
                setBankData({ ...bankData, bankAddres: text })
            }
          />
 <TextInput
            style={styles.input}
            placeholder="Enter your UPI Id"
            value={bankData.upi}
            onChangeText={(text) =>
                setBankData({ ...bankData, upi: text })
            }
          />
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
      marginLeft:130
    },
    formContainer: {
      width: '96%',
    },
    input: {
      width:'96%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      marginLeft:15,
    },
  
  });
  
  export default BankDetails;
  