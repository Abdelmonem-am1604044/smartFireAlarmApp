import React, { useContext, useEffect, useState } from "react";
import { Context as statsContext } from "../contexts/statsContext";
import { Container, Row, Col, H1, H3, Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import { notification } from "../NotificationManager";
import { io } from "socket.io-client";
import { Context as authContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { Linking, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export default function Sensors() {
  const { state, getStats, setStats } = useContext(statsContext);
  const { state: authState } = useContext(authContext);
  const [token, setToken] = useState("fs");

  useEffect(() => {
    getStats();
    AsyncStorage.getItem("token").then((res) => {
      if (res !== null) {
        setToken(res);
      } else {
        setToken(undefined);
      }
    });
  }, []);

  const socket = io("http://1b9ddb3b3455.ngrok.io", {
    query: `type=${
      token ? (state.data ? state.data.sensorId.key : "null") : "admin"
    }`,
  });

  socket.on("sensor", (data) => {
    setStats(data);
    if (data.isFire)
      notification.showNotification("Alarm", "Sensor Rates Are Above Normal");
  });

  socket.on("admin", (data) => {
    if (data.isFire)
      notification.showNotification(
        "Alarm",
        `Sensor #${data.sensorId.key} Rates Are Above Normal`
      );
    authState.data.forEach((element) => {
      if (element.key == data.sensorId.key) {
        element._doc = data;
      }
    });
    setStats(data);
  });

  return (
    <Container>
      <Row style={styles.header}>
        {authState.data.length > 0 ? (
          <DropDownPicker
            items={authState.data.map((element) => {
              return {
                label: `Sensor #${element.key}`,
                value: element.key,
              };
            })}
            placeholder="Select a Sensor"
            containerStyle={{ width: width - 10, height: 40 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#ff5fa" }}
            onChangeItem={(item) => {
              let element = authState.data.find((e) => e.key == item.value);
              setStats(element._doc);
            }}
          />
        ) : (
          <H1>Smart Fire Alarm System</H1>
        )}
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Temperature (C):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.temperature : "No Data"}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Humidity (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.humidity : "No Data"}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>CO Presence (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.co : "No Data"}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Head Count:</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{state.data ? state.data.headCount : "No Data"}</H3>
        </Col>
      </Row>
      <Row style={styles.row}>
        {authState.data.length > 0 && (
          <Button
            info
            onPress={() => {
              var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${state.data.sensorId.latitude},${state.data.sensorId.longitude}`;
              Linking.canOpenURL(url)
                .then((supported) => {
                  if (!supported) {
                    console.log("Can't handle url: " + url);
                  } else {
                    return Linking.openURL(url);
                  }
                })
                .catch((err) => console.error("An error occurred", err));
            }}
          >
            <Text>Go to location</Text>
          </Button>
        )}
      </Row>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
});
