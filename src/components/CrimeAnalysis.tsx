import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisSection {
    title: string;
    content: string | string[];
    color: string;
}

interface CrimeAnalysisProps {
    analysis?: {
        [key: string]: string | string[];
    };
}

const CrimeAnalysis: React.FC<CrimeAnalysisProps> = ({ analysis = {} }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Define colors for different sections
    const sectionColors: { [key: string]: string } = {
        summary: '#F7931A',
        key_insights: '#8B5CF6',
        trends_anomalies: '#EF4444',
        recommendations: '#10B981',
        business_impact: '#3B82F6',
        // Add more colors for other potential sections
        default: '#6B7280'
    };

    // Convert analysis object to sections array
    const sections: AnalysisSection[] = Object.entries(analysis || {}).map(([key, content]) => ({
        title: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        content,
        color: sectionColors[key] || sectionColors.default
    }));

    // If no sections, return null
    if (sections.length === 0) {
        return null;
    }

    const renderContent = (content: string | string[]) => {
        if (!content) return null;
        
        if (Array.isArray(content)) {
            return (
                <ul className="space-y-2">
                    {content.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                            <span className="mr-2" style={{ color: sectionColors[Object.keys(analysis)[sections.findIndex(s => s.content === content)]] }}>•</span>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-gray-300">{content}</p>;
    };

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {sections.map((section, index) => (
                <motion.div
                    key={section.title}
                    className="bg-[#1A1B25] rounded-xl p-6 border border-[#2A2A35] transition-colors hover:border-[var(--hover-color)]"
                    style={{ 
                        '--hover-color': section.color,
                    } as React.CSSProperties}
                    variants={itemVariants}
                >
                    <h3 className="text-lg font-semibold mb-4" style={{ color: section.color }}>
                        {section.title}
                    </h3>
                    {renderContent(section.content)}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CrimeAnalysis; 