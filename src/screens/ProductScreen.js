import Axios from 'axios';
import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import ProductCard from '../components/ProductCard';

export default class extends React.Component{
    state={
        product:[]
    }
    componentDidMount(){
        const { navigation } = this.props;  
        const category = navigation.getParam('category')
        var url = "http://192.168.43.55:8080/"+category+"";
        Axios.get(url)
        .then((res)=>{
            var arr=[]
            for(var i=0;i<res.data.length;i++){
                arr.push({
                    "id": res.data[i]._id,
                    "name": res.data[i].name,
                    "img": `data:image/jpg;base64,${res.data[i].data}`,
                    "price": res.data[i].price,
                    "category": res.data[i].category
                })
            }
            this.setState({
                product: arr
            })
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Text style={{
                    fontFamily:'Jost-SemiBold',
                    fontSize:20,
                    textTransform:'uppercase',
                    margin:10,
                    textAlign:'left'
                }}>{this.props.navigation.getParam('category')}</Text>
                <FlatList 
                    data={this.state.product}
                    renderItem={(item)=>{
                        return(
                            <ProductCard {...item}{...this.props}/>
                        )
                    }}
                    keyExtractor={(item)=>item.name}
                    numColumns={1}
                />
            </View>
        )
    }
}