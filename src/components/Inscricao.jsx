import React, { useState } from 'react';
import { Container, Card, Form, FormGroup, Input, Label, Button, Alert, Spinner } from 'reactstrap';

const InscricaoAquario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    rua: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error("Erro ao buscar o CEP");
        }
        const data = await response.json();
        if (!data.erro) {
          setFormData({
            ...formData,
            cep,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            rua: data.logradouro
          });
        } else {
          setError("CEP não encontrado");
        }
      } catch (error) {
        setError("Erro ao buscar CEP");
      }
    } else {
      setFormData({ ...formData, cep });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone || !formData.cep || !formData.bairro || !formData.cidade || !formData.estado || !formData.rua) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <Container>
      <h2>Formulário de Inscrição</h2>
      <Form onSubmit={handleSubmit}>
        <Card body>
          {error && <Alert color="danger">{error}</Alert>}
          {!error && submitted && (
            <Alert color="success">
              Olá {formData.nome}, sua inscrição foi enviada com sucesso!
            </Alert>
          )}
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input
              name="nome"
              type="text"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="telefone">Telefone</Label>
            <Input
              name="telefone"
              type="tel"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="cep">CEP</Label>
            <Input
              name="cep"
              type="text"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleCepChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="rua">Rua</Label>
            <Input
              name="rua"
              type="text"
              placeholder="Rua"
              value={formData.rua}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="bairro">Bairro</Label>
            <Input
              name="bairro"
              type="text"
              placeholder="Bairro"
              value={formData.bairro}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="cidade">Cidade</Label>
            <Input
              name="cidade"
              type="text"
              placeholder="Cidade"
              value={formData.cidade}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="estado">Estado</Label>
            <Input
              name="estado"
              type="text"
              placeholder="Estado"
              value={formData.estado}
              readOnly
            />
          </FormGroup>
          <Button color="primary" type="submit">Enviar Inscrição</Button>
        </Card>
      </Form>
    </Container>
  );
};

export default InscricaoAquario;
