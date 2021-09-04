import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,ButtonGroup,Table } from 'react-bootstrap';
import React from 'react';


function List(props){
  let {children,index,onDelete,onModified} = props;
  let [editable,setEditable] = React.useState(false);
  let [tempTask, setTempTask] = React.useState(children);
  
  function onEdit(){
    setEditable(!editable);
  }
  function onSave(){
    if(tempTask!==""){
      onModified(tempTask);
      setEditable(!editable);
    }
  }
  return(
    <tr>
      <td>{index+1}</td>
      {
        editable?
        <>
          <td><textarea onChange={(e)=>setTempTask(e.target.value)} value={tempTask}></textarea></td>
          <td><Button variant="outline-success" size="sm" onClick={onSave}>Save</Button></td>
        </>
        :<>
          <td>{children}</td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="outline-info" size="sm" onClick={onEdit}>Edit</Button>
              <Button variant="outline-danger" size="sm" onClick={onDelete}>Delete</Button>
            </ButtonGroup>
          </td>
        </>
      }
    </tr>
  )
}





function App() {
  let [task,setTask] = React.useState("");
  let [todoList,setToDoList] = React.useState([]);
  
  function textChange(e){
    setTask(e.target.value);
  }

  function saveTask(){
    if(task!==""){
      setToDoList([...todoList,task]);
      setTask("");
    }
  }

  function onDelete(index){
    const newList = todoList.filter((task,i)=>i!==index);
    setToDoList(newList);
  }
  function onModified(updatedTask,index){
    const newList=todoList.map(function(task,i){
			if(index === i){
				return updatedTask;
			}
			return task;
		});
    setToDoList(newList);
  }
  return (
    <div className="App">
      <h2>ToDo App</h2>
      <h4>
        <textarea onChange={textChange} placeholder="Write your task" value={task}></textarea>
        <Button variant="outline-success" size="sm" onClick={saveTask}>Add Task</Button>
      </h4>
        <Table hover>
          <tbody>
            {
              todoList.map((ele,index)=>{
                return(
                  <List key={ele+index} index = {index} onDelete={()=>onDelete(index)} onModified={(updatedTask)=>{onModified(updatedTask,index)}}>{ele}</List>
                )
              })
            }           
          </tbody>
        </Table>
    </div>
  );
}

export default App;
