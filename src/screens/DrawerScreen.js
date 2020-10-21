import React from 'react'
import { AsyncStorage, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const icons = [
    require('../../assets/icons/home.png'),
    require('../../assets/icons/order.png'),
    require('../../assets/icons/wish-list.png')
]
export default class DrawerScreen extends React.Component{
    render(){
        var arr = this.props.navigation.state.routes
        return(
            <View style={{flex:1}}>
                <View elevation={6} style={{height:200,backgroundColor:'rgb(58, 117, 254)',justifyContent:'flex-end'}}>
                    <Text style={styles.head}>Welcome to Anand & co!</Text>
                </View>
                <View>
                    {arr.map((_,i)=>(
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate(arr[i].routeName)}}>
                        <View style={styles.list}>
                            { icons[i] && <Image source={icons[i]} style={{width:25,height:25,paddingHorizontal:10}} /> }
                            <Text style={styles.text}>{arr[i].routeName.replace('_',' ')}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{position:'absolute',bottom:0,width:'100%'}}>
                    <TouchableOpacity onPress={()=>{
                        AsyncStorage.clear()
                        this.props.navigation.navigate('Log')
                    }}>
                        <View style={styles.list}>
                            <Text style={[styles.text,{}]}>Sign out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flexDirection:'row',
        height:50,
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical: 5,
        padding:10
    },
    head:{
        fontFamily:'Jost-Medium',
        fontSize:24,
        color:'white',
        padding:10,
        textTransform:'capitalize'
    },
    text:{
        fontFamily:'Jost-Medium',
        fontSize:18,
        paddingHorizontal:10
    }
})