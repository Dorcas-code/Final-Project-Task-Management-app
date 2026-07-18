import React from 'react';
import {useDroppable} from '@dnd-kit/react';
import {CollisionPriority} from '@dnd-kit/abstract';

export function Column({children, id, name}) {
  const {isDropTarget, ref} = useDroppable({
    id,

    collisionPriority: CollisionPriority.Low,
  });
  const style = isDropTarget ? {background: '#00000030'} : undefined;

  return (
    <div className="Column" ref={ref} style={{backgroundColor: "White",  borderRadius: "15px", minHeight:"300px",width:"300px",marginTop:"10px",padding:"15px"}}>
      <h2 style={{textAlign: "center"}}>{name}</h2>
      {children}
    </div>
  );
}