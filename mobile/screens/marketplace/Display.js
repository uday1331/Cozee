import React,{ Component } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native'; 
import Items from './Items';

const companies = [
    {
        id : 1,
        name : 'Beautiful House',
        trusted : true
    },
    {
        id : 2,
        name : 'Idea',
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
    navigate = (item) => {
        const { navigation } = this.props;
        navigation.navigate('Furniture', {
            item
        });
    }
    render(){
        return(
            <View>
                <ScrollView>
                {companies.map(company => {
                    return <Items style={styles.list} key={company.id} name={company.name} trusted={company.trusted} onPress={(item)=>this.navigate(item)}/>
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