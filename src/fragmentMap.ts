import type { ComponentPublicInstance } from 'vue';
import TodoList from './fragments/Todo/TodoList.vue';
import KanbanBoard from './fragments/Kanban/KanbanBoard.vue';
import AnyNote from './fragments/Note/AnyNote.vue';
import CreateFragment from './fragments/NewFragment.vue';
import PlainNote from './fragments/Note/PlainNote.vue';

export const fragmentMap: FragmentMap = {
  note: PlainNote,
  anyNote: AnyNote,
  todo: TodoList,
  kanban: KanbanBoard,
  default: CreateFragment,
};

interface FragmentMap {
  note: ComponentPublicInstance;
  anyNote: ComponentPublicInstance;
  todo: ComponentPublicInstance;
  kanban: ComponentPublicInstance;
  default: ComponentPublicInstance;
}
