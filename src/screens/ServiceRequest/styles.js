import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';

let styles;
if (Device.isPhone) {
  styles = StyleService.create({
    button: {
      width: '100%',
    },
  });
} else {
  styles = StyleService.create({
    button: {
      width: '100%',
    },
  });
}

export default styles;
