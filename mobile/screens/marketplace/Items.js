import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import Star from './Star';
import {getProducts} from "../../store/actions/products";
class Items extends Component{
    componentDidMount() {
        this.props.getProducts();
    }
    render(){
        const { name,trusted, onPress } = this.props;
        const { products } = this.props.products;
import {connect} from "react-redux";

class Items extends Component{
    componentDidMount() {
        this.props.getProducts(this.props.name);
    }
    componentDidUpdate(prevProps){ 
        if(prevProps.name !== this.props.name)
        { 
            this.props.getProducts();
        }
    }

    render(){
        const { name,trusted, onPress } = this.props;
        const { products } = this.props.products;
        let filterProducts = products.filter(p => {
            return p.company === name}
        )
        console.log(filterProducts);
        return(
            <View>
                <View style={styles.title}>
                    <Text style={styles.company}>{name}</Text>
                    {trusted ? <Text style={styles.trusted}>superseller</Text> : <Text></Text>}
                </View>
                
                <ScrollView style={styles.container} horizontal={true}>
                    {filterProducts.map(item => {
                        return(
                            <TouchableOpacity style={styles.card} key={item.id} onPress={() => onPress(item)}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        style={styles.image}
                                        source={{uri : item.img}}
                                    />  
                                </View>
                                <View>
                                    <Text style={styles.text}>{item.title}</Text>
                                    <View style={styles.description}>
                                        <Text style={styles.price}>HKD &nbsp;{item.price}</Text>
                                        <View style={styles.rating}>
                                            <Star rating={item.rating}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                        
                    })}
                </ScrollView>
            </View>
            
        )
    }
}
const mapStateToProps = (state) => {
    return{
        ...state
    }
}
export default connect(mapStateToProps, {getProducts})(Items);

const styles = StyleSheet.create({
    title : {
        padding : 5,
        display : 'flex',
        flexDirection : 'row'
    },
    company : {
        fontSize : 20,
        color : 'grey',
        fontWeight : 'bold',
        alignSelf : 'center'
    },
    trusted : {
        alignSelf : 'center',
        fontSize : 20,
        color : 'green',
        borderWidth : 0.5,
        borderColor : 'green',
        borderRadius : 5,
        padding : 2.5,
        marginLeft : 10
    },
    container : {
        display : 'flex',
        flexDirection : 'row',
    },
    card : {
        width : 250,
        height : 200,
        padding : 0,
        margin : 10,
    },
    imageContainer : {
        height : '70%',
        borderTopRightRadius : 15,
        borderTopLeftRadius : 15
    },
    image : {
        width : '100%',
        height : "100%",
        flex : 1,
        borderRadius : 5
    },
    text : {
        fontSize : 24
    },
    description : {
        display : 'flex',
        flexDirection : 'row',
        width : 250,
    },
    price : {
        width : '75%',
        alignSelf : 'flex-start',
        fontWeight : 'bold'
    },
    rating : {
        width : '25%',
    }
})