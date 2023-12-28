import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styles from './CustomAlert.style';
import CustomButton from '../CustomButton/CustomButton';
const CustomAlert = ({
  setAlertVisible, 
  alertVisible, 
  title, 
  message, 
  leftBtnText, 
  rightBtnText, 
  leftBtnFnc, rightBtnFnc}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={alertVisible}
      onRequestClose={() => {
        setAlertVisible(!alertVisible);
      }}
    >
      <Pressable onPress={() => setAlertVisible(false)} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.flexBtn}>
            <Pressable style={styles.leftBtn} onPress={() => (leftBtnFnc ? leftBtnFnc() : null)}>
              <Text style={styles.textStyle}>{leftBtnText}</Text>
            </Pressable>
            <Pressable style={styles.rightBtn} onPress={() => (rightBtnFnc ? rightBtnFnc() : null)}>
              <Text style={styles.textStyle}>{rightBtnText}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomAlert;
