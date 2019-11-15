export interface Task {
  taskID: string;
  userID: string;
  category: string;
  desc: string;
  dataCreated: string;
  dataEnd: number;
  duration: number;
  isToDo: boolean;
  isProgress: boolean;
  isDone: boolean;
}
