import React from 'react';
import { useCV } from '../../context/CVContext';

const ModernTemplate = ({ data }) => {
    const { settings } = useCV();
    const { personalInfo, sections } = data;
    const { font, color } = settings;

    return (
        <div className="p-10 h-full" style={{ fontFamily: font, color: '#333' }}>
            {/* Header */}
            <header className="border-b-2 pb-6 mb-8" style={{ borderColor: color }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
                    {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.website && (
                        <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                            {personalInfo.website}
                        </a>
                    )}
                </div>
                {personalInfo.summary && <p className="mt-6 text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>}
            </header>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map(section => (
                    <section key={section.id}>
                        <h2 className="text-xl font-bold uppercase mb-4 border-b border-gray-200 pb-4 flex items-center gap-2" style={{ color: color }}>
                            {section.title}
                        </h2>
                        <div className={section.title.toLowerCase() === 'skills' ? "flex flex-wrap gap-4" : "space-y-5"}>
                            {section.items.map(item => (
                                <div key={item.id} className={section.title.toLowerCase() === 'skills' ? "" : ""}>
                                    {section.title.toLowerCase() === 'skills' ? (
                                        <span
                                            className={`font-medium text-gray-800 text-lg leading-relaxed ${section.isUnderlined !== false ? 'border-b-2 border-gray-300 pb-2' : ''}`}
                                        >
                                            {item.title}
                                        </span>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                                <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">{item.date}</span>
                                            </div>
                                            {item.subtitle && <div className="text-gray-700 font-medium mb-2">{item.subtitle}</div>}
                                            {item.description && (
                                                <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none text-justify" dangerouslySetInnerHTML={{ __html: item.description }} />
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

export default ModernTemplate;
