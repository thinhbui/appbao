import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { WhiteHeader } from '../../../../../components';
import * as d from '../../../../../utilities/transform';
import { Fonts } from '../../../../../constants';

class LevelIntroduction extends PureComponent {
  render() {
    const { navigation, level } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#FA6467' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW }}>Cấp</Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        <ScrollView
          style={{
            backgroundColor: '#FA6467',
            paddingVertical: 20 * d.ratioH,
            width: '100%',
            paddingHorizontal: 10 * d.ratioW,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15 * d.ratioH,
              paddingHorizontal: 20 * d.ratioW,
            }}
          >
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#FFF' }}>
              Cấp
            </Text>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#FFF' }}>
              Danh hiệu
            </Text>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#FFF' }}>
              exp
            </Text>
          </View>
          {level.data.map((e, i) => (
            <View
              key={i.toString()}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10 * d.ratioH,
                marginBottom: i === level.data.length - 1 ? 35 * d.ratioW : null,
              }}
            >
              <Text
                style={{
                  fontSize: 14 * d.ratioW,
                  color: '#FFF',
                  textAlign: 'center',
                  marginLeft: -40 * d.ratioW,
                  flex: 1,
                  fontFamily: Fonts.regular,
                }}
              >
                {e.id}
              </Text>
              <Text
                style={{
                  fontSize: 14 * d.ratioW,
                  color: '#FFF',
                  textAlign: 'center',
                  flex: 1,
                  fontFamily: Fonts.regular,
                }}
              >
                {e.name}
              </Text>
              <Text
                style={{
                  fontSize: 14 * d.ratioW,
                  color: '#FFF',
                  textAlign: 'center',
                  marginRight: -40 * d.ratioW,
                  flex: 1,
                  fontFamily: Fonts.regular,
                }}
              >
                {e.exp}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  level: state.levelReducers,
});

export default connect(
  mapStateToProps,
  null,
)(LevelIntroduction);
