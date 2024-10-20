
import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const useLocation = (): Location | null => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return location;
};

export default useLocation;
