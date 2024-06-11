import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={'transparent'}
        translucent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto_700Bold',
  }
});
