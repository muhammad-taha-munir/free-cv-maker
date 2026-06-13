import React from 'react';
import { useCV } from '../../context/CVContext';

const ClassicTemplate = ({ data }) => {
    const { settings } = useCV();
    const { personalInfo, sections } = data;
    const { font, color } = settings;

    return (
        <div className="p-12 h-full" style={{ fontFamily: font, color: '#1a1a1a' }}>
            {/* Header */}
            <header className="text-center border-b border-gray-300 pb-8 mb-8">
                <h1 className="text-3xl font-serif font-bold mb-3 tracking-wide uppercase" style={{ color: '#000' }}>
                    {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 italic">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.address && (personalInfo.email || personalInfo.phone) && <span>•</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.email && personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.phone && personalInfo.website && <span>•</span>}
                    {personalInfo.website && (
                        <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                            {personalInfo.website}
                        </a>
                    )}
                </div>
                {personalInfo.summary && (
                    <div className="mt-6 max-w-2xl mx-auto text-center text-gray-700 leading-relaxed">
                        {personalInfo.summary}
                    </div>
                )}
            </header>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map(section => (
                    <section key={section.id}>
                        <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b border-gray-300 inline-block w-full" style={{ color: color }}>
                            {section.title}
                        </h2>
                        <div className={section.title.toLowerCase() === 'skills' ? "flex flex-wrap gap-4 justify-center" : "space-y-6"}>
                            {section.items.map(item => (
                                <div key={item.id} className={section.title.toLowerCase() === 'skills' ? "" : ""}>
                                    {section.title.toLowerCase() === 'skills' ? (
                                        <span
                                            className={`font-medium text-gray-800 text-lg leading-relaxed ${section.isUnderlined !== false ? 'border-b border-gray-400 pb-2' : ''}`}
                                        >
                                            {item.title}
                                        </span>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                                <span className="text-sm text-gray-600 italic whitespace-nowrap ml-4">{item.date}</span>
                                            </div>
                                            {item.subtitle && <div className="text-gray-800 font-medium mb-2">{item.subtitle}</div>}
                                            {item.description && (
                                                <div className="text-sm text-gray-700 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: item.description }} />
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ClassicTemplate;
