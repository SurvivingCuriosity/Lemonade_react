import React from 'react'
import { TranslateButton } from '../../atoms/TranslateButton'
import { useTranslation } from 'react-i18next'
export function Footer() {
    const [t, i18n] = useTranslation('global')
    return (
        <footer>
            <TranslateButton />
            <span>
                <a href="https://iconscout.com/icons/lemon" target="_blank">{t('footer.lemon-icon')}</a>
            </span>
            <a href="https://www.flaticon.es/iconos-gratis/github" target='_blank' title="github iconos">{t('footer.github-icon')}</a>
        </footer>
    )
}