import React from 'react'
import en from '../../assets/images/flags/en.png'
import es from '../../assets/images/flags/es.png'
import { Image } from './Image'
import { useTranslation } from 'react-i18next'

const DEFAULT_LANG = 'es'

export const TranslateButton = () => {
    const [t, i18n] = useTranslation('global');
    const [clase, setClase] = React.useState('');

    const [lang, setLang] = React.useState(localStorage.getItem('lang') || DEFAULT_LANG);

    React.useEffect(() => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }, [lang])

    function translateToEnglish() {
        setClase('gira-180');
        setLang('en')
    }
    function translateToSpanish() {
        setClase('gira180');
        setLang('es')
    }

    return (
        <div className={`translation-button ${clase}`} style={{ transform: lang === 'es' && 'rotate(180deg)' }}>
            <button>
                    <Image src={es} alt='translate-spanish' size='S' onClick={translateToEnglish} />
            </button>

            <button>
                <Image src={en} alt='translate-english' size='S' onClick={translateToSpanish} />
            </button>
        </div>
    )
}
