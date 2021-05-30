import React, { useState, useLayoutEffect } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../firebase';

export default function RegisterScreen({navigation}) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });
        })
        .catch((error) => {alert(error.message)});
    };

    return (
        <ScrollView centerContent={true}>
                <View style={styles.scrollContainer}>
                <View style={{height: '100%' ,width: '100%' }}>   
        
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 styles={{marginBottom: 50}}>
                Create a new Account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" 
                    autoFocus value={name} 
                    onChangeText={(text) =>{setName(text)}}
                />
                <Input placeholder="Email" 
                    autoFocus value={email} type="email" 
                    onChangeText={(text) =>{setEmail(text)}}
                />
                <Input placeholder="Password" 
                    autoFocus value={password} secureTextEntry 
                    onChangeText={(text) =>{setPassword(text)}}
                />
                <Input placeholder="Profile Pic URL (optional)" 
                    autoFocus value={imageUrl} 
                    onChangeText={(text) =>{setImageUrl(text)}}
                    onSubmitEditing={register}
                />
             
            </View>
            <Button containerStyle={styles.button} raised onPress={register} title="Register" />
            <View style={{ height: 100}}></View>
        </KeyboardAvoidingView>
        </View>
        </View>
        </ScrollView>
    )
}

// use containerStyle for react-native-elements

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200, 
        marginTop: 10,
    },
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}); 