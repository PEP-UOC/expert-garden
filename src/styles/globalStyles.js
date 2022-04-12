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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    maxWidth: Device?.isPhone ? undefined : 1200,
    flexDirection: Device?.isPhone ? 'column' : 'row',
    //backgroundColor: 'red',
  },
  section: {
    full: {
      flexDirection: 'column',
      width: '100%',
      //backgroundColor: 'blue',
    },
    primary: {
      flexDirection: 'column',
      height: Device?.isPhone ? undefined : '100%',
      width: Device?.isPhone ? '100%' : '35%',
      //backgroundColor: 'orange',
    },
    secondary: {
      flexDirection: 'column',
      height: Device?.isPhone ? undefined : '100%',
      width: Device?.isPhone ? '100%' : '65%',
      //backgroundColor: 'yellow',
    },
  },
  h1: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h2: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h3: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h4: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h5: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  h6: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: Device?.isPhone ? '100%' : 350,
    marginBottom: 20,
    marginLeft: Device?.isPhone ? undefined : 'auto',
    marginRight: Device?.isPhone ? undefined : 'auto',
  },
  buttonGhost: {
    width: Device?.isPhone ? '100%' : 350,
    marginBottom: 0,
    marginLeft: Device?.isPhone ? undefined : 'auto',
    marginRight: Device?.isPhone ? undefined : 'auto',
  },
  inputs: {
    select: {
      width: Device?.isPhone ? '100%' : 350,
      marginBottom: 20,
      alignSelf: 'center',
    },
    input: {
      width: Device?.isPhone ? '100%' : 350,
      marginBottom: 20,
      alignSelf: 'center',
    },
    captionText: {
      fontSize: 12,
      color: '#8F9BB3',
    },
  },
  leaf: {
    marginTop: 20,
    fill: 'color-primary-100',
  },
  smallText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default globalStyles;
