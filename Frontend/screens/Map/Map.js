import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, OverlayComponent} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS} from '../../constants';
import styles from './Map.style';
export default function Map({route}) {
  const {navigate} = useNavigation();
  const mapRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: 14.0583,
    longitude: 108.2772,
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        moveToLocation(position.coords.latitude, position.coords.longitude);
        setLocation(position.coords);
      },
      (error) => console.log(error),
    );
  }, []);
  const moveToLocation = (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  };
  //
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() =>
            navigate(route?.params?.name === 'EditAddress' ? 'AddAddress' : route?.params?.name, {
              location: location,
              name: route.params.name,
            })
          }
        >
          <Ionicons name="checkmark" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <Text style={styles.title}>Set your location</Text>
      </View>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Enter your address"
          onPress={(data, details = null) => {
            const currentLocation = details?.geometry?.location;
            console.log(currentLocation);
            setLocation({
              latitude: currentLocation.lat,
              longitude: currentLocation.lng,
            });
            moveToLocation(currentLocation.lat, currentLocation.lng);
          }}
          query={{
            key: 'AIzaSyADET1zpdnOUqNQjhteEHRPIigP3EdcXq4',
            language: 'vi',
          }}
          onFail={(error) => console.log(error)}
        />
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={location} draggable onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}></Marker>
      </MapView>
    </View>
  );
}
