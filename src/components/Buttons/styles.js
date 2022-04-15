import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
  wrapper: {
    marginBottom: 15,
  },
  logo: {
    marginBottom: -22,
    marginLeft: -85,
    fill: 'color-primary-500',
    alignSelf: 'flex-start',
    display: Device.isPhone ? 'none' : 'block',
  },
  btnWithLogo: {
    width: '100%',
  },
  btnPrimary: {
    width: '100%',
  },
});

export default styles;
