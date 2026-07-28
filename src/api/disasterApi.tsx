import { Disaster } from "../types/disaster";
import { fetchAllLiveDisasters, saveCommunityReport, getStoredCommunityReports } from "./liveApis";

export const fetchDisasters = async (): Promise<Disaster[]> => {
  return await fetchAllLiveDisasters();
};

export { saveCommunityReport, getStoredCommunityReports };
