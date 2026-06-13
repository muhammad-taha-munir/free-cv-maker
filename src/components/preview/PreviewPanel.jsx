import React, { forwardRef } from 'react';
import { useCV } from '../../context/CVContext';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';

const PreviewPanel = forwardRef((props, ref) => {
    const { cv, settings } = useCV();

    const renderTemplate = () => {
        switch (settings.template) {
            case 'modern': return <ModernTemplate data={cv} />;
            case 'classic': return <ClassicTemplate data={cv} />;
            case 'creative': return <CreativeTemplate data={cv} />;
            default: return <ModernTemplate data={cv} />;
        }
    };

    return (
        <div className="w-full max-w-[210mm] print:max-w-none">
            <div className="bg-white shadow-2xl min-h-[297mm] print:shadow-none print:m-0" ref={ref}>
                {renderTemplate()}
            </div>
        </div>
    );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
