import { applyMiddleware, combineReducers, createStore } from "redux";

import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./rootSaga";
import { ProjectCategoryRedux } from "./reducer/ProjectCategoryRedux";
import { Pro } from "./reducer/ProjectCategoryRedux";
import { ProjectListRedux } from "./reducer/ProjectCyberBugReducer";
import { DrawerCycberbugReducer } from "./reducer/DrawerCycberBugReducer";
import { DetailProject } from "./reducer/ProjectReducer";
import { UserCyberBugReducer } from "./reducer/UserCyberBugReducer";
import { TaskTypeReducer } from "./reducer/TaskTypeReducer";
import { PriorityReducer } from "./reducer/PriorityReducer";
import { StatusReducer } from "./reducer/StatusReducer";
import { ProductReducer } from "./reducer/ProductReducer";
import { ImportReducer } from "./reducer/ImportReducer";
import { ImportDetailReducer } from "./reducer/ImportDetailRecuder";
import { FormAddProductToImpotReducer } from "./reducer/FormAddProductToImpotReducer";
import { DashboardReducer } from "./reducer/DashboardReducer";
import { UploadImageReducer } from "./reducer/UploadImageReducer";
import { CategoryReducer } from "./reducer/CategoryReducer";
import { UserReducer } from "./reducer/UserReducer";
import { BrandReducer } from "./reducer/BrandReducer";
const middleSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  rootSaga,
  UserCyberBugReducer,
  ProjectCategoryRedux,
  ProjectListRedux,
  DrawerCycberbugReducer,
  DetailProject,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  // PRODUCT
  ProductReducer,
  ImportReducer,
  ImportDetailReducer,
  FormAddProductToImpotReducer,
  DashboardReducer,
  UploadImageReducer,
  CategoryReducer,
  BrandReducer,
  UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleSaga));
middleSaga.run(rootSaga);
export default store;
