<script setup>
import * as THREE from 'three'
import {ref, onMounted } from 'vue';

const container = ref(null)
onMounted(()=>{
  handleRender()
})

const handleRender = ()=>{
  const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );

container.value.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );
}
const animation = () => {
 
}

</script>
<template>
  <layout>
    <div>Animation</div>
    <div ref="container"></div>
  </layout>
</template>
<style scoped>

</style>