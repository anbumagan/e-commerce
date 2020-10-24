import Axios from 'axios'
import React from 'react'
import { AsyncStorage, BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'

export default class OrdersScreen extends React.Component{
    state={
        orders:[]
    }
    componentWillMount(){
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://18.218.166.188:8080/retriveorders",{
                id:res
            }).then((res1)=>{
                var arr=[]
                for(var i=0;i<res1.data.length;i++){
                    var d = res1.data[i].deliverstatus
                    var p = res1.data[i].paymentMode
                    var date = res1.data[i].date
                    Axios.post("http://18.218.166.188:8080/retriveproduct",{
                        product_id: res1.data[i].product_id
                    }).then((res2)=>{
                        arr.push({
                            "id": res2.data._id,
                            "name": res2.data.name,
                            "img": res2.data.data,
                            "price": res2.data.price,
                            "category": res2.data.category,
                            "deliverstatus":d,
                            "paymentMode":p,
                            "date": date  
                        })
                        this.setState({
                            orders: arr
                        })
                    })
                }
            })
        })
        this.subs = this.props.navigation.addListener("didFocus",()=>{
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://18.218.166.188:8080/retriveorders",{
                id:res
            }).then((res1)=>{
                var arr=[]
                for(var i=0;i<res1.data.length;i++){
                    var d = res1.data[i].deliverstatus
                    var p = res1.data[i].paymentMode
                    var date = res1.data[i].date
                    Axios.post("http://18.218.166.188:8080/retriveproduct",{
                        product_id: res1.data[i].product_id
                    }).then((res2)=>{
                        arr.push({
                            "id": res2.data._id,
                            "name": res2.data.name,
                            "img": res2.data.data,
                            "price": res2.data.price,
                            "category": res2.data.category,
                            "deliverstatus":d,
                            "paymentMode":p,
                            "date": date  
                        })
                        this.setState({
                            orders: arr
                        })
                    })
                }
            })
        })
    })
    }
    componentWillUnmount(){
       this.subs.remove()
    }
    render(){
        return(
            <View>
                <Header {...this.props}/>
                <FlatList 
                    data={this.state.orders}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('ProdDesc',{
                                    id: item.id,
                                    category: item.category,
                                    img: item.img,
                                    price: item.price,
                                    name: item.name,
                                    deliverstatus: item.deliverstatus,
                                    paymentMode: item.paymentMode
                                })
                            }}>
                            <View style={styles.cont}>
                                <View style={{width:(Dimensions.get('window').width-10)/3}}>
                                    <Image source={{uri: item.img}} style={styles.img} />
                                </View>
                                <View style={{width:(Dimensions.get('window').width-10)/3,flexDirection:'column',justifyContent:'flex-start'}}>
                                    <View><Text style={styles.text1}>{item.name}</Text></View>
                                    <View><Text style={styles.text2}>Rs.{item.price}/-</Text></View>
                                </View>
                                <View style={{width:(Dimensions.get('window').width-10)/3}}>
                                <View><Text style={[styles.text1,{color:'red',textAlign:'center'}]}>{item.deliverstatus}</Text></View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                    numColumns={1}
                />
            </View>
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
/**
 * <ScrollView style={{flex:1,backgroundColor:'white'}}>
                <Text>ADD ADDRESS AND PHONE NO</Text>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> first name </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> last name </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                </View>
                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-20)}]}>
                    <Text style={styles.legend}> address line 1 </Text>
                    <TextInput
                        value = {this.state.pass}
                        onChangeText = {(text)=>{this.setState({pass: text})}}
                    />
                </View>
                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-20)}]}>
                    <Text style={styles.legend}> address line 2(optional) </Text>
                    <TextInput
                        value = {this.state.pass}
                        onChangeText = {(text)=>{this.setState({pass: text})}}
                    />
                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> PIN code </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> mobile no </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                </View> 
            </ScrollView>


                fieldSet:{
        justifyContent:'center',
        alignSelf:'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#FFFFFF',
        color:'grey',
        fontFamily:'Jost-Regular'
    },
 */