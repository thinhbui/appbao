import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { getWeatherData } from '../../actions';
import { Header } from '../../components';
import styles from './styles';
import { ratioW, ratioH } from '../../utilities/transform';

const avatar = 'https://picsum.photos/200/200';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.widthTab = {};
    this.width = {};
  }

  componentDidMount() {
    // this.props.navigation.openDrawer();
    // getLottery();
    // const user = await AsyncStorage
    // getCategories()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
  }

  componentDidUpdate() {
    const {
      navigation: {
        state: { index, routes },
      },
    } = this.props;
    if (this.scrollView) {
      this.scrollView.scrollTo({ x: this.widthTab[index] });
    }
  }

  onWidthTab = (idx, x) => {
    if (idx === 5) {
      return x - 52 * ratioW;
    } else if (idx === 6) {
      return x - 137 * ratioW;
    } else if (idx === 7) {
      return x - 215 * ratioW;
    } else if (idx === 8) {
      return x - 278 * ratioW;
    }
    return x;
  };

  _onSearch = () => {
    this.props.navigation.navigate('Search');
  };

  renderLeftIcon = () => {
    const { user } = this.props;
    if (user.data) {
      if (user.data.full_name) {
        return <Image source={{ uri: user.data.avatar || avatar }} style={styles.avatarStyle} />;
      }
    }
    return <Icon name="ios-contact" size={40 * ratioH} color="#FFF" />;
  };

  render() {
    const {
      navigation: {
        state: { index, routes },
      },
      navigation,
      style,
      jumpTo,
      tabStyle,
    } = this.props;

    return (
      <View>
        <Header
          leftHeader={this.renderLeftIcon()}
          centerHeader={
            <TouchableOpacity style={styles.centerHeaderContainer} onPress={this._onSearch}>
              <Icon
                name="ios-search"
                color="rgba(255,255,255,0.8)"
                size={20 * ratioH}
                style={styles.iconCenterHeaderStyle}
              />
              <Text style={styles.textCenterHeaderStyle}>Nhập từ khoá</Text>
            </TouchableOpacity>
          }
          rightHeader={
            <TouchableOpacity>
              <Icons name="coin" size={35 * ratioH} color="yellow" />
            </TouchableOpacity>
          }
          onPressLeftHeader={() => navigation.openDrawer()}
          containerStyle={{ paddingBottom: Platform.OS === 'ios' ? null : 5 * ratioH }}
        />
        <View style={[styles.tabBarContainer, { ...style }]}>
          <ScrollView
            style={styles.scrollViewContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={(component) => {
              this.scrollView = component;
            }}
          >
            {routes.map((route, idx) => (
              <TouchableOpacity
                onLayout={(e) => {
                  const { width, x } = e.nativeEvent.layout;
                  this.widthTab[idx] = this.onWidthTab(idx, x);
                }}
                key={route.key}
                style={[
                  tabStyle,
                  styles.tabBarComponentStyle,
                  { borderBottomWidth: index === idx ? 2 : 0 },
                ]}
                onPress={() => {
                  jumpTo(route.key);
                }}
              >
                <Text
                  style={{
                    color: index === idx ? '#C21E2B' : '#000',
                    marginHorizontal: scale(5),
                    // fontFamily: Fonts.regular,
                  }}
                >
                  {route.key}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => navigation.navigate('Category')}
          >
            <Icon name="ios-add-outline" color="#C21E2B" size={30 * ratioW} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TabBar.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object,
    navigate: PropTypes.func,
  }).isRequired,
  style: PropTypes.object,
  // activeTintColor: PropTypes.string,
  // inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
  tabStyle: PropTypes.object,
  // getWeatherData: PropTypes.func.isRequired,
};

TabBar.defaultProps = {
  style: {},
  // activeTintColor: '',
  // inactiveTintColor: '',
  jumpTo: () => {},
  tabStyle: {},
};

const mapStateToProps = state => ({
  weather: state.getWeatherReducers,
  user: state.saveUserReducers,
});

const mapDispatchToProps = dispatch => ({ getWeatherData: data => dispatch(getWeatherData(data)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBar);
