import { Droppable, Draggable } from "react-beautiful-dnd";

export const Column = ({ column, preferenceItems }) => {
  return (
    <div className="flex flex-col items-center bg-offwhite">
      <h3 className=" font-display font-semibold">{column.title}</h3>
      <div className="flex flex-col bg-midnight">
        <Droppable droppableId={column.id}>
          {(providedParent, snapshotParent) => (
            <div ref={providedParent.innerRef} {...providedParent.droppableProps} className={snapshotParent.isDraggingOver ? "bg-slate-700 transition-colors" : "transition-colors"}>
              {preferenceItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={snapshot.isDragging ? "rounded-md border-2 p-2 bg-slate-300" : "rounded-md border-2 p-2 bg-offwhite"}
                    >
                      <h3 className=" font-display">{item.content}</h3>
                    </div>
                  )}
                </Draggable>
              ))}
              {providedParent.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
