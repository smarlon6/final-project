import React, { useEffect, useState } from 'react';
import { Container, Card, Form, FormGroup, Input, Label, Button, Alert, Spinner } from 'reactstrap';

const InscricaoAquario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    bairro: '',
    cidade: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBairros = async () => {
      try {
        const response = await fetch("https://api.npoint.io/d69fb7827d9de4312069");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
  
        // Garante que estamos setando apenas a lista de bairros
        if (data.bairros && Array.isArray(data.bairros)) {
          setBairros(data.bairros);
        } else {
          throw new Error("Formato de dados inválido");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBairros();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone || !formData.bairro || !formData.cidade) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (loading) {
    return (
      <Container>
        <Spinner color="primary" />
        <p>Carregando Bairros...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Inscrição para Visitação ao Aquário Cuiabá</h2>
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
            <Label for="bairro">Bairro</Label>
            <Input
              name="bairro"
              type="select"
              value={formData.bairro}
              onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
              required
            >
              <option value="">Selecionar bairro</option>
              {bairros.length > 0 ? (
                bairros.map((bairro, index) => (
                  <option key={index} value={bairro}>{bairro}</option>
                ))
              ) : (
                <option value="">Nenhum bairro disponível</option>
              )}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="cidade">Cidade</Label>
            <Input
              name="cidade"
              type="text"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit">Enviar Inscrição</Button>
        </Card>
      </Form>
    </Container>
  );
};

export default InscricaoAquario;
