import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './Routes';

export default function App() {
  return (
    <Routes/>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
