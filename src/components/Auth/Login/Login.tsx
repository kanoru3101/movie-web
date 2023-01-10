import classes from "./Login.module.css";
import {Button, InputField} from "../../ui";
import {useState} from "react";
import { login } from "../../../services/api";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().required('No password provided.')
    });

    const handleSubmit = async ({ email, password }: { email: string, password: string }): Promise<void> => {
        const token = await login({ email, password })
        console.log("####token", token)
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {
                ({  values,
                     dirty,
                     isSubmitting,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     handleReset}) => {
                    return(
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
                                    <Button
                                        type='submit'
                                    > Login </Button>
                                </div>
                            </form>
                        </div>
                    )
                }

            }
        </Formik>
    )
}
export default Login
