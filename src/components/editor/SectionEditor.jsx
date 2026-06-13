import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import RichTextEditor from './RichTextEditor';
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react';

const SectionEditor = ({ section }) => {
    const { updateSectionTitle, removeSection, addItem, removeItem, updateItem, updateSection } = useCV();
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
            {/* Section Header */}
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3 flex-1">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="font-semibold text-gray-700 bg-transparent border-none focus:ring-0 p-0 w-full"
                    />
                </div>
                <button
                    onClick={() => removeSection(section.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                    title="Delete Section"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Section Content */}
            {isExpanded && (
                <div className="p-4 space-y-6">
                    {section.title.toLowerCase() === 'skills' && (
                        <div className="flex items-center gap-2 mb-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={section.isUnderlined !== false} // Default to true
                                    onChange={(e) => updateSection(section.id, 'isUnderlined', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Underline Skills</span>
                            </label>
                        </div>
                    )}

                    {section.items.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded p-4 relative group">
                            <button
                                onClick={() => removeItem(section.id, item.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 gap-3 mb-3">
                                <input
                                    type="text"
                                    placeholder={section.title.toLowerCase() === 'skills' ? "Skill Name" : "Title (e.g. Job Title, Degree)"}
                                    value={item.title}
                                    onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {section.title.toLowerCase() !== 'skills' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Subtitle (e.g. Company, University)"
                                                value={item.subtitle}
                                                onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Date / Location"
                                                value={item.date}
                                                onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {section.title.toLowerCase() !== 'skills' && (
                                <RichTextEditor
                                    value={item.description}
                                    onChange={(val) => updateItem(section.id, item.id, 'description', val)}
                                    label="Description"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => addItem(section.id)}
                        className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
                    >
                        <Plus size={18} className="mr-2" /> Add Item
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
