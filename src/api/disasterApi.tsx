import { Disaster } from "../types/disaster";

// const API_BASE_URL = 'http://backend.com/api';

export const fetchDisasters = async (): Promise<Disaster[]> => {
  // const response = await fetch(`${API_BASE_URL}/disasters`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch disasters');
  // }
  // return response.json();

  // Sample JSON for testing
  return [
    {
      id: 1,
      type: "Earthquake",
      location: { name: "Nepal", latitude: 28.3949, longitude: 84.124 },
      date: "2024-09-02",
      severity: "High",
      description: "A strong earthquake occurred in Nepal.",
    },
    {
      id: 2,
      type: "Flood",
      location: { name: "Bangladesh", latitude: 23.685, longitude: 90.3563 },
      date: "2024-09-01",
      severity: "Medium",
      reports: 100,
    },
    {
      id: 3,
      type: "Wildfire",
      location: {
        name: "California, USA",
        latitude: 36.7783,
        longitude: -119.4179,
      },
      date: "2024-08-30",
      severity: "Critical",
    },
    {
      id: 4,
      type: "Hurricane",
      location: {
        name: "Florida, USA",
        latitude: 27.9944,
        longitude: -81.7603,
      },
      date: "2024-08-28",
      severity: "High",
    },
    {
      id: 5,
      type: "Tsunami",
      location: { name: "Japan", latitude: 36.2048, longitude: 138.2529 },
      date: "2024-08-25",
      severity: "High",
    },
    {
      id: 6,
      type: "Volcanic Eruption",
      location: { name: "Indonesia", latitude: -0.7893, longitude: 113.9213 },
      date: "2024-08-22",
      severity: "High",
    },
    {
      id: 7,
      type: "Landslide",
      location: { name: "Peru", latitude: -9.19, longitude: -75.0152 },
      date: "2024-08-20",
      severity: "Medium",
    },
    {
      id: 8,
      type: "Drought",
      location: { name: "Ethiopia", latitude: 9.145, longitude: 40.4897 },
      date: "2024-08-15",
      severity: "Low",
    },
    {
      id: 9,
      type: "Tornado",
      location: {
        name: "Oklahoma, USA",
        latitude: 35.4676,
        longitude: -97.5164,
      },
      date: "2024-08-10",
      severity: "High",
    },
    {
      id: 10,
      type: "Blizzard",
      location: { name: "Canada", latitude: 56.1304, longitude: -106.3468 },
      date: "2024-08-05",
      severity: "Medium",
    },
  ];
};
