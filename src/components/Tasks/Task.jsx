import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';

export function Task({id, index, column, name, dueDate,status}) {
  const {ref, isDragging} = useSortable({
    id,
    index,
   
    group: column,
    data:{
      status,
      column
    }
  });

  return (

          <div draggable ref={ref} data-dragging={isDragging}  style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  <strong>{name} </strong>
                  <span>Due Date: {dueDate}</span> 
                </div>
  );
}