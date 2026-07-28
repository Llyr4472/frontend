export type DisasterCategory = 
  | "Earthquake" 
  | "Wildfire" 
  | "Storm" 
  | "Flood" 
  | "Volcano" 
  | "Tsunami" 
  | "Landslide" 
  | "Drought" 
  | "Blizzard"
  | "Community Report"
  | "Other";

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";

export interface DisasterLocation {
  latitude: number;
  longitude: number;
  name?: string;
  country?: string;
}

export interface Disaster {
  id: string | number;
  type: DisasterCategory;
  title?: string;
  date: string;
  timestamp?: number;
  location: DisasterLocation;
  severity: SeverityLevel;
  description?: string;
  reports?: number;
  magnitude?: number;
  depthKm?: number;
  url?: string;
  source: "USGS" | "NASA" | "Community" | "System";
  verified?: boolean;
}

export interface FilterOptions {
  category: string;
  severity: string;
  searchTerm: string;
  source: string;
}

export interface UserReportInput {
  type: DisasterCategory;
  locationName: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  description: string;
}
