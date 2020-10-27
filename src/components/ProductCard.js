import Axios from 'axios';
import React from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default class ProductCard extends React.Component{
    addToWish(){
        const {id,category} = this.props.item;
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://192.168.225.123:8000/addtowishlist",{
                id: res,
                product_id: id,
                category: category
            }).then((res1)=>{
                ToastAndroid.show(res1.data.message,ToastAndroid.SHORT)
            })
        })
    }
    render(){
        const {id,name,img,price,category} = this.props.item;
        return(
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('ProdDesc',{
                    id: id,
                    category: category,
                    img: img,
                    price: price,
                    name: name
                })
            }}>
            <View style={styles.cont}>
                <View style={{width:(Dimensions.get('window').width-10)/4}}>
                    <Image source={{uri: img}} style={styles.img} />
                </View>
                <View style={{width:(Dimensions.get('window').width-10)/3}}>
                    <View><Text style={styles.text1}>{name}</Text></View>
                </View>
                <View style={{width:(Dimensions.get('window').width-10)/4}}>
                    <View><Text style={styles.text2}>Rs.{price}/-</Text></View>
                </View>
                <View style={{width:(Dimensions.get('window').width-10)/10}}>
                    <TouchableOpacity onPress={()=>{this.addToWish()}}>
                    <Image style={{width:25,height:25,resizeMode:'stretch'}} source={require('../../assets/icons/wish-list.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cont:{
        height:(Dimensions.get('window').width-10)/4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        width: Dimensions.get('window').width,
    },
    img:{
        width:(Dimensions.get('window').width)/4,
        height:(Dimensions.get('window').width)/4,
        resizeMode:'contain'
    },
    text1:{
        fontFamily:'Jost-SemiBold',
        textAlign:'left',
        paddingLeft:10,
        textTransform:'capitalize',
        fontSize:16,
        color:'grey'
    },
    text2:{
        fontFamily:'Jost-SemiBold',
        textAlign:'left',
        fontSize:18
    }
})