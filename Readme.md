# Create New project #
`$ react-native init InstagramGalleryView`

# Get Clone from github


# Run Project in IOS and Android
`$ react-native run-ios`
`$ react-native run-android`

# Install node dependencies

`$ npm install --save react-native-router-flux`
`$ npm install --save react-redux`
`$ npm install --save redux`
`$ npm install --save redux-thunk`
`$ npm install --save react-native-fetch-blob`

# Install React Native Camera

`$ npm install --save react-native-camera@0.6`
`$ react-native link react-native-camera`

**Permissions**

To enable video recording feature you have to add the following code to the AndroidManifest.xml:

`<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.RECORD_VIDEO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`

Info.plist

`<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>

<!-- Include this only if you are planning to use the camera roll -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Your message to user when the photo library is accessed for the first time</string>

<!-- Include this only if you are planning to use the microphone for video recording -->
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microsphone is accessed for the first time</string>`


# Install react-native-camera-roll-picker

`$ npm install react-native-camera-roll-picker --save`
`$ react-native link react-native-camera-roll-picker`

*** IOS Configuration in Xcode **
1. drag '`RCTCameraRoll.xcodeproj`' from '`node_modules/react-native/Libraries/cameraRoll/RCTCameraRoll.xcodeproj`' to project_name/Libraries
2. Selecte your project -> Go to Build Phases -> Link Binary with Libraries -> add `libRTCCameraRoll.a`


# Install react-native-parallax-scroll-view

`$ npm install react-native-parallax-scroll-view --save`
`$ react-native link`

# Run Project
`$ react-native run-ios`
`$ react-native run-android`
