import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar
  } from 'react-native';
 import FilmHomeComponent from '../components/filmHomeComponent'
 import FilmCategoryComponent from '../components/filmCategoryComponent'
//  import Constants from "expo-constants";
export default Film = (props)=>{
    const { navigation } = props;
    const sHeight = Dimensions.get('screen').height
    const statusBar = {
        hidden:false,
        barStyle: 'dark-content'
    }
    console.log('sHeight',sHeight)
    const tabList = [
        {id:1,name:'首页',state:'home'},
        {id:'wu',name:'电影',state:'dy'},
        {id:13,name:'电视剧',state:'dsj'},
        {id:4,name:'动漫',state:'dm'},
        {id:3,name:'综艺',state:'zy'}
    ]
    const [tabState, setTabState] = useState({
        id: 1,
        name: "首页",
        state: "home"
    });
    const changeTabState = (item)=>{
        setTabState(()=>item)
        console.log(item,tabState,'tabState')
    }
    return (
        <SafeAreaView 
            style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' ,backgroundColor:'white'}}
        > 
        <StatusBar barStyle={'dark-content'}/>
            <View style={styles.headerWrap}>
                <TouchableWithoutFeedback onPress={()=> navigation.navigate('SearchPage')}>
                <View style={styles.searchWrap}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>搜索</Text>
                    <Image 
                        source={require('../assets/image/Cartoon-Seach.png')}
                        style={styles.icon}
                    />
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=> navigation.navigate('PlayHistory')}>
                    <View>
                        <Image
                        source={require('../assets/image/mine.png')}
                        style={styles.icon}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.tabLists}>
                {
                    tabList.map((item,index)=>{
                        return (
                            <TouchableWithoutFeedback onPress={()=> changeTabState(item)} key={index}>
                                <Text style={[styles.normalStyle,tabState.state==item.state&&styles.curTabState]}>{item.name}</Text>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
            <View style={styles.bottomWrap}>
                {
                    tabState.state == 'home' ? <FilmHomeComponent navigation={navigation}/> :<FilmCategoryComponent curState={tabState} navigation={navigation}/>
                }
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    searchWrap:{
        flexDirection:'row',
        alignItems:'center'
    },
    bottomWrap:{
        marginBottom:100
    },
    normalStyle:{
        color:'#909090'
    },
    curTabState:{
        fontWeight:'900',
        color:'black'
    },
    listImg:{
        width:'100%',
        height:'100%'
    },
    wpWrap:{
        textAlign:'center',
        fontSize:12,
        marginTop:5
    },
    imgWrap:{
        width:'100%',
        height:200,
        backgroundColor:'lightgreen'
    },
    innerSingleWrap:{
        margin:5,
        width:'100%',
    },
    singleWrap:{
        margin:5,
        width:'30%',
        shadowOpacity: 0.8, 
        shadowRadius: 6, 
        borderRadius:100
        // elevation: 10 
    },
    bmMvWrap:{
       flexDirection:'row',
       flexWrap:'wrap',
        justifyContent:'center',
        padding:5
    },
    mvOuterWrap:{
        marginTop:5,
        marginBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:30,
        paddingLeft:15,
        paddingRight:20
    },
    tabLists:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:50,
        backgroundColor:'white',
        paddingHorizontal:20
    },
    icon:{
        width:27,
        height:27
      },
    contentContainer: {
        paddingVertical: 20
      },
      headerWrap:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        backgroundColor:'white',
        paddingHorizontal:20
      },
      buttonContainer:{
        padding: 10
      },
      textStyle:{
        textAlign: 'center'
      },
    wrapper: {
        // height:100
    },
    slide1: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
  });