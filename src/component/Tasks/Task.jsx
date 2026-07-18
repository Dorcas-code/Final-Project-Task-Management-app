import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';

export function Task({id, name, due_date, index, column}) {
  const {ref, isDragging} = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column
  });

  return (

          <div draggable ref={ref} data-dragging={isDragging} onDragStart={(e)=> handleDragStart(e,task.id)}  style={{backgroundColor: "#fef2f2", borderRadius: "5px", padding: "10px", marginBottom: "10px", cursor: "pointer"}}>
                  <strong>{name} </strong>
                  <span>Due Date: {due_date}</span>
                </div>
  );
}