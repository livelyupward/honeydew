import { ComponentPublicInstance } from 'vue';
import TodoList from './fragments/Todo/TodoList.vue';
import KanbanBoard from './fragments/Kanban/KanbanBoard.vue';
import AnyNote from './fragments/Note/AnyNote.vue';
import PlainNote from './fragments/Note/PlainNote.vue';

export const fragmentMap: {
  note: MapType;
  anyNote: MapType;
  todo: MapType;
  kanban: MapType;
} = {
  note: {
    component: PlainNote,
    name: 'Plain note',
  },
  anyNote: {
    component: AnyNote,
    name: 'AnyNote',
  },
  todo: {
    component: TodoList,
    name: 'Todo List',
  },
  kanban: {
    component: KanbanBoard,
    name: 'Kanban Board',
  },
};

interface MapType {
  component: ComponentPublicInstance;
  name: string;
}
