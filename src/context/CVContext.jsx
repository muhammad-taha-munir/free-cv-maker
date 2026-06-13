import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialState, initialSettings } from '../data/initialState';
import { v4 as uuidv4 } from 'uuid';

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
    const [cv, setCv] = useState(() => {
        const saved = localStorage.getItem('cvData');
        return saved ? JSON.parse(saved) : initialState;
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('cvSettings');
        return saved ? JSON.parse(saved) : initialSettings;
    });

    useEffect(() => {
        localStorage.setItem('cvData', JSON.stringify(cv));
    }, [cv]);

    useEffect(() => {
        localStorage.setItem('cvSettings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const updatePersonalInfo = (field, value) => {
        setCv(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addSection = (type = 'custom') => {
        setCv(prev => ({
            ...prev,
            sections: [
                ...prev.sections,
                {
                    id: uuidv4(),
                    type,
                    title: 'New Section',
                    items: []
                }
            ]
        }));
    };

    const removeSection = (sectionId) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.filter(s => s.id !== sectionId)
        }));
    };

    const updateSectionTitle = (sectionId, title) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, title } : s
            )
        }));
    };

    const updateSection = (sectionId, field, value) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, [field]: value } : s
            )
        }));
    };

    const reorderSections = (newSections) => {
        setCv(prev => ({ ...prev, sections: newSections }));
    };

    const addItem = (sectionId) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: [...s.items, { id: uuidv4(), title: '', subtitle: '', date: '', description: '' }]
                } : s
            )
        }));
    };

    const removeItem = (sectionId, itemId) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.filter(i => i.id !== itemId)
                } : s
            )
        }));
    };

    const updateItem = (sectionId, itemId, field, value) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.map(i =>
                        i.id === itemId ? { ...i, [field]: value } : i
                    )
                } : s
            )
        }));
    };

    const importCV = (jsonData) => {
        try {
            const parsed = JSON.parse(jsonData);
            setCv(parsed);
        } catch (e) {
            console.error("Invalid JSON", e);
            alert("Invalid JSON data");
        }
    };

    const resetCV = () => {
        setCv(initialState);
    };

    return (
        <CVContext.Provider value={{
            cv,
            updatePersonalInfo,
            addSection,
            removeSection,
            removeSection,
            updateSectionTitle,
            updateSection,
            reorderSections,
            addItem,
            removeItem,
            updateItem,
            importCV,
            resetCV,
            settings,
            updateSettings
        }}>
            {children}
        </CVContext.Provider>
    );
};
