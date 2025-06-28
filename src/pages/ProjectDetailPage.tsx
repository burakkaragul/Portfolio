import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Project } from '../types';
import { getProjectById } from '../api/apiService';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getProjectById(parseInt(id, 10));
        setProject(data);
      } catch (error) {
        console.error('Proje detayı yüklenirken hata oluştu:', error);
        setError('Proje detayları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Hata!</h1>
            <p className="mb-6">{error || 'Proje bulunamadı.'}</p>
            <Link to="/projects" className="btn btn-primary">
              Projelere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-5xl mx-auto">
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">{project.title}</h1>
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Projeyi Görüntüle
              </a>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Proje Açıklaması</h2>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Kullanılan Teknolojiler</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.split(',').map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between">
              <Link to="/projects" className="text-blue-600 hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Tüm Projelere Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 