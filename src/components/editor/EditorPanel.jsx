import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import PersonalInfoEditor from './PersonalInfoEditor';
import SectionList from './SectionList';
import DesignPanel from './DesignPanel';
import { Plus, LayoutTemplate, PenTool } from 'lucide-react';

const EditorPanel = () => {
  const { addSection } = useCV();
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'content'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <PenTool size={16} />
          Content
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'design'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <LayoutTemplate size={16} />
          Design
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 px-1">
        {activeTab === 'content' ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">CV Content</h1>
            <PersonalInfoEditor />
            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-semibold text-lg mb-4 text-gray-700">Sections</h2>
              <SectionList />
              <button
                onClick={() => addSection()}
                className="mt-4 w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center font-medium"
              >
                <Plus size={20} className="mr-2" /> Add New Section
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Design & Formatting</h1>
            <DesignPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
