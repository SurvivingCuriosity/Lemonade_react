import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import { ArtistMatchFinder } from '../components/organisms/tools/ArtistMatchFinder';
import { I18nextProvider, useTranslation } from 'react-i18next'
import { i18n } from '../translations/i18n.config'

describe('ArtistMatchFinder', () => {

    test('Should render artist form', () => {
        const c = render(
            <I18nextProvider i18n={i18n}>
                <ArtistMatchFinder t={key => key}/>
            </I18nextProvider>
        );

        c.getByPlaceholderText(/introduce artista/i)
        c.getByRole('button', { name: t('tools.artist-placeholder') })
    })
})
