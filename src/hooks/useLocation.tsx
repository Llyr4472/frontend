import { useState, useEffect } from 'react';

export interface LocationState {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  isDefault?: boolean;
}

const DEFAULT_LOCATION: LocationState = {
  latitude: 27.7172,
  longitude: 85.324,
  city: "Kathmandu",
  country: "Nepal",
  isDefault: true,
};

const useLocation = (): LocationState => {
  const [location, setLocation] = useState<LocationState>(DEFAULT_LOCATION);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: "Your Device Location",
          isDefault: false,
        });
      },
      (error) => {
        console.warn('Geolocation access failed or denied, using default region:', error.message);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  }, []);

  return location;
};

export default useLocation;
