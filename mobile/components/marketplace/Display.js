import React,{ Component } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native'; 
import { Header, Left, Body, Right, Title } from 'native-base';
import Items from './Items';
const companies = [
    {
        id : 1,
        name : 'Furniture King',
        trusted : true
    },
    {
        id : 2,
        name : 'Furniture King',
        trusted : false
    },
    {
        id : 3,
        name : 'Furniture King',
        trusted : false
    },
    {
        id : 4,
        name : 'Furniture King',
        trusted : true
    },
    {
        id : 5,
        name : 'Furniture King',
        trusted : false
    }
]
export default class Display extends Component{
    render(){
        return(
            <View>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Bedroom_1</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView>
                {companies.map(company => {
                    return <Items style={styles.list} key={company.id} name={company.name} trusted={company.trusted}/>
                })}
                </ScrollView>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    list : {
        marginBottom : 20
    },
    body: {
      flex: 1,
    },
  });