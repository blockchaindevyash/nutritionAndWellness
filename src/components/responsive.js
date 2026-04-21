import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percent) => (width * percent) / 100;
const hp = (percent) => (height * percent) / 100;

const scale = width / 375;

const normalize = (size) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scale));

export { wp, hp, normalize };