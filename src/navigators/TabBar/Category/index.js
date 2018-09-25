import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewOverFlow from 'react-native-view-overflow';
import { WhiteHeader } from '../../../components';
import styles from './styles';
import { ratioW, ratioH, windowSize } from '../../../utilities/transform';
import { getSuccessCategories } from '../../../actions/category';
import { StorageTypes } from '../../../constants';
import { getSource } from '../../../services/newsAPI';

class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.navigate = props.navigation.getParam('onNavigate', () => {});
    this.state = {
      categories: props.navigation.getParam('categories', []),
      suggests: props.navigation.getParam('suggests', []),
      isEdit: false,
      data: [],
    };
  }

  componentDidMount() {
    this.onGetSource();
  }

  onSuggestPress = (item) => {
    const { categories, suggests } = this.state;
    const suggest = [...suggests];
    const index = suggest.findIndex(e => e.id === item.id);
    suggest.splice(index, 1);
    this.setState({
      categories: [...categories, item],
      suggests: suggest,
    });
  };

  onGetSource = async () => {
    const result = await getSource();
    console.log(result);

    if (result.status === 200) {
      this.setState({ data: result.data.data });
    } else {
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, vui lòng khởi động lại ứng dụng.');
    }
  };

  onCategoriesPress = (item) => {
    const { categories, suggests } = this.state;
    const category = [...categories];

    const index = categories.findIndex(e => e.id === item.id);

    category.splice(index, 1);
    this.setState({
      categories: category,
      suggests: [...suggests, item],
    });
  };
  onSubmit = () => {
    const { dispatch } = this.props;
    const { categories, suggests, isEdit } = this.state;
    if (isEdit) {
      AsyncStorage.setItem(StorageTypes.CATEGORIES, JSON.stringify({ categories, suggests }));
      dispatch(getSuccessCategories({
        categories,
        suggests,
      }));
    }
    this.setState({ isEdit: !isEdit });
  };
  onClose = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };
  onBackTab = (item) => {
    const { navigation } = this.props;
    navigation.goBack();
    this.navigate(item);
  };

  onGoToSource = (item) => {
    this.props.navigation.navigate('Source', { item });
  };

  renderCategoryItem = ({ item }) => {
    const { isEdit } = this.state;
    if (isEdit) {
      return (
        <ViewOverFlow>
          {item.id !== 1 &&
            (item.id !== 123 && (
              <View style={styles.editContainer}>
                <Icon name="md-close" size={10 * ratioW} color="#fff" />
              </View>
            ))}

          {item.id === 1 || item.id === 123 ? (
            <View key={item.name} style={styles.categoryContainer}>
              <Text style={styles.categoryTextStyle}>{item.name}</Text>
            </View>
          ) : (
            <TouchableOpacity
              key={item.name}
              style={styles.categoryContainer}
              onPress={() => {
                this.onCategoriesPress(item);
              }}
            >
              <Text style={styles.categoryTextStyle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        </ViewOverFlow>
      );
    }
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.categoryContainer}
        onPress={() => this.onBackTab(item)}
        onLongPress={() => this.setState({ isEdit: true })}
      >
        <Text style={styles.categoryTextStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  renderSuggestItem = ({ item }) => {
    const { isEdit } = this.state;
    return (
      <ViewOverFlow>
        {isEdit && (
          <View style={styles.editContainer}>
            <Icon name="md-add" size={10 * ratioW} color="#fff" />
          </View>
        )}
        {isEdit ? (
          <TouchableOpacity
            key={item.name}
            style={styles.categoryContainer}
            onPress={() => this.onSuggestPress(item)}
          >
            <Text style={styles.categoryTextStyle}>{item.name}</Text>
          </TouchableOpacity>
        ) : (
          <View key={item.name} style={styles.categoryContainer}>
            <Text style={styles.categoryTextStyle}>{item.name}</Text>
          </View>
        )}
      </ViewOverFlow>
    );
  };

  renderSource = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.sourceContainer}
      onPress={() => this.onGoToSource(item)}
    >
      <Image
        source={{ uri: item.avatar || 'https://picsum.photos/200/200' }}
        style={styles.sourceAvatarStyle}
      />
      <Text style={styles.categoryTextStyle}>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    const {
      categories, suggests, isEdit, data,
    } = this.state;

    return (
      <View style={styles.container}>
        <WhiteHeader
          rightHeader={<Icon name="ios-close-outline" size={40 * ratioW} />}
          onPressRightHeader={this.onClose}
          customContainerStyle={{ borderBottomWidth: 0 }}
        />
        <View style={styles.headerContainer}>
          <View style={styles.headerDescriptionContainer}>
            <Text style={styles.titleStyle}>Kênh của tôi</Text>
            <TouchableOpacity style={styles.fixButtonContainer} onPress={this.onSubmit}>
              <Text style={styles.titleStyle}>{isEdit ? 'Hoàn thành' : 'Chỉnh sửa'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.guideStyle}>(Nhấn vào để xoá kênh)</Text>
        </View>
        <View>
          <FlatList
            style={{ paddingLeft: windowSize.width * 0.02 }}
            extraData={this.state}
            data={categories}
            renderItem={this.renderCategoryItem}
            keyExtractor={item => item.slug}
            numColumns={4}
          />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.headerDescriptionContainer}>
            <Text style={styles.titleStyle}>Kênh đề xuất</Text>
          </View>
          <Text style={styles.guideStyle}>(Nhấn vào để thêm vào kênh của tôi)</Text>
        </View>
        <View>
          {suggests.length !== 0 ? (
            <FlatList
              style={{ paddingLeft: windowSize.width * 0.02 }}
              extraData={this.state}
              data={suggests}
              renderItem={this.renderSuggestItem}
              keyExtractor={item => item.slug}
              numColumns={4}
              // horizontal
            />
          ) : (
            <View style={{ marginLeft: 20 * ratioW, marginVertical: 10 * ratioH }}>
              <Text style={styles.titleStyle}>Chưa có nguồn đề xuất</Text>
            </View>
          )}
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.headerDescriptionContainer}>
            <Text style={styles.titleStyle}>Nguồn báo nổi bật</Text>
          </View>
          <Text style={styles.guideStyle}>(Nhấn vào để xem tin tức của nguồn)</Text>
        </View>
        <FlatList
          style={{ paddingLeft: windowSize.width * 0.02 }}
          extraData={this.state}
          data={data}
          renderItem={this.renderSource}
          keyExtractor={item => item.slug}
          // numColumns={4}
          horizontal
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({});
Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
Category.defaultProps = {};
export default connect(mapStateToProps)(Category);
