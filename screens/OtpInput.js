import React from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { StyleSheet, Text } from "react-native";


const OtpInput = ({ value, setValue, style }) => {
    const CELL_COUNT = 6;
      const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
      const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, style, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  codeFieldRoot: {
    justifyContent: "space-between",
    width: "96%",
    marginBottom: 15,
    verticalAlign: "middle"
  },
  cell: {
    width: "12%",
    borderWidth: 1,
    borderColor: "#7d5ffe",
    textAlign: "center",
    color: "#7d5ffe",
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    fontFamily: "Poppins-Bold",
    height:50,
    marginLeft:10
  },
  focusCell: {
    borderWidth: 2,
    borderColor: "#7d5ffe",
  },
});

export default OtpInput;
