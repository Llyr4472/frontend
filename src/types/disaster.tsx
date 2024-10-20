
export type Disaster = {
  id: number;
  type: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description?: string;
  reports?: number;
};
