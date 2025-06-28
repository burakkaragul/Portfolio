import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { getProjects } from '../api/apiService';

type FilterType = 'all' | 'technology' | 'category' | 'year';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Örnek kategoriler
  const categories = ['Web Uygulaması', 'Mobil Uygulama', 'E-Ticaret', 'Kurumsal Site', 'Blog'];
  
  // Örnek yıllar
  const years = ['2023', '2022', '2021', '2020'];
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Tüm projelerde kullanılan teknolojileri çıkarma
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => 
        project.technologies.split(',').map(tech => tech.trim())
      )
    )
  );

  // Projeleri filtreleme
  const filteredProjects = projects.filter(project => {
    // Önce arama sorgusuna göre filtrele
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Sonra filtre tipine göre filtrele
    if (filter === '') return true;
    
    switch (filterType) {
      case 'technology':
        return project.technologies.toLowerCase().includes(filter.toLowerCase());
      case 'category':
        // Örnek olarak, description içinde kategori adı geçiyorsa o kategoriye ait kabul ediyoruz
        return project.description.toLowerCase().includes(filter.toLowerCase());
      case 'year':
        // Örnek olarak, description içinde yıl geçiyorsa o yıla ait kabul ediyoruz
        return project.description.toLowerCase().includes(filter.toLowerCase());
      default:
        return true;
    }
  });

  const handleFilterChange = (type: FilterType, value: string) => {
    setFilterType(type);
    setFilter(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Projelerim</h1>
        
        {/* Arama Kutusu */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Proje ara..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              {searchQuery ? 'X' : '🔍'}
            </button>
          </div>
        </div>
        
        {/* Filtre Seçenekleri */}
        <div className="mb-8">
          <div className="flex justify-center mb-4 space-x-4">
            <button 
              className={`px-4 py-2 rounded-md ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => handleFilterChange('all', '')}
            >
              Tümü
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filterType === 'technology' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setFilterType('technology')}
            >
              Teknolojiler
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filterType === 'category' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setFilterType('category')}
            >
              Kategoriler
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filterType === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setFilterType('year')}
            >
              Yıllar
            </button>
          </div>
          
          {/* Teknoloji Filtreleri */}
          {filterType === 'technology' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setFilter('')}
              >
                Tümü
              </button>
              
              {allTechnologies.map((tech, index) => (
                <button 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${filter === tech ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setFilter(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
          
          {/* Kategori Filtreleri */}
          {filterType === 'category' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setFilter('')}
              >
                Tümü
              </button>
              
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${filter === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          
          {/* Yıl Filtreleri */}
          {filterType === 'year' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setFilter('')}
              >
                Tümü
              </button>
              
              {years.map((year, index) => (
                <button 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${filter === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setFilter(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card hover:-translate-y-2">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.split(',').map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          onClick={() => handleFilterChange('technology', tech.trim())}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                        Detaylar
                      </Link>
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                      >
                        Projeyi Gör
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Seçilen filtreye uygun proje bulunamadı.</p>
                <button 
                  className="mt-4 text-blue-600 hover:underline"
                  onClick={() => {
                    setFilter('');
                    setFilterType('all');
                    setSearchQuery('');
                  }}
                >
                  Tüm projeleri göster
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage; 