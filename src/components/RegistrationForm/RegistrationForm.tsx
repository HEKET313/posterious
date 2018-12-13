import * as React from "react";
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import * as EmailValidator from "email-validator";
import {Link} from "react-router-dom";

interface State {
    login: string;
    pass: string;
    rePass: string;
    loginError: string;
    passwordError: string;
    globalError: string;
}

class RegistrationForm extends React.Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            login: "",
            pass: "",
            rePass: "",
            loginError: "",
            passwordError: "",
            globalError: "",
        }
    }

    render(): React.ReactNode {
        const {loginError, passwordError, globalError} = this.state;
        const isLoginInvalid = loginError.length > 0 || globalError.length > 0;
        const isPassPairInvalid = passwordError.length > 0 || globalError.length > 0;
        const loginErrorMessage = loginError.length > 0 ? <FormFeedback>{loginError}</FormFeedback> : null;
        const passwordErrorMessage = isPassPairInvalid
            ? <FormFeedback>{passwordError + globalError}</FormFeedback>
            : null;
        return <Form>
            <FormGroup>
                <Label for="login">Email</Label>
                <Input type="email" name="login" id="login" placeholder="Login" invalid={isLoginInvalid}
                       onChange={this.loginChange}/>
                {loginErrorMessage}
            </FormGroup>
            <FormGroup>
                <Label for="password">Пароль</Label>
                <Input type="password" name="password" id="password" placeholder="******" invalid={isPassPairInvalid}
                       onChange={this.passChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Повторите пароль</Label>
                <Input type="password" name="re-password" id="re-password" placeholder="******"
                       invalid={isPassPairInvalid} onChange={this.rePassChange}/>
                {passwordErrorMessage}
            </FormGroup>
            <Button color="primary" onClick={this.register}>Зарегистрироваться</Button>
            <br/>
            Если у вас уже есть аккаунт, <Link to={"/login"}>войдите</Link>
        </Form>;
    }

    private loginChange = (e: any) => this.setState({login: e.target.value});
    private passChange = (e: any) => this.setState({pass: e.target.value});
    private rePassChange = (e: any) => this.setState({rePass: e.target.value});

    private register = async (): Promise<boolean> => {
        if (!this.checkInput()) {
            return false;
        }
        try {
            const response = await fetch('http://demo9936313.mockable.io/register', {
                method: 'post',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }),
                body: JSON.stringify({
                    login: this.state.login,
                    pass: this.state.pass,
                    rePass: this.state.rePass
                })
            });
            if (response.status !== 200) {
                this.setState({globalError: 'Ошибка регистрации'});
                return false;
            }
            return true;
        } catch (e) {
            console.error(e);
            this.setState({globalError: e.message});
            return false;
        }
    };

    private checkInput = (): boolean => {
        let result: boolean = true;
        if (!EmailValidator.validate(this.state.login)) {
            this.setState({loginError: "Логин должен быть валидным email'ом"});
            result = false;
        }
        if (this.state.pass.length < 6) {
            this.setState({passwordError: "Пароль должен быть не менее 6 символов"});
            result = false;
        }
        if (this.state.pass !== this.state.rePass) {
            this.setState({passwordError: "Пароли должны быть идентичны"});
            result = false;
        }
        return result;
    };
}

export default RegistrationForm;