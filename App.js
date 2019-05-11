import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: [],
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421, 
        }
      });

      fetch('https://share-location-android.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }, err => console.log(err));
  }

  getUserPlaces = () => {
    fetch('https://share-location-android.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];

        for (const key in parsedRes) {
          places.push({
            id: key,
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
          })
        }

        this.setState({ usersPlaces: places });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Button title="Get User Places" onPress={this.getUserPlaces} />
        </View>
        
        <FetchLocation onGetLocation={this.getUserLocation} />

        <UsersMap
          userLocation={this.state.userLocation}
          usersPlaces={this.state.usersPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
