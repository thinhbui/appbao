import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import VideoPlayer from 'react-native-video-controls';
import * as d from '../../../utilities/transform';
import styles from './styles';

const HEIGHT = (d.windowSize.width - d.windowSize.width * 0.06) * 0.75;

class VideoItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
    };
  }

  getTime = (item) => {
    const createdAt = item.created_at;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const duration = moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds');
    const minute = 3600;
    const hour = 86400;
    if (duration < 60) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds')} giây`;
    } else if (duration < minute) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'minutes')} phút`;
    } else if (duration > minute && duration < hour) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'hours')} giờ`;
    }
    return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'days')} ngày`;
  };

  render() {
    const { item, isFocus } = this.props;
    const { init } = this.state;
    return (
      <View style={{ height: d.windowSize.height * 0.6 }}>
        {!isFocus && (
          <Icon
            name="play"
            size={35}
            color="#FFF"
            style={{
              position: 'absolute',
              alignSelf: 'center',
              marginTop: HEIGHT / 2,
              elevation: 1,
            }}
          />
        )}
        {isFocus || init ? (
          <View>
            <VideoPlayer
              onLayout={() => this.setState({ init: true })}
              source={{
                uri: item.youtube,
              }}
              ref={(player) => {
                this.player = player;
              }}
              paused={!isFocus}
              // showOnStart={id === index}
              disableBack
              disableVolume
              style={{ height: HEIGHT, width: '100%' }}
              onEnd={() => {
                this.props.onEnd();
              }}
              repeat
            />
          </View>
        ) : (
          <Image
            source={{
              uri: item.image || 'https://picsum.photos/200/200',
            }}
            style={styles.thumbnailStyle}
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.titleStyle} numberOfLines={3} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.frameStyle}>
            {item.crawl_frame ? item.crawl_frame.name : ''}
            {this.getTime(item)}
          </Text>
          <TouchableOpacity
            style={styles.commentWrapper}
            activeOpacity={1}
            onPress={() => this.props.navigation.navigate('CommentVideo', { item })}
          >
            <View style={styles.commentPartContainer}>
              <Image source={{ uri: this.props.user.data.avatar }} style={styles.avatarStyle} />
              <Text style={styles.commentTextStyle}>Nhập bình luận...</Text>
            </View>
            <View style={styles.commentPartContainer}>
              <View style={styles.commentContainer1}>
                {item.comment.length > 0 && (
                  <View style={styles.commentQuantity}>
                    <Text style={styles.cmt}>{item.comment.length}</Text>
                  </View>
                )}
                <Icons name="bubble" size={18} color="#BDBDBD" />
              </View>
              <View style={styles.commentContainer}>
                <Icons
                  name="share-alt"
                  size={18}
                  color="#BDBDBD"
                  style={{ bottom: 1 * d.ratioH, marginRight: 5 * d.ratioW }}
                />
                <Text style={styles.itemText}>Chia sẻ</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {!isFocus && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: d.windowSize.height * 0.6,
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}
          />
        )}
      </View>
    );
  }
}

VideoItem.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  onEnd: PropTypes.func.isRequired,
  isFocus: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(VideoItem);
