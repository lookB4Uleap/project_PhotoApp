import React, { useState } from 'react'
import { ImageBackground } from 'react-native'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../firebase';


const RegisterNew = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [nm, setName] = useState('');
    const [load,setLoad] = useState(false);

    const toLogin = () => {
        navigation.navigate('Login');
    }

    const register = () => {
        
        if (email != '' || pass != '' || nm != '') {
            setLoad(true);
            auth.createUserWithEmailAndPassword(email, pass)
            .then((authUser) => {
            authUser.user.updateProfile({
                displayName: nm,
                photoURL: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });
            })
            .catch((error) => {
            alert(error.message);
            setLoad(false);
            });
        }
    };

    return (
        load ? 
        <View style={styles.container}>
                <ActivityIndicator color='#242f3f' size='large' />
        </View> :
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
                <Text style={styles.header}>REGISTER</Text>
                </ImageBackground>
            </View>
            <View style={styles.box}>
                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Username" 
                        type="nm" value={nm} onChangeText={(text) => setName(text)}
                    />
                </View>

                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Email" 
                        type="email" value={email} onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Password" 
                        secureTextEntry type="password" value={pass} onChangeText={(text) => {setPass(text)}}
                    />
                </View>
                
                <View style={styles.row}>
                <TouchableOpacity style={styles.btn1} onPress={register}>
                    <Text style={styles.btnText}>REGISTER</Text>
                </TouchableOpacity>
                </View>
                <View style={{ height: 5, width: 40}}></View>
            </View>
            </KeyboardAvoidingView>
        </ImageBackground>

    )
}

export default RegisterNew

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
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