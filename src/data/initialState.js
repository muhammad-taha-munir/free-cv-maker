import { v4 as uuidv4 } from 'uuid';

export const initialSettings = {
    template: 'modern',
    font: 'Inter',
    color: '#2563eb'
};

export const initialState = {
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "New York, USA",
        website: "linkedin.com/in/johndoe",
        summary: "Experienced professional with a strong background in..."
    },
    sections: [
        {
            id: uuidv4(),
            type: "experience",
            title: "Experience",
            items: [
                {
                    id: uuidv4(),
                    title: "Software Engineer",
                    subtitle: "Tech Corp",
                    date: "2020 - Present",
                    description: "<ul><li>Developed scalable web applications...</li><li>Led a team of 5 developers...</li></ul>"
                }
            ]
        },
        {
            id: uuidv4(),
            type: "education",
            title: "Education",
            items: [
                {
                    id: uuidv4(),
                    title: "B.Sc. Computer Science",
                    subtitle: "University of Tech",
                    date: "2016 - 2020",
                    description: "Graduated with Honors."
                }
            ]
        },
        {
            id: uuidv4(),
            type: "skills",
            title: "Skills",
            items: [
                {
                    id: uuidv4(),
                    title: "JavaScript, React, Node.js",
                    subtitle: "",
                    date: "",
                    description: ""
                }
            ]
        }
    ],
    theme: {
        color: "#2563eb", // blue-600
        font: "sans"
    }
};
