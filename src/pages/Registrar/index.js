import React from 'react'
import 'jquery'
import 'popper.js'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../App.css'
import { Link } from "react-router-dom";
import Logo from '../../componentes/Logo'



// state initial
const stateInitial = {
    status: false,
    validacao: false,
    sucesso: false,
    emailError: '',
    nomeError: '',
    sobrenomeError: '',
    model: {
        id: 0,
        nome: '',
        sobrenome: '',
        nascimento: '',
        sexo: '',
        cpf: '',
        destinatario: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        referencia: '',
        celular: '',
        email: '',
        senha: ''
    }

}



export default class Create extends React.Component {

    state = stateInitial;

    // GET Cep
    onCep = (ev) => {
        const { value } = ev.target

        // valida caracteres
        const cep = value?.replace(/[^0-9]/g, '');

        // valida tamanho do cep
        if (cep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    model: {
                        endereco: data.logradouro,
                        complemento: data.complemento,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf

                    }
                })
            })
    }


    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }



    // POST - cadastro do cliente 
    create = (e) => {
        e.preventDefault();

        // Chamada de validação
        const isValid = this.validate();
        console.log(isValid)

        if (isValid) {
            this.setState(stateInitial);

            const user = {
                id: parseInt(this.state.model.id),
                nome: this.state.model.nome,
                sobrenome: this.state.model.sobrenome,
                nascimento: this.state.model.nascimento,
                sexo: this.state.model.sexo,
                cpf: this.state.model.cpf,
                destinatario: this.state.model.destinatario,
                cep: this.state.model.cep,
                endereco: this.state.model.endereco,
                numero: parseInt(this.state.model.numero),
                complemento: this.state.model.complemento,
                bairro: this.state.model.bairro,
                cidade: this.state.model.cidade,
                estado: this.state.model.estado,
                referencia: this.state.model.referencia,
                celular: this.state.model.celular,
                email: this.state.model.email,
                senha: this.state.model.senha,
            };

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            };

            fetch('http://localhost:8081/autenticacao/registro', requestInfo)
                .then(res => {
                    if (res.status === 400) {
                        console.log(res.status);
                        this.setState({
                            // usuário já existe
                            status: true
                        })
                        return res.json();
                    }
                    if (res.status === 200) {
                        console.log(res.status);
                        this.setState({
                            // usuário cadastrado
                            sucesso: true
                        })
                        return res.json();
                    }
                    return res.json();
                })
        } else {
            this.setState({
                validacao: true
            })
        }

    }

    // validação
    validate = () => {
        let emailError = ""
        let nomeError = ""
        let sobrenomeError = ""
        // let er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;

        if (!this.state.model.email) {
            emailError = 'E-mail Inválido'
        }
        if (!this.state.model.nome)
            nomeError = "Campo Obrigatório"

        if (!this.state.model.sobrenome)
            sobrenomeError = "Campo Obrigatório"

        if (emailError || nomeError || sobrenomeError) {
            this.setState({ emailError, nomeError, sobrenomeError });
            return false;
        }
        return true;
    }


    render() {
        const { status, validacao, sucesso } = this.state;
        return (
            <>
                <div className="App-header ">
                    <div className="container">
                        <div class="row justify-content-md-center   py-5">
                            <div class="col-lg-12 ">
                                <div className="card">
                                    <div className="card-body">
                                        {/* Fomulário */}
                                        <form onSubmit={this.handleSubmit} >

                                            <div class="form-group">
                                                <Logo />
                                            </div>
                                            <div class="form-group">
                                                <h3 className="text-center text-cor">Bem - Vindo</h3>
                                            </div>

                                            {/* Área de Dados Cadastrais */}
                                            <div class="form-group">
                                                <h5 className="text-cor">Dados Cadastrais</h5>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="nome">*Nome</label>
                                                        <input type="text" class="form-control" name="nome" id="nome" placeholder="Seu Nome"
                                                            value={this.state.model.nome} onChange={e => this.setValues(e, 'nome')} />
                                                        {<small class="form-small text-small"> {this.state.nomeError} </small>}
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="sobrenome">*Sobrenome</label>
                                                        <input type="text" class="form-control" name="sobrenome" id="sobrenome" placeholder="Seu sobrenome"
                                                            value={this.state.model.sobrenome} onChange={e => this.setValues(e, 'sobrenome')} />
                                                        {<small class="form-small text-small"> {this.state.sobrenomeError} </small>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="nascimento">Nascimento</label>
                                                        <input type="text" class="form-control" name="nascimento" id="nascimento" placeholder="Sua data de nascimento"
                                                            value={this.state.model.nascimento} onChange={e => this.setValues(e, 'nascimento')} />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="sexo">Sexo</label>
                                                        <input type="text" class="form-control" name="sexo" id="sexo"
                                                            value={this.state.model.sexo} onChange={e => this.setValues(e, 'sexo')} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="cpf">CPF</label>
                                                <input type="text" class="form-control" name="cpf" id="cpf" placeholder="Seu CPF"
                                                    value={this.state.model.cpf} onChange={e => this.setValues(e, 'cpf')} />
                                            </div>

                                            {/* Área de Endereço */}
                                            <div class="form-group">
                                                <h5 className="text-cor">Endereço</h5>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="destinatario">Destinatário</label>
                                                        <input type="text" class="form-control" name="destinatario" id="destinatario" placeholder="Destinatário"
                                                            value={this.state.model.destinatario} onChange={e => this.setValues(e, 'destinatario')} />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="cep">Cep</label>
                                                        <input type="text" class="form-control" name="cep" id="cep" onBlur={this.onCep} placeholder="Seu cep"
                                                            value={this.state.model.cep} onChange={e => this.setValues(e, 'cep')} />
                                                    </div>
                                                    <small class="form-small text-muted">Informe o cep e os demais campos serão preenchidos </small>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="endereco">Endereço</label>
                                                        <input type="text" class="form-control" name="endereco" id="endereco" placeholder="Seu endereço"
                                                            value={this.state.model.endereco} onChange={e => this.setValues(e, 'endereco')} />
                                                    </div>

                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="numero">Número</label>
                                                        <input type="text" class="form-control" name="numero" id="numero" placeholder="Seu número de residência"
                                                            value={this.state.model.numero} onChange={e => this.setValues(e, 'numero')} />
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="complemento">Complemento</label>
                                                        <input type="text" class="form-control" name="complemento" id="complemento" placeholder="Complemento"
                                                            value={this.state.model.complemento} onChange={e => this.setValues(e, 'complemento')} />
                                                    </div>

                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="bairro">Bairro</label>
                                                        <input type="text" class="form-control" name="bairro" id="bairro" placeholder="Bairro"
                                                            value={this.state.model.bairro} onChange={e => this.setValues(e, 'bairro')} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="cidade">Cidade</label>
                                                        <input type="text" class="form-control" name="cidade" id="cidade" placeholder="Cidade"
                                                            value={this.state.model.cidade} onChange={e => this.setValues(e, 'cidade')} />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 ">
                                                    <div class="form-group text-primary">
                                                        <label className="text-cor" for="estado">Estado</label>
                                                        <input type="text" class="form-control" name="estado" id="estado" placeholder="Estado"
                                                            value={this.state.model.estado} onChange={e => this.setValues(e, 'estado')} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="referencia">Referencia</label>
                                                <input type="text" class="form-control" name="referencia" id="referencia" placeholder="Referência"
                                                    value={this.state.model.referencia} onChange={e => this.setValues(e, 'referencia')} />
                                            </div>

                                            {/* Área de Contato */}
                                            <div class="form-group">
                                                <h5 className="text-cor">Dados de Contato</h5>
                                            </div>
                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="celular">Celular</label>
                                                <input type="text" class="form-control" name="celular" id="celular" placeholder="(00)00000-0000"
                                                    value={this.state.model.celular} onChange={e => this.setValues(e, 'celular')} />
                                            </div>
                                            {/* Area de Dados de Conta */}
                                            <div class="form-group mt-3">
                                                <h5 className="text-cor">Dados da Conta</h5>
                                            </div>

                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="email">*Email</label>
                                                <input type="text" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Seu email"
                                                    value={this.state.model.email} onChange={e => this.setValues(e, 'email')} />
                                                {<small class="form-small text-small"> {this.state.emailError} </small>}

                                            </div>
                                            <div class="form-group text-primary">
                                                <label className="text-cor" for="senha">Senha</label>
                                                <input type="password" class="form-control" name="senha" id="senha" placeholder="Sua senha"
                                                    value={this.state.model.senha} onChange={e => this.setValues(e, 'senha')} />
                                            </div>

                                            {/* button Registrar */}
                                            <div class="py-3">
                                                <button type="submit" class="btn btn-cor btn-large"
                                                    onClick={(e) => this.create(e)}>
                                                    Registrar
                                                </button>
                                            </div>

                                            {/* Notificação de usuário ja cadastrado */}
                                            {status ? (<div class="alert alert-danger" role="alert">
                                                Usuário já existe
                                            </div>) : ''}

                                            {/* Notificação de Campos Vazios */}
                                            {validacao ? (<div class="alert alert-danger" role="alert">
                                                Preencha todos os campos obrigatórios
                                            </div>) : ''}

                                            {/* Sucesso ao Cadastrar */}
                                            {sucesso ? (<div class="alert alert-success" role="alert">
                                                Usuário cadastrado com Sucesso
                                            </div>) : ''}


                                            <div class="form-group">
                                                <smal className="form-text text-muted text-center">Já possui cadastro?</smal>
                                            </div>

                                            {/* button Entrar */}
                                            <div class="text-center">
                                                <Link to='/entrar' type="submit" class="btn btn-origin">Entrar</Link>
                                            </div>
                                        </form>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}