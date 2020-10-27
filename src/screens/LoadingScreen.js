import Axios from 'axios'
import React from 'react'
import { ActivityIndicator, AsyncStorage, View } from 'react-native'

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        AsyncStorage.getItem('userToken').then((res)=>{
            Axios.post("http://192.168.225.123:8000/api",{},{
                headers:{
                    'Authorization' : "Bearer "+res
                }
            }).then((res1)=>{
                if(res1.data.status === 200){
                    this.props.navigation.navigate('Home')
                }else{
                    this.props.navigation.navigate('Log')
                }
            })
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignContent:'center'}}>
                <ActivityIndicator color="rgb(58, 117, 254)" size='large'>

                </ActivityIndicator>
            </View>
        )
    }
}