import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import News from '../containers/News';
import TabBar from './TabBar';
import { getCategories } from '../services/newsAPI';

export const categories = [
  {
    id: 1,
    name: 'Đề xuất',
  },
  {
    id: 2,
    name: 'Xã hội',
  },
  {
    id: 3,
    name: 'Giáo dục',
  },
  {
    id: 4,
    name: 'Đời sống',
  },
  {
    id: 5,
    name: 'Thế giới',
  },
  {
    id: 6,
    name: 'Thời trang',
  },
  {
    id: 7,
    name: 'Pháp luật',
  },
  {
    id: 8,
    name: 'Ẩm thực',
  },
  {
    id: 9,
    name: 'Video',
  },
];
/* eslint-disable */
const newsTabs = tab => {
  // const data = await getCategories().then(res => res.data);

  const tabs = {};
  categories.map(item => {
    tabs[`${item.name}`] = { screen: props => <News item={item} /> };
  });
  // console.log(tabs);

  return tabs;
};
const NewsTab = createMaterialTopTabNavigator(newsTabs(), {
  tabBarComponent: TabBar,
  upperCaseLabel: false,
  indicatorStyle: {
    backgroundColor: 'red',
  },
  lazy: true,
  swipeEnabled: true,
});

// class NewsTabComponent extends React.PureComponent {
//   render() {
//     console.log('render', this.props);
//     return this.props.categories.length > 0 ? <NewsTab tab={this.props.categories} /> : null;
//   }
// }
// const mapStateToProps = state => {
//   console.log('mapStateToProps', state);

//   return {
//     categories: state.categories,
//   };
// };
// export default connect(mapStateToProps)(NewsTabComponent);
export default NewsTab;
