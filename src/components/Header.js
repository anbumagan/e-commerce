import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

export default class Header extends React.Component{
    render(){
        return(
            <View style={{flexDirection:'row',width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',height:50,borderBottomWidth:0.5,borderBottomColor:'grey'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer()}}>
                    <View style={{width:Dimensions.get('window').width/3,alignItems:'flex-start',paddingHorizontal:10}}>
                        <Image source={require('../../assets/icons/menu.png')} style={{width:25,height:25}}/>
                    </View>
                </TouchableOpacity>
                <Text style={{width:Dimensions.get('window').width/3,textAlign:'center',fontFamily:'Jost-SemiBold',fontSize:18,textTransform:'uppercase'}}>Anand & co</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('My_Orders')}}>
                    <View style={{width:Dimensions.get('window').width/3,alignItems:'flex-end',paddingHorizontal:10}}>
                        <Image source={require('../../assets/icons/order.png')} style={{width:25,height:25}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}