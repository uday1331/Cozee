import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableHighlight } from 'react-native';
import PreviewDisplay from './PreviewDisplay';
import { AntDesign } from '@expo/vector-icons';

const Preview = () => {
    const [previewCount, setCount] = useState(1);
    const [currentRoom, setCurrentRoom] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const previewDisplays = [];

    for (let i = 0; i < previewCount; i++) {
        previewDisplays.push(i);
    }

    if (currentRoom == "") {
        setModalVisible(true);
        setCurrentRoom("bleh");
    }

    return(
        <View style={{ flex: 1, flexDirection: "row" }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <TouchableHighlight
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setCurrentRoom("bedroom");
                        }}>
                        <Text>Close Modal</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Text style={{ marginBottom: 4, fontSize: 12 }}>{currentRoom}</Text>
            {
                previewDisplays.map(item => {
                    return(
                        <PreviewDisplay />
                    );
                })
            }
            <TouchableOpacity onPress={() => {setCount(previewCount + 1)}} activeOpacity={0}
                style={{ marginTop: 8 }}>
                <AntDesign name="plus" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default Preview;