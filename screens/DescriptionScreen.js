import axios from 'axios';
import * as firebase from 'firebase';
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { pics } from './values/Values';

const DescriptionScreen = ({route,navigation}) => {
    
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const {pic, edit} = route.params;

    const addDescription = () => {
        const user = firebase.auth().currentUser.email;
        let i;
        let des;
        if (!edit) {
            let date = new Date();
            i = pics.length;
            i -= 1;
            // pics[i].date = date;
            des = 'Home';
        }
        else {
            for (let k=0;k<pics.length;++k) {
                if (pics[k].date === pic.date) {
                    i = k;
                }
            }
            des = 'Photos';
        }
        
        pics[i].name = title === '' ? pic.name : title;
        pics[i].description = description === '' ? pic.description : description;
        console.log('Pics',pics);
        
        axios.post('http://192.168.0.121:8081/addToCollection', {
            user: user,
            image: pics[i]
        }).then((response) => {
            console.log(response);
            navigation.navigate(des);
            console.log('Done Upload');
        }).catch((error) => {
            console.log(error);
        })
        

    }

    return (

        <ImageBackground source={(Platform.OS === 'android' || Platform.OS === 'ios') ? 
                require('./Login-Back2.jpg') : require('./Login-Back.svg')}
                style={styles.container}
            >
            <KeyboardAvoidingView
                style={styles.wrap}
                behavior={Platform.OS === 'ios' ? "padding" : "height" }
            >
            
            <View style={styles.box}>
                <View style={styles.input}>
                    <TextInput style={styles.inputbox} placeholder="Title" 
                        value={title} onChangeText={(text) => setTitle(text)}
                        placeholderTextColor='#C3C43D'
                    />
                </View>
                <View style={styles.inputDes}>
                    
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(text) => {setDescription(text)}}
                        // defaultValue={this.state.text}
                        value={description}
                        maxLength={200}
                        placeholder='Description (max 120 characters)'
                        placeholderTextColor='#C3C43D'
                        // underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={styles.row}>
                <TouchableOpacity style={styles.btn1} onPress={addDescription}>
                    <Text style={styles.btnText}>SAVE</Text>
                </TouchableOpacity>
                </View>
                {/* <View style={{ height: 5, width: 40}}></View> */}
            </View>
            </KeyboardAvoidingView>
            </ImageBackground>
    )
}

export default DescriptionScreen;

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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
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
        top: '20%',
        position: 'relative',
        height: (Platform.OS=='android'||Platform.OS=='ios')? 300 : 200,
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
        backgroundColor: '#242f3f',
        // margin: 10,
        borderRadius: 5,
    },
    inputDes: {
        height: 150,
        width: '70%',
        // backgroundColor: '#ccfff2',
        backgroundColor: '#242f3f',
        // margin: 10,
        borderRadius: 5,
    },
    textareaContainer: {
        height: 150,
        padding: 5,
        // backgroundColor: 
    },
    textarea: {
        textAlignVertical: 'top',
        color: 'white'
    },
    inputbox: {
        width: '100%',
        height: '100%',
        color: 'white',
        paddingLeft: 10,
    },
    btn1: {
        backgroundColor: '#242f3f',
        // color: '#C3C43D',
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
