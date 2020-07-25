import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Registrar from '../pages/Registrar/index'
import Entrar from '../pages/Entrar/index'
import Perfil from '../pages/Perfil/index'

const Routes = () => (
    <BrowserRouter>
        <Route exact path="/" component={Registrar} />
        <Route exact path="/registrar" component={Registrar} />
        <Route exact path="/entrar" component={Entrar} />
        <Route exact path="/perfil" component={Perfil} />
    </BrowserRouter>
);

export default Routes