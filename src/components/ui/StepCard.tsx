import { Step } from '@/data/types';
import { Download, Globe, Users, Zap, LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: Step;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Download,
  Globe,
  Users,
  Zap,
}

export default function StepCard({ step, index, isActive, onClick }: StepCardProps) {
  const IconComponent = iconMap[step.icon]

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className={`glass-effect rounded-3xl p-8 transition-all duration-500 hover-lift ${
        isActive ? 'ring-2 ring-green-400/50 bg-white/10' : ''
      }`}>
        <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 bg-linear-to-r ${step.gradient} rounded-2xl`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black text-white/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
            {step.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}