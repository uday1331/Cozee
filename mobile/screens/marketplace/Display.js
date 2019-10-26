import React,{ Component } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native'; 
import Items from './Items';

const companies = [
    {
        id : 1,
        name : 'IDEA',
        trusted : true
    },
    {
        id : 2,
        name : 'Homeshopie',
        trusted : false
    },
    {
        id : 3,
        name : 'Furniture Cosmos',
        trusted : false
    },
    {
        id : 4,
        name : 'ChairCharm',
        trusted : true
    },
    {
        id : 5,
        name : 'LampIt',
        trusted : false
    },
    {
        id : 6,
        name : 'Beautiful House',
        trusted : false
    }
]
export default class Display extends Component{
    render(){
        const { navigation } = this.props;
        return(
            <View>
                <ScrollView>
                {companies.map(company => {
                    return <Items style={styles.list} key={company.id} name={company.name} trusted={company.trusted} onPress={()=>{navigation.navigate('Furniture')}}/>
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