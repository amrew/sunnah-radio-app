// @flow
import * as React from 'react';
import {View} from 'react-native';
import ModalNative from 'react-native-modal';

type Props = {
  children: React.Node,
  isModalVisible: boolean,
  closeModal: () => any,
};

type States = {};

class Modal extends React.Component<Props, States> {
  render() {
    const modalProps = {
      ...this.props,
      isVisible: this.props.isModalVisible,
      onBackdropPress: () => {
        this.props.closeModal();
      },
    };

    return <ModalNative {...modalProps} />;
  }
}

export default Modal;
