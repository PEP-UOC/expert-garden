import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../libs/react-native-device-detection';

let globalStyles;
if (Device.isPhone) {
  globalStyles = StyleService.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    view: {
      width: '100%',
    },
    h1: { marginBottom: 30, color: 'color-primary-500' },
    h2: { marginBottom: 10, alignSelf: 'flex-start' },
    button: {
      marginBottom: 30,
    },
  });
} else {
  globalStyles = StyleService.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    view: {
      width: '100%',
      maxWidth: 1024,
    },
    h1: { marginBottom: 30, color: 'color-primary-500' },
    h2: { marginBottom: 10, alignSelf: 'flex-start' },
    button: {
      marginBottom: 30,
    },
  });
}

export default globalStyles;
