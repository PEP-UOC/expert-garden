import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../libs/react-native-device-detection';
import { Platform } from 'react-native';

const globalStyles = StyleService.create({
  textCenter: {
    textAlign: 'center',
  },
  scrollView: Device?.isPhone
    ? Platform?.OS === 'ios'
      ? {}
      : {
          flex: 1,
          justifyContent: 'space-between',
        }
    : {
        flex: 1,
        justifyContent: 'space-between',
      },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  view: {
    width: '100%',
    maxWidth: Device?.isPhone ? undefined : 1024,
  },
  h1: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h2: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h3: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h4: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h5: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h6: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  card: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  buttonGhost: {
    marginBottom: 0,
  },
  inputs: {
    select: {
      marginBottom: 20,
    },
    input: {
      marginBottom: 20,
    },
    captionText: {
      fontSize: 12,
      color: '#8F9BB3',
    },
  },
});

export default globalStyles;
