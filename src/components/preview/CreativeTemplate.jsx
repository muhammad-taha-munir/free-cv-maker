import React from 'react';
import { useCV } from '../../context/CVContext';

const CreativeTemplate = ({ data }) => {
    const { settings } = useCV();
    const { personalInfo, sections } = data;
    const { font, color } = settings;

    // Helper to split sections into left (sidebar) and right (main)
    // For simplicity, we'll put Skills and Contact info in sidebar if possible, or just split by index
    // But since sections are dynamic, let's put short items in sidebar?
    // Better strategy: Put "Skills", "Languages", "Interests" in sidebar if they exist.
    // Everything else in main.

    const sidebarKeywords = ['skills', 'languages', 'interests', 'awards', 'certifications'];
    const sidebarSections = sections.filter(s => sidebarKeywords.some(k => s.title.toLowerCase().includes(k)) || s.type === 'skills');
    const mainSections = sections.filter(s => !sidebarSections.includes(s));

    // If no sidebar sections, maybe move the last one there to balance?
    if (sidebarSections.length === 0 && sections.length > 1) {
        sidebarSections.push(sections[sections.length - 1]);
        mainSections.pop();
    }

    return (
        <div className="flex h-full min-h-[297mm]" style={{ fontFamily: font }}>
            {/* Sidebar */}
            <aside className="w-1/3 text-white p-8 flex flex-col gap-8" style={{ backgroundColor: color }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold uppercase leading-tight mb-4 break-words">{personalInfo.fullName}</h1>
                    <div className="text-xs space-y-2 opacity-90">
                        {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.address && <div>{personalInfo.address}</div>}
                        {personalInfo.website && (
                            <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="hover:underline break-all block">
                                {personalInfo.website}
                            </a>
                        )}
                    </div>
                </div>

                {sidebarSections.map(section => (
                    <div key={section.id}>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">
                            {section.title}
                        </h2>
                        <div className="space-y-3 text-sm">
                            {section.items.map(item => (
                                <div key={item.id}>
                                    <div className="font-bold">{item.title}</div>
                                    {item.subtitle && <div className="opacity-80 text-xs">{item.subtitle}</div>}
                                    {item.description && (
                                        <div className="opacity-80 text-xs mt-1" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-8 bg-white text-gray-800">
                {personalInfo.summary && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-gray-400 mb-2">Profile</h2>
                        <p className="text-sm leading-relaxed text-justify">{personalInfo.summary}</p>
                    </div>
                )}

                <div className="space-y-8">
                    {mainSections.map(section => (
                        <section key={section.id}>
                            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: color }}>
                                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }}></span>
                                {section.title}
                            </h2>
                            <div className="space-y-5">
                                {section.items.map(item => (
                                    <div key={item.id} className="relative pl-4 border-l-2 border-gray-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                                            <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2 bg-gray-100 px-2 py-0.5 rounded">{item.date}</span>
                                        </div>
                                        {item.subtitle && <div className="text-gray-600 font-medium text-sm mb-2">{item.subtitle}</div>}
                                        {item.description && (
                                            <div className="text-sm text-gray-600 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: item.description }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CreativeTemplate;
