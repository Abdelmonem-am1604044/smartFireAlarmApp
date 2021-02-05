import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 25.316089,
        longitude: 51.487437,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      showsUserLocation = {true}
      showsMyLocationButton
      showsCompass
    ></MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: height,
    width: width,
  },
});
