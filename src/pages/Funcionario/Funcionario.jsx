import { useState } from "react";

import {
    Search,
    Filter,
    Plus,
    Edit2,
    FileText

} from "lucide-react";

export default function Funcionario() {
    const [search, setSeatch] = useState("");

    const [selectedFuncionario, setSelectedFuncionario] = useState(null);

    const [editFuncionario, setEditFuncionario] = useState(null);

    const [addFuncionario, setAddFuncionario] = useState(false);

    const [filterOpen, setFilterOpen] = useState(false);

    const [funcionarios, setFuncionarios] = useState([

        {
            id:1,
            nome: "Igor Damasceno Santos",
            cpf: "123.456.789-00",
            email: "desenvolvedorIgor@teste.com",
            cargo: "Desenvolvedor",
            celular: "73 9389-6354",
            status: "ativo",
            matricula: "00297076",
            centroCusto: "GIC",
            cpf: "123.456.789-00",
            industria: "Teiu",
            empresa: "Marinho de Andrade",
            assinatura: "/assets/signature.png"

        },

        {
            id:2,
            nome: "Andersen Araujo",
            cpf: "123.345.789-00",
            email: "desenvolvedorAndersen@teste.com",
            cargo: "Desenvolvedor",
            celular: "73 9389-6354",
            status: "ativo",
            matricula: "00293244",
            centroCusto: "GIC",
            cpf: "122.456.789-00",
            industria: "Teiu",
            empresa: "Marinho de Andrade",
            assinatura: "/assets/signature.png"
        },

        {
            id:3,
            nome: "Stéfani Freire",
            cpf: "123.343.689-00",
            email: "desenvolvedorStéfani@teste.com",
            cargo: "TechLead",
            celular: "77 9389-6354",
            status: "ativo",
            matricula: "00293244",
            centroCusto: "GIC",
            cpf: "122.496.789-00",
            industria: "Teiu",
            empresa: "Marinho de Andrade",
            assinatura: "/assets/signature.png"
        },

        {
            id:2,
            nome: "Joana Silva",
            cpf: "321.345.789-00",
            email: "desenvolvedorJoana@teste.com",
            cargo: "Carregadora",
            celular: "77 8389-6354",
            status: "inativo",
            matricula: "002433244",
            centroCusto: "Almoxarifado",
            cpf: "133.456.789-00",
            industria: "Teiu",
            empresa: "Marinho de Andrade",
            assinatura: "/assets/signature.png"
        },



    ]);

    const [filters, setFilters] = useState({

        status:"",
        cargo:"",
        centroCusto:""

    });

const filteredFuncionarios = funcionarios.filter((f) => {

    const matchesSearch =
        f.nome.toLowerCase().includes(search.toLowerCase()) ||
        f.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
        !filters.status || f.status === filters.status;

    const matchesCargo =
        !filters.cargo ||
        f.cargo.toLowerCase().includes(filters.cargo.toLowerCase());

        const matchesCentro = 
        !filters.centroCusto ||
        f.centroCusto.toLowerCase().includes(filters.centroCusto.toLowerCase());

    return matchesSearch && matchesStatus && matchesCargo && matchesCentro;
});

 const handleAddFuncionario = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const novo = Object.fromEntries(form.entries());
    novo.id = Date.now();
    setFuncionarios([...funcionarios, novo]);
    setAddFuncionario(false);
  };

  // Salvar edição
  const handleEditFuncionario = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const atualizado = Object.fromEntries(form.entries());
    atualizado.id = editFuncionario.id;

    setFuncionarios(
      funcionarios.map((f) =>
        f.id === editFuncionario.id ? atualizado : f
      )
    );
    setEditFuncionario(null);
  };

  
  const handleApplyFilters = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setFilters(Object.fromEntries(form.entries()));
    setFilterOpen(false);
  };

  return (
    <div className="p-6 bg-[#e9f2f7] min-h-screen">
    
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Funcionários
      </h1>

      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center border rounded-lg overflow-hidden w-1/3 bg-white">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="px-3 py-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="mx-2 text-gray-500" size={20} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1 bg-teal-800 text-white px-3 py-2 rounded-lg"
          >
            <Filter size={18} /> Filtrar
          </button>
          <button
            onClick={() => setAddFuncionario(true)}
            className="flex items-center gap-1 bg-teal-800 text-white px-3 py-2 rounded-lg"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Cargo</th>
              <th className="px-4 py-2">Celular</th>
              <th className="px-4 py-2">Assinatura</th>
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios.map((f) => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-2">
                  <div
                    className={`w-1 h-6 rounded ${
                      f.status === "ativo" ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></div>
                  {f.nome}
                </td>
                <td className="px-4 py-2">{f.email}</td>
                <td className="px-4 py-2">{f.cargo}</td>
                <td className="px-4 py-2">{f.celular}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="p-2 bg-green-100 border border-green-600 rounded"
                    onClick={() => setSelectedFuncionario(f)}
                  >
                    <FileText className="text-green-600" size={18} />
                  </button>
                  <button
                    className="p-2 bg-blue-100 border border-blue-600 rounded"
                    onClick={() => setEditFuncionario(f)}
                  >
                    <Edit2 className="text-blue-600" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {editFuncionario && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              Editar {editFuncionario.nome}
            </h2>
            <form className="space-y-3" onSubmit={handleEditFuncionario}>
              {Object.keys(editFuncionario).map((key) =>
                key !== "id" ? (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    defaultValue={editFuncionario[key]}
                    className="w-full border px-3 py-2 rounded"
                  />
                ) : null
              )}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setEditFuncionario(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {addFuncionario && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              Adicionar Funcionário
            </h2>
            <form className="space-y-3" onSubmit={handleAddFuncionario}>
              <input type="text" name="nome" placeholder="Nome" className="w-full border px-3 py-2 rounded" required />
              <input type="email" name="email" placeholder="E-mail" className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="cargo" placeholder="Cargo" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="celular" placeholder="Celular" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="status" placeholder="Status" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="matricula" placeholder="Matrícula" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="centroCusto" placeholder="Centro de Custo" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="cpf" placeholder="CPF" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="industria" placeholder="Indústria" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="empresa" placeholder="Empresa" className="w-full border px-3 py-2 rounded" />
              <input type="text" name="assinatura" placeholder="Assinatura (URL)" className="w-full border px-3 py-2 rounded" />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setAddFuncionario(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {filterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Filtrar Funcionários</h2>
            <form className="space-y-3" onSubmit={handleApplyFilters}>
              <select name="status" defaultValue={filters.status} className="w-full border px-3 py-2 rounded">
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              <input type="text" name="cargo" placeholder="Cargo" defaultValue={filters.cargo} className="w-full border px-3 py-2 rounded"/>
              <input type="text" name="centroCusto" placeholder="Centro de Custo" defaultValue={filters.centroCusto} className="w-full border px-3 py-2 rounded"/>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setFilterOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                >
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
