// contexts/EmployeeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availablePositions, setAvailablePositions] = useState([]);

  // Mock data - funcionários com histórico salarial
  useEffect(() => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Carlos Oliveira',
        matricula: '001',
        cargo: 'Analista de Sistemas',
        centroCusto: 'TI',
        setor: 'GIC',
        salarios: [
          { valor: 5000, data: '01/01/2023', tipo: 'Ajuste' },
          { valor: 5500, data: '01/06/2023', tipo: 'Promoção' },
          { valor: 6000, data: '01/01/2024', tipo: 'Reajuste' }
        ]
      },
      {
        id: 2,
        name: 'Juliana Pereira',
        matricula: '002',
        cargo: 'Designer',
        centroCusto: 'Marketing',
        setor: 'GIC',
        salarios: [
          { valor: 4500, data: '01/01/2023', tipo: 'Ajuste' },
          { valor: 4800, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 5200, data: '01/01/2024', tipo: 'Promoção' }
        ]
      },
      {
        id: 3,
        name: 'Mariana Costa',
        matricula: '003',
        cargo: 'Gerente de Projetos',
        centroCusto: 'TI',
        setor: 'GIC',
        salarios: [
          { valor: 8000, data: '01/01/2023', tipo: 'Contratação' },
          { valor: 8500, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 9000, data: '01/01/2024', tipo: 'Promoção' }
        ]
      },
      {
        id: 4,
        name: 'Ricardo Almeida',
        matricula: '004',
        cargo: 'Coordenador',
        centroCusto: 'Financeiro',
        setor: 'Outro',
        salarios: [
          { valor: 7000, data: '01/01/2023', tipo: 'Contratação' },
          { valor: 7500, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 7800, data: '01/01/2024', tipo: 'Ajuste' }
        ]
      },
      {
        id: 5,
        name: 'Fernanda Silva',
        matricula: '005',
        cargo: 'Assistente Administrativo',
        centroCusto: 'RH',
        setor: 'GIC',
        salarios: [
          { valor: 3000, data: '01/01/2023', tipo: 'Contratação' },
          { valor: 3200, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 3500, data: '01/01/2024', tipo: 'Promoção' }
        ]
      },
      {
        id: 6,
        name: 'Roberto Santos',
        matricula: '006',
        cargo: 'Analista Financeiro',
        centroCusto: 'Financeiro',
        setor: 'GIC',
        salarios: [
          { valor: 4200, data: '01/01/2023', tipo: 'Contratação' },
          { valor: 4500, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 4800, data: '01/01/2024', tipo: 'Promoção' }
        ]
      },
      {
        id: 7,
        name: 'Amanda Lima',
        matricula: '007',
        cargo: 'Coordenadora de Marketing',
        centroCusto: 'Marketing',
        setor: 'GIC',
        salarios: [
          { valor: 6500, data: '01/01/2023', tipo: 'Contratação' },
          { valor: 6800, data: '01/06/2023', tipo: 'Reajuste' },
          { valor: 7200, data: '01/01/2024', tipo: 'Promoção' }
        ]
      }
    ];

    const positions = [
      'Analista de Sistemas',
      'Designer',
      'Gerente de Projetos',
      'Coordenador',
      'Assistente Administrativo',
      'Analista Financeiro',
      'Coordenador de Marketing',
      'Gerente de RH',
      'Diretor',
      'Estagiário',
      'Analista Junior',
      'Analista Pleno',
      'Analista Sênior'
    ];

    setEmployees(mockEmployees);
    setAvailablePositions(positions);
    setLoading(false);
  }, []);

  // Buscar funcionários por nome ou matrícula (com sugestões)
  const searchEmployees = (searchTerm, userCentroCusto = null) => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    const found = employees.filter(emp => 
      emp.name.toLowerCase().includes(term) || 
      emp.matricula.includes(term)
    );

    // Marcar funcionários que não pertencem ao centro de custo
    if (userCentroCusto) {
      return found.map(emp => ({
        ...emp,
        accessDenied: emp.centroCusto !== userCentroCusto
      }));
    }

    return found;
  };

  // Buscar funcionário específico por nome ou matrícula
  const findEmployee = (searchTerm, userCentroCusto = null) => {
    if (!searchTerm.trim()) return null;
    
    const term = searchTerm.toLowerCase();
    const employee = employees.find(emp => 
      emp.name.toLowerCase().includes(term) || 
      emp.matricula.includes(term)
    );

    // Verificar se o funcionário pertence ao centro de custo do usuário
    if (employee && userCentroCusto && employee.centroCusto !== userCentroCusto) {
      return { ...employee, accessDenied: true };
    }

    return employee;
  };

  // Obter últimos 3 salários
  const getLastThreeSalaries = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee && employee.salarios) {
      return employee.salarios.slice(-3).reverse(); // Últimos 3, do mais recente para o mais antigo
    }
    return [];
  };

  // Buscar cargos por termo
  const searchPositions = (searchTerm) => {
    if (!searchTerm.trim()) return availablePositions;
    
    return availablePositions.filter(position =>
      position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const value = {
    employees,
    loading,
    availablePositions,
    searchEmployees,
    findEmployee,
    getLastThreeSalaries,
    searchPositions
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};