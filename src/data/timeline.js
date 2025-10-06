// Timeline - apenas referências por ID
// Os dados de year e date são puxados automaticamente dos dados referenciados
export const timelineData = [
  {
    id: 'timeline_001',
    type: 'project',
    referenceId: 'proj_001', // Referencia o projeto Vault
  },
  {
    id: 'timeline_002',
    type: 'project',
    referenceId: 'proj_002', // Referencia o projeto Portfolio
  },
  {
    id: 'timeline_003',
    type: 'fact',
    referenceId: 'fact_000', // First Line of Code (2018)
  },
  {
    id: 'timeline_004',
    type: 'project',
    referenceId: 'proj_003', // Referencia o projeto Google Maps Routes API Wrapper
  },
  {
    id: 'timeline_006',
    type: 'fact',
    referenceId: 'fact_002', // First GitHub Page (2021)
  },
  {
    id: 'timeline_007',
    type: 'fact',
    referenceId: 'fact_004', // Joined College (2022)
  },
  {
    id: 'timeline_009',
    type: 'fact',
    referenceId: 'fact_005', // First Git Repository (2023)
  },
  {
    id: 'timeline_010',
    type: 'fact',
    referenceId: 'fact_006', // First Complete Project (2023)
  },
  {
    id: 'timeline_011',
    type: 'fact',
    referenceId: 'fact_007', // Portfolio v1 Created (2024)
  },
  {
    id: 'timeline_012',
    type: 'project',
    referenceId: 'proj_004', // Referencia o projeto Event Management API (2024)
  }
]


// Importar funções dos arquivos separados
import { getProjectById } from './projects.js'
import { getFactById } from './facts.js'

// Função para buscar dados por ID (projeto ou fato)
export const getDataById = (id) => {
  // Busca em projetos
  const project = getProjectById(id)
  if (project) return project
  
  // Busca em fatos
  const fact = getFactById(id)
  if (fact) return fact
  
  return null
}

// Função para buscar dados completos do timeline
export const getTimelineWithData = () => {
  return timelineData.map(timelineItem => {
    const referencedData = getDataById(timelineItem.referenceId)
    
    // Puxar year e date dos dados referenciados
    const year = referencedData?.year || new Date(referencedData?.date).getFullYear()
    const date = referencedData?.date
    
    return {
      ...timelineItem,
      year,
      date,
      data: referencedData
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date)) // Sempre ordenar do mais novo para o mais antigo
}

// Função para buscar timeline por tipo (já ordenado)
export const getTimelineByType = (type) => {
  return getTimelineWithData().filter(item => item.type === type)
}

// Função para buscar timeline por ano (já ordenado)
export const getTimelineByYear = (year) => {
  return getTimelineWithData().filter(item => item.year === year)
}

// Função para buscar timeline ordenado por data (já ordenado por padrão)
export const getSortedTimeline = () => {
  return getTimelineWithData() // Já vem ordenado da função getTimelineWithData
}

// Função para adicionar novo item ao timeline
export const addToTimeline = (type, referenceId, highlight = false) => {
  const newId = `timeline_${String(timelineData.length + 1).padStart(3, '0')}`
  const newTimelineItem = {
    id: newId,
    type,
    referenceId,
    highlight
  }
  timelineData.push(newTimelineItem)
  return newTimelineItem
}

// Função para remover item do timeline
export const removeFromTimeline = (timelineId) => {
  const index = timelineData.findIndex(item => item.id === timelineId)
  if (index > -1) {
    return timelineData.splice(index, 1)[0]
  }
  return null
}

// Sort timeline by date (newest first)
export const sortedTimelineData = getSortedTimeline() 