import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import Star from './Star';
import {getProducts} from "../../store/actions/products";

// const items = [
//     {
//         id : 1,
//         uri : 'https://www.fantasticfurniture.com.au/medias/BTOBEDDBLOOOFABCHA-LIF-CONTAINER-original-FantasticFurniture-WF-Product-Detail?context=bWFzdGVyfGltYWdlcy9CVE9CRUREQkxPT09GQUJDSEF8MTE4NTAwfGltYWdlL2pwZWd8aW1hZ2VzL0JUT0JFRERCTE9PT0ZBQkNIQS9oOGIvaDUwLzkwNjA4MjMzMDIxNzQuanBnfDAwOTZiZTA2OTU0MjI1NDBkZWM1MGVhNjBkZjYxZjdjYmRkMGFiMGVjM2I3ZmEwYjAxMmI1YjVkNzU2YTEyNzU',
//         name : 'Fancy King size bed',
//         rating : 3.1,
//         price : '$5,042 HKD'
//     },
//     {
//         id : 2,
//         uri : 'https://www.mocka.co.nz/media/product/69/darcy-bed-c7-x.jpg',
//         name : 'Bed for kids',
//         rating : 4.5,
//         price : '$4,073 HKD'
//     },
//     {
//         id : 3,
//         uri : 'https://images-na.ssl-images-amazon.com/images/I/51lMjmAvTkL.jpg',
//         name : 'Warm lamp for study',
//         rating : 2.7,
//         price : '$1,200 HKD'
//     },
//     {
//         id : 4,
//         uri : 'https://images-na.ssl-images-amazon.com/images/I/71vz%2BhxlG9L._SX425_.jpg',
//         name : 'Sofa',
//         rating : 4.9,
//         price : '$12,340 HKD'
//     },
//     {
//         id : 5,
//         uri : 'https://i.ebayimg.com/images/g/Z68AAOSwdoZaeG1G/s-l640.jpg',
//         name : 'Drawer',
//         rating : 4.3,
//         price : '$5,060 HKD'
//     },
//
// ]
class Items extends Component{
    componentDidMount() {
        this.props.getProducts();
    }

    render(){
        const { name,trusted, onPress } = this.props;
        const { products } = this.props.products;
        return(
            <View>
                <View style={styles.title}>
                    <Text style={styles.company}>{name}</Text>
                    {trusted ? <Text style={styles.trusted}>superseller</Text> : <Text></Text>}
                </View>
                
                <ScrollView style={styles.container} horizontal={true}>
                    {products.map(item => {
                        return(
                            <TouchableOpacity style={styles.card} key={item.id} onPress={()=>{onPress()}}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        style={styles.image}
                                        source={{uri : item.uri}}
                                    />  
                                </View>
                                <View>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <View style={styles.description}>
                                        <Text style={styles.price}>{item.price}</Text>
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