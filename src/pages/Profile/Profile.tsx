import React from "react";
import styles from './Profile.module.css';
import useUser from '../../providers/Auth/useUser'
import { Avatar, Button, ItemList } from '../../components/ui'
import { Navigate } from 'react-router-dom'
const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  const { name, email, logo, slug} = user;

  return (
    <div className={styles.container}>
      <div className={`${styles.profileWrapper} ${styles.blockStyles}`}>
        <div className={styles.imageProfile}>
          <Avatar
            imageUrl={logo || '/images/no-image.png'}
            name={`avatar-${name}`}
            width='150px'
            height='150px'
          />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.nameField}> name: </span>
          <span className={styles.fieldText}>{name}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.nameField}> email: </span>
          <span className={styles.fieldText}>{email}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.nameField}> nickname: </span>
          <span className={styles.fieldText}>{slug}</span>
        </div>
        <div className={styles.resetPassword}>
          <Button>reset password</Button>
        </div>
      </div>
      <div className={`${styles.contentWrapper} ${styles.blockStyles}`}>
        <div className={styles.todoWatchList}>
          <ItemList
            title="My watch list:"
            item={{
              title: "Test Movie",
              image: "https://www.shutterstock.com/image-vector/film-strip-logo-vector-logotype-260nw-247448566.jpg",
              genres: [
                {id: 1, name: 'horror'},
                {id: 2, name: 'comedy'},
                {id: 3, name: 'very loooooggggggggggggggggggggggggggggggg'},
                {id: 4, name: 'long with words long with words long with words'},
                {id: 5, name: 'end'}
              ]
          }}/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
