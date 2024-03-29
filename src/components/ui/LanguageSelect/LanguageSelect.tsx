import React, { HTMLAttributes, ReactElement, useMemo, useState } from 'react'
import ReactSelect from 'react-select'
import { LANGUAGES } from '../../../constants'
import { changeUserLanguage } from '../../../services/api'
import useUser, { UseUser } from '../../../providers/Auth/useUser'
import { useTranslation } from 'react-i18next'
import { createCookie, getCookie } from '../../../services/cookie'
import getCookieUser from '../../../providers/Auth/getCookieUser'
import { JWT_COOKIE_NAME } from '../../../providers/Auth'
import { LANGUAGE_COOKIE } from '../../../providers/Auth/constants'

type Props = HTMLAttributes<HTMLDivElement> & { user: UseUser }

type Option = {
  value: LANGUAGES
  label: string
}
const LanguageSelect: React.FC<Props> = ({ user }): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<Option | null>()
  const { i18n } = useTranslation()

  const options: Option[] = [
    { value: LANGUAGES.EN, label: '🇺🇸 EN' },
    { value: LANGUAGES.UA, label: '🇺🇦 UA' },
  ]

  const handleLanguage = async (data: Option) => {
    setSelectedOption(data)
    const language = data?.value
    if (data.value !== selectedOption?.value) {
      if (user) {
        await changeUserLanguage({ language })
      }
      await i18n.changeLanguage(language)
      await createCookie({ key: 'language', value: language, days: 30 })
      window.location.reload();
    }

  }

  useMemo((): void => {
    const language = (user?.language || getCookie(LANGUAGE_COOKIE) as LANGUAGES | undefined)
    const value = language ? options.find(option => option.value === language) :  options[0]

    setSelectedOption(value)
  }, [user])

  return (
    <ReactSelect
      defaultValue={selectedOption}
      onChange={option => handleLanguage(option as Option)}
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
      menuPosition={'fixed'}
      styles={{
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? 'red' : '#1c1c1c',
          padding: '4px 8px',
          color: 'white',
          cursor: 'pointer'
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: '#1c1c1c',
          border: 'none',
          borderRadius: 0,
          cursor: 'pointer',
        }),
        dropdownIndicator: (baseStyle, state) => ({
          ...baseStyle,
          color: state.isFocused ? 'red' : 'red',
          padding: '8px 0',
          fontSize: 20,
        }),
        singleValue: (baseStyle) => ({
          ...baseStyle,
          color: 'red',
          padding: '2px 4px',
          fontSize: 20,
        }),
        menuPortal: base => ({ ...base, zIndex: 5 })
      }}
    />
  )
}
export default LanguageSelect
