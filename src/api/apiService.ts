import axios from 'axios';
import type { Project, Message } from '../types';

// API URL'sini ortam değişkeninden alıyoruz, yoksa varsayılan olarak localhost'u kullanıyoruz
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  } catch (error) {
    console.error('Projeler alınırken hata oluştu:', error);
    // Gerçek API bağlantısı olmadığında örnek veriler döndürelim
    return mockProjects;
  }
};

export const getProjectById = async (id: number): Promise<Project> => {
  try {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Proje ID=${id} alınırken hata oluştu:`, error);
    // Gerçek API bağlantısı olmadığında örnek veri döndürelim
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error('Proje bulunamadı');
    return project;
  }
};

export const sendContactMessage = async (message: Omit<Message, 'id' | 'createdAt'>): Promise<void> => {
  try {
    await apiClient.post('/contact', message);
  } catch (error) {
    console.error('Mesaj gönderilirken hata oluştu:', error);
    // Gerçek API bağlantısı olmadığında başarılı olmuş gibi davranıyoruz
  }
};

// Mock veri (gerçek API bağlantısı olmadığında kullanılacak)
export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-Ticaret Platformu',
    description: 'React ve Node.js kullanılarak geliştirilmiş tam kapsamlı bir e-ticaret çözümü.',
    technologies: 'React, Node.js, Express, MongoDB, Redux',
    imageUrl: 'https://via.placeholder.com/600x400?text=E-Ticaret+Projesi',
    projectUrl: 'https://github.com/username/ecommerce-project',
  },
  {
    id: 2,
    title: 'Blog Uygulaması',
    description: 'Markdown desteği olan modern bir blog platformu.',
    technologies: 'Vue.js, Firebase, TailwindCSS',
    imageUrl: 'https://via.placeholder.com/600x400?text=Blog+Uygulaması',
    projectUrl: 'https://github.com/username/blog-app',
  },
  {
    id: 3,
    title: 'Task Yönetim Sistemi',
    description: 'Ekipler için geliştirilmiş Kanban tarzı görev yönetim uygulaması.',
    technologies: 'React, TypeScript, .NET Core, SQL Server',
    imageUrl: 'https://via.placeholder.com/600x400?text=Task+Yönetim+Sistemi',
    projectUrl: 'https://github.com/username/task-management',
  },
]; 