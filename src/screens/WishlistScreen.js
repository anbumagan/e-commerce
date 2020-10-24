import Axios from 'axios'
import React from 'react'
import { AsyncStorage, BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header';

export default class WishlistScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            wish:[],
            userId:null
        }
    }
    removeWish(id){
        var i = this.state.wish.findIndex(x=>x.id === id)
        this.setState({
            wish: this.state.wish.slice(0,i).concat(this.state.wish.slice(i+1,this.state.wish.length))
        })
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://18.218.166.188:8080/removewishlist",{
                id:res,
                product_id: id
            })
            .then((res1)=>{
                ToastAndroid.show(res1.data.message,ToastAndroid.SHORT)
            })
        })
    }
    componentDidMount() {
        this.subs = this.props.navigation.addListener("didFocus", () =>
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://18.218.166.188:8080/retrivewishlist",{
                id:res
            }).then((res1)=>{
                var arr = []
                for(var i=0;i<res1.data.length;i++){
                    Axios.post("http://18.218.166.188:8080/retriveproduct",{
                        product_id: res1.data[i].product_id
                    })
                    .then((res2)=>{
                        arr.push({
                            "id": res2.data._id,
                            "name": res2.data.name,
                            "img": res2.data.data,
                            "price": res2.data.price,
                            "category": res2.data.category
                        })
                        this.setState({
                            wish: arr
                        })
                    })
                }
            })
        })            );
      }
    componentWillUnmount(){
        BackHandler.removeEventListener(this.subs);
    }
    render(){
        if(this.state.wish.length != 0){
            return(
                <View style={{flex:1,backgroundColor:'white'}}>
                    <Header {...this.props}/>
                    <FlatList
                        data={this.state.wish}
                        renderItem={({item})=>{
                            return(
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('ProdDesc',{
                                    id: item.id,
                                    category: item.category,
                                    img: item.img,
                                    price: item.price,
                                    name: item.name
                                })
                            }}>
                            <View style={styles.cont}>
                                <View style={{width:(Dimensions.get('window').width-10)/4}}>
                                    <Image source={{uri: item.img}} style={styles.img} />
                                </View>
                                <View style={{width:(Dimensions.get('window').width-10)/3}}>
                                    <View><Text style={styles.text1}>{item.name}</Text></View>
                                </View>
                                <View style={{width:(Dimensions.get('window').width-10)/4}}>
                                    <View><Text style={styles.text2}>Rs.{item.price}/-</Text></View>
                                </View>
                                <View style={{width:(Dimensions.get('window').width-10)/10}}>
                                    <TouchableOpacity onPress={()=>{this.removeWish(item.id)}}>
                                        <Image style={{width:25,height:25,resizeMode:'stretch'}} source={require('../../assets/icons/delete.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </TouchableOpacity>)
                        }}
                        keyExtractor={(item)=>item.id}
                        numColumns={1}
                    />
                </View>
            )
        }else{
            return(
                
                <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                    <View style={{position:'absolute',top:0}}><Header {...this.props}/></View>
                    <Text style={styles.text2}>No more items in wishlist</Text>
                </View>
            )
        }
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