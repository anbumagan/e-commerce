import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

export default class CategoryCard extends React.Component{
    render(){
        const { id,title, data } = this.props.item;
        return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Prod',{category : title})}}>
            <View style={styles.cont}>
                {data && <Image source={data} style={styles.img}/>}
                <Text style={styles.text}>{title}</Text>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cont:{
        width: Dimensions.get('window').width/4,
        height: Dimensions.get('window').width/4,
        justifyContent:'center',alignItems:'center'
    },
    img:{
        width:Dimensions.get('window').width/8,
        height:Dimensions.get('window').width/8,
        resizeMode:'contain'
    },
    text:{
        fontFamily:'Jost-Medium',
        color:'grey',
        fontSize:15,
        textTransform:'capitalize'
    }
})