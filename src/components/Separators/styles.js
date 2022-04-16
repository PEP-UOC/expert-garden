import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
  topScreen: {
    marginTop: Device?.isPhone ? 0 : 15,
    marginBottom: Device?.isPhone ? 0 : 15,
    width: '100%',
  },
  topSection: {
    marginTop: Device?.isPhone ? 0 : 4,
    marginBottom: Device?.isPhone ? 0 : 3,
    width: '100%',
  },
});

export default styles;
