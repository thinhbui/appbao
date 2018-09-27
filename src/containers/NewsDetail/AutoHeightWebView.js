import React, { PureComponent } from 'react';
import { WebView, View, Platform, Text } from 'react-native';
import { debounce } from 'lodash';
import { Fonts } from '../../constants';
import { getContentNews } from '../../services/newsAPI';
import styles from './styles';

const script = `
<script>
    ;(function() {
        var wrapper = document.createElement("div");
        wrapper.id = "height-calculator";
        while (document.body.firstChild) {
            wrapper.appendChild(document.body.firstChild);
        }
        document.body.appendChild(wrapper);
        var i = 0;
        function updateHeight() {
            document.title = wrapper.clientHeight;
            window.location.hash = ++i;
        }
        updateHeight();
        window.addEventListener("load", function() {
            updateHeight();
            setTimeout(updateHeight, 500);
        });
        window.addEventListener("resize", updateHeight);
        }());
</script>
`;

class AutoHeightWebView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newsContent: '',
      Height: '100%',
    };
    // this.onNavigationChange = debounce(this.onNavigationChange, 1000);
  }
  componentDidMount() {
    getContentNews(this.props.id).then((res) => {
      console.log('getContentNews', res);

      this.setState({ newsContent: res.data.content });
    });
  }
  onNavigationChange = (event) => {
    if (event.title) {
      const htmlHeight = Number(event.title);
      this.setState({ Height: htmlHeight });
    }
  };
  render() {
    const { newsContent } = this.state;
    const { html, fontSize } = this.props;
    console.log('webview');

    const style = `
        <style>
        @font-face {
            font-family: 'vntimes-regular';
            src: url('https://m.vntimes.app/client/plugin/font-vntimes/vntimes-light.woff2') format('truetype');
        }
        *{
            font-family: vntimes-regular;
        }
        p{
            text-align: justify;
            font-size: ${fontSize}px!important;
            font-family: ${Fonts.regular};
        }
        a{
            text-align: justify;
            font-size: ${fontSize}px!important;
            font-family: ${Fonts.regular};
        }
        strong{
            text-align: justify;
            font-size: ${fontSize}px!important;
            font-family: ${Fonts.regular};
        }
        figcaption{
            text-align: justify;
            font-size: ${fontSize}px!important;
            font-family: ${Fonts.regular};
        }
        td{
            text-align: justify;
            font-size: ${fontSize}px!important;
            font-family: ${Fonts.regular};
        }
        body, html, #height-calculator {
            margin: 0;
            padding: 0;
            font-family: vn-time;
        }
        #height-calculator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        img {
            width: 100%;
            height: auto;
        }
        video {
            width: 100%;
            height: auto;
        }
        .clone-content figure{
            padding-left: 0px!important;
            margin-left: 0px!important;
            width: 100%!important;
        }
        .clone-content ul{
            padding-left: 0px!important;
            margin-left: 0px!important;
        }
        .clone-content ul li{
            padding-left: 0px!important;
            margin-left: 0px!important;
            list-style-type:none!important;
            list-type:none!important;
            width:100%!important;
        }
        .clone-content img {
            max-width: 100%!important;
            height: auto;
        }
        
        .clone-content video {
            max-width: 100%!important;
            height: auto;
        }
        </style>
        `;
    return (
      <View style={{ height: this.state.Height }}>
        {newsContent === '' ? (
          <Text style={styles.loadText}>Đang tải dữ liệu bài viết....</Text>
        ) : (
          <WebView
            scrollEnabled={false}
            source={{ html: `<div class="clone-content"> ${newsContent + style + script} </div>` }}
            style={{ height: this.state.Height }}
            javaScriptEnabled
            onNavigationStateChange={this.onNavigationChange}
            automaticallyAdjustContentInsets
            mixedContentMode="always"
            showsVerticalScrollIndicator={false}
            scalesPageToFit={Platform.OS === 'android'}
          />
        )}
      </View>
    );
  }
}
export default AutoHeightWebView;
