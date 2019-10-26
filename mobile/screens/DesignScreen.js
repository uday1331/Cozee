import React from 'react';
import { Asset } from 'expo-asset';
import { AR } from 'expo';
import ExpoTHREE, { THREE } from 'expo-three';
import * as ThreeAR from 'expo-three-ar';
import { View as GraphicsView } from 'expo-graphics';
import { Dimensions, View, Alert } from 'react-native';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import { NavigationEvents } from 'react-navigation';

import TouchableView from '../components/TouchableView';
import Capture from '../components/Capture';
import MarketButton from '../components/MarketButton';
import Preview from '../components/Preview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddToCartBtn from '../components/AddToCartBrtn';


const { width, height } = Dimensions.get('window');

export default class DesignScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: props.navigation.getParam('selectedItem', null)
    }
  }

  async captureImage() {
    // const targetPixelCount = 1080; // If you want full HD pictures
    // const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    // // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    // const pixels = targetPixelCount / pixelRatio;

    const result = await takeSnapshotAsync(this.refs.captureArea, {
      result: 'tmpfile',
      height,
      width,
      quality: 1,
      format: 'jpg',
    });

    console.log(result);
    Alert.alert("Image saved in gallery.");
  }

  get screenCenter() {
    return new THREE.Vector2(width / 2, height / 2);
  }

  componentDidMount() {
    //ThreeAR.suppressWarnings();
  }

  render() {
    console.log(this.state.selectedItem);
    const { navigation } = this.props;
    console.log(navigation.getParam('selectedItem', null));
    return (
      <View style={{ flex: 1 }} >
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({
              selectedItem: navigation.getParam('selectedItem', null)
            });
          }}
          // onDidFocus={payload => {
          //   this.setState({
          //     selectedItem: navigation.getParam('selectedItem', null)
          //   });
          // }}
        />
        <View ref="captureArea" style={{ flex: 1 }}>
          <TouchableView
            style={{ flex: 1 }}
            shouldCancelWhenOutside={false}
            onTouchesBegan={this.onTouchesBegan}>
            <GraphicsView
              style={{ flex: 1 }}
              onContextCreate={this.onContextCreate}
              onRender={this.onRender}
              onResize={this.onResize}
              isArEnabled
              //isArRunningStateEnabled
              isArCameraStateEnabled
              arTrackingConfiguration={'ARWorldTrackingConfiguration'}
            />
          </TouchableView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: (width / 2) - 42
          }} >
          <TouchableOpacity onPress={() => { this.captureImage() }} activeOpacity={0}>
            <Capture />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 42,
            left: 32
          }} >
          <TouchableOpacity onPress={() => { navigation.navigate('Marketplace') }} activeOpacity={0}>
            <MarketButton />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 42,
            right: 32
          }} >
          <TouchableOpacity onPress={() => { navigation.navigate('Checkout') }} activeOpacity={0}>
            <AddToCartBtn />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });

    this.renderer.gammaInput = this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    // const directionalLightA = new THREE.DirectionalLight(0xffffff);
    // directionalLightA.position.set(1, 1, 1);
    // this.scene.add(directionalLightA);

    // const directionalLightB = new THREE.DirectionalLight(0xffeedd);
    // directionalLightB.position.set(-1, -1, -1);
    // this.scene.add(directionalLightB);

    // const ambientLight = new THREE.AmbientLight(0x222222);
    // this.scene.add(ambientLight);

    this.ambient = new ThreeAR.Light();
    this.ambient.position.y = 2;

    this.scene.add(this.ambient);

    this.scene.add(new THREE.AmbientLight(0x404040));
  }

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    if (this.itemInScene) {
      this.itemInScene.update(this.camera, this.screenCenter);
    }

    this.ambient.update();

    this.renderer.render(this.scene, this.camera);
  };

  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    const size = this.renderer.getSize();

    const { hitTest } = await AR.performHitTest(
      {
        x: x / size.width,
        y: y / size.height,
      },
      AR.HitTestResultTypes.HorizontalPlane
    );

    for (let hit of hitTest) {
      const { worldTransform } = hit;
      if (this.itemInScene) {
        this.scene.remove(this.itemInScene);
      }

      console.log("loading model");
      const { scene: loadedModel } = await ExpoTHREE.loadAsync(
        this.state.selectedItem,
        null
      );
      ExpoTHREE.utils.scaleLongestSideToSize(loadedModel, 1.5);

      this.mesh = new THREE.Object3D();
      this.mesh.add(loadedModel);

      this.itemInScene = new ThreeAR.MagneticObject();
      this.itemInScene.add(this.mesh);
      this.scene.add(this.itemInScene);

      this.itemInScene.matrixAutoUpdate = false;

      const matrix = new THREE.Matrix4();
      matrix.fromArray(worldTransform);

      this.itemInScene.applyMatrix(matrix);
      this.itemInScene.updateMatrix();
    }
  }
}