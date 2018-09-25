import React, { PureComponent } from 'react';
import { View, WebView } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';

class Ads extends PureComponent {
  constructor(props) {
    super(props);
    this.url = props.navigation.getParam(
      'url',
      'https://www.thegioididong.com/tin-tuc/dien-may-xanh-dang-co-chuong-trinh-mua-nhieu-uu-dai-lon--974581',
    );
  }
  render() {
    const { navigation } = this.props;
    // console.log(this.props);
    console.log(this.url);

    return (
      <View style={{ flex: 1 }}>
        <WhiteHeader
          leftHeader={<Icons name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          onPressLeftHeader={() => navigation.goBack('')}
        />
        <WebView style={{ flex: 1 }} url={this.url} />
      </View>
    );
  }
}

export default Ads;
