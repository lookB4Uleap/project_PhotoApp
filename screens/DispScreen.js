import { auth } from 'firebase';
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { pics } from './values/Values';
import * as firebase from 'firebase';
import axios from 'axios';

const DispScreen = ({navigation}) => {
    let row = [1,2,3];
    let images = [];
    

    const viewPic = (pic) => {
        navigation.navigate('Photo Description',{pic});
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                
                <View style={styles.inner}>
                {
                    pics.length === 0 ? <View style={styles.centreText}><Text style={{fontSize: 20}}>No Pics Available</Text></View> :
                    pics.map((img) =>
                        <TouchableOpacity key={img.date} styles={styles.imageContainer} onPress={() => viewPic(img)}>
                            <Image 
                            style={styles.image}
                            source={{uri:img.uri}}
                            />
                        </TouchableOpacity>
                    )
                }
                </View>
    
            </ScrollView>
        </SafeAreaView>
    )
}

export default DispScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'
    },
    inner: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingLeft: 10,
        padding: 5
    },
    imageContainer: {
        width: 100,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 1
    },
    centreText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
