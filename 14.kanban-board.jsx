import { useState } from "react";

function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: ["Todo 1", "Todo 2"],
    inProgress: ["progress"],
    done: ["Completed"],
  });

  const [draggin, setdraggig] = useState(null);

  const onDragStart = (currentTask, currentCloumnID) => {
    // console.log(currentTask,currentCloumnID);
    setdraggig({ currentTask, currentCloumnID });
  };

  const onDrop = (targetColume)=>{
    if(!targetColume){
        return;
    }
    if(draggin.currentCloumnID=== targetColume){
        // console.log("same");
        return;
    }
    setColumns((prev)=>{
        const sourcItem = prev[draggin.currentCloumnID].filter(item=> item != draggin.currentTask);
        const targetItems=[...prev[targetColume], draggin.currentTask];

        return{
            ...prev,
            [draggin.currentCloumnID] : sourcItem,
            [targetColume] : targetItems
        }
    })

  }

  const onDragOver=(event)=>{
        event.preventDefault() //like we are allowing to drop 
  }

  return (
    <div className="flex flex-col items-center pt-[80px] min-h-screen bg-gray-50 px-6">
      <h1>Kanban Board</h1>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([columnsID, tasks]) => (
          <div key={columnsID} className="rounded-md border p-2"
          onDragOver={onDragOver} // we have to in parrent div this is parent div
          onDrop={()=>onDrop(columnsID)}
          >
            <h3 className="font-medium capitalize">{columnsID}</h3>

            {tasks.map((task) => (
              <div
                key={task}
                className="bg-gray-200 p-2 mb-2 rounded cursor-move"
                draggable
                onDragStart={() => onDragStart(task, columnsID)}
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
