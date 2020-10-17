import Axios from 'axios';
import React from 'react'
import { Alert, AsyncStorage, Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class PlaceOrderScreen extends React.Component{
    state={
        fn:null,
        ln: null,
        addr: null,
        mobile: null,
        city:null,
        pin: null,dist:null,
        formStatus: false
    }
    updateAddr(){
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://192.168.43.55:8080/api/updatecustomerdetails",{
                id: res,
                fn: this.state.fn,
                ln:  this.state.ln,
                addr:  this.state.addr,
                mobile:  this.state.mobile,
                city: this.state.city,
                pin:  this.state.pin,
                dist: this.state.dist
            }).then((res1)=>{
                Alert.alert(res1.data.message)
                this.setState({
                    formStatus: true
                })
            })
        })
    }
    componentDidMount(){
        AsyncStorage.getItem('userId').then((res)=>{
            Axios.post("http://192.168.43.55:8080/api/customerdetails",{
                id: res
            }).then((res1)=>{
                if(res1.data[0].first_name !== undefined){
                this.setState({
                fn:res1.data[0].first_name,
                ln: res1.data[0].last_name,
                addr: res1.data[0].address,
                mobile: res1.data[0].mobile_no,
                city:res1.data[0].city,
                pin: res1.data[0].pincode,
                dist:res1.data[0].district,
                formStatus: true
            })}
            else{
                this.setState({
                    formStatus: false
                })
            }
            })
        })
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
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{flex:1,backgroundColor:'white',position:'relative',bottom:0}}>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={styles.text1}>{pdt_name}</Text>
                            <Text style={styles.text2}>Rs.{pdt_price}/-</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Image source={{uri: pdt_img}} style={styles.img}></Image>
                        </View>
                    </View>
                    {this.state.formStatus === false ? 
                    <View>
                        <ScrollView style={{height:200}}>
                            <Text style={[styles.text1,{color:'black'}]}>enter your address</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> first name </Text>
                                    <TextInput
                                    value={this.state.fn}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({fn: text})}}
                                    />
                                </View>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> last name </Text>
                                    <TextInput
                                    value={this.state.ln}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({ln: text})}}
                                    />
                                </View>
                            </View>
                            <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-20)}]}>
                                <Text style={styles.legend}> address line 1 </Text>
                                <TextInput
                                    value={this.state.addr}
                                    onChangeText = {(text)=>{this.setState({addr: text})}}
                                />
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> city </Text>
                                    <TextInput
                                    value={this.state.city}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({city: text})}}
                                    />
                                </View>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> district </Text>
                                    <TextInput
                                    value={this.state.dist}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({dist: text})}}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> PIN code </Text>
                                    <TextInput
                                    value={this.state.pin}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({pin: text})}}
                                    />
                                </View>
                                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                                    <Text style={styles.legend}> mobile no </Text>
                                    <TextInput
                                    value={this.state.mobile}
                                    style={{width:(Dimensions.get('window').width-60)/2}}
                                    onChangeText={(text)=>{this.setState({mobile: text})}}
                                    />
                                </View>
                            </View>
                            
                        </ScrollView>
                        <TouchableOpacity onPress={()=>{this.updateAddr()}}>
                                <View style={[styles.button,{borderRadius:5,width:Dimensions.get('window').width/3,height:25,alignSelf:'center'}]}>
                                    <Text style={styles.buttontext}>Update address</Text>
                                </View>
                        </TouchableOpacity>
                </View> : 
                    <View>
                        <Text style={[styles.text1,{color:'black'}]}>Customer details</Text>
                        <Text style={styles.text3}>{this.state.fn+" "+this.state.ln}</Text>
                        <Text style={styles.text3}>{this.state.addr}</Text>
                        <Text style={styles.text3}>{this.state.city}</Text>
                        <Text style={styles.text3}>{this.state.dist}</Text>
                        <Text style={styles.text3}>{this.state.pin}</Text>
                        <TouchableOpacity onPress={()=>{this.setState({formStatus: false})}}>
                            <View style={[styles.button,{borderRadius:5,width:Dimensions.get('window').width/3,height:25,alignSelf:'center',margin:10}]}>
                                <Text style={styles.buttontext}>Update or Add address</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                <View style={{position:'absolute',bottom:0}}>
                    <TouchableOpacity onPress={()=>{this.placeOrder()}}>
                        <View style={styles.button}>
                            <Text style={[styles.buttontext,{fontSize:20}]}>Proceed to buy</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.text1,{color:'black'}]}>payment mode</Text>
                    <Text style={styles.text3}>sorry only cash on delivery available!</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    img:{
        width: (Dimensions.get('window').width-20)/3,
        height:(Dimensions.get('window').width-20)/3,
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
        fontSize:16,
        fontFamily:"Jost-Regular",
        marginVertical:5,
        marginHorizontal:20,
        color:'grey',
        textTransform:'capitalize'
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
        color:'white',
        textAlign:'center'
    },
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
        fontFamily:'Jost-Regular',
        textTransform:'capitalize'
    },
})