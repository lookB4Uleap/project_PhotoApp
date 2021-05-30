import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import LoginNew from './screens/LoginNew';
import HomeScreen from './screens/HomeScreen';
import RegisterNew from './screens/RegisterNew';
import UploadScreen from './screens/UploadScreen';
import DescriptionScreen from './screens/DescriptionScreen';
import DispScreen from './screens/DispScreen';
import PicViewScreen from './screens/PicViewScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginNew} 
          options={{
            // transitionSpec: {
            //   open: TransitionSpecs.RevealFromBottomAndroidSpec,
            //   close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            // },
            ...TransitionPresets.SlideFromRightIOS,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'}
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
        <Stack.Screen name="Upload" component={UploadScreen} 
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
        <Stack.Screen name="Add Photo Description" component={DescriptionScreen} 
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
        <Stack.Screen name="Photos" component={DispScreen} 
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
        <Stack.Screen name="Photo Description" component={PicViewScreen} 
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
        <Stack.Screen name="Register" component={RegisterNew} 
          options={{
          //   transitionSpec: {
          //     open: TransitionSpecs.RevealFromBottomAndroidSpec,
          //     close: TransitionSpecs.FadeOutToBottomAndroidSpec,
          // },
            ...TransitionPresets.SlideFromRightIOS,
            headerStyle: {backgroundColor: '#242f3f'},
            headerTitleStyle: {color: '#C3C43D'},
            headerTintColor: '#C3C43D'
          }}
        />
      </Stack.Navigator>
      {/* <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
