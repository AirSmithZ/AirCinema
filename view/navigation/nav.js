import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../pages/MainPage'
import Detail from '../pages/details'
import PlayHistory from '../pages/PlayHistory'
import SearchPage from '../pages/SearchPage'  
import PlayerPage from '../pages/PlayerPage'
import {
  Text
} from 'react-native';
  const Stack = createStackNavigator();
  
  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainPage"
            component={MainPage}
            options={{
              headerShown:false
            }}
           />
          <Stack.Screen name="SearchPage"
            component={SearchPage}
            options={{
              headerBackTitle: '返回',
              headerTitle:'搜索资源'
            }}
           />
          <Stack.Screen name="PlayerPage" 
            component={PlayerPage} 
            options={{
              headerShown:false
            }}/>
          <Stack.Screen name="PlayHistory"
            component={PlayHistory}
            options={{
              headerBackTitle: '返回',
              headerTitle:'播放历史'
            }}/>
          <Stack.Screen name="Detail" 
            component={Detail} 
            options={({ route }) => {
              return ({ 
                title: route.params.movieItem.vod_name,
                headerBackTitle: '返回'
               })
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;