import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';

let styles;
if (Device.isPhone) {
  styles = StyleService.create({
    listContainer: {
      width: '100%',
      maxHeight: 200,
    },
  });
} else {
  styles = StyleService.create({
    listContainer: {
      width: '100%',
      maxHeight: 200,
    },
  });
}

export default styles;
