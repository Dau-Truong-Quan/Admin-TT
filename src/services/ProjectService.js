import { baseService } from "./baseService";

export class ProjectService extends baseService {
  constructor() {
    super();
  }
  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
  getProjectDetail = (id) => {
    return this.get(`Project/getProjectDetail?id=${id}`);
  };
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };
}

export const projectService = new ProjectService();
