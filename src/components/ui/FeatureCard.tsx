import { Feature } from '@/data/types'
import { Users, Zap, Shield, LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  feature: Feature
  isActive: boolean
  onHover: () => void
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Zap,
  Shield,
}

export default function FeatureCard({ feature, isActive, onHover }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon]

  return (
    <div 
      className={`group relative glass-effect rounded-3xl p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover-lift ${
        isActive ? 'ring-2 ring-green-400/50 bg-white/10' : ''
      }`}
      onMouseEnter={onHover}
    >
      <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
      
      <div className="relative mb-6 p-4 gradient-green rounded-2xl w-fit">
        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" />
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg xl:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
            {feature.title}
          </h3>
          <span className="text-xs xl:text-sm font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
            {feature.stats}
          </span>
        </div>
        <p className="text-gray-300 leading-relaxed text-sm xl:text-base">
          {feature.description}
        </p>
      </div>
    </div>
  )
}