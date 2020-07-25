import React from 'react'
import 'jquery'
import 'popper.js'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../App.css'
import { Link } from 'react-router-dom'
import { Media } from 'reactstrap';
import Logo from '../../componentes/Logo'


export default class Login extends React.Component {

    state = {
        nome: localStorage.getItem('nome'),
        sobrenome: localStorage.getItem('sobrenome')
    }


    remover = () => {
        localStorage.removeItem('nome')
        localStorage.removeItem('sobrenome')
    }

    render() {
        return (
            <>
                <div className="App-perfil ">
                    <div className="container-login">
                        <div class="row justify-content-md-center ">
                            <div class="col-lg-12 ">
                                <div className="">
                                    <div className="">

                                       <Logo/>

                                        <h1 class="text-center py-3">Bem - Vindo(a)</h1>
                                        <p class=" text-center">É um prazer que esteja conosco
                                       </p>

                                        <h4 class="text-center py-3"> {this.state.nome} {this.state.sobrenome}</h4>

                                        <div class="text-center py-3">
                                            <Link to='/Entrar' class="btn btn-cor btn-medio" onClick={this.remover}>Sair</Link>
                                        </div>


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