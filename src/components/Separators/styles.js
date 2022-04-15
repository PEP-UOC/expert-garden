import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
  topSeparator: {
    marginTop: Device?.isPhone ? 0 : 15,
    marginBottom: Device?.isPhone ? 0 : 15,
    width: '100%',
  },
});

export default styles;
