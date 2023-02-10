import React, {
  ReactElement,
} from 'react';
import styles from './Button.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  myStyles?: string;
};

const Button: React.FC<Props> = ({ children, myStyles, ...props}: Props): ReactElement => {
  return(
      <>
        <button className={`${styles.btn} ${myStyles}`} {...props}> {children} </button>
      </>
  )
}

export default Button
