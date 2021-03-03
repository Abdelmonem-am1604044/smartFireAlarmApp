import React, { useContext, useEffect, useState } from 'react';
import { Context as statsContext } from '../contexts/statsContext';
import { Container, Row, Col, H1, H3, Button, Text } from 'native-base';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { notification } from '../NotificationManager';
import { io } from 'socket.io-client';
import { Context as authContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sensors() {
  const { state, getStats, setStats } = useContext(statsContext);
  const { state: authState } = useContext(statsContext);
  const [token, setToken] = useState('fs');

  useEffect(() => {
    getStats();
    AsyncStorage.getItem('token').then((res) => {
      if (res !== null) {
        setToken(res);
      } else {
        setToken(undefined);
      }
    });
  }, []);

  const socket = io('http://ff8a884a74d6.ngrok.io', {
    query: `type=${
      token ? (state.data ? state.data.sensorId.key : 'null') : 'admin'
    }`,
  });

  socket.on('sensor', (data) => {
    setStats(data);
    notification.showNotification(
      'Alarm',
      'Sensor Rates Are Above Normal, Action Quickly'
    );
  });

  socket.on('admin', (data) => {
    // setStats(data);
    notification.showNotification(
      'Alarm',
      `Sensor #${data.sensorId.key} Rates Are Above Normal`
    );
  });
  // if (!state.data) {
  //   return <ActivityIndicator size="large" />;
  // }

  return (
    <Container>
      <Row style={styles.row}>
        <H1>Smart Fire Alarm System</H1>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Temperature (C):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.temperature : 'No Data'}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Humidity (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.humidity : 'No Data'}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>CO Presence (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.co : 'No Data'}</H3>
        </Col>
      </Row>
      <Row style={styles.row}>
        <Button info>
          <Text>House Map</Text>
        </Button>
      </Row>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
