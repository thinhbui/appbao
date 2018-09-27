import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import videoData from '../News/videoData';
import * as d from '../../utilities/transform';
import VideoItem from './VideoItem';

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.navigation.getParam('item', '');
    this.state = {
      id: 0,
      refresh: true,
      item: this.item,
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
    const length = this.item.length;
    return (
      // <View>
      <VideoItem
        item={item}
        index={index}
        navigation={this.props.navigation}
        isFocus={id === index}
        onEnd={debounce(() => {
          this.flatList.scrollToIndex({
            animated: true,
            index: index === length - 1 ? index : index + 1,
            viewPosition: 0.5,
          });
          this.setState({ id: id + 1 });
        }, 100)}
        onPlay={(index1) => {
          this.flatList.scrollToIndex({
            animated: true,
            index: index1,
            viewPosition: 0.5,
          });
          this.setState({ id: index1, item: this.item });
        }}
      />
    );
  };

  render() {
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
          getItemLayout={(data, index) => ({
            length: d.windowSize.height * 0.6,
            offset: d.windowSize.height * 0.6 * index,
            index,
          })}
          data={this.state.item}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          onScrollEndDrag={(e) => {
            const { contentOffset } = e.nativeEvent;

            this.setState({
              id:
                Math.round(contentOffset.y / d.windowSize.height / 0.6) >= this.item.length - 1
                  ? this.item.length - 1
                  : Math.round(contentOffset.y / d.windowSize.height / 0.6),
            });
          }}
        />
      </View>
    );
  }
}

export default VideoDetail;
