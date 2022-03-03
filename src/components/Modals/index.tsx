import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {WHITE} from 'styles/colors';

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
}

const Modals = (props: ModalProps) => {
  const {isVisible, children, onBackButtonPress, onBackdropPress} = props;
  return (
    <Modal
      isVisible={isVisible}
      hideModalContentWhileAnimating
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      useNativeDriver>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
