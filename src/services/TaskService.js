import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }
  createTask = (object) => {
    return this.post(`Project/createTask`, object);
  };
}

export const taskService = new TaskService();
