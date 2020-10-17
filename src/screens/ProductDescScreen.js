import Axios from 'axios';
import React from 'react'
import { AsyncStorage, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class ProductDescScreen extends React.Component{
    state = {
        name: null,
        img: null,
        price: null,
        description: []
    }

    Order(){
        Axios.post()
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const category = navigation.getParam('category');
        const img = navigation.getParam('img');
        const price = navigation.getParam('price');
        const name = navigation.getParam('name')
        this.props.navigation.navigate('PlaceOrder',{
            pdt_id: id,
            pdt_name: name,
            pdt_category: category,
            pdt_img: img,
            pdt_price: price
        })
    }

    componentDidMount(){
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        Axios.post("http://192.168.43.55:8080/retriveproduct",{
            product_id: id
        })
        .then((res)=>{
            this.setState({
                name: res.data.name,
                img: `data:image/jpg;base64,${res.data.data}`,
                price: res.data.price,
                description: res.data.description
            })
        })
    }
    render(){
        const arr = this.state.description
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{alignItems:'center',borderBottomWidth:0.5,borderColor:'grey'}}>
                    <Image 
                        source={{ uri : this.state.img}}
                        style={styles.img}
                    />
                </View>
                <View style={{borderBottomWidth:0.5,borderColor:'grey'}} >
                    <Text style={styles.text1}>{this.state.name}</Text>
                    <Text style={styles.text2}>Rs.{this.state.price}/-</Text>
                    <Text style={styles.text3}>Rs.{this.state.price-1000}/-</Text>
                </View>
                <ScrollView>
                    <Text style={{fontFamily:'Jost-SemiBold',fontSize:20,margin:10,marginBottom:0,textTransform:'uppercase',color:'grey',textDecorationLine:'underline'}}>Specifications</Text>
                    {arr && arr.map((_,i)=>(
                        <View style={styles.desc}>
                            <Text style={styles.desctext}>{arr[i].title}</Text>
                            <Text style={[styles.desctext,{color:'grey',textTransform:'none',width:((Dimensions.get('window').width-20))-((Dimensions.get('window').width-20)/3)}]}>{arr[i].desc.split('--').join('\n')}</Text>
                        </View>                           
                    ))}
                </ScrollView>
                <View style={{position:'relative',bottom:0,flexDirection:'row'}}>
                    <TouchableOpacity>
                        <View style={[styles.button,{backgroundColor:'white'}]}><Text style={[styles.buttontext,{color:'grey'}]}>Add to cart</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.Order()
                    }}>
                        <View style={[styles.button]}><Text style={[styles.buttontext,{color:'white'}]}>Buy now</Text></View>
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
    text3:{
        fontFamily:'Jost-SemiBold',
        fontSize:20,
        color:'grey',
        textDecorationLine:'line-through',
        paddingHorizontal:10,
        paddingBottom:5
        },
    button:{
        width:Dimensions.get('window').width/2,
        height:50,
        backgroundColor:'rgb(58, 117, 254)',
        borderColor:'grey',
        borderWidth:0.5,
        justifyContent:'center'
    },
    buttontext:{
        fontFamily:'Jost-SemiBold',
        fontSize:18,
        textAlign:'center',
        textTransform:'capitalize'
    },
    desc:{
        flexDirection:'row',
        justifyContent:'center',
        width:Dimensions.get('window').width,
        marginVertical:10
    },
    desctext:{
        width:(Dimensions.get('window').width-20)/3,
        fontFamily:'Jost-Regular',
        fontSize:18,
        color:'rgb(58, 117, 254)',
        textTransform:'capitalize'
    }
})