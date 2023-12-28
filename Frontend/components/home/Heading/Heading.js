import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './heading.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants';
const Heading = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.more}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;
