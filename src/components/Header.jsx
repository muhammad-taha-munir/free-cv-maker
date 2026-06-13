import React from 'react';
import { Download, FileJson, Upload } from 'lucide-react';
import { useCV } from '../context/CVContext';

const Header = ({ handlePrint, isGenerating }) => {
    const { cv, importCV, resetCV } = useCV();

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(cv, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'cv-data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImportJSON = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            importCV(e.target.result);
        };
    };

    return (
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-20 relative">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold tracking-wider">CV MAKER</h1>
            </div>

            <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer transition-colors text-sm font-medium">
                    <Upload size={16} />
                    <span>Load JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>

                <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm font-medium"
                >
                    <FileJson size={16} />
                    <span>Save JSON</span>
                </button>

                <div className="h-6 w-px bg-gray-700 mx-2"></div>

                <button
                    onClick={handlePrint}
                    disabled={isGenerating}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors text-sm font-medium shadow-sm ${isGenerating ? 'bg-blue-800 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <Download size={16} />
                            <span>Export PDF</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;
