import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {BLACK, GREY1, GREY2} from 'styles/colors';

interface InputProp {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode | boolean;
  props?: TextInputProps;
  placeholder?: string;
  placeholderTextColor?: typeof GREY2 | string;
  value: string;
  onChangeText: (event: string) => void;
}

const Input = (props: InputProp) => {
  const {
    iconLeft,
    iconRight,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
  } = props;
  return (
    <View style={styles.container}>
      {iconLeft}
      <TextInput
        {...props}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />
      {iconRight}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: GREY1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: BLACK,
  },
});

Input.propTypes = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.any,
};
