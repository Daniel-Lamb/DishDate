import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useLists } from '../../hooks/useLists';
import { CreateListDialog } from './CreateListDialog';
import { ListCard } from './ListCard';
import { List } from '../../types/list';

interface ListsSectionProps {
  onSelectList: (list: List) => void;
}

export function ListsSection({ onSelectList }: ListsSectionProps) {
  const { lists, deleteList } = useLists();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteList = async (listId: string) => {
    if (listId === 'favorites') return; // Prevent deleting Favorites list
    await deleteList(listId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New List</span>
        </button>
      </div>

      <div className="grid gap-4">
        {filteredLists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            onDelete={() => handleDeleteList(list.id)}
            onClick={() => onSelectList(list)}
          />
        ))}
      </div>

      <CreateListDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreateList={() => setShowCreateDialog(false)}
      />
    </div>
  );
}