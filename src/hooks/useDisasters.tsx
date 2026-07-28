import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchDisasters, saveCommunityReport } from "../api/disasterApi";
import { Disaster, FilterOptions, UserReportInput } from "../types/disaster";

export const useDisasters = () => {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Selected disaster to focus on Globe and open Detail Modal
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null);

  // Filters state
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    severity: "All",
    searchTerm: "",
    source: "All",
  });

  const loadDisasters = useCallback(async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) setLoading(true);
    setIsRefreshing(true);
    try {
      const data = await fetchDisasters();
      setDisasters(data);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch live disaster data: " + (err as Error).message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Auto polling every 40 seconds for live updates
  useEffect(() => {
    loadDisasters(true);

    const interval = setInterval(() => {
      loadDisasters(false);
    }, 40000);

    return () => clearInterval(interval);
  }, [loadDisasters]);

  // Submit new disaster report from user modal
  const addCommunityReport = useCallback((input: UserReportInput) => {
    const newReport: Disaster = {
      id: `user-${Date.now()}`,
      type: input.type,
      title: `${input.type} - ${input.locationName}`,
      date: new Date().toISOString().split("T")[0],
      timestamp: Date.now(),
      location: {
        name: input.locationName,
        latitude: input.latitude,
        longitude: input.longitude,
      },
      severity: input.severity,
      description: input.description,
      reports: 1,
      source: "Community",
      verified: false,
    };

    saveCommunityReport(newReport);
    setDisasters((prev) => [newReport, ...prev]);
    setSelectedDisaster(newReport);
  }, []);

  // Filtered dataset memoized
  const filteredDisasters = useMemo(() => {
    return disasters.filter((d) => {
      // Category filter
      if (filters.category !== "All" && d.type.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      // Severity filter
      if (filters.severity !== "All" && d.severity.toLowerCase() !== filters.severity.toLowerCase()) {
        return false;
      }
      // Source filter
      if (filters.source !== "All" && d.source.toLowerCase() !== filters.source.toLowerCase()) {
        return false;
      }
      // Search term
      if (filters.searchTerm.trim() !== "") {
        const query = filters.searchTerm.toLowerCase();
        const titleMatch = d.title?.toLowerCase().includes(query);
        const locMatch = d.location.name?.toLowerCase().includes(query);
        const descMatch = d.description?.toLowerCase().includes(query);
        const typeMatch = d.type.toLowerCase().includes(query);
        if (!titleMatch && !locMatch && !descMatch && !typeMatch) {
          return false;
        }
      }
      return true;
    });
  }, [disasters, filters]);

  // Computed summary statistics
  const stats = useMemo(() => {
    const total = disasters.length;
    const critical = disasters.filter((d) => d.severity === "Critical").length;
    const high = disasters.filter((d) => d.severity === "High").length;
    const earthquakes = disasters.filter((d) => d.type === "Earthquake").length;
    const wildfires = disasters.filter((d) => d.type === "Wildfire").length;
    const storms = disasters.filter((d) => d.type === "Storm").length;

    return { total, critical, high, earthquakes, wildfires, storms };
  }, [disasters]);

  return {
    disasters: filteredDisasters,
    rawDisasters: disasters,
    loading,
    isRefreshing,
    error,
    lastUpdated,
    selectedDisaster,
    setSelectedDisaster,
    filters,
    setFilters,
    refreshDisasters: () => loadDisasters(false),
    addCommunityReport,
    stats,
  };
};

export default useDisasters;
