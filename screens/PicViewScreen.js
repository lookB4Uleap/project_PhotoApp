import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { auth } from 'firebase';

const PicViewScreen = ({ route,navigation }) => {
    
    const {pic} = route.params;
    console.log(pic);

    
    const editDescription = () => {
        navigation.replace('Add Photo Description', {pic, edit:true});
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: pic.uri}} style={styles.image} />
            <Text style={styles.text}>Title : {pic.name === "" ? "N/A" : pic.name}</Text>
            <Text style={styles.text}>Description : {pic.description === "" ? "N/A" : pic.description}</Text>
            <Text style={styles.text}>Upload Date : {pic.date.slice(0,24)}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={editDescription}>
                <Feather name="edit" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default PicViewScreen

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 300,
        width: 300,
    },
    text: {
        fontSize: 16,
        flexWrap: 'wrap',
        width: '85%',
    },
    editBtn: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 72,
        height: 72,
        backgroundColor: '#242f3f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        elevation: 5,
    }
})
