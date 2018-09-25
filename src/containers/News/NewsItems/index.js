import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, ToastAndroid, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { XmlEntities } from 'html-entities';
import * as d from '../../../utilities/transform';
import styles from './styles';
import { like } from '../../../services/newsAPI';
import { Fonts } from '../../../constants';

class NewsItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked:
        !this.props.item.ads_position_id &&
        this.props.user.data &&
        this.props.item.post_like &&
        this.props.item.post_like.findIndex(item => item.user_id === this.props.user.data.id) !==
          -1,
      item: this.props.item,
      visible: false,
    };
  }

  componentDidMount() {}

  onRenderTitle = () => {
    const { item } = this.props;

    const entities = new XmlEntities();

    if ((item.post_image && item.post_image.length < 3) || item.ads_position_id) {
      return (
        <View style={[styles.titleContainer, { backgroundColor: '#FFF' }]}>
          <View
            style={{
              borderBottomColor: 'rgba(0,0,0,0.1)',
              borderBottomWidth: 0.5,
              flexDirection: 'row',
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image || 'https://picsum.photos/200/200' }}
                style={styles.image}
              />
            </View>
            <View>
              <Text
                style={styles.titleTextStyle}
                numberOfLines={3}
                ellipsizeMode="tail"
                textAlign="justify"
              >
                {entities.decode(item.title)}
              </Text>
              {item.ads_position_id ? (
                <View style={styles.cardContainer}>
                  <View style={styles.state}>
                    <View style={styles.adsState}>
                      <Text
                        style={{
                          fontFamily: Fonts.regular,
                          fontSize: 11 * d.ratioW,
                          color: '#BDBDBD',
                        }}
                      >
                        Tài trợ
                      </Text>
                    </View>
                    <Text style={styles.sponsorText}>{item.sponsor_name}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.cardContainer}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: Fonts.regular,
                        color: '#BDBDBD',
                        fontSize: 12 * d.ratioW,
                      }}
                    >
                      {item.crawl_frame !== null ? item.crawl_frame.name : ''}
                      {this.getTime()}
                      {this.onRenderCommentQuantity()}
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                onPress={this.props.onReport}
                style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 12 * d.ratioH }}
              >
                <Icon name="x-square" size={12 * d.ratioW} color="#BDBDBD" style={{ margin: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ marginTop: 8 * d.ratioH, backgroundColor: '#FFF' }}>
        <View style={{ borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 0.7 }}>
          <View style={styles.title3ImagesContainer}>
            <Text style={styles.titleText2Style} numberOfLines={2} ellipsizeMode="tail">
              {entities.decode(item.title)}
            </Text>
            <View style={styles.imagesContainer}>
              <Image source={{ uri: item.post_image[0].url }} style={styles.image2} />
              <Image source={{ uri: item.post_image[1].url }} style={styles.image2} />
              <Image source={{ uri: item.post_image[2].url }} style={styles.image2} />
            </View>
          </View>
          <View style={[styles.footer]}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: '#BDBDBD',
                  fontSize: 12 * d.ratioW,
                }}
              >
                {item.crawl_frame !== null ? item.crawl_frame.name : ''}
                {this.getTime()}
                {this.onRenderCommentQuantity()}
              </Text>
            </View>
            <TouchableOpacity onPress={this.props.onReport}>
              <Icon name="x-square" size={12 * d.ratioW} color="#BDBDBD" style={{ margin: 5 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  onRenderCommentQuantity = () => {
    if (this.props.item.postComment && this.props.item.postComment !== 0) {
      return (
        // <View style={{ flexDirection: 'row', marginBottom: -3 * d.ratioH }}>
        <Text style={{ fontFamily: Fonts.regular, fontSize: 12 * d.ratioW, color: '#BDBDBD' }}>
          {' • '}
          {this.props.item.postComment}
          {'  '}
          <Icon name="message-square" size={12 * d.ratioW} color="#BDBDBD" />
        </Text>
        // </View>
      );
    }
    return null;
  };

  onLike = () => {
    const { item } = this.state;
    if (!this.state.isLiked) {
      like(this.props.item.id).then((res) => {
        console.log('Like ', res);
        if (res.status === 200) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Đã thích', ToastAndroid.SHORT);
          }
          if (res.data === true) this.setState({ isLiked: true });
          item.postLike += 1;
        }
        this.setState({ item });
      });
    }
  };
  onPress = () => {
    if (!this.props.item.ads_position_id) {
      this.props.navigation.navigate('NewsDetail', {
        item: this.props.item,
      });
    } else {
      console.log('onPress', this.props.item.url);

      this.props.navigation.navigate('Ads', { url: this.props.item.url });
    }
  };

  getTime = () => {
    const createdAt = this.props.item.created_at;
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
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        {this.onRenderTitle()}

        {/* <View style={styles.card} /> */}
      </TouchableOpacity>
    );
  }
}

NewsItems.propTypes = {
  url: PropTypes.string,
  item: PropTypes.object.isRequired,
  image: PropTypes.string,
  onReport: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  level: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
  level: state.levelReducers,
});

export default connect(
  mapStateToProps,
  null,
)(withNavigation(NewsItems));
