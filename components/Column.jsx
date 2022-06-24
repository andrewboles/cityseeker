import { Droppable, Draggable } from "react-beautiful-dnd";

export const Column = ({ column, preferenceItems }) => {
  return (
    <div className="flex flex-col">
      <h3>{column.title}</h3>
      <div className="flex flex-col">
        <Droppable droppableId={column.id}>
          {(providedParent) => (
            <div ref={providedParent.innerRef} {...providedParent.droppableProps}>
              {preferenceItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className=" rounded-md border-2 p-2 bg-white"
                      
                    >
                      <h3>{item.content}</h3>
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
