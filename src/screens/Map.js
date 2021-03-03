import React, { useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { Context as statsContext } from '../contexts/statsContext';
import { Context as authContext } from '../contexts/AuthContext';

export default function Map() {
  const { state } = useContext(statsContext);
  const { state: authState } = useContext(authContext);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: state.data ? state.data.sensorId.latitude : 25.316089,
        longitude: state.data ? state.data.sensorId.longitude : 51.487437,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      showsUserLocation={true}
      showsMyLocationButton
      showsCompass
    >
      {state && state.data && state.data.sensorId && (
        <Marker
          coordinate={{
            latitude: state.data.sensorId.latitude,
            longitude: state.data.sensorId.longitude,
          }}
          title={`Sensor Key: ${state.data.sensorId.key}`}
        />
      )}
      {authState.data.map((sensor) => {
        return (
          <Marker
            key={sensor.key}
            coordinate={{
              latitude: sensor.latitude,
              longitude: sensor.longitude,
            }}
            title={`Sensor Key: ${sensor.key}`}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: height,
    width: width,
  },
});
