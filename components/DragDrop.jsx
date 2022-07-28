import { Column } from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export const DragDrop = ({
  prefColumnOrder,
  setPrefColumnOrder,
  setPreferences,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = prefColumnOrder.columns[source.droppableId];
    const newPreferenceIds = Array.from(column.preferenceIds);
    newPreferenceIds.splice(source.index, 1);
    newPreferenceIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      preferenceIds: newPreferenceIds,
    };
    setPrefColumnOrder((current) => {
      return {
        ...current,
        columns: {
          ...current.columns,
          [newColumn.id]: newColumn,
        },
      };
    });
    setPreferences((current) => {
      return {
        ...current,
        costOfLivingScore: 14 - newColumn.preferenceIds.indexOf("crime"),
        jobScore: 14 - newColumn.preferenceIds.indexOf("jobs"),
        publicSchoolScore: 14 - newColumn.preferenceIds.indexOf("schools"),
        crimeScore: 14 - newColumn.preferenceIds.indexOf("crime"),
        nightlifeScore: 14 - newColumn.preferenceIds.indexOf("nightlife"),
        familyScore: 14 - newColumn.preferenceIds.indexOf("family"),
        diversityScore: 14 - newColumn.preferenceIds.indexOf("diversity"),
        jobScore: 14 - newColumn.preferenceIds.indexOf("jobs"),
        healthAndFitnessScore: 14 - newColumn.preferenceIds.indexOf("health"),
        outdoorScore: 14 - newColumn.preferenceIds.indexOf("outdoors"),
        commuteScore: 14 - newColumn.preferenceIds.indexOf("commute"),
      };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
