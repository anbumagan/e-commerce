import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class MostBuyedCard extends React.Component{
    render(){
        const {_id,price,name,highlights,data,category} = this.props;
        return(
            <View style={{borderColor:'grey',borderWidth:0.5,marginBottom:5,borderRadius:5}}>
                <View style={styles.imgtext}>
                    <Image source={{uri: data}} style={styles.img}/>
                    <Text style={styles.title1}>{name}</Text>
                </View>
                <View style={styles.descprice}>
                    <View style={{width:(Dimensions.get('window').width-150),padding:5,borderRightWidth:0.5,borderRightColor:'grey'}}>
                        <Text style={styles.title2}>{highlights}</Text>
                    </View>
                    <View style={{width:145,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.title3}>Rs.{price}/-</Text>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('ProdDesc',{
                                id: _id
                            })
                        }}>
                            <View style={{borderRadius:5,width:60,height:30,backgroundColor:'rgb(58, 117, 254)',justifyContent:'center'}}><Text style={{textAlign:'center',color:'white',fontFamily:'Jost-Medium'}}>VIEW</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgtext:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey',
        borderBottomWidth:0.5,
        padding:5
    },
    img:{
        width:(Dimensions.get('window').width)-100,
        height:(Dimensions.get('window').width)/2,
        resizeMode:'contain'
    },
    title1:{
        fontFamily:"Jost-SemiBold",
        fontSize:18,
        textTransform:'capitalize',
        padding:5
    },
    title2:{
        fontFamily:"Jost-Regular",
        fontSize:16,
        textAlign:'justify',
        padding:5,
        color:'grey'
    },
    title3:{
        fontFamily:"Jost-SemiBold",
        fontSize:20,
        textTransform:'capitalize',
        padding:5
    },
    descprice:{
        flexDirection:'row'
    }
})