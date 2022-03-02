import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {BLACK} from './colors';

interface TextCustomProps {
  style?: TextStyle;
  children?: string;
  props?: TextProps;
}

const TextRegular = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textRegular, props.style]}>
      {props.children}
    </Text>
  );
};

const TextItalic = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textItalic, props.style]}>
      {props.children}
    </Text>
  );
};

const TextBold = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textBold, props.style]}>
      {props.children}
    </Text>
  );
};

const TextBoldItalic = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textBoldItalic, props.style]}>
      {props.children}
    </Text>
  );
};

export {TextRegular, TextItalic, TextBold, TextBoldItalic};

const styles = StyleSheet.create({
  textRegular: {
    color: BLACK,
  },
  textBold: {
    color: BLACK,
    fontWeight: 'bold',
  },
  textItalic: {
    color: BLACK,
    fontStyle: 'italic',
  },
  textBoldItalic: {
    color: BLACK,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
