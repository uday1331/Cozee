import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function Star(props){
    return(
        <View style={styles.container}>
            <View style={styles.rating}>
                <Image 
                    source = {{uri : 'https://clipart.info/images/ccovers/1495916677round-star-png-image-yellow.png'}}
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