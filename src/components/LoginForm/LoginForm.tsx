import * as React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class LoginForm extends React.Component<{},{}>
{
    render(): React.ReactNode {
        return <Form>
            <FormGroup>
                <Label for="login">Email</Label>
                <Input type="email" name="login" id="login" placeholder="Login" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="******" />
            </FormGroup>
            <Button color="primary" onClick={this.login}>Login</Button>
        </Form>;
    }

    private async login(): Promise<boolean> {
        try {
            const response = await fetch('some-url', {
                method: 'post',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }),
                body: JSON.stringify(this.state)
            });
            if (response.status !== 200) {
                console.log(response);
                return false;
            }
            return response.ok;
        } catch (e) {
            return false;
        }
    }
}

export default LoginForm;

