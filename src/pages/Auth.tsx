import {Button, Input} from "../components/ui";
import React from "react";
import { BaseLayout } from '../layouts'
const Auth = () => {
    return (
        <BaseLayout>
            <Button>TEST</Button>
            <Input name="Email"/>
            <Input name="Password"/>
        </BaseLayout>
    )
}

export default Auth;
