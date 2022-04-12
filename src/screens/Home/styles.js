import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
  h1: { marginBottom: 0, alignSelf: 'flex-start', textAlign: 'left' },
  button: {
    marginBottom: 20,
    width: Device?.isPhone ? '100%' : 350,
    verifyEmail: { margin: 10 },
  },
  listContainer: {
    width: '100%',
    maxHeight: 200,
  },
});

export default styles;
