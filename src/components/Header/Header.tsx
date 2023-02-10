import classes from './Header.module.css'
import useUser from '../../providers/Auth/useUser'
import { Avatar } from '../ui'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const redirectTo = (path: string) => {
    navigate(path)
  }

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={`${classes.home} ${classes.navItem}`} onClick={() => redirectTo('')}>{t('home')}</div>
        <div className={classes.search}>{t('something')}</div>
        <div className={classes.profileWrapper}>
          <div>
            {user?.id ? (
              <Avatar
                imageUrl={user.logo || ''}
                name="Avatar"
                onClick={() => redirectTo('/profile')}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <p
                className={classes.toLogin}
                onClick={() => redirectTo('/login')}
              >
                {t('login')}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
