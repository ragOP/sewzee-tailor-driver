import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = ({ from, to, onFromChange, onToChange }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleFromChange = (selectedDate) => {
    onFromChange(selectedDate);
    setOpenFrom(false);
  };

  const handleToChange = (selectedDate) => {
    onToChange(selectedDate);
    setOpenTo(false);
  };

  return (
    <View>
      <View>
        <Text>From Date: {from.toDateString()}</Text>
        <Button title="Select From Date" onPress={() => setOpenFrom(true)} />
        {openFrom && (
          <DatePicker
            modal
            date={from}
            onDateChange={handleFromChange}
            onCancel={() => setOpenFrom(false)}
          />
        )}
      </View>
      <View>
        <Text>To Date: {to.toDateString()}</Text>
        <Button title="Select To Date" onPress={() => setOpenTo(true)} />
        {openTo && (
          <DatePicker
            modal
            date={to}
            onDateChange={handleToChange}
            onCancel={() => setOpenTo(false)}
          />
        )}
      </View>
    </View>
  );
};

export default DateTimePicker;
