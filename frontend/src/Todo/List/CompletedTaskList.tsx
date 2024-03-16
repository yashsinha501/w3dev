import { useContext } from 'react'
import { ActionTypeEnum, ITask } from '../Types';
import { Checkbox, FontIcon, MessageBar, Stack, mergeStyles } from '@fluentui/react';
import TaskListStyle from './TaskList.style';
import TaskDescription from './TaskDescription';
import { TodoContext } from '../TodoProvider';
import TodoString from '../String.json'

const CompletedTaskList = () => {

    const {completedTasks, dispatch} = useContext(TodoContext)

    const onTaskDelete = (id: string) => {
        if(window.confirm(TodoString.deleteConfirm)){
            dispatch({type: ActionTypeEnum.DeleteCompletedTask, data: { id }});
        }
    }

    const onRenderCell = (task: ITask) => {
        return (
              <Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
                <Stack horizontal style={{width: "85%"}} className={TaskListStyle.disabled}>
                  <Checkbox disabled  />
                  <span>{task.title}</span>
                </Stack>
                <Stack horizontal>
                  <TaskDescription task={task} />
                  <FontIcon 
                    iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
                    className={
                        mergeStyles(TaskListStyle.iconStyle, TaskListStyle.disabled)
                    }
                    />
                  <FontIcon iconName="Delete" className={TaskListStyle.iconStyle} 
                    onClick={()=>onTaskDelete(task.id)}
                   />
                </Stack>
              </Stack>
          );
      }

  return (
    <div>
      {completedTasks.map(onRenderCell)}
      {completedTasks.length ? 
                (completedTasks.map(onRenderCell))
                : (
                  <MessageBar>No records to show</MessageBar>
                )}
    </div>
  )
}

export default CompletedTaskList
