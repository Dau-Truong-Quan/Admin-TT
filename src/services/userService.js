import { QuanService } from "./QuanService";

export class UserService extends QuanService {
  constructor() {
    super();
  }
  getUser = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };
  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };
  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };
  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
  getAllUser = () => {
    return this.get(`admin/user/all`);
  };
  deleteUser = (id) => {
    return this.delete(`admin/user/${id}`);
  };
}

export const userService2 = new UserService();
