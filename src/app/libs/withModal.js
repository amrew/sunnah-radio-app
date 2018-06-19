// @flow
import * as React from 'react';
import Modal from '../uikit/Modal';
import hoistNonReactStatics from 'hoist-non-react-statics';

export type ModalProps = {
  show: (childrenNode: React.Node, modalConfig?: {}) => any,
  close: (onClosed?: () => any) => any,
};

const defaultModalConfig = {
  animationIn: 'fadeInUp',
  animationOut: 'fadeOutDown',
  style: {padding: 0, margin: 0},
};

const withModal = (Component: any): any => {
  type Props = {};

  type States = {
    isModalVisible: boolean,
    childrenNode: null | React.Node,
    modalConfig: {},
  };

  class ComponentWithModal extends React.Component<Props, States> {
    state = {
      isModalVisible: false,
      childrenNode: null,
      modalConfig: defaultModalConfig,
    };

    showModal = () => {
      this.setState({isModalVisible: true});
    };

    closeModal = () => {
      this.setState({isModalVisible: false});
    };

    render() {
      const {isModalVisible, childrenNode, modalConfig} = this.state;
      const modalApi = {
        show: (childrenNode: React.Node, modalConfig: {}) => {
          this.setState({
            childrenNode,
            modalConfig: {
              ...this.state.modalConfig,
              ...modalConfig,
            },
            isModalVisible: true,
          });
        },
        close: onClosed => {
          const {isModalVisible} = this.state;
          if (isModalVisible) {
            this.closeModal();
            this.setState({
              modalConfig: {
                ...this.state.modalConfig,
                onModalHide: onClosed,
              },
            });
          } else {
            onClosed && onClosed();
            this.setState({
              modalConfig: defaultModalConfig,
            });
          }
        },
      };
      return (
        <React.Fragment>
          <Component modal={modalApi} {...this.props} />
          {childrenNode ? (
            <Modal
              isModalVisible={isModalVisible}
              showModal={this.showModal}
              closeModal={this.closeModal}
              {...modalConfig}>
              {childrenNode}
            </Modal>
          ) : null}
        </React.Fragment>
      );
    }
  }

  return hoistNonReactStatics(ComponentWithModal, Component);
};

export default withModal;
