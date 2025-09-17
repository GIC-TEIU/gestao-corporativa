import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "Adriana Mármore",
      email: "adrianamarmore@gmail.com",
      cargo: "Designer",
      celular: "77 3423-9423",
      status: "ativo",
      matricula: "569565.6",
      centroCusto: "Recursos Humanos",
      cpf: "123.456.789-00",
      empresa: "Teiú - Matriz",
      industria: "Tecnologia",
      assinatura: "/assets/signature.png",
    },
    {
      id: 2,
      nome: "João Silva",
      email: "joao.silva@gmail.com",
      cargo: "Desenvolvedor",
      celular: "77 9876-5432",
      status: "ativo",
      matricula: "123456.7",
      centroCusto: "TI",
      cpf: "987.654.321-00",
      empresa: "Teiú - Filial",
      industria: "Tecnologia",
      assinatura: "/assets/signature.png",
    },
  ]);

  // Estado para envelopes
  const [envelopes, setEnvelopes] = useState([
    { 
      id: 1, 
      nome: 'Adriana mármore', 
      email: 'Adrianamármore@gmail.com', 
      envelope: 'Atestado de férias', 
      status: 'Pendente', 
      data: '22/05/2004', 
      matricula: '1202296354065', 
      cargo: 'Coordenadora de RH', 
      empresa: 'Teiú - Matriz',
      tipo: 'documentos',
      requisitante: 'Adriana mármore',
      cargoRequisitante: 'Líder de RH',
      diretor: 'Diretor A',
      unidade: 'zrsdyzrydszyr',
      documentos: []
    },
  ]);

  // Funções para gerenciar funcionários
  const addFuncionario = (novoFuncionario) => {
    setFuncionarios([...funcionarios, { ...novoFuncionario, id: Date.now() }]);
  };

  const updateFuncionario = (funcionarioAtualizado) => {
    setFuncionarios(funcionarios.map(f => 
      f.id === funcionarioAtualizado.id ? funcionarioAtualizado : f
    ));
  };

  // Funções para gerenciar envelopes
  const addEnvelope = (novoEnvelope) => {
    setEnvelopes([...envelopes, { 
      ...novoEnvelope, 
      id: Date.now(), 
      status: 'Pendente', 
      data: new Date().toLocaleDateString('pt-BR') 
    }]);
  };

  const updateEnvelope = (envelopeAtualizado) => {
    setEnvelopes(envelopes.map(e => 
      e.id === envelopeAtualizado.id ? envelopeAtualizado : e
    ));
  };

  const value = {
    funcionarios,
    envelopes,
    addFuncionario,
    updateFuncionario,
    addEnvelope,
    updateEnvelope
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}