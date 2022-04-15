import { StyleService } from '@ui-kitten/components';

//Device Detect
//import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
  view: {
    alignItems: 'center',
  },
  title: { alignSelf: 'center', textAlign: 'center' },
  logo: {
    marginTop: 40,
    fill: 'color-primary-500',
  },
});

export default styles;
