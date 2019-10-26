import React, {Component} from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Assets from '../../assets';

export default class Furniture extends Component {
    state = {
        liked : false
    }

    onLikePress = () => {
        const { liked } = this.state;
        this.setState({
            liked : !liked
        })
    }

    tryInAR = () => {
        this.props.navigation.navigate('Design', {
            selectedItem: Assets.models.stool
        });
    }

    render() {
        const { liked } = this.state;
        const item = this.props.navigation.getParam('item', {});
        return (
            <ScrollView>
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                            <Left>
                                <Body>
                                <Text style={styles.company}>{item.title}</Text>
                                <View style={styles.address}>
                                    <Entypo name='location' size={15}/>
                                    <Text style={{marginLeft : 5}} note>Cyberport 3, Hong Kong</Text>
                                </View>
                                </Body>
                            </Left>
                            <Right>
                                <Button onPress={() => {this.tryInAR()}} bordered info>
                                    <MaterialCommunityIcons color='#4da6ff' name='augmented-reality' size = {25} style={{marginLeft : 5}}/>
                                    <Text>Try It</Text>
                                </Button>
                            </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{uri:item.img}} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                            <Left>
                                <Button  onPress={this.onLikePress} transparent>
                                    {liked ? <FontAwesome name='thumbs-up' size={15} color='#4da6ff'/> : <FontAwesome name='thumbs-o-up' size = {15} color='#4da6ff'/>}
                                    <Text style={{color : '#4da6ff'}}>{liked ? 'You and 12 others liked this' : '12 Likes'}</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent>
                                    <FontAwesome name='comment' size={15} color = '#4da6ff'/>
                                    <Text style={{color : '#4da6ff'}}>7 Comments</Text>
                                </Button>
                            </Right>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    company : {
        fontSize : 24,
        fontWeight : 'bold',
        paddingBottom : 10
    },
    address : {
        display : 'flex', 
        flexDirection : 'row',
        alignItems : 'center',
        paddingBottom : 10
    },
    button : {
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor: 'white',
        width: 200
    },
    container:{
        alignItems:'center',
        backgroundColor: '#ede3f2',
        padding: 100
    },
    modal:{
    },

    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },

})




{/* <View>
    //     <Modal */}
    //       animationType="slide"
    //       transparent={false}
    //       visible={modalVisible}
    //       onRequestClose={() => {
    //         Alert.alert('Modal has been closed.');
    //       }}>
          
    //       <View>
    //         <View>
    //           <Card>
    //             <CardItem>
    //               <Left>
    //                 <Body>
    //                   <Text>NativeBase</Text>
    //                   <Text note>GeekyAnts</Text>
    //                 </Body>
    //               </Left>
    //             </CardItem>
    //             <CardItem cardBody>
    //               <Image source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}} style={{height: 200, width: null, flex: 1}}/>
    //             </CardItem>
    //             <CardItem>
    //               <Left>
    //                 <Text>This is the item</Text>
    //               </Left>
    //             </CardItem>
    //           </Card>
    //           <TouchableHighlight
    //             onPress={() => {
    //               this.setModalVisible(!modalVisible);
    //             }}
    //             style={styles.button}
    //             >
    //             <Text>Hide Modal</Text>
    //           </TouchableHighlight>
    //         </View>
    //       </View>
    //     </Modal>

    //     <TouchableHighlight
    //       onPress={() => {
    //         this.setModalVisible(true);
    //       }}>
    //       <Text>Show Modal</Text>
    //     </TouchableHighlight>
    //   </View>