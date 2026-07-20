import React from 'react';
import Card from 'react-bootstrap/Card';
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

          <Card draggable ref={ref}  data-dragging={isDragging}  style={{ cursor: "pointer" ,marginBottom:"12px"}}>
                  <Card.Header>{name} </Card.Header>
                  <Card.Body>
                  <Card.Text>Due Date: {dueDate}</Card.Text> </Card.Body>
                </Card>
  );
}