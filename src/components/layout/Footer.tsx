import { Heart } from 'lucide-react'
import { siteConfig } from '@/data/content'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations('footer')
  
  const footerData = useMemo(() => [
    {
      label: t('privacyPolicy'),
      href: '/privacy-policy',
      isInternal: true,
    },
    {
      label: t('portfolio'),
      href: siteConfig.creator.portfolio,
      isInternal: false,
    },
    {
      label: t('github'),
      href: siteConfig.creator.github,
      isInternal: false,
    },
    {
      label: t('contact'),
      href: `mailto:${siteConfig.creator.email}`,
      isInternal: false,
    },
  ], [t])
  
  return (
    <footer className="relative z-10 backdrop-blur-xl bg-black/50 border-t border-green-500/20 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} Logo`}
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold gradient-green-text">
            {siteConfig.name}
          </span>
        </div>
        
        <p className="text-gray-400 mb-6 flex items-center justify-center gap-1">
          {t('madeWith')} <Heart className="w-4 h-4 text-green-400" aria-hidden="true" /> {t('forCommunity')}
        </p>
        
        <nav aria-label="Footer Navigation">
          <ul className="flex justify-center gap-8 text-sm text-gray-400">
            {footerData.map((link, index) => {
              const href = link.isInternal ? `/${locale}${link.href}` : link.href
              
              return (
                <li key={index}>
                  <Link href={href} target={link.isInternal ? undefined : "_blank"}
                    rel={link.isInternal ? undefined : "noopener noreferrer"}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="mt-6 pt-6 border-t border-green-500/20">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {siteConfig.name} v{siteConfig.version} • {t('copyright')} {siteConfig.creator.name}
          </p>
        </div>
      </div>
    </footer>
  )
}