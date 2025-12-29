import React from 'react';
import SplashScreenone from './screens/splashscreen_one';
import SplashScreentwo from './screens/splashscreen_two';
import Loginscreen from './auth/loginscreen';
import Dashboardscreen from './screens/dashboardscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Image, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Stack = createStackNavigator();
function Headerimage() {
  return (
    <Image
      style={{ width: 40, height: 27 }}
      source={require('./assets/headerlogo.png')}
    />
  );
}
function Headerleft() {
  return (
    <TouchableOpacity onPress={() => Alert.alert('Drawer will be here')}>
      <FontAwesome6
        name="align-left"
        style={{
          top: 8,
          gap: 7.5,
          width: 20,
          height: 20,
          paddingRight: 2,
          marginLeft: 10,
        }}
        color={'#ffffff'}
        size={20}
        iconStyle="solid"
      />
    </TouchableOpacity>
  );
}
function HeaderRight() {
  return (
    <TouchableOpacity
      onPress={() => Alert.alert('Notification screen will be open')}
    >
      <FontAwesome6
        name="bell"
        style={{
          top: 7,
          gap: 10,
          width: 20,
          height: 20,
          marginRight: 10,
        }}
        color={'#ffffff'}
        size={20}
        iconStyle="brand"
      />
    </TouchableOpacity>
  );
}
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="SplashOne"
            component={SplashScreenone}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="SplashTwo"
            component={SplashScreentwo}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="Loginscreen"
            component={Loginscreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: props => <Headerimage {...props} />,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#1b1a1b',
                borderWidth: 1,
                borderColor: '#303030',
                paddingHorizontal: 12,
                paddingTop: 24,
                paddingBottom: 16,
                gap: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#303030',
              },
              headerLeft: props => <Headerleft {...props} />,
              headerRight: props => <HeaderRight {...props} />,
            }}
            name="Dashboard"
            component={Dashboardscreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
