import React from 'react';

import { 
  SiGo,
  SiJavascript,
  SiPython,
  SiMysql,
  SiRust,
  SiC,
  SiCss3,
  SiHtml5,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiFigma,
  SiDocker,
 
} from 'react-icons/si' ;

interface SkillBadgeProps {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const getSkillIcon = (name: string) => {
  const iconProps = { className: "w-6 h-6" };
  const normalizedName = name.toLowerCase();
  
  switch (normalizedName) {
    case 'go': return <SiGo {...iconProps} />;
    case 'javascript': return <SiJavascript {...iconProps} />;
    case 'python': return <SiPython {...iconProps} />;
    case 'mysql': return <SiMysql {...iconProps} />;
    case 'rust': return <SiRust {...iconProps} />;
    case 'c': return <SiC {...iconProps} />;
    case 'css': return <SiCss3 {...iconProps} />;
    case 'html5': return <SiHtml5 {...iconProps} />;
    case 'react': return <SiReact {...iconProps} />;
    case 'typescript': return <SiTypescript {...iconProps} />;
    case 'node.js': return <SiNodedotjs {...iconProps} />;
    case 'ui/ux': return <SiFigma {...iconProps} />;
    case 'docker': return <SiDocker {...iconProps} />;
    default: return null;
  }
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, level }) => {
  const getLevelColor = () => {
    switch (level) {
      case 'Expert':
        return 'from-emerald-500 to-emerald-700';
      case 'Advanced':
        return 'from-blue-500 to-blue-700';
      case 'Intermediate':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className={`
      px-4 py-2 rounded-lg
      bg-gradient-to-r ${getLevelColor()}
      transform hover:scale-105 transition-all duration-300
      cursor-default
      flex items-center gap-3
      text-white
    `}>
      <div className="flex-shrink-0">
        {getSkillIcon(name)}
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs opacity-75">{level}</div>
      </div>
    </div>
  );
};

export default SkillBadge;