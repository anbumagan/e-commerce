import Axios from 'axios';
import React from 'react'
import { Alert, AsyncStorage, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class PlaceOrderScreen extends React.Component{
    componentDidMount(){
    }
    placeOrder(){
        const  {navigation} = this.props;
        const pdt_id = navigation.getParam('pdt_id');
        const pdt_category = navigation.getParam('pdt_category'); 
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://192.168.43.55:8080/placeorder",{
                id: res,
                productId: pdt_id,
                category: pdt_category
            }).then((res1)=>{
                if(res1.data.status === 200){
                    Alert.alert(res1.data.message)
                    this.props.navigation.navigate('Prod')
                }else{
                    Alert.alert(res1.data.message)
                    this.props.navigation.goBack()
                }
            })
        })
    }
    render(){
        const  {navigation} = this.props;
        const pdt_price = navigation.getParam('pdt_price');
        const pdt_img = navigation.getParam('pdt_img');
        const pdt_name = navigation.getParam('pdt_name')
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{alignItems:'center',borderBottomWidth:0.5,borderColor:'grey'}}>
                    <Image source={{uri: pdt_img}} style={styles.img}></Image>
                </View>
                <View style={{alignItems:'center',borderBottomWidth:0.5,borderColor:'grey'}}>
                    <Text style={styles.text1}>{pdt_name}</Text>
                    <Text style={styles.text2}>Rs.{pdt_price}/-</Text>
                </View>
                <View>
                </View>
                <View style={{position:'absolute',bottom:0}}>
                    <TouchableOpacity onPress={()=>{this.placeOrder()}}>
                        <View style={styles.button}>
                            <Text style={styles.buttontext}>Proceed to buy</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    img:{
        width: Dimensions.get('window').width-20,
        height:(Dimensions.get('window').width-20)/1.5,
        resizeMode:'contain' 
    },
    text1:{
        fontFamily:'Jost-Regular',
        fontSize:20,
        color:'grey',
        textTransform:'capitalize',
        paddingHorizontal:10,
        paddingBottom:5,
        paddingTop:5
        },
    text2:{
        fontFamily:'Jost-SemiBold',
        fontSize:24,
        paddingHorizontal:10,
        paddingBottom:5
        }, 
    button:{
        width:Dimensions.get('window').width,
        height:50,
        backgroundColor:'rgb(58, 117, 254)',
        justifyContent:'center',
        alignItems:'center'
    },
    buttontext:{
        fontFamily: "Jost-SemiBold",
        fontSize: 20,
        color:'white'
    }
})