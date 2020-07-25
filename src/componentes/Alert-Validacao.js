import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertValidacao = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      Preencha todos os campos com (*)!
    </Alert>
  );
}

export default AlertValidacao;