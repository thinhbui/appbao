import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import VideoPlayer from 'react-native-video-controls';
import * as d from '../../../utilities/transform';
import styles from './styles';
import { Fonts } from '../../../constants';

const HEIGHT = (d.windowSize.width - d.windowSize.width * 0.06) * 0.75;

class VideoItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      refresh: true,
    };
  }
  render() {
    const { item, isFocus } = this.props;
    const { init, refresh } = this.state;
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
                uri: item.snippet.url,
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
              uri: item.snippet.thumbnails.high.url,
            }}
            style={{
              width: '100%',
              height: HEIGHT,
            }}
          />
        )}
        <Text style={{ fontFamily: Fonts.regular, color: '#fff', fontSize: 16 }}>
          {item.snippet.title}
        </Text>
        <View>
          <Text style={{ color: '#fff' }}>{item.channelTitle}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: Fonts.regular, fontSize: 11 * d.ratioW, color: '#BDBDBD' }}>
            {item.snippet.channelTitle}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.commentText}>{item.statistics.commentCount}</Text>
            <Icon
              name="message-square"
              size={15 * d.ratioW}
              color="#BDBDBD"
              style={{ marginLeft: 5 * d.ratioW }}
            />
            <Icon
              name="share-2"
              size={15 * d.ratioW}
              color="#BDBDBD"
              style={{ marginLeft: 25 * d.ratioW }}
            />
          </View>
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
export default VideoItem;
