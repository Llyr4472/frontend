  import React from 'react';
  import { Alert as MuiAlert, AlertProps, Box, Button, IconButton, Typography } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import useLocation from '../hooks/useLocation';
  import useDisasters from '../hooks/useDisasters';

  interface AlertComponentProps extends AlertProps {
    radius: number; // in kilometers
  }

  export const AlertUser: React.FC<AlertComponentProps> = ({ radius, ...props }) => {
    const location = useLocation();
    const { disasters, loading, error } = useDisasters();
    const [isOpen, setIsOpen] = React.useState(true);

    const isNearbyDisaster = React.useMemo(() => {
      if (!location || !disasters || disasters.length === 0) return false;

      return disasters.some((disaster) => {
        if (location.latitude !== undefined && location.longitude !== undefined && disaster.location) {
          const distance = calculateDistance(
            { lat: location.latitude, lng: location.longitude },
            {lat: disaster.location.latitude, lng: disaster.location.longitude}
          );
          return distance <= radius;
        }
        return false;
      });
    }, [location, disasters, radius]);

    if (loading) return <MuiAlert severity="info">Loading disaster information...</MuiAlert>;
    if (error) return <MuiAlert severity="error">Error: {error}</MuiAlert>;
    if (!isNearbyDisaster || !isOpen) return null;

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleEmergencyResource = () => {
      window.location.href = 'https://www.redcross.org';
    };

    const nearbyDisaster = disasters.find((disaster) => {
      if (location.latitude !== undefined && location.longitude !== undefined && disaster.location) {
        const distance = calculateDistance(
          { lat: location.latitude, lng: location.longitude },
          {lat: disaster.location.latitude, lng: disaster.location.longitude}
        );
        return distance <= radius;
      }
      return false;
    });

    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'error.main',
        }}
      >
        <IconButton
          aria-label="close"
          color="inherit"
          size="large"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', maxWidth: '600px' }}>
          <MuiAlert
            severity="error"
            variant="filled"
            sx={{
              width: '100%',
              fontSize: '1.5rem',
              '& .MuiAlert-icon': {
                fontSize: '2rem',
              },
            }}
            {...props}
          >
            WARNING: There is a disaster reported near your location. Please stay alert and follow local authorities' instructions immediately.
          </MuiAlert>
          {nearbyDisaster && (
            <Box sx={{ mt: 2, bgcolor: 'rgba(255, 255, 255, 0.9)', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Disaster Details:</Typography>
              <Typography><strong>Type:</strong> {nearbyDisaster.type}</Typography>
              <Typography><strong>Severity:</strong> {nearbyDisaster.severity}</Typography>
              <Typography><strong>Location:</strong> {nearbyDisaster.location.latitude.toFixed(4)}, {nearbyDisaster.location.longitude.toFixed(4)}</Typography>
              <Typography><strong>Description:</strong> {nearbyDisaster.description}</Typography>
            </Box>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleEmergencyResource}
              sx={{
                fontSize: '1.2rem',
                padding: '10px 20px',
                fontWeight: 'bold',
                backgroundColor: '#ff9800',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
              }}
            >
              Emergency Resources
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  // Helper function to calculate distance between two points
  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
    // Haversine formula implementation
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };