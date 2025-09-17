// src/components/envelopes/Step1Setor.jsx
import { Search } from "lucide-react";

const Step1Setor = ({ setorEnvelope, setSetorEnvelope, handleContinue }) => (
  <form
    onSubmit={handleContinue}
    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-md"
  >
    {/* Nome do requisitante */}
    <div>
      <label className="block text-gray-700 mb-1">
        Nome do requisitante
      </label>
      <div className="relative">
        <input
          type="text"
          defaultValue="Adriana mármore"
          className="w-full border rounded-2xl px-4 py-2 pr-10 focus:outline-none focus:border-brand-cyan"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
    </div>

    {/* Cargo */}
    <div>
      <label className="block text-gray-700 mb-1">Cargo</label>
      <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
        <option>Líder de RH</option>
        <option>Gerente</option>
        <option>Analista</option>
        <option>Outros</option>
      </select>
    </div>

    {/* Diretor */}
    <div>
      <label className="block text-gray-700 mb-1">Gerente</label>
      <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
        <option value="">Selecione</option>
        <option>Joabe Andrade</option>
        <option>Lazaro</option>
        <option>José Roberto</option>
        <option>Outros</option>
      </select>
    </div>

    {/* Setor do envelope */}
    <div>
      <label className="block text-gray-700 mb-1">Setor do envelope</label>
      <select
        value={setorEnvelope}
        onChange={(e) => setSetorEnvelope(e.target.value)}
        className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
      >
        <option value="">Selecione</option>
        <option value="rh">Setor RH</option>
        <option value="dp">Setor Departamento Pessoal</option>
        <option value="documentos">Envio de documentos direto</option>
      </select>
    </div>

    {/* Unidade */}
    <div>
      <label className="block text-gray-700 mb-1">Unidade</label>
      <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
        <option>Teiú - Matriz</option>
        <option>Teiú Filial - Feira de Santana</option>
        <option>Teiú - Cosméticos</option>
        <option>Holding</option>
        <option>Votre</option>
        <option>Kaioka</option>
        <option>Outras</option>
      </select>
    </div>

    {/* Botão continuar */}
    <div className="md:col-span-2 flex justify-end">
      <button
        type="submit"
        className="bg-green-700 text-white px-6 py-2 rounded-2xl hover:bg-green-800"
        disabled={!setorEnvelope}
      >
        Continuar
      </button>
    </div>
  </form>
);

export default Step1Setor;