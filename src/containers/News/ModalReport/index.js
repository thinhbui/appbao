import React, { PureComponent } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Platform,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { saveUserData } from '../../../actions';
import * as d from '../../../utilities/transform';
import { getReportTypes, reportPost } from '../../../services/newsAPI';
import { DialogBox } from '../../../components';
import styles from './styles';
import { Fonts } from '../../../constants';

const avatar = 'https://picsum.photos/200/200';

class ModalReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      onChoose: [],
    };
  }

  componentDidMount() {
    this.onGetReportTypes();
  }
  onGetReportTypes = async () => {
    const result = await getReportTypes();
    if (result.status === 200) {
      this.setState({ reports: result.data });
    } else {
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, xin vui lòng thử lại');
    }
  };

  onChooseReportTypes = (index) => {
    const { onChoose } = this.state;
    let arr = [...onChoose];
    const i = onChoose.findIndex(e => e === index + 1);
    if (i === -1) {
      arr = [...arr, index + 1];
    } else {
      arr.splice(i, 1);
    }
    this.setState({ onChoose: arr });
  };

  render() {
    const {
      visible, onRef, onClose, onShow, onAccept, reportTitle, reportImage,
    } = this.props;
    const { reports, onChoose } = this.state;
    return (
      <Modal
        style={styles.modalContainer}
        visible={visible}
        onRequestClose={() => {}}
        onShow={onShow}
        transparent
      >
        <DialogBox
          onRef={onRef}
          onClose={() => {
            onClose();
            this.setState({ onChoose: [] });
          }}
        >
          <View style={styles.reportHeaderContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="ios-alert-outline" size={20 * d.ratioW} color="#159193" />
              <Text style={styles.hidePostTextStyle}>Ẩn bài viết</Text>
            </View>
            <Icon
              name="ios-close"
              size={30 * d.ratioW}
              color="#BDBDBD"
              onPress={() => {
                onClose();
                this.setState({ onChoose: [] });
              }}
            />
          </View>
          <View style={styles.postDetailContainer}>
            <Text style={styles.postTitleStyle} ellipsizeMode="tail" numberOfLines={2}>
              {reportTitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </Text>
            <Image
              source={{ uri: reportImage || 'https://picsum.photos/200/200' }}
              style={styles.postImageStyle}
            />
          </View>
          <View style={styles.reportContainer}>
            <Text style={styles.descriptionStyle}>
              Vui lòng chọn các nguyên nhân khiến bạn không thích bài viết này để chúng tôi có thể
              đề xuất tin cho bạn tốt hơn
            </Text>
            <View style={styles.reportsButtonContainer}>
              {reports.map((e, i) => (
                <TouchableOpacity
                  style={[
                    styles.reportButtonStyle,
                    {
                      borderColor:
                        onChoose.findIndex(item => item === i + 1) !== -1
                          ? '#C21E2B'
                          : 'rgba(0,0,0,0.3)',
                    },
                  ]}
                  key={i.toString()}
                  onPress={() => this.onChooseReportTypes(i)}
                >
                  <Text
                    style={{
                      fontSize: 13 * d.ratioW,
                      fontFamily: Fonts.regular,
                      color:
                        onChoose.findIndex(item => item === i + 1) !== -1
                          ? '#C21E2B'
                          : 'rgba(0,0,0,0.3)',
                    }}
                  >
                    + {e.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.acceptButtonContainer}
            onPress={() => {
              onAccept(onChoose);
              this.setState({ onChoose: [] });
            }}
          >
            <Text style={styles.acceptButtonStyle}>Xác nhận</Text>
          </TouchableOpacity>
        </DialogBox>
      </Modal>
    );
  }
}

ModalReport.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.any.isRequired,
  // onLogInGG: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired,
  reportTitle: PropTypes.string.isRequired,
  reportImage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalReport);
