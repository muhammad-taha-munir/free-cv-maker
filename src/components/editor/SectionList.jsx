import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useCV } from '../../context/CVContext';
import SectionEditor from './SectionEditor';
import { GripVertical } from 'lucide-react';

const SectionList = () => {
    const { cv, reorderSections } = useCV();

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(cv.sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        reorderSections(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {cv.sections.map((section, index) => (
                            <Draggable key={section.id} draggableId={section.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="relative"
                                    >
                                        <div
                                            {...provided.dragHandleProps}
                                            className="absolute left-2 top-4 z-10 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                        >
                                            <GripVertical size={20} />
                                        </div>
                                        <div className="pl-8">
                                            <SectionEditor section={section} />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SectionList;
