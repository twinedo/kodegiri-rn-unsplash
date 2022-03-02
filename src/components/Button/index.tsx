import {Pressable, StyleSheet, Text} from 'react-native';
import React, {ReactNode} from 'react';
import {GREEN2} from 'styles/colors';
import {WHITE} from 'styles/colors';

interface ButtonProps {
  text: string;
  prefix?: ReactNode;
  postfix?: ReactNode;
  width?: number;
}

const Button = (props: ButtonProps) => {
  const {text, prefix, postfix, width} = props;
  return (
    <Pressable style={[styles.container, {width}]}>
      {prefix}
      <Text style={styles.text}>{text}</Text>
      {postfix}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREEN2,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 18,
  },
});
