import React, { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { getPerson, getPersonCast } from '../../services/api'
import { Cast, Person } from '../../services/api/types'
import styles from './Person.module.css'
import { Card, CastList, Slider, TextComponent } from '../../components/ui'
import { useTranslation } from 'react-i18next'
import { RxPerson } from 'react-icons/rx'

import { personUtils } from '../../utils'
import { generateAgesByLanguage } from '../../utils/personUtils'
import useUser from '../../providers/Auth/useUser'
import { fromCountryToMovieLanguage } from '../../utils/convertLanguages'
import _ from 'lodash'

type GenerateDate = {
  mainDate?: string | null
  secondDate?: string | null
  isShowYearsOld?: boolean
}


const PersonPage = () => {
  const { imdbId } = useParams()
  const { language } = useUser()
  const [person, setPerson] = useState<Person | null>(null)
  const [personCast, setPersonCast] = useState<Array<Cast>>([])
  const { t } = useTranslation()

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0)

      if (imdbId) {
        const person = await getPerson({ imdbId })
        setPerson(person)
        const personCast = await getPersonCast({ personImdb: imdbId })
        setPersonCast(personCast)
      }
    }

    loadData()
  }, [imdbId])

  const generateDate = ({
    mainDate,
    secondDate,
    isShowYearsOld = false,
  }: GenerateDate): string | null => {
    if (!mainDate) {
      return null
    }
    const dateFormat = 'DD.MM.YYYY';
    const start = moment(mainDate, 'YYYY-MM-DDD').format(dateFormat)
    const end = (
      secondDate ? moment(secondDate, 'YYYY-MM-DDD') : moment()
    ).format(dateFormat)


    if (isShowYearsOld) {
      const years = personUtils.getYears(start, end, dateFormat)
      return `${start} (${generateAgesByLanguage(years, fromCountryToMovieLanguage(language))})`
    }

    return start
  }


  const getTheMostPopularMovies = (): Array<Cast> => {
    const limit = 20;
    const sorted = _.sortBy(personCast, (cast) => -cast.movie.popularity)

    return sorted.length > limit ? sorted.slice(0, limit) : sorted
  }
  const getPersonInformation = (): ReactElement => {
    const items = [
      { key: 'knownForDepartment', value: person?.known_for_department },
      {
        key: 'gender',
        value: t(`${personUtils.getPersonGender(person?.gender)}`),
      },
      {
        key: 'birthday',
        value: generateDate({
          mainDate: person?.birthday,
          secondDate: person?.deathday,
          isShowYearsOld: !person?.deathday,
        }),
      },
      {
        key: 'deathday',
        value: generateDate({
          mainDate: person?.deathday,
          secondDate: person?.birthday,
          isShowYearsOld: !!person?.deathday,
        }),
      },
      { key: 'placeOfBirth', value: person?.place_of_birth },
      { key: 'alsoKnownAs', value: person?.also_known_as || null },
    ]

    return (
      <>
        {items.map(
          ({ key, value }, index) =>
            !!value && (
              <div key={index}>
                <p className={styles.itemPersonInfoTitle}>
                  {t(`personPage.${key}`)}
                </p>
                {Array.isArray(value) ? (
                  value.map((item, index) => (
                    <p key={index} className={styles.itemPersonInfoValue}>
                      {' '}
                      {item}{' '}
                    </p>
                  ))
                ) : (
                  <p className={styles.itemPersonInfoValue}> {value} </p>
                )}
              </div>
            )
        )}
      </>
    )
  }

  if (!person) {
    return <div> LOADING ....</div>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.personalInfoColumn}>
        <div className={styles.image}>
          {person?.profile_path ? (
            <img
              className={styles.personImg}
              src={person?.profile_path}
              alt={person.name}
            />
          ) : (
            <div className={styles.noPerson}>
              <RxPerson />
            </div>
          )}
        </div>
        <div className={styles.personalInfo}>{getPersonInformation()}</div>
      </div>
      <div className={styles.generalInfoColumn}>
        <div className={styles.biography}>
          <h2> {person.name} </h2>
          <h3> {t('personPage.biography')} </h3>
          <TextComponent text={person.biography} />
        </div>

        {personCast?.length > 0 && (
          <>
            <div className={styles.knowForMovieList}>
              <Slider
                title={t<string>('personPage.knownForDepartment')}
                titleStyles={styles.titleSliderKnowFor}
                sliderSetting={{
                  autoplay: false,
                  slidesToScroll: 1,
                  slidesToShow: 1,
                  centerMode: false,
                }}
                isShowBackground={false}
              >
                {getTheMostPopularMovies().map(({ movie}, index) => (
                  <Card
                    name={movie.title}
                    image={movie.poster_path}
                    path={`/movie/${movie.imdb_id}`}
                    key={index}
                  />
                ))}

              </Slider>
            </div>
            <CastList cast={personCast} />
          </>
        )}
      </div>
    </div>
  )
}

export default PersonPage
