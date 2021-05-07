import React from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(process.env.MAPBOX_PUBLIC_TOKEN || null);

export default function App() {
  return (
    <MapboxGL.MapView styleURL={'mapbox://styles/xenous-developer/cko066lkz0sy118nsx0d2vl5a'} style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
