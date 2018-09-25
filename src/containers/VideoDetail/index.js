import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import videoData from '../News/videoData';
import * as d from '../../utilities/transform';
import VideoItem from './VideoItem';

const HEIGHT = (d.windowSize.width - d.windowSize.width * 0.06) * 0.75;

class VideoDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.item = this.props.navigation.getParam('item', '');
    this.state = {
      id: 0,
      refresh: true,
    };
  }
  componentDidMount() {
    console.log(this.item);
  }

  onGoBack = () => {
    this.props.navigation.goBack();
  };
  renderItem = ({ item, index }) => {
    const { id } = this.state;
    return (
      // <View>
      <VideoItem
        item={item}
        navigation={this.props.navigation}
        isFocus={id === index}
        onEnd={debounce(() => {
          this.flatList.scrollToIndex({
            animated: true,
            index: index < videoData.length - 1 ? index + 1 : index,
            viewPosition: 0.5,
          });
          this.setState({ id: id + 1 });
        }, 100)}
      />
    );
  };

  render() {
    console.log(this.state.id);

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TouchableOpacity onPress={this.onGoBack}>
          <Icon
            name="ios-arrow-back"
            size={35}
            color="#fff"
            style={{ marginTop: d.navBarHeight / 2, marginLeft: d.windowSize.width * 0.02 }}
          />
        </TouchableOpacity>

        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          style={{ backgroundColor: '#000' }}
          data={this.item}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onScrollEndDrag={(e) => {
            const { contentOffset } = e.nativeEvent;
            this.setState({
              id:
                Math.round(contentOffset.y / HEIGHT) >= this.item.length - 1
                  ? this.item.length - 1
                  : Math.round(contentOffset.y / HEIGHT),
            });
          }}
        />
      </View>
    );
  }
}

export default VideoDetail;
