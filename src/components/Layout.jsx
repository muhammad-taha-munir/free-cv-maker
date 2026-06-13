import React from 'react';

const Layout = ({ editor, preview }) => {
    return (
        <div className="flex h-full bg-gray-100 overflow-hidden">
            <div className="w-1/2 h-full overflow-y-auto border-r border-gray-300 bg-white p-6 shadow-lg z-10 scrollbar-thin scrollbar-thumb-gray-300 print:hidden">
                {editor}
            </div>
            <div className="w-1/2 h-full overflow-y-auto bg-gray-500 p-8 flex justify-center scrollbar-thin scrollbar-thumb-gray-400 print:w-full print:p-0 print:bg-white print:overflow-visible">
                {preview}
            </div>
        </div>
    );
};

export default Layout;
