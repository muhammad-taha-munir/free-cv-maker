import React from 'react';

const Template1 = ({ data }) => {
    const { personalInfo, sections, theme } = data;

    return (
        <div className="p-12 font-sans text-gray-800 h-full" style={{ fontFamily: theme.font }}>
            {/* Header */}
            <header className="border-b-2 pb-6 mb-8" style={{ borderColor: theme.color }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color }}>{personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1">
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                                {personalInfo.website}
                            </a>
                        </div>
                    )}
                </div>
                {personalInfo.summary && <p className="mt-6 text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>}
            </header>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map(section => (
                    <section key={section.id}>
                        <h2 className="text-xl font-bold uppercase mb-4 border-b border-gray-200 pb-2 flex items-center gap-2" style={{ color: theme.color }}>
                            {section.title}
                        </h2>
                        <div className="space-y-5">
                            {section.items.map(item => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">{item.date}</span>
                                    </div>
                                    {item.subtitle && <div className="text-gray-700 font-medium mb-2">{item.subtitle}</div>}
                                    {item.description && (
                                        <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none text-justify" dangerouslySetInnerHTML={{ __html: item.description }} />
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

export default Template1;
