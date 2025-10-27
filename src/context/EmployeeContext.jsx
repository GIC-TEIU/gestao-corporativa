import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost/gestao-corporativa/public/api/employees');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar funcionários');
        }

        const result = await response.json();

        if (result.success) {
          setEmployees(result.data);
        } else {
          console.error("Falha ao carregar funcionários:", result.message);
        }

      } catch (error) {
        console.error("Erro no fetch de funcionários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); 

  const searchEmployees = (searchTerm, userCentroCusto = null) => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    
    const found = employees.filter(emp => 
      (emp.name && emp.name.toLowerCase().includes(term)) || 
      (emp.matricula && emp.matricula.includes(term))
    );

    if (userCentroCusto) {
    
      const userCCTrimmed = userCentroCusto.trim();
      
      return found.map(emp => {
        const empCCTrimmed = (emp.centroCusto ? emp.centroCusto.trim() : '');
        const isDifferent = empCCTrimmed !== userCCTrimmed;
  
        console.log("--- DEBUG searchEmployees ---");
        console.log("Funcionário:", emp.name, `(${emp.matricula})`);
        console.log("CC do Usuário (com trim):", `'${userCCTrimmed}'`);
        console.log("CC do Funcionário (com trim):", `'${empCCTrimmed}'`);
        console.log("São diferentes?", isDifferent);
        console.log("--------------------------");
      
        return {
          ...emp,
          accessDenied: isDifferent
        };
      });
    }

    return found;
  };


  const findEmployee = (searchTerm, userCentroCusto = null) => {
    if (!searchTerm.trim()) return null;
    
    const term = searchTerm.toLowerCase();
    const employee = employees.find(emp => 
      (emp.name && emp.name.toLowerCase().includes(term)) || 
      (emp.matricula && emp.matricula.includes(term))
    );

  
    if (employee && userCentroCusto) {
      const userCCTrimmed = userCentroCusto.trim();
      const empCCTrimmed = (employee.centroCusto ? employee.centroCusto.trim() : '');

      if (empCCTrimmed !== userCCTrimmed) {
        return { ...employee, accessDenied: true };
      }
    }

    return employee;
  };

  const getLastThreeSalaries = (employeeId) => {
    return []; 
  };

  const value = {
    employees,
    loading,
    searchEmployees,
    findEmployee,
    getLastThreeSalaries,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

