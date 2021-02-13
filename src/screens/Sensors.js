import React, { useContext, useEffect } from 'react';
import { Context as statsContext } from '../contexts/statsContext';
import { Container, Row, Col, H1, H3, Button, Text } from 'native-base';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { notification } from '../NotificationManager';
import { io } from 'socket.io-client';
import initiatePhoneCall from '../phoneCall';
import sendSMS from '../sendSMS';

export default function Sensors() {
  const { state, getStats, setStats } = useContext(statsContext);
  const socket = io('http://ce3f967b2109.ngrok.io');

  useEffect(() => {
    getStats();
  }, []);

  socket.on('alarm', (data) => {
    setStats(data);
    notification.showNotification(
      'Alarm',
      'Sensor Rates Are Above Normal, Action Quickly'
    );
    initiatePhoneCall();
    // sendSMS();
  });

  if (!state.data) {
    return <ActivityIndicator size="large" />;
  }

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
          <H3>{state.data ? state.data.temperature.value : ''}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Humidity (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.humidity.value : ''}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>CO Presence (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.co.value : ''}</H3>
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
