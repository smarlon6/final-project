import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Spinner,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import UserCard from "./UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.npoint.io/93ca752ec96d86449ded");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error("Sem resposta", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  // Filtra os usuários verificando se algum dos valores dos campos contém o texto do filtro
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Carregando...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert color="danger">Erro: {error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <Form>
        <FormGroup>
          <Label for="filter">Filtrar usuários</Label>
          <Input
            type="text"
            id="filter"
            placeholder="Digite para filtrar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </FormGroup>
      </Form>

      {filteredUsers.length === 0 ? (
        <Alert color="info">Nenhum usuário encontrado.</Alert>
      ) : (
        <Row>
          {filteredUsers.map((user, index) => (
            <Col sm="6" md="4" lg="3" key={index} className="mb-4">
              <UserCard user={user} onClick={() => handleUserClick(user)} />
            </Col>
          ))}
        </Row>
      )}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalhes do Usuário</ModalHeader>
        <ModalBody>
          {selectedUser && (
            <>
              <p>
                <strong>Nome:</strong> {selectedUser.nome}
              </p>
              <p>
                <strong>Profissão:</strong> {selectedUser.profissao}
              </p>
              {/* Adicione outros campos conforme necessário */}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
