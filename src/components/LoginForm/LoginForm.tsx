import * as React from "react";
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import * as EmailValidator from "email-validator";
import {Link} from "react-router-dom";

export interface LoginFormProps {
    login?: string;
    pass?: string;
}

interface LoginState {
    globalError: string;
    passwordError: string;
    loginError: string;
    login: string;
    pass: string;
}

class LoginForm extends React.Component<LoginFormProps, LoginState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            globalError: "",
            passwordError: "",
            loginError: "",
            login: props.login || "",
            pass: props.pass || ""
        };
    }

    public render(): React.ReactNode {
        let {passwordError, loginError, globalError} = this.state;
        let isPassInvalid = passwordError.length > 0 || globalError.length > 0;
        let isLoginInvalid = loginError.length > 0 || globalError.length > 0;
        let passwordErrorMessage = isPassInvalid ? <FormFeedback>{passwordError + globalError}</FormFeedback> : null;
        let loginErrorMessage = loginError.length > 0 ? <FormFeedback>{this.state.loginError}</FormFeedback> : null;
        return <Form>
            <FormGroup>
                <Label for="login">Email</Label>
                <Input type="email" name="login" id="login" placeholder="Login" invalid={isLoginInvalid}
                       onChange={this.loginChange}/>
                {loginErrorMessage}
            </FormGroup>
            <FormGroup>
                <Label for="password">Пароль</Label>
                <Input type="password" name="password" id="password" placeholder="******" invalid={isPassInvalid}
                       onChange={this.passChange}/>
                {passwordErrorMessage}
            </FormGroup>
            <Button color="primary" onClick={this.login}>Login</Button>
            <br/>
            Если у вас нет аккаунта, <Link to={"/register"}>зарегистрируйтесь</Link>
        </Form>;
    }

    private loginChange = (e: any) => this.setState({login: e.target.value});
    private passChange = (e: any) => this.setState({pass: e.target.value});

    private login = async (): Promise<boolean> => {
        try {
            this.clearErrors();
            if (!this.checkInput()) {
                return false;
            }
            const response = await fetch('http://demo9936313.mockable.io/login', {
                method: 'post',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }),
                body: JSON.stringify({
                    login: this.state.login,
                    pass: this.state.pass
                })
            });
            if (response.status !== 200) {
                this.setState({globalError: 'Такой комбинации не существует'});
                return false;
            }
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    private checkInput = (): boolean => {
        let result: boolean = true;
        if (!EmailValidator.validate(this.state.login)) {
            this.setState({loginError: "Логин должен быть валидным email'ом"});
            result = false;
        }
        if (this.state.pass.length === 0) {
            this.setState({passwordError: "Введите пароль"});
            result = false;
        }
        return result;
    };

    private clearErrors = (): void => {
        this.setState({globalError: "", loginError: "", passwordError: ""})
    };
}

export default LoginForm;

