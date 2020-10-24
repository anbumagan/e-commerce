import React from 'react';
import Axios from 'axios';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const DOT_SIZE = 8;
const TIME = 3000;

const WIDTH = Dimensions.get('window').width;

export default class Carousel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:[]
        };
        this.scrollView = React.createRef();
    }
    componentDidMount(){
        Axios.get("http://18.218.166.188:8080/carousel")
        .then((res)=>{
            var arr=[]
            for(var i=0;i<res.data.length;i++){
                arr.push(res.data[i].data)
            }
            this.setState({
                image: arr,
                currentIndex: 0,
            })
        })
        this.timer = setInterval(() => {
            this.handleScroll();
          }, TIME);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    handleScroll = () => {
        const newIndex = this.state.currentIndex + 1;
    
        if (newIndex < this.state.image.length) {
          this.scrollView.current.scrollTo({
            x: newIndex * WIDTH,
            animated: true,
          });
    
          this.setState({ currentIndex: newIndex });
        } else {
          this.scrollView.current.scrollTo({
            x: 0,
            animated: true,
          });
          this.setState({ currentIndex: 0 });
        }
    };
    onScroll = event => {
        const { contentOffset } = event.nativeEvent;
    
        const currentIndex = Math.round(contentOffset.x / WIDTH);
    
        if (this.state.currentIndex !== currentIndex) {
          this.setState({ currentIndex });
        }
    };
    render(){
        return(
            <View>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    ref={this.scrollView}
                    scrollEventThrottle={16}
                    onScroll={this.onScroll}
                >
                    {this.state.image.map((img,i)=>(
                        <View key={i} style={{position:"relative"}}>
                            <Image 
                            style={{width:WIDTH,height: 200,resizeMode:'stretch'}} 
                            source={{uri: img}}/>
                            <View 
                            style={{position:'absolute',flexDirection:'row',height:200,width:WIDTH,alignItems:'flex-end',justifyContent:'center',padding:10}} >
                                {Array.from({length: this.state.image.length}).map((_,index)=>(
                                    <View 
                                        key={index} 
                                        style={{backgroundColor: this.state.currentIndex === index ? 'black': 'lightgrey',borderWidth:0.5,borderColor:'lightgrey',width:DOT_SIZE,height:DOT_SIZE,borderRadius:DOT_SIZE,margin:DOT_SIZE/2}}>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
}