import React, { Component } from 'react';
import {
  Scene,
  Router,
  Actions
} from 'react-native-router-flux';

import CameraView from './CameraView/CameraView'
import GalleryView from './GalleryView/GalleryView'

export default class RouterComponent extends Component {
  render() {
    return(
      <Router
        navigationBarStyle={{
          backgroundColor: '#f6f6f6',
          borderBottomColor: '#f6f6f6',
          borderWidth: 0,
          alignContent: 'center',
        }}
        headerTintColor='#000'
        headerTitleStyle={{backgroundColor:'#f6f6f6',textAlign: 'center',alignSelf:'center'}}
        headerTintColor='#000'
      >
        <Scene
          key="tabbar"
          gestureEnabled={false}
          showLabel={true}
          tabs
          lazyLoad={false}
          showIcon={false}
          tabBarPosition='bottom'
          swipeEnabled={true}
	        tabBarStyle={{backgroundColor:'#f6f6f6'}}
          pressColor="black"
          activeTintColor="black"
          initial
          labelStyle={{fontSize:14,fontWeight:'500'}}
          indicatorStyle={{
            borderColor:'#000',
            borderBottomWidth:'4'
          }}
        >
          <Scene key="GalleryView"
            component={GalleryView}
            title="Gallery"
            tabBarLabel="GALLERY"
            initial
          />
          <Scene key="CameraView"
            component={CameraView}
            tabBarLabel="CAMERA"
            title="Camera"
          />
        </Scene>
      </Router>
    )

  }
}
