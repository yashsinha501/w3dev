import React, { createContext, useReducer } from 'react'
import { ActionTypeEnum, IAddAction, ICompletedAction, IDeleteAction, IReducerAction, ITask, ITodoContext, ITodoState, IToggleFavoriteAction, IUpdateAction } from './Types';
import { clone } from './utility';



export const TodoContext = createContext<ITodoContext>({
    activeTasks: [],
    completedTasks: [],
    dispatch: () => {}
  });

type Props = {
    children : React.ReactNode
}


const TodoProvider = (props: Props) => {
    const tasks: ITask[] = [{
        id:"1",
        title:"Task-1",
        isFav: true,
      },
      {
        id:"2",
        title:"Task-2",
        isFav: false,
      },
      {
        id:"3",
        title:"Task-3",
        isFav: true,
      },
  ];

  const addTaskAction = (state: ITodoState, action: IAddAction) => {
    const { data } = action;
    data.id = new Date().toJSON();
    return [action.data, ...state.activeTasks]
  }

  const deleteTaskAction = (state: ITodoState, action: IDeleteAction) => {
    const activeTasks: ITask[] = clone(state.activeTasks);
    const filteredData = activeTasks.filter(
      ( task ) => task.id !== action.data.id
    );
    return filteredData;
  }

  const deleteCompletedTaskAction = (state: ITodoState, action: IDeleteAction) => {
    const completedTasks: ITask[] = clone(state.completedTasks);
    const filteredData = completedTasks.filter(
      ( task ) => task.id !== action.data.id
    );
    return filteredData;
  }
  
  const ToggleFavoriteAction = (state: ITodoState,action: IToggleFavoriteAction) => {
    const cloneActiveTasks: ITask[] = clone(state.activeTasks);
    const index = cloneActiveTasks.findIndex(x => x.id === action.data.id);
    if(index >= 0){
      cloneActiveTasks[index].isFav = !cloneActiveTasks[index].isFav;
    }
    return cloneActiveTasks;
  }

  const updateTaskAction = (state: ITodoState, action: IUpdateAction) => {
    const cloneActiveTasks: ITask[] = clone(state.activeTasks);
    const index = cloneActiveTasks.findIndex(x => x.id === action.data.id);
    if(index >= 0){
      cloneActiveTasks[index] = action.data;
    }

    return cloneActiveTasks;
  }



  const completedTaskAction = (state: ITodoState, action: ICompletedAction) => {
    const activeTasks: ITask[] = clone(state.activeTasks);
    const completedTaskData = activeTasks.find(task => task.id === action.data.id)
    const filteredData = activeTasks.filter(
      ( task ) => task.id !== action.data.id
    );
    const completedTasks = completedTaskData ? [completedTaskData, ...state.completedTasks] :
    [...state.completedTasks]
    return {
      activeTasks : filteredData,
      completedTasks, 
    };
  }

  const reducer = (state: ITodoState, action: IReducerAction) => {
    switch(action.type){
      case ActionTypeEnum.Add :
        return {...state, activeTasks: addTaskAction(state, action)};
      case ActionTypeEnum.Delete:
        return {...state, activeTasks: deleteTaskAction(state, action)}
      case ActionTypeEnum.DeleteCompletedTask:
        return {...state, completedTaskAction: deleteCompletedTaskAction(state, action)}
      case ActionTypeEnum.ToggleFavorite:
        return {...state, activeTasks : ToggleFavoriteAction(state, action)}
      case ActionTypeEnum.Update:
        return {...state, activeTasks: updateTaskAction(state, action)}
      case ActionTypeEnum.completed:
        const data = completedTaskAction(state, action)
        return {...state, activeTasks: data.activeTasks, completedTasks: data.completedTasks};
      }

    return {...state}
  };

  const data: ITodoState = {activeTasks: tasks, completedTasks: [] }
  const [state, dispatch ] = useReducer(reducer,data)

  return (
    <TodoContext.Provider value={{activeTasks: state.activeTasks, completedTasks: state.completedTasks, dispatch}}>
        {props.children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
