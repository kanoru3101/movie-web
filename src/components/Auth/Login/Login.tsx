import classes from './Login.module.css'
import { Button, InputField } from '../../ui'
import { login } from '../../../services/api'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../providers/Auth/useUser'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('No password provided.'),
  })

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<void> => {
    const { token } = await login({ email, password })
    // eslint-disable-next-line no-console
    console.log("####", token)
    if (token) {
      await setUser(token)
      navigate('/profile')
    }
  }

  const redirectToAuth = (): void => {
    navigate('/auth')
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
        return (
          <div className={classes.loginWrapper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <h2 className={classes.title}> Sign In </h2>
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
              <div className={classes.submitWrapper}>
                <Button type="submit"> Login </Button>
              </div>
            </form>

            <div className={classes.navigateToAuth}>
              <p> Already a user? </p>
              <p
                className={classes.linkToAuth}
                onClick={() => redirectToAuth()}
              >
                {' '}
                AUTH{' '}
              </p>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
export default Login
