import React from 'react';
import { View, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { pics } from './values/Values';

const UploadScreen = ({navigation}) => {

    const pickFromGallery = async() => {
        const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (granted ) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            });
            
            // console.log(data);
            if (!data.cancelled) {
                data.date = (new Date()).toString();
                data.name = '';
                data.description = '';
                pic = data;
                pics.push(data);
                navigation.replace('Add Photo Description',{pic, edit: false});
            }
            
        }
        else {
            Alert.alert('Need Permissions To Work.');
        }
    }

    const pickFromCamera = async() => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA);
        if (granted ) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            });
            // console.log(pics);
            if (!data.cancelled) {
                data.date = (new Date()).toString();
                data.name = '';
                data.description = '';
                pics.push(data);
                pic = data
                navigation.replace('Add Photo Description',{pic, edit: false});
            }
        }
        else {
            Alert.alert('Need Permissions To Work.');
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={pickFromGallery}>
                <MaterialCommunityIcons name="folder-upload-outline" size={24} color="white" />
                <Text style={styles.btnText}>GALLERY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={pickFromCamera}>
                <Entypo name="camera" size={24} color="white" />
                <Text style={styles.btnText}>CAMERA</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: 200,
        height: 40,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#242f3f',
        borderRadius: 5,
    },
    btnText: {
        paddingLeft: 10,
        color: 'white'
    },
});