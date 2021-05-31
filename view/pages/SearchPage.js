import React,{useState,useEffect,useRef} from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableWithoutFeedback,
    SafeAreaView
  } from 'react-native';
import {storage} from '../storage/index'
import Toast from '../components/toast'
import ListModel from '../apis/request'
import MediaList from '../components/mediaList'
import Loading from '../components/loadingComponent'
// import Orientation from 'react-native-orientation';
const listModel = new ListModel()
export default Mine = (props)=>{
    const { navigation } = props;

    const [teleplayList,setTeleplayList] = useState([])
    const [searchName, setSearchName] = useState(''); 
    const [showTaost, setShowTaost] = useState(false); 
    const inputChanged = (v)=>{
        setSearchName(v)
    }
    const [loadingState,setLoadingState] = useState(false)

    const [historyList, setHistoryList] = useState(['暗芝居','风之谷']);
    const activeToast = ()=> {
        setShowTaost(true)
        setTimeout(() => {
            setShowTaost(false)
        }, 2000);
    }
    const historySearch = (item)=>{
        try{
            setLoadingState(true);
            console.log('load',loadingState)
            let list = [...historyList]
            let realSearch = item ? item : searchName
            realSearch&&list.push(realSearch)
            list = Array.from(new Set(list))
            setHistoryList([...list])
            item&&setSearchName(item)
            storage.save('historySearch', list)
            // 取
            // storage.load('historySearch', (data) => {
            //     console.log(data)
            // })
            console.log(realSearch,'realSearch')
            setTimeout(async () => {
                await listModel.getFilmSearch(realSearch).then((res)=>{
                    console.log(res,'getdata')
                    setTeleplayList([...res])
                    teleplayList&&activeToast()

                })
                setLoadingState(false)
                }, 500);
            console.log(item,'item',searchName,loadingState)
        }catch(e){
            setLoadingState(false)
            console.log(e)
        }
       
    }
    const couterRef = useRef<TextInput>(null)
    useEffect(()=>{
        console.log(couterRef,'asd')
        // Orientation.lockToPortrait();
        storage.load('historySearch', (data) => {
            setHistoryList(data)
        })
        // storage.remove('historySearch')
    },[])
    return (
        <SafeAreaView style={styles.containerWrap}>
            
            {
                showTaost? <Toast message={'暂无资源~'}/> : null
            }
            <View style={styles.topWrap}>
                <View style={styles.searchWrap}>
                    <View style={styles.searchInnerWrap}>
                        <View style={styles.searchInnerWrap}>
                            <TextInput
                                onChangeText={(v)=>inputChanged(v)}
                                placeholder="请输入资源名称～"
                                value={searchName}
                                style={styles.searchInput}
                            />
                            <TouchableWithoutFeedback onPress={()=>historySearch()}>
                                <Image 
                                    source={require('../assets/image/Cartoon-Seach.png')}
                                    style={styles.icon}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={styles.loadingWrap}>
                    {
                        loadingState&&teleplayList.length===0? <Loading/> : null
                    }
                </View>
                <View style={styles.searchHistoryWrap}>
                        {
                            historyList&&historyList.map((item,index)=>{
                                return <Text style={styles.searchHistoryItem} key={index} onPress={()=>historySearch(item)}>{item}</Text>
                            })
                        }
                </View>
            </View>
            <ScrollView horizontal={false} contentContainerStyle={styles.contentContainer}>
                <View style={{ flex: 1 ,backgroundColor:'white'}}>
                        <MediaList teleplayList={teleplayList} showID={'notHome'} curState={'search'} navigation={navigation}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
var styles = StyleSheet.create({
    contentContainer:{
    },
    loadingWrap:{
        position:'absolute',
        top:100,
        right:0,
        left:0,
        bottom:0,
        zIndex:999
    },
    containerWrap:{
        flex:1,
        backgroundColor:'white'
    },
    searchHistoryItem:{
        padding:5,
        borderWidth:1,
        borderRadius:10,
        margin:5
    },
    searchHistoryWrap:{
        flexWrap:'wrap',
        flexDirection:'row',
        padding:20,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    searchInput:{
        width:'85%',
      borderBottomWidth:1
    },
    searchInnerWrap:{
      flexDirection:'row',
      alignItems:'center',

    },
    searchWrap: {
      height:50,
      flexDirection:'row',
      alignItems:'flex-end',
      justifyContent:'flex-end',
      backgroundColor:'white',
      paddingLeft:20,
      paddingRight:20,
    },
    icon:{
        width:27,
        height:27,
        marginLeft:5
    },
  })