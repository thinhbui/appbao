import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { View, ScrollView, Text, TouchableOpacity, Platform, Image, FlatList } from 'react-native';
import { TabView, PagerPan } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as d from '../../utilities/transform';
import { Header } from '../../components';
import styles from './styles';
import News from '../News';
import { Fonts } from '../../constants';

const avatar = 'https://picsum.photos/200/200';

class TabViewExample extends React.Component {
  constructor(props) {
    super(props);
    this.routesTab = props.categories.categories.map((item, i) => ({
      key: item.slug,
      title: item.name,
      id: item.id,
      index: i,
    }));
    this.widthTab = [];
    this.offset = [];
    this.state = {
      index: 1,
      routes: this.routesTab,
    };
    this.getIndex = debounce(this.getIndex, 500);
  }
  componentDidMount() {
    this.getIndex();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.categories.length !== this.props.categories.categories.length) {
      this.setState({
        routes: nextProps.categories.categories.map((item, i) => ({
          key: item.slug,
          title: item.name,
          id: item.id,
          index: i,
        })),
      });
    }
  }
  componentDidUpdate() {
    const { index, routes } = this.state;
    if (this.scrollView) {
      if (index >= this.indexMax) {
        const offset = this.maxWidth - d.windowSize.width;
        this.scrollView.scrollToOffset({
          offset,
        });
      } else if (index <= this.indexMin) {
        this.scrollView.scrollToOffset({
          offset: 0,
        });
      } else {
        this.scrollView.scrollToOffset({
          offset: this.offset[index - 2],
        });
      }
    }
  }
  onSearch = () => {
    this.props.navigation.navigate('Search');
  };

  getItemLayout = (data, index) => ({
    length: this.widthTab[index - 1],
    offset: this.widthTab[index - 1] * index,
    index,
  });

  getIndex = () => {
    let width = 0;
    for (let i = this.state.routes.length - 1; i > 0; i--) {
      width += this.widthTab[i];
      if (width > d.windowSize.width - 40 * d.ratioW) {
        this.indexMax = i + 1;
        break;
      }
    }
    width = 0;
    for (let i = 0; i < this.state.routes.length - 1; i++) {
      width += this.widthTab[i];
      if (width > d.windowSize.width - 40 * d.ratioW) {
        this.indexMin = i - 1;
        break;
      }
    }
    for (let i = 1; i < this.state.routes.length; i++) {
      this.offset[i] = this.offset[i - 1] + this.widthTab[i];
    }
    this.maxWidth =
      this.offset[this.state.routes.length - 1] + this.widthTab[this.state.routes.length - 1];
  };
  initSceneMap = () => {
    const sceneMap = {};
    this.state.routes.forEach((item) => {
      sceneMap[`${item.key}`] = this.renderTabItem;
    });
    return sceneMap;
  };
  renderPager = props => (
    <PagerPan {...props} initialLayout={{ width: d.windowSize.width, height: '100%' }} />
  );
  renderScene = ({ route }) => (
    <News
      item={route}
      isFocused={this.state.index === route.index}
      navigation={this.props.navigation}
    />
  );
  renderTabItem = ({ item, index }) => (
    <TouchableOpacity
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        this.widthTab[index] = width;
        if (index === 0) this.offset[0] = width;
        // if (index === this.state.routes.length - 1)
      }}
      key={item.key}
      onPress={() => this.setState({ index })}
      style={[
        styles.tabBarComponentStyle,
        { borderBottomWidth: this.state.index === index ? 2 : 0 },
      ]}
    >
      <Text
        style={{
          color: this.state.index === index ? '#C21E2B' : '#000',
          marginHorizontal: 5 * d.ratioW,
          fontFamily: Fonts.regular,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  renderTabBar = (props) => {
    const { routes } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.tabBarContainer}>
        <FlatList
          data={props.navigationState.routes}
          extraData={this.state}
          renderItem={this.renderTabItem}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={(com) => {
            this.scrollView = com;
          }}
        />
        <TouchableOpacity
          style={styles.addIconContainer}
          onPress={() => {
            navigation.navigate('Category', {
              categories: this.props.categories.categories,
              suggests: this.props.categories.suggests,
              onNavigate: (item) => {
                this.setState({ index: routes.findIndex(e => e.id === item.id) });
              },
            });
          }}
        >
          <Icon name="ios-add-outline" color="#C21E2B" size={30 * d.ratioW} />
        </TouchableOpacity>
      </View>
    );
  };

  renderLeftIcon = () => {
    const { user } = this.props;
    if (user.data) {
      if (user.data.full_name) {
        return <Image source={{ uri: user.data.avatar || avatar }} style={styles.avatarStyle} />;
      }
    }

    return <Icon name="ios-contact" size={40 * d.ratioH} color="#FFF" />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={this.renderLeftIcon()}
          centerHeader={
            <TouchableOpacity style={styles.centerHeaderContainer} onPress={this.onSearch}>
              <Icon
                name="ios-search"
                color="rgba(255,255,255,0.8)"
                size={20 * d.ratioH}
                style={styles.iconCenterHeaderStyle}
              />
              <Text style={styles.textCenterHeaderStyle}>Nhập từ khoá</Text>
            </TouchableOpacity>
          }
          rightHeader={
            <TouchableOpacity>
              <Icons name="coin" size={35 * d.ratioH} color="yellow" />
            </TouchableOpacity>
          }
          onPressLeftHeader={() => navigation.openDrawer()}
          containerStyle={{ paddingBottom: Platform.OS === 'ios' ? null : 5 * d.ratioH }}
        />
        <TabView
          userNativeDriver
          renderPager={this.renderPager}
          navigationState={this.state}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: d.windowSize.width }}
          lazy
          swipeEnabled={this.state.index !== 1}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  categories: state.categories,
  // news: state.news,
  user: state.saveUserReducers,
});
const mapDispatchToProps = dispatch => ({
  // getNews: categoryId => dispatch(getNewsData(categoryId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabViewExample);
