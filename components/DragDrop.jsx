import { Column } from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export const DragDrop = ({ prefColumnOrder, setPrefColumnOrder }) => {
  const onDragEnd = (result) => {};

  return (
    <DragDropContext
        onDragEnd={onDragEnd}
    >
      {prefColumnOrder.columnOrder.map((columnId) => {
        const column = prefColumnOrder.columns[columnId];
        const preferenceItems = column.preferenceIds.map(
          (preferenceID) => prefColumnOrder.preferences[preferenceID]
        );

        return (
          <Column
            key={column.id}
            column={column}
            preferenceItems={preferenceItems}
          />
        );
      })}
    </DragDropContext>
  );
};
