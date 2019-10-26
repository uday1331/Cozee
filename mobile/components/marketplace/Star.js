import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function Star(props){
    return(
        <View style={styles.container}>
            <View style={styles.rating}>
                <Image 
                    source = {{uri : 'http://pluspng.com/img-png/yellow-stars-png-hd-hd-quality-wallpaper-collection-pattern-2000x2000-star-2000.png'}}
                    style = {styles.star}
                />
                <Text>{props.rating}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'flex-end'
    },  
    rating : {
        display : 'flex',
        flexDirection : 'row'
    },
    star : {
        height : 15,
        width : 15
    }
})