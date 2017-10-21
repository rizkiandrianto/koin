/**
* @providesModule style/MainStyle
*/
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      backgroundColor: '#f5f5f5',
      height: 40,
      paddingLeft: 10,
      shadowColor: "black",
      shadowOpacity: 1,
      shadowRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    }
});

export default styles;