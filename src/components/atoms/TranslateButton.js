import React from 'react'
import en from '../../assets/images/flags/en.png'
import es from '../../assets/images/flags/es.png'
import { Image } from './Image'
import { useTranslation } from 'react-i18next'

const DEFAULT_LANG = 'en'

export const TranslateButton = () => {
    const [t, i18n] = useTranslation('global');

    const [lang, setLang] = React.useState(localStorage.getItem('lang') || DEFAULT_LANG);

    React.useEffect(() => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }, [lang])

    function translateToEnglish() {
        setLang('en')
    }
    function translateToSpanish() {
        setLang('es')
    }

    return (
        <div className={`translation-button`}>
            {lang === 'en'
                ?
                <button>
                    <div onClick={translateToSpanish} style={{display:'flex', alignItems:'center', gap:'0.5em'}}>
                        <Image src={es} alt='translate-spanish' size='S'  />
                        <p style={{color:'var(--blanco2)'}}>Traducir a español</p>
                    </div>
                </button>
                :
                <button>
                    <div onClick={translateToEnglish} style={{display:'flex', alignItems:'center', gap:'0.5em'}}>
                        <Image src={en} alt='translate-english' size='S'  />
                        <p style={{color:'var(--blanco2)'}}>Translate to english</p>
                    </div>
                </button>
            }


        </div>
    )
}
