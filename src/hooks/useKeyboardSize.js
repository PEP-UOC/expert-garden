import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardSize() {
  const [keyboardSize, setKeyboardSize] = useState(0);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardSize(e.endCoordinates.height);
      setKeyboardIsOpen(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardSize(0);
      setKeyboardIsOpen(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  return [keyboardSize, keyboardIsOpen];
}
