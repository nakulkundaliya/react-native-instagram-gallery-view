import React , { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Animated
} from 'react-native'
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import {CameraViewStyle} from './CameraViewStyle'

export default class CameraView extends Component{
  constructor(props){
		super(props);
    this.camera = null;

		this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      galleryImagePath:false,
      cameraImagePath:false,
      isRecording:false,
      isCameraButton:false,
      animated:new Animated.Value(0),
      opacityA:new Animated.Value(1),
    };
	}
  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          const d = new Date();
          var timestamp = d.getTime();


          // this.setState({cameraImagePath:data.path});

          RNFetchBlob.fs.readFile(data.path, 'base64')
          .then((data) => {
            console.log("===base64 ====",data)
            this.setState({cameraImagePath:`data:image/jpg;base64,${data}`});
          });
        })
        .catch(err => console.error(err));
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;
    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }
    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
  }

  getSelectedImages(image, current) {
    console.log("====image path ===", current.uri)
     this.setState({galleryImagePath:current.uri});

    // RNFetchBlob.fs.readFile(current.uri, 'base64')
    // .then((data) => {
    //   console.log("===base64 ====",data)
    //   this.setState({galleryImagePath:`data:image/jpg;base64,${data}`});
    // });
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => console.log("======data path===== ",data.path))
          .catch(err => console.error("==error==",err));
        this.setState({
          isRecording: true
        });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  cancleImage(){
    this.setState({cameraImagePath:false})
  }


  renderCamera() {
      if(!this.state.cameraImagePath){
        return(
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={CameraViewStyle.preview}
              aspect={this.state.camera.aspect}
              captureTarget={this.state.camera.captureTarget}
              type={this.state.camera.type}
              flashMode={this.state.camera.flashMode}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
              defaultTouchToFocus
              mirrorImage={false}
            >
            <View style={[ CameraViewStyle.bottomOverlay]}>
              <View style={CameraViewStyle.frontCameraOverlay}>
                <TouchableOpacity
                  style={CameraViewStyle.typeButton}
                  onPress={this.switchType}
                >
                  <Image
                    source={this.typeIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={CameraViewStyle.flashButton}
                  onPress={this.switchFlash}
                >
                  <Image
                    source={this.flashIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={CameraViewStyle.buttonOverlay}>
                <TouchableOpacity
                    style={CameraViewStyle.captureButton}
                    onPress={this.takePicture}
                >
                  <View style={CameraViewStyle.outerCircle}>
                    <View style={CameraViewStyle.innerCircle}>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            </Camera>
        );
      }
      if(this.state.cameraImagePath){
          return (
            <View style={{flex:1,padding:0}}>
              <View style={CameraViewStyle.header}>
                <View>
                  <TouchableOpacity onPress={this.cancleImage.bind(this)}>
                    <Image source={require('../assets/close.png')} style={CameraViewStyle.closeBtn}/>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>Done </Text>
                </View>
              </View>
              <View style={CameraViewStyle.previewImage}>
                <Image source={{uri: this.state.cameraImagePath}} style={{height:300}}/>

              </View>
            </View>
          );
      }
  }

  render(){
    return(
      <View style={CameraViewStyle.container}>
        {this.renderCamera()}
      </View>
    )
  }

}
