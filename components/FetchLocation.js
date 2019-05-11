import React from 'react';
import { Button } from 'react-native';

const FetchLocation = (props) => {
  const { onGetLocation } = props;

  return (
    <Button
      title="Get Location"
      onPress={onGetLocation}
    />
  );
};

export default FetchLocation;
