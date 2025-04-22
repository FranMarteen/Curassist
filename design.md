# Curassist - Diretrizes de Design Aprimorado

## Visão Geral
Este documento fornece diretrizes detalhadas para a implementação de um design aprimorado para o Curassist, aplicativo de gestão de curatela. As recomendações visam melhorar a experiência do usuário, a acessibilidade e a eficiência da navegação.

## Layout Principal

### Cabeçalho Aprimorado
- **Logo e Marca**: Posicionado à esquerda, tamanho adequado para reconhecimento instantâneo
- **Barra de Pesquisa**: Central, com opções avançadas acessíveis por menu expansível
- **Área do Usuário**: Dropdown contendo perfil, preferências, notificações e opção de logout
- **Indicador de Status**: Visualização rápida de tarefas pendentes e alertas importantes

### Barra Lateral Inteligente
- **Colapsável**: Botão para expandir/recolher para maximizar espaço útil
- **Navegação por Níveis**: Organização hierárquica clara dos itens de menu
- **Indicadores Visuais**: Uso de cores e ícones para diferenciar seções
- **Menu Contextual**: Adaptação dos itens mostrados com base no perfil do usuário

### Área de Conteúdo Principal
- **Grid Responsivo**: Adaptação automática a diferentes tamanhos de tela
- **Componentes Modulares**: Widgets e cartões reposicionáveis
- **Hierarquia Visual**: Uso de tipografia e espaçamento para priorizar informações
- **Espaços em Branco**: Utilização estratégica para melhorar legibilidade

## Sistema de Navegação

### Navegação Primária
- **Dashboard**: Visão geral personalizada com widgets configuráveis
- **Curatelados**: Lista de pessoas sob curatela com filtros rápidos
- **Tarefas**: Gerenciamento de atividades com visualização de calendário e lista
- **Obrigações**: Requisitos legais com alertas de prazo
- **Documentos**: Sistema de arquivo digital com categorização automática
- **Relatórios**: Geração de relatórios automatizados para prestação de contas

### Navegação Secundária
- **Migalhas de Pão**: Caminho visual da navegação atual
- **Abas Contextuais**: Subdivisões quando apropriado dentro de uma seção
- **Ações Rápidas**: Botão flutuante para ações frequentes (+) com menu expansível
- **Navegação por Gestos**: Suporte a gestos em dispositivos touchscreen

### Elementos de Navegação Auxiliar
- **Tour Interativo**: Assistente de onboarding para novos usuários
- **Favoritos**: Sistema para marcar e acessar rapidamente páginas frequentes
- **Histórico Recente**: Lista dos últimos itens acessados
- **Atalhos de Teclado**: Comandos rápidos para usuários avançados

## Sistema Visual

### Paleta de Cores Expandida
- **Cores Primárias**:
  - Azul Principal: #0056b3 (mais escuro para melhor contraste)
  - Azul Secundário: #007bff
- **Cores Secundárias**:
  - Cinza Claro: #f0f2f5 (fundo)
  - Cinza Médio: #6c757d (elementos secundários)
  - Cinza Escuro: #343a40 (texto principal)
- **Cores de Estado**:
  - Sucesso: #28a745
  - Alerta: #ffc107
  - Erro: #dc3545
  - Informação: #17a2b8

### Tipografia
- **Família Principal**: Roboto
- **Família Secundária**: Open Sans
- **Hierarquia**:
  - Títulos: 24px, 700 (peso)
  - Subtítulos: 18px, 600
  - Corpo: 16px, 400
  - Texto Secundário: 14px, 400
  - Micro Texto: 12px, 400

### Iconografia
- **Sistema Consistente**: Conjunto de ícones simplificados em estilo linha
- **Tamanhos**: 24px (navegação), 20px (ações), 16px (indicadores)
- **Estados**: Variações para estado normal, hover, ativo e desabilitado

### Componentes UI
- **Botões**: Variantes primário, secundário, terciário e ghost
- **Campos de Formulário**: Estilo consistente com validação visual
- **Cartões**: Componentes modulares para exibição de informações
- **Tabelas**: Design responsivo com opções de ordenação e filtro
- **Modais**: Para ações que requerem foco completo

## Considerações de Acessibilidade
- **Contraste**: Relações de contraste WCAG AA (4.5:1 para texto normal)
- **Tamanho de Clique**: Áreas de toque mínimas de 44x44px em dispositivos móveis
- **Alternativas Textuais**: Para todos os elementos não-texto
- **Navegação por Teclado**: Ordem lógica de tabulação e atalhos
- **Modo Escuro**: Alternativa para redução de fadiga visual

## Implementação Responsiva
- **Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px-1199px
  - Mobile: <767px
- **Comportamentos Adaptativos**:
  - Navegação: Barra lateral em desktop, menu hambúrguer em mobile
  - Conteúdo: Reorganização de colunas em diferentes tamanhos
  - Tipografia: Escala reduzida em dispositivos menores

## Protótipos e Testes
- **Wireframes Detalhados**: Para cada tela principal
- **Protótipo Interativo**: Para validação de fluxos de navegação
- **Testes de Usuário**: Sessões de feedback com representantes do público-alvo

import React, { useState } from 'react';
import { 
  Menu, 
  User, 
  Home, 
  Users, 
  CheckSquare, 
  Calendar, 
  FileText, 
  BarChart2, 
  Bell, 
  Search, 
  Settings, 
  ChevronRight, 
  Plus, 
  Clock,
  Star 
} from 'lucide-react';

const CurassistMockup = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between shadow-sm">
        <div className="flex items-center">
          <div className="text-blue-700 font-bold text-xl mr-8">
            Curassist
          </div>
          <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700">
            <Menu size={20} />
          </button>
        </div>
        
        <div className="w-1/3 relative">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="w-full py-2 px-4 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell size={20} className="text-gray-600 cursor-pointer hover:text-gray-800" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">Maria Silva</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
                { id: 'curatelados', icon: <Users size={20} />, label: 'Curatelados' },
                { id: 'tarefas', icon: <CheckSquare size={20} />, label: 'Tarefas' },
                { id: 'obrigacoes', icon: <Calendar size={20} />, label: 'Obrigações' },
                { id: 'documentos', icon: <FileText size={20} />, label: 'Documentos' },
                { id: 'relatorios', icon: <BarChart2 size={20} />, label: 'Relatórios' },
              ].map((item) => (
                <li key={item.id} onClick={() => setActiveMenu(item.id)} className="cursor-pointer">
                  <div className={`flex items-center p-2 rounded-lg ${activeMenu === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="mr-3">{item.icon}</div>
                    {!sidebarCollapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                    {!sidebarCollapsed && activeMenu === item.id && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            {!sidebarCollapsed && (
              <div className="mt-8">
                <h4 className="text-xs uppercase text-gray-500 font-medium px-2 mb-2">Favoritos</h4>
                <ul className="space-y-1">
                  {[
                    { icon: <Star size={16} />, label: 'Próximas audiências' },
                    { icon: <Clock size={16} />, label: 'Relatório mensal' },
                  ].map((item, index) => (
                    <li key={crypto.randomUUID()} className="cursor-pointer">
                      <div className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                        <div className="mr-3 text-gray-500">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-6">
            Dashboard {activeMenu !== 'dashboard' && <> &rsaquo; <span className="text-gray-700 font-medium capitalize">{activeMenu}</span></>}
          </div>
          
          {activeMenu === 'dashboard' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 font-roboto">Dashboard</h1>
                <div className="space-x-2">
                  <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 flex items-center font-open-sans">
                    <Settings size={16} className="mr-2" />
                    Personalizar
                  </button>
                </div>
              </div>
              
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { title: 'Curatelados Ativos', value: '8', color: 'bg-blue-500' },
                  { title: 'Tarefas Pendentes', value: '12', color: 'bg-yellow-500' },
                  { title: 'Obrigações este Mês', value: '5', color: 'bg-green-500' }
                ].map((card, index) => (
                  <div key={crypto.randomUUID()} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-t-0 border-r-0 border-b-0" style={{ borderLeftColor: card.color.replace('bg-', '') === 'blue-500' ? '#3b82f6' : card.color.replace('bg-', '') === 'yellow-500' ? '#eab308' : '#22c55e' }}>
                    <h3 className="text-lg font-semibold text-gray-700 font-roboto">{card.title}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2 font-open-sans">{card.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800 font-roboto">Atividades Recentes</h2>
                  <button className="text-blue-600 text-sm font-medium hover:underline font-open-sans">Ver todas</button>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    { title: 'Novo documento adicionado', desc: 'Laudo médico para José Santos', time: '2 horas atrás' },
                    { title: 'Tarefa concluída', desc: 'Agendar consulta médica para Maria Oliveira', time: 'Ontem' },
                    { title: 'Obrigação próxima', desc: 'Relatório anual de Pedro Almeida', time: 'Em 3 dias' },
                  ].map((activity, index) => (
                    <div key={crypto.randomUUID()} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800 font-roboto">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 font-open-sans">{activity.desc}</p>
                        </div>
                        <span className="text-xs text-gray-500 font-open-sans">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions Panel */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800 font-roboto">Ações Rápidas</h2>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Adicionar Curatelado', icon: <Users size={20} /> },
                    { label: 'Nova Tarefa', icon: <CheckSquare size={20} /> },
                    { label: 'Upload de Documento', icon: <FileText size={20} /> },
                    { label: 'Gerar Relatório', icon: <BarChart2 size={20} /> },
                  ].map((action, index) => (
                    <button key={crypto.randomUUID()} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-open-sans">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center font-open-sans">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {activeMenu !== 'dashboard' && (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-4 capitalize font-roboto">Seção {activeMenu}</h2>
              <p className="text-gray-600 mb-6 font-open-sans">Esta é uma visualização do mockup interativo. Navegue pelo menu lateral para ver diferentes seções.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center font-open-sans">
                <Plus size={16} className="mr-2" />
                Adicionar Novo
              </button>
            </div>
          )}
        </main>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-12 w-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors font-open-sans">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default CurassistMockup;
