import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { XmlEntities } from 'html-entities';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styles from './styles';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const entities = new XmlEntities();

const getTime = (item) => {
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

const onRenderCommentQuantity = (item) => {
  if (item.postComment && item.postComment !== 0) {
    return (
      // <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 12 * d.ratioW, color: '#BDBDBD', fontFamily: Fonts.regular }}>
        {' • '}
        {item.postComment}
        <Icon name="message-square" size={12 * d.ratioW} color="#BDBDBD" />
      </Text>
      // </View>
    );
  }
  return null;
};

const Suggestion = ({
  onPress, item, titleFontSize, footerFontSize,
}) =>
  (item ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image || 'https://picsum.photos/200/200' }} style={styles.image} />
      <View>
        <Text
          style={[styles.title, { fontSize: titleFontSize }]}
          numberOfLines={3}
          ellipsizeMode="tail"
          textAlign="justify"
        >
          {entities.decode(item.title)}
        </Text>
        <View style={styles.cardContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#BDBDBD', fontSize: footerFontSize }}>
              {item.crawl_frame && item.crawl_frame.name}
              {getTime(item)}
              {onRenderCommentQuantity(item)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            bottom: 8 * d.ratioH,
            right: 20 * d.ratioW,
          }}
        >
          <Icon name="x-square" size={12 * d.ratioW} color="#BDBDBD" style={{ margin: 5 }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : null);

Suggestion.propTypes = {
  onPress: PropTypes.func, // eslint-disable-line
  item: PropTypes.object.isRequired,
  titleFontSize: PropTypes.number,
  footerFontSize: PropTypes.number,
};

Suggestion.defaultProps = {
  onPress: () => {},
  titleFontSize: 17 * d.ratioW,
  footerFontSize: 12 * d.ratioW,
};

export default Suggestion;
