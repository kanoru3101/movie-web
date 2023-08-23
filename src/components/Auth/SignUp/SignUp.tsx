import classes from './SignUp.module.css'
import { Button, InputField } from '../../ui'
import { signUp } from '../../../services/api'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../providers/Auth/useUser'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const SignUp = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('No password provided.'),
    confirmPassword: Yup.string()
      .required('No confirm password provided.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  })

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<void> => {
    const { token } = await signUp({ email, password })
    if (token) {
      await setUser(token)
      navigate('/profile')
    }
  }

  const redirectToLogin = (): void => {
    navigate('/login')
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
        return (
          <div className={classes.signUpWrapper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <h2 className={classes.title}> Sign Up </h2>
              <div className={classes.inputField}>
                <Field
                  label="email"
                  id="email"
                  name="email"
                  component={InputField}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                />
              </div>
              <div className={classes.inputField}>
                <Field
                  label="password"
                  id="password"
                  name="password"
                  component={InputField}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                />
              </div>
              <div className={classes.inputField}>
                <Field
                  label="confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  component={InputField}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                />
              </div>
              <div className={classes.submitWrapper}>
                <Button type="submit"> Sign Up </Button>
              </div>
            </form>

            <div className={classes.navigateToAuth}>
              <p> Need an account? </p>
              <p
                className={classes.linkToAuth}
                onClick={() => redirectToLogin()}
              >
                Login
              </p>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
export default SignUp
