import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { Button } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import CameraView from './components/CameraView';
import { Feather } from '@expo/vector-icons';
import { pics, resetPics } from './values/Values';
import axios from 'axios';
import * as firebase from 'firebase';

export default function HomeScreen({navigation}) {
    
    const Drawer = createDrawerNavigator();
    const [camera, setCamera] = useState(false);

    useEffect(() => {
        const user = firebase.auth().currentUser.email;
        console.log(user);
        axios.get('http://192.168.0.121:8081/' + user).then((response) => {
            // response.data.images.map((image) => {pics.push(image)});
            if (response.data) {
            let len = response.data.images.length;
            for (let i=0; i<len; ++i) {
                pics[i] = response.data.images[i];
            }
            }
            console.log(typeof(pics));
            // console.log(typeof(images.slice(2)[0].uri));
            // console.log(images[2].uri === pics[0].uri);
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    const signOut = () => {
        resetPics();
        auth.signOut().then(() =>{
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        console.log(pics);
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            //   <View style={{width: 20}}>  
              <TouchableOpacity>
              <SimpleLineIcons
              name="logout" 
              size={24}
              color='white'
              style={{paddingRight: 20}}
              onPress={signOut} 
              />
              </TouchableOpacity>
            //   </View>
            ),
          });
    }, [navigation])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Photos')}>
                <Text style={styles.btnText}>PHOTOS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.uploadBtn}
                onPress={() => {navigation.navigate('Upload')}}
            >
                <Feather name="upload" size={24} color="black" />
                <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
   container : {
       top: 0,
       left: 0,
       width: '100%',
       height: '100%',
       alignItems: 'center',
       justifyContent : 'center',
   },
   uploadBtn : {
    //    alignSelf: 'flex-end',
       position: 'absolute',
       bottom: 0,
       padding: 10,
       width: '100%',
       backgroundColor: '#DDDDDD',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row',
   },
   uploadBtnText: {
       paddingLeft: 10,
   },
   btn: {
       width: '70%',
       height: 50,
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 5,
       backgroundColor: '#242f3f',
       borderRadius: 5,
   },
   btnText: {
       paddingLeft: 10,
       color: '#C3C43D'
   },
});