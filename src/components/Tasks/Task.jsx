import React from 'react';
import Card from 'react-bootstrap/Card';
import {useSortable} from '@dnd-kit/react/sortable';
import ProgressBar from 'react-bootstrap/ProgressBar';

export function Task({id, index, column, name, dueDate,status,percent}) {
  const progressColor = percent === 100 ? 'success' : percent >= 50 ? 'warning' : 'danger';
  const {ref, isDragging} = useSortable({
    id,
    index,
   
    group: column,
    data:{
      status,
      column,
      percent
    }
  });
    
  return (

          <Card draggable ref={ref}  data-dragging={isDragging}  style={{ cursor: "pointer" ,marginBottom:"12px"}}>
                  <Card.Header>{name} </Card.Header>
                  <Card.Body>
                  <Card.Text>Due Date: {dueDate}</Card.Text> </Card.Body>
           
                  <ProgressBar now={percent} label={`${percent}%`} variant={progressColor} />
                </Card>
  );
}