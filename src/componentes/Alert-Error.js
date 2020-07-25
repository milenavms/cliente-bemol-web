import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertError = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      Usuário Já Existe!
    </Alert>
  );
}

export default AlertError;