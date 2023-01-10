import classes from "./SignUp.module.css";
import {Button, InputField} from "../../ui";
import { signUp } from "../../../services/api";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const SignUp = () => {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().required('No password provided.'),
        confirmPassword: Yup.string().required('No confirm password provided.').oneOf([Yup.ref('password')], 'Your passwords do not match.')
    });

    const handleSubmit = async ({ email, password }: { email: string, password: string }): Promise<void> => {
        const token = await signUp({ email, password })
        console.log("####token", token)
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {
                ({  values,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                 }) => {
                    return(
                        <div className={classes.signUpWrapper}>
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
                                    <Button type='submit'> Sign Up </Button>
                                </div>
                            </form>
                        </div>
                    )
                }
            }
        </Formik>
    )
}
export default SignUp
