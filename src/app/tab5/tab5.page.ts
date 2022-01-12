import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as tf from '@tensorflow/tfjs';
//import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
//import '@tensorflow/tfjs-node';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  @ViewChild('inputImg') inputImg:ElementRef;
  @ViewChild('overlay') overlay:ElementRef;
  @ViewChild('myFileUpload') myFileUpload:ElementRef;
  
  SSD_MOBILENETV1 = 'ssd_mobilenetv1';
  TINY_FACE_DETECTOR = 'tiny_face_detector';
  selectedFaceDetector = this.SSD_MOBILENETV1;
  
  // ssd_mobilenetv1 options
  minConfidence = 0.5;

  // tiny_face_detector options
  inputSize = 512;
  scoreThreshold = 0.5;
  
  constructor(private http: HttpClient) {
    // const { Canvas, Image, ImageData } = canvas
    // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

    this.changeFaceDetector();
  }

  testModel() {
    debugger;
    alert('Not work. Miggrated @tensorflow/tfjs 3.8.0->3.12.0 in order to correct run face-api, But now not work model. Error: hash_util.d.ts:3:69 - error TS2304: Cannot find name Long');
    /*
    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      let x = model.predict(tf.tensor2d([5], [1, 1])).toString();
      alert(x);
    });*/
  }

  async uploadImage() {
    //alert('loadImage');
    const imgFile = this.myFileUpload.nativeElement.files[0];
    // create an HTMLImageElement from a Blob
    const img = await faceapi.bufferToImage(imgFile)
    this.inputImg.nativeElement.src = img.src;

    this.updateResults();
  }

  faceDetect() {
    //alert('faceDetect');
    this.updateResults();
  }

  async updateResults() {
    if (!this.isFaceDetectionModelLoaded()) {
      return
    }

    const inputImgEl = this.inputImg.nativeElement;
    const options = this.getFaceDetectorOptions()

    const results = await faceapi.detectAllFaces(<any>inputImgEl, options)

    const canvas = this.overlay.nativeElement;
    faceapi.matchDimensions(<any>canvas, <any>inputImgEl)
    faceapi.draw.drawDetections(<any>canvas, faceapi.resizeResults(results, <any>inputImgEl))
  } 

  isFaceDetectionModelLoaded() {
    return !!this.getCurrentFaceDetectionNet().params
  }

  getCurrentFaceDetectionNet() {
    if (this.selectedFaceDetector === this.SSD_MOBILENETV1) {
      return faceapi.nets.ssdMobilenetv1
    }
    if (this.selectedFaceDetector === this.TINY_FACE_DETECTOR) {
      return faceapi.nets.tinyFaceDetector
    }
  }

  getFaceDetectorOptions() {
    return this.selectedFaceDetector === this.SSD_MOBILENETV1
      ? new faceapi.SsdMobilenetv1Options({ minConfidence: this.minConfidence })
      : new faceapi.TinyFaceDetectorOptions({ inputSize: this.inputSize, scoreThreshold: this.scoreThreshold })
  }

  async changeFaceDetector() {
    if (!this.isFaceDetectionModelLoaded()) {
      await this.getCurrentFaceDetectionNet().load('/assets/weights')
    }
  }
}