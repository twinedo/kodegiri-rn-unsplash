import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextBold} from 'styles/text-styles';
import PropTypes from 'prop-types';

interface ToolbarProps {
  text?: string;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
}

const Toolbar = (props: ToolbarProps) => {
  const {text, prefix, postfix} = props;
  return (
    <View style={styles.container}>
      <View style={styles.prepos}>{prefix}</View>
      <View style={styles.middle}>
        <TextBold style={styles.text}>{text}</TextBold>
      </View>
      <View style={styles.prepos}>{postfix}</View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
  },
  middle: {
    flex: 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  prepos: {
    flex: 0.5,

    alignItems: 'center',
  },
});

Toolbar.propTypes = {
  text: PropTypes.string,
  prefix: PropTypes.element,
  postfix: PropTypes.element,
};
