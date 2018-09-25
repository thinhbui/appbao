import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { WhiteHeader } from '../../../../components';
import * as d from '../../../../utilities/transform';
import { Fonts } from '../../../../constants';
import styles from './styles';

class CommentVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      write: false,
      content: '',
    };
  }

  render() {
    const { navigation } = this.props;
    const { content, write } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 18 * d.ratioW }}>
              Bình luận video
            </Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#000' }}>
            Tính năng này đang trong giai đoạn phát triển.
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.comment}>
            <View style={styles.textInput}>
              <IconSimple
                name="pencil"
                size={18 * d.ratioW}
                color="gray"
                style={styles.commentInputTextIconStyle}
              />
              <TextInput
                ref={(ref) => {
                  this._textInput = ref;
                }}
                value={content}
                onChangeText={value => this.setState({ content: value })}
                onBlur={() => {
                  if (!content) this.setState({ write: false });
                }}
                underlineColorAndroid="transparent"
                style={{ flex: 1, padding: 0, justifyContent: 'center' }}
                placeholder="Viết bình luận..."
                placeholderTextColor="gray"
                onFocus={() => this.setState({ write: true })}
                autoCorrect={false}
              />
            </View>
            {write ? (
              <TouchableOpacity style={styles.sentContainer} onPress={this.onComment}>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    margin: 5,
                    color: '#fff',
                    fontSize: 12 * d.ratioW,
                  }}
                >
                  Gửi
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.commentContainer} onPress={this.onShare}>
                <IconSimple
                  name="share-alt"
                  size={18}
                  color="gray"
                  style={{ bottom: 1 * d.ratioH, marginRight: 5 * d.ratioW }}
                />
                <Text style={styles.itemText}>Chia sẻ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

CommentVideo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default CommentVideo;
