import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { auth } from '../firebase';
import * as firebase from 'firebase';
 
const LoginScreen = ({navigation}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                navigation.replace("Home");
            }
        });
    }, []);

    const provider = new firebase.auth.GoogleAuthProvider();

    const signIn = () => {
        // navigation.replace("Home");
        auth.signInWithEmailAndPassword(email, password).
        catch((error) => {alert(error)})
    };

    const signInWithGoogle = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((res) =>{
            console.log(res.credential);
        }).catch((err)=>{
            alert(err);
        })
    };
    
    return (
            <ScrollView centerContent={true}>
                <View style={{ height: '80%', width: '100%' }}>
                <View style={styles.scrollContainer}>
                    <StatusBar style="light" />
            
        <View style={{ height: 300, width: '100%' }}>
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>        
        <Image 
            sources={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/NBC_Peacock_1986.svg/1200px-NBC_Peacock_1986.svg.png"
            }}
            style={{
                // position: 'relative',
                // top: 30,
                width: 200, height: 200
            }}
        />
        </View>
        </View>
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
        <View style={styles.inputContainer}>
            <Input placeholder="Email" autoFocus type="Email" value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input placeholder="Password" secureTextEntry type="password" value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing = {signIn}
            />
        </View>
            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button containerStyle={[styles.button, {backgroundColor: 'white'}]}  type="outline" title="Register" onPress={()=>{navigation.navigate("Register")}} />
            <Button containerStyle={styles.button} title="Login With Gmail" onPress={signInWithGoogle} />
            <View style={{height:100}}></View>
            </KeyboardAvoidingView>
            </View>
            </View>
            </ScrollView>
        


    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    innerContainer: {
        flex: 1,
        top: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
    },  
    inputContainer: {
        width: 300,
        position: 'relative',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
