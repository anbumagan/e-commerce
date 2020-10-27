import Axios from 'axios';
import React from 'react';
import { AsyncStorage, View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, Dimensions, Image, TouchableOpacity  } from 'react-native';
export default class LoginScreen extends React.Component{
  state = {
    email: null,
    pass: null
  }
  SignIn(){
    Axios.post("http://192.168.225.123:8000/api/login",{
      email: this.state.email,
      password: this.state.pass
    })
    .then((res)=>{
      AsyncStorage.setItem('userId', res.data.identifier);
      console.log(res.data.identifier)
      AsyncStorage.setItem('userToken', res.data.token);
      this.props.navigation.navigate('Home')
    })
  }
  render(){
    return (
        <View style={{flex:1}}>
              <View style={{height:100,justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:"rgb(58, 117, 254)"}}>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{textAlign:'center',color:'white',fontSize:22,fontFamily:'Jost-SemiBold'}}>ANAND & CO  </Text>
                  </View>
              </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={-550}
                    style={styles.container}
                >           
                    <View style={{marginTop:15}}>
                    <Text style={{textAlign:'left',margin:15,fontFamily:'Jost-Medium',color:'grey',fontSize:16}}>Log in to proceed</Text>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}> Email </Text>
                        <TextInput
                          value={this.state.email}
                          onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View> 
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}> Password </Text>
                        <TextInput
                          value = {this.state.pass}
                          onChangeText = {(text)=>{this.setState({pass: text})}}
                        />
                    </View> 
                    <View style={{flexDirection:"row",justifyContent:'flex-end',marginRight:15}}>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Reg')}}>
                      <Text style={{fontFamily:'Jost-Medium',color:'grey',fontSize:14}}>New user? Register here!</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.inner}>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity onPress={()=>{this.SignIn()}}>
                        <View style={{backgroundColor:'rgb(58, 117, 254)',padding:10,borderRadius:5}}>
                          <Text style={styles.buttontext}>LOG IN</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
    }
} 
const styles = StyleSheet.create({
      container: {
        backgroundColor:'white',
        position:'absolute',
        bottom:0,
        top:80,
        left:0,right:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
      },
      inner: {
        position:'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
      },
      header: {
        textAlign:'center',
        fontSize: 30,
      },
      fieldSet:{
        justifyContent:'center',
        alignSelf:'center',
        width:Dimensions.get('window').width-30,
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
    btnContainer: {
        width:Dimensions.get('window').width,
        padding:10
    },
    buttontext:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontFamily:'Jost-Medium'
    }
})