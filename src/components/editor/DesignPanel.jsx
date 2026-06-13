import React from 'react';
import { useCV } from '../../context/CVContext';
import { Layout, Type, Palette } from 'lucide-react';

const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Playfair Display', value: '"Playfair Display", serif' },
];

const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
];

const colors = [
    '#2563eb', // Blue
    '#dc2626', // Red
    '#16a34a', // Green
    '#d97706', // Amber
    '#7c3aed', // Violet
    '#db2777', // Pink
    '#1f2937', // Gray
    '#000000', // Black
];

const DesignPanel = () => {
    const { settings, updateSettings } = useCV();

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Layout size={20} />
                    Template
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {templates.map(t => (
                        <button
                            key={t.id}
                            onClick={() => updateSettings('template', t.id)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${settings.template === t.id
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                        >
                            <span className="font-medium block">{t.name}</span>
                            <span className="text-xs opacity-75">Text-based professional layout</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Type size={20} />
                    Typography
                </h3>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Font Family</label>
                    <select
                        value={fonts.find(f => f.value === settings.font)?.name || 'Inter'}
                        onChange={(e) => {
                            const selected = fonts.find(f => f.name === e.target.value);
                            if (selected) updateSettings('font', selected.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                        {fonts.map(f => (
                            <option key={f.name} value={f.name}>{f.name}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500">Font size is standardized for optimal readability.</p>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Palette size={20} />
                    Accent Color
                </h3>
                <div className="flex flex-wrap gap-3">
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => updateSettings('color', c)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${settings.color === c ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-400' : 'border-transparent'
                                }`}
                            style={{ backgroundColor: c }}
                            aria-label={`Select color ${c}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DesignPanel;
