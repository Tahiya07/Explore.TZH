import { labLocations, projectById } from "@/data/projects";
import { projectIds, type LabLocation, type LocationId, type ProjectId, type ProjectRoom } from "@/types/lab";

export function isProjectLocation(location: LocationId): location is ProjectId {
  return projectIds.includes(location as ProjectId);
}

export function getLocationDetails(location: LocationId): LabLocation | ProjectRoom {
  return isProjectLocation(location) ? projectById[location] : labLocations[location];
}

export function getLocationLabel(location: LocationId): string {
  return isProjectLocation(location) ? projectById[location].title : labLocations[location].label;
}
