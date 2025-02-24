import React, {useEffect, useState} from 'react';
import { Container, Card, Form, FormGroup, Input, Label, Button, Alert, Spinner } from 'reactstrap';

  const Feedback = () => {

    const [formData, setFormData] = useState(
      {
      nome: '',
      email: '',
      feedback: '',
      }
    );
    const [submitted, setSubmitted] = useState(false);
    const [userNames, setUserNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

    useEffect(() => {
  
      const fetchUsers = async () => {
        try {
          const response = await fetch("https://api.npoint.io/93ca752ec96d86449ded");
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
          }
          const data = await response.json();
          const names = Array.from(new Set(data.map(user => user.nome)));
          console.log(names);
          setUserNames(names);
        }
        catch (error){
          setError(error.message);
          console.error("Sem resposta", error);
        }
        finally {
          setLoading(false);
        }
      }
  
      fetchUsers();
      
    }, []);


    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();

        if(formData.nome === ""){
          setError("Insira o nome.");
          return false;
        }

        if(formData.email === ""){
          setError("Insira o email.");
          return false;
        }

        if(!formData.email.includes("infnet")){
          setError("O email precisa ser institucional.");
          return false;
        }

        if(formData.feedback === ""){
          setError("Insira o feedback.");
          return false;
        }
        setError('');
        setSubmitted(true);

    }

    if (loading) return (
      <Container>
        <Spinner color="primary" />
        <p>Carregando Usuários...</p>
      </Container>
    )

        
    return (
        <Container style={{

        }}>
          <h2>Feedback</h2>
          <Form onSubmit={handleSubmit} >
          <Card body>
            {error && <Alert color="danger">{error}</Alert>}
            {!error && submitted && 
              <Alert color="success">
                Olá {formData.nome}, &lt;{formData.email}&gt; seu feedback foi enviado com sucesso!
              </Alert>
            }
            <FormGroup>
              <Label for="nome">Nome</Label>
              <Input
              name="nome"
              id="nome"
              type="select"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value })}
              required
            >
             <option value="">Selecionar usuário</option>
            {userNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
            </Input>
            </FormGroup>
            <FormGroup>
            <Label for="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
              required
            />
            </FormGroup>
            <FormGroup>
            <Label for="nome">Feedback</Label>
            <Input
              name="feedback"
              type="textarea"
              placeholder="Feedback"
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value })}
              required
            />
            <small className='text-muted'>
              {formData.feedback.length} caracters (mínimo 100)
            </small>
            </FormGroup>
            <Button color="primary" type="submit">Enviar</Button>
            </Card>
          </Form>
        </Container>
  
    );
  }

  export default Feedback;