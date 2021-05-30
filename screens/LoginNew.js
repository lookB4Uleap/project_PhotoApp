import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements';
import { auth } from '../firebase';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { KeyboardAvoidingView } from 'react-native';

const LoginNew = ({navigation}) => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [load, setLoad] = useState(false);

    const signInWithGoogleAsync = async () =>{
        console.log('GOOGle');
        try {
            
          const result = await Google.logInAsync({
              behavior: 'web',
            androidClientId: 219429034052-nkcfuukk3i7p7o4jq5ufd1biciug3orq.apps.googleusercontent.com,
            // iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
          setLoad(true);
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
            setLoad(false);
          }
        } catch (e) {
          return { error: true };
          setLoad(false);
        }
      }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                navigation.replace("Home");
            }
        });
    }, []);

    const toRegister = () => {
        navigation.navigate("Register");
    }

    const login = () => {
        setLoad(true);
        auth.signInWithEmailAndPassword(email, pass).
        catch((error) => {
            alert(error);
            setLoad(false);
        });
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    const signInWithGoogle = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((res) =>{
            console.log(res.credential);
        }).catch((err)=>{
            alert(err);
        })
    };

    // console.ignoredYellowBox = ['Setting a timer'];

    return (
        
            load ?
            <View style={styles.container}>
                <ActivityIndicator color='#242f3f' size='large' />
            </View> :
        <View style={styles.back}>
            <ImageBackground source={(Platform.OS === 'android' || Platform.OS === 'ios') ? 
                require('./Login-Back2.jpg') : require('./Login-Back.svg')}
                style={styles.container}
            >
            <KeyboardAvoidingView
                style={styles.wrap}
                behavior={Platform.OS === 'ios' ? "padding" : "height" }
            >
            <View style={styles.head}>
                <ImageBackground source={(Platform.OS === 'android' || Platform.OS === 'ios') ? 
                    require('./Login-Head.jpg') : require('./Login-Head.svg')}
                    style={styles.headImg}    
                >
                <Text style={styles.header}>LOGIN</Text>
                </ImageBackground>
            </View>
            <View style={styles.box}>
                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Username/Email" 
                        type="email" value={email} onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Password" 
                        secureTextEntry type="password" value={pass} onChangeText={(text) => {setPass(text)}}
                    />
                </View>
                <View style={styles.row}>
                <TouchableOpacity style={styles.btn1} onPress={login}>
                    <Text style={styles.btnText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={toRegister}>
                    <Text style={styles.btnText}>REGISTER</Text>
                </TouchableOpacity>
                </View>
                {/* <View style={styles.row}>
                <TouchableOpacity style={styles.btn1} onPress={()=>{signInWithGoogleAsync}}>
                    <Text style={styles.btnText}>GOOGLE</Text>
                </TouchableOpacity>
                </View> */}
                <View style={{ height: 5, width: 40}}></View>
            </View>
            </KeyboardAvoidingView>
            </ImageBackground>
        </View>
     
    )
}

export default LoginNew;

const styles = StyleSheet.create({
    back: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    container: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        // backgroundColor: '#ccfff2',
    },
    wrap: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    head: {
        top: '10%',
        position: 'relative',
        height: (Platform.OS=='android'||Platform.OS=='ios')? 150 : 250,
        width: (Platform.OS=='android'||Platform.OS=='ios')? '90%' : '30%',
        backgroundColor: '#242f3f',
        display: 'flex',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        shadowOpacity: 0.7,
        elevation: 7,
    },
    header: {
        color: '#C3C43D',
        fontSize: (Platform.OS=='android'||Platform.OS=='ios')? 50 : 85,
        padding: 30,
    },
    headImg: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: '95%',
        // elevation: 5
    },
    box: {
        top: '10%',
        position: 'relative',
        height: (Platform.OS=='android'||Platform.OS=='ios')? 200 : 200,
        width: (Platform.OS=='android'||Platform.OS=='ios')? '90%' : '30%',
        backgroundColor: 'white',
        // backgroundColor: '#ccfff2',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowOffset: {
            height: 5,
            width: 5,
        },
        opacity: 0.8,
        shadowOpacity: 0.7,
        elevation: 5,
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input: {
        height: 30,
        width: '70%',
        // backgroundColor: '#ccfff2',
        backgroundColor: '#C3C43D',
        // margin: 10,
        borderRadius: 5,
    },
    inputbox: {
        width: '100%',
        height: '100%',
        color: '#242f3f',
        paddingLeft: 10,
    },
    btn1: {
        backgroundColor: '#242f3f',
        color: '#C3C43D',
        width: 80,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnText : {
        color: '#C3C43D'
    },
});