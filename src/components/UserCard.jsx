import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

const UserCard = ({ user, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <CardImg top width="100%" src={user.avatar} alt={user.nome} />
      <CardBody>
        <CardTitle tag="h5">{user.nome}</CardTitle>
        <CardText>{user.profissao}</CardText>
        {/* Você pode incluir mais informações aqui, se necessário */}
      </CardBody>
    </Card>
  );
};

export default UserCard;