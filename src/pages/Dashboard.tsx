import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PieChart as PieIcon, Users, Building, UserCircle2, Clock } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DetailsPopup from '../components/ui/DetailsPopup';
ChartJS.register(ArcElement, Tooltip, Legend);

// --- TIPOS E INTERFACES ---
interface Task {
  id: string;
  title: string;
  type: 'Ação Judicial' | 'Extrajudicial';
  condominio: string;
  prazo: string;
  assignee: { name: string; avatarUrl?: string };
  numeroProcesso?: string;
  descricao?: string;
}

interface Column {
  id:string;
  title: string;
  taskIds: string[];
}
interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

// --- DADOS INICIAIS DO KANBAN (com detalhes extras para o popup) ---
const initialBoardData: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Protocolar Petição Inicial', type: 'Ação Judicial', condominio: 'Condomínio X', prazo: '28/08/2025', assignee: { name: 'Dr. Dias' }, numeroProcesso: '0012345-67.2025.8.05.0001', descricao: 'Petição referente à cobrança de taxas condominiais em atraso da unidade 101.'},
    'task-2': { id: 'task-2', title: 'Notificação Extrajudicial', type: 'Extrajudicial', condominio: 'Condomínio Y', prazo: '18/09/2025', assignee: { name: 'Dr. Nunes' }, descricao: 'Enviar notificação sobre barulho excessivo após as 22h para a unidade 204.'},
    'task-3': { id: 'task-3', title: 'Realizar Audiência', type: 'Ação Judicial', condominio: 'Condomínio Z', prazo: '05/10/2025', assignee: { name: 'Dr. Dias' }, numeroProcesso: '0098765-43.2025.8.05.0002', descricao: 'Audiência de conciliação agendada para as 14h.' },
    'task-4': { id: 'task-4', title: 'Elaborar Contrato', type: 'Extrajudicial', condominio: 'Condomínio W', prazo: '11/09/2025', assignee: { name: 'Dr. Nunes' }, descricao: 'Elaboração de novo contrato de prestação de serviços de jardinagem.'},
  },
  columns: {
    'column-1': { id: 'column-1', title: 'Pendentes', taskIds: ['task-1', 'task-2'] },
    'column-2': { id: 'column-2', title: 'Em Andamento', taskIds: ['task-3'] },
    'column-3': { id: 'column-3', title: 'Concluídos', taskIds: ['task-4'] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

// --- DADOS FICTÍCIOS PARA OS GRÁFICOS ---
const honorariosChartData = {
  labels: ['Pagos', 'Pendentes', 'Atrasados'],
  datasets: [{
    label: 'R$',
    data: [28320, 12500, 4500],
    backgroundColor: ['#1D3741', '#BD8F9E', '#D1E3E9'],
    borderColor: '#FFFFFF',
    borderWidth: 2,
  }],
};

const demandasChartData = {
  labels: ['Judicial', 'Extrajudicial'],
  datasets: [{
    label: 'Quantidade',
    data: [82, 45],
    backgroundColor: ['#1D3741', '#BD8F9E'],
    borderColor: '#FFFFFF',
    borderWidth: 2,
  }],
};

const tarefasChartData = {
  labels: ['Dr. Dias', 'Dr. Nunes', 'Outros'],
  datasets: [{
    label: 'Tarefas',
    data: [15, 22, 7],
    backgroundColor: ['#1D3741', '#BD8F9E', '#D1E3E9'],
    borderColor: '#FFFFFF',
    borderWidth: 2,
  }],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                boxWidth: 12,
                padding: 20,
                font: {
                    family: 'Inter, sans-serif'
                }
            }
        }
    }
}


// --- COMPONENTE DO CARD DE TAREFA ---
const TaskCard: React.FC<{ task: Task; index: number; onCardClick: (taskId: string) => void }> = ({ task, index, onCardClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onCardClick(task.id)}
          className={`p-4 bg-white rounded-lg border border-accent shadow-sm mb-3 cursor-pointer hover:border-primary ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ task.type === 'Ação Judicial' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800' }`}>
            {task.type}
          </span>
          <h4 className="font-semibold text-text-secondary mt-2">{task.title}</h4>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4 mr-2" />
            <span>Prazo: {task.prazo}</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-end">
             <div className="flex items-center text-xs text-gray-500">
                <span>{task.assignee.name}</span>
                <UserCircle2 className="w-6 h-6 ml-2 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// --- COMPONENTE PRINCIPAL DO DASHBOARD ---
const Dashboard: React.FC = () => {
  const [board, setBoard] = useState<BoardData>(initialBoardData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);

  const handleOpenPopup = (taskId: string) => {
    const task = board.tasks[taskId];
    setSelectedItem(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setBoard(prev => ({ ...prev, columns: { ...prev.columns, [newColumn.id]: newColumn } }));
      return;
    }
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };
    setBoard(prev => ({ ...prev, columns: { ...prev.columns, [newStartColumn.id]: newStartColumn, [newFinishColumn.id]: newFinishColumn } }));
  };

  return (
    <div className="relative">
      <div className="space-y-6">
        {/* Stats Cards com Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/honorarios" className="block bg-white p-6 rounded-lg shadow-sm border border-accent hover:shadow-md hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">Honorários</p>
                <p className="text-2xl font-bold text-text-secondary">R$ 45.320</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Link>
          <Link to="/acoes-legais" className="block bg-white p-6 rounded-lg shadow-sm border border-accent hover:shadow-md hover:scale-[1.02] transition-transform duration-200">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-text-primary">Demandas</p>
                 <p className="text-2xl font-bold text-text-secondary">127</p>
               </div>
               <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                 <PieIcon className="w-6 h-6 text-primary" />
               </div>
             </div>
          </Link>
          <Link to="/condominios" className="block bg-white p-6 rounded-lg shadow-sm border border-accent hover:shadow-md hover:scale-[1.02] transition-transform duration-200">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-text-primary">Condomínios</p>
                 <p className="text-2xl font-bold text-text-secondary">34</p>
               </div>
               <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center">
                 <Building className="w-6 h-6 text-primary" />
               </div>
             </div>
          </Link>
          <Link to="/condominos" className="block bg-white p-6 rounded-lg shadow-sm border border-accent hover:shadow-md hover:scale-[1.02] transition-transform duration-200">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-text-primary">Condôminos</p>
                 <p className="text-2xl font-bold text-text-secondary">892</p>
               </div>
               <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                 <Users className="w-6 h-6 text-secondary" />
               </div>
             </div>
          </Link>
        </div>

        {/* Seção de Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-accent">
            <h3 className="font-semibold text-text-secondary mb-4 text-left">Honorários (R$)</h3>
            <div className='h-64 flex justify-center items-center'>
              <Doughnut data={honorariosChartData} options={chartOptions}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-accent">
            <h3 className="font-semibold text-text-secondary mb-4 text-left">Demandas (quantidade)</h3>
             <div className='h-64 flex justify-center items-center'>
              <Doughnut data={demandasChartData} options={chartOptions}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-accent">
            <h3 className="font-semibold text-text-secondary mb-4 text-left">Distribuição de tarefas</h3>
             <div className='h-64 flex justify-center items-center'>
              <Doughnut data={tarefasChartData} options={chartOptions}/>
            </div>
          </div>
        </div>
        
        {/* Kanban Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {board.columnOrder.map(columnId => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map(taskId => board.tasks[taskId]);
              return (
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white p-6 rounded-lg shadow-sm border border-accent min-h-[24rem]">
                      <h3 className="font-semibold text-text-secondary mb-4">{column.title}</h3>
                      {tasks.map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          onCardClick={handleOpenPopup}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Renderização do Popup */}
      <DetailsPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        item={selectedItem}
      />
    </div>
  );
};

export default Dashboard;