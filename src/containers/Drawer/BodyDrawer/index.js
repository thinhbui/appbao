import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
// import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerButton } from '../../../components';
import styles from './styles';
import * as d from '../../../utilities/transform';

class BodyDrawer extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={styles.firstBodyContainer}>
          <TouchableOpacity>
            <IconAwesome name="star" color="#F75A5C" size={22} style={styles.iconFirstBodyStyle} />
            <Text style={{ fontSize: 12 }}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-time" color="#FC9F50" size={22} style={styles.iconFirstBodyStyle} />
            <Text style={{ fontSize: 12 }}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-moon" color="#29AAF6" size={22} style={styles.iconFirstBodyStyle} />
            <Text style={{ fontSize: 12 }}>Ban đêm</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.secondBodyContainer}>
          <DrawerButton
            icon={
              <Icon
                name="ios-time"
                color="#FC9F50"
                size={20 * d.ratioW}
                style={{ marginHorizontal: 2 * d.ratioW }}
              />
            }
            text="Lịch sử"
            onPress={() => navigation.navigate('History')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
        </View>
        <View style={styles.secondBodyContainer}>
          <DrawerButton
            icon={<IconSimple name="bell" size={20 * d.ratioW} color="#98C8F3" />}
            text="Thông báo"
            onPress={() => navigation.navigate('Notification')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
          <DrawerButton
            icon={<IconSimple name="bubble" size={20 * d.ratioW} color="#207DAE" />}
            text="Bình luận của tôi"
            onPress={() => navigation.navigate('MyComment')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
        </View>
        <View style={styles.secondBodyContainer}>
          <DrawerButton
            icon={<IconSimple name="wallet" size={20 * d.ratioW} color="#F36F45" />}
            text="Ví tiền"
            onPress={() => navigation.navigate('Wallet')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
          <IconSimple
            name="present"
            size={20 * d.ratioW}
            color="#EC545C"
            style={styles.giftIconStyle}
          />
          <DrawerButton
            icon={<IconMaterial name="ticket-confirmation" size={22 * d.ratioW} color="#EED158" />}
            text="Xổ số"
            onPress={() => navigation.navigate('Lotery')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
        </View>
        <View style={styles.secondBodyContainer}>
          <DrawerButton
            icon={<IconSimple name="info" size={20 * d.ratioW} color="#3AB152" />}
            text="Phản hồi"
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
          <DrawerButton
            icon={<IconSimple name="settings" size={20 * d.ratioW} color="#757575" />}
            text="Cài đặt"
            onPress={() => navigation.navigate('Setting')}
            customContainerStyle={{ marginVertical: 5 * d.ratioH }}
          />
        </View>
      </View>
    );
  }
}

BodyDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default BodyDrawer;
