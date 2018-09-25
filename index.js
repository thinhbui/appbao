import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Class RCTCxxModule was not exported',
  'Module RCTFBSDKShareDialog',
  'Module RCTFBSDKMessageDialog',
  'Module RCTFBSDKGameRequestDialog',
  'Module RCTFBSDKInitializer',
  'Module RCTFBSDKAppInviteDialog',
  'Module RCTFBSDKShareAPI',
  'Module RCTFBSDKLoginManager',
  'Module RCTOneSignalEventEmitter',
  'Class GenericShare was not exported',
  'Class WhatsAppShare was not exported',
  'Class GooglePlusShare was not exported',
  'Method `jumpToIndex` is deprecated',
  'Module RCTImageLoader',
  'Remote debugger',
  'source.uri should not be an empty string',
  'Warning: Failed prop type: The prop `layout.height` is marked as required in `PagerPan`, but its value is `undefined`',
  'Warning: Failed prop type: The prop `initialLayout.height` is marked as required in `TabView`, but its value is `undefined`.',
]);
AppRegistry.registerComponent(appName, () => App);
