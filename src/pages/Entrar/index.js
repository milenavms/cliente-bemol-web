import React from 'react'
import 'jquery'
import 'popper.js'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../App.css'
import { Link } from "react-router-dom";
import Logo from '../../componentes/Logo'



export default class Login extends React.Component {



    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        this.state = {
            error: '',
            nomenovo: ''
        }

    }

    signIn = (e) => {
        e.preventDefault();


        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ email: this.email, senha: this.senha }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch('http://localhost:8081/autenticacao/entrar', requestInfo)
            .then(response => {

                return response.json()
            }).then(data => {
                if (data.error == undefined) {
                    localStorage.setItem('nome', data.cliente.nome)
                    localStorage.setItem('sobrenome', data.cliente.sobrenome)
                    this.props.history.push("/perfil");
                } else {
                    this.setState({
                        error:
                            data.error
                    });
                }
            })
            .catch(e => {
                this.setState({
                    error:
                        "Ocorreu um erro inesperado."
                });
            });
    }


    render() {
        return (
            <>
                <div className="App-header ">
                    <div className="container-login">
                        <div class="row justify-content-md-center ">
                            <div class="col-lg-12 ">
                                <div className="card">
                                    <div className="card-body">
                                        {/* form */}
                                        <form >

                                            {/* img */}
                                            <div class="form-group">
                                                <Logo/>
                                            </div>


                                            <div class="form-group">
                                                <h3 className="text-center text-cor">Bem - Vindo</h3>
                                            </div>
                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="email">Endereço de email</label>
                                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email"
                                                    onChange={e => this.email = e.target.value}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label className="text-cor" for="senha">Senha</label>
                                                <input type="password" class="form-control" id="senha" placeholder="Senha"
                                                    onChange={e => this.senha = e.target.value}
                                                />
                                            </div>
                                            {/* button entrar */}
                                            <div class="py-3 ">
                                                <button class="btn btn-cor btn-large"
                                                    onClick={(e) => this.signIn(e)}>
                                                    Entrar
                                                </button>
                                            </div>

                                            <div class="form-group">
                                                <smal className="form-text text-muted text-center">Ainda não possui cadastro?</smal>
                                            </div>

                                            {/* Notificação */}

                                            {this.state.error && <div class="alert alert-danger" role="alert"> <small class="form-small text-small">{this.state.error}</small></div>}



                                            {/* button Registrar */}
                                            <div class="text-center">
                                                <Link to='/registrar' type="submit" class=" btn btn-origin">Registre-se</Link>
                                            </div>

                                        </form>

                                        {/* Fim: form */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    }
}