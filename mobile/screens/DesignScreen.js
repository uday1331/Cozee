import React from 'react';
import { Asset } from 'expo-asset';
import { AR } from 'expo';
import ExpoTHREE, { THREE } from 'expo-three';
import * as ThreeAR from 'expo-three-ar';
import { View as GraphicsView } from 'expo-graphics';
import { Dimensions, View } from 'react-native';

import Assets from '../assets';
import TouchableView from '../components/TouchableView';
import Capture from '../components/Capture';
import MarketButton from '../components/MarketButton';
import Preview from '../components/Preview';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class DesignScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: Assets.models.stool
    }
  }

  get screenCenter() {
    return new THREE.Vector2(width / 2, height / 2);
  }

  componentDidMount() {
    //ThreeAR.suppressWarnings();
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
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
        <View 
          style={{ 
            position: "absolute",
            bottom: 10,
            left: (width / 2) - 38
           }} >
             <Capture />
        </View>
        <View 
          style={{ 
            position: "absolute",
            bottom: 42,
            left: 32
           }} >
             <TouchableOpacity onPress={() => {console.log("open marketplace")}} activeOpacity={0}>
                <MarketButton />
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

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    const directionalLightA = new THREE.DirectionalLight(0xffffff);
    directionalLightA.position.set(1, 1, 1);
    this.scene.add(directionalLightA);

    const directionalLightB = new THREE.DirectionalLight(0xffeedd);
    directionalLightB.position.set(-1, -1, -1);
    this.scene.add(directionalLightB);

    const ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);
    
    console.log(this.state.selectedItem);
    const { scene: loadedModel } = await ExpoTHREE.loadAsync(
      this.state.selectedItem,
      null
    );
    console.log(loadedModel);

    ExpoTHREE.utils.scaleLongestSideToSize(loadedModel, 0.6);

    this.mesh = new THREE.Object3D();
    this.mesh.add(loadedModel);
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