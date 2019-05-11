import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapview from 'react-native-maps';

const UsersMap = (props) => {
  const { userLocation, usersPlaces } = props;
  let userLocationMarker = null;

  if (userLocation) {
    userLocationMarker = <Mapview.Marker coordinate={userLocation} />;
  }

  const usersMarkers = usersPlaces.map(userPlace => (
    <Mapview.Marker key={userPlace.id} coordinate={userPlace} />
  ));

  return (
    <View style={styles.mapContainer}>
      <Mapview
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={userLocation}
      >
        {userLocationMarker}
        {usersMarkers}
      </Mapview>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default UsersMap;
