import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { getProjects } from '../api/apiService';

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax efekti için scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      }
    };

    fetchProjects();
  }, []);

  // Parallax efekti için transform değeri hesapla
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 z-0"
          style={parallaxStyle}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            I'm a Developer
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Modern ve etkileyici web çözümleri
          </p>
          <Link to="/projects" className="btn btn-primary">
            Projelerimi Gör
          </Link>
        </div>
      </section>

      {/* Technology Icons */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Teknolojiler</h2>
          
          {/* Frontend Technologies */}
          <h3 className="text-xl font-semibold mb-8 text-center">Frontend</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center mb-12">
            {[
              { name: 'React', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', url: 'https://react.dev/' },
              { name: 'Vue', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png', url: 'https://vuejs.org/' },
              { name: 'HTML', logo: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
              { name: 'CSS', logo: 'https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-512.png', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
              { name: 'JavaScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
              { name: 'Vite', logo: 'https://vitejs.dev/logo-with-shadow.png', url: 'https://vitejs.dev/' },
              { name: 'Next.js', logo: 'https://w7.pngwing.com/pngs/87/586/png-transparent-next-js-hd-logo.png', url: 'https://nextjs.org/' },
              { name: 'Docker', logo: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png', url: 'https://www.docker.com/' },
            ].map((tech, index) => (
              <a 
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 overflow-hidden shadow-md border border-gray-100">
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span>{tech.name}</span>
              </a>
            ))}
          </div>
          
          {/* Backend Technologies */}
          <h3 className="text-xl font-semibold mb-8 text-center">Backend & Database</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
            {[
              { name: 'Node.js', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-nodejs-2-226035.png', url: 'https://nodejs.org/' },
              { name: 'Express', logo: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png', url: 'https://expressjs.com/' },
              { name: '.NET Core', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png', url: 'https://dotnet.microsoft.com/' },
              { name: 'MongoDB', logo: 'https://images.seeklogo.com/logo-png/50/1/mongodb-icon-logo-png_seeklogo-503274.png', url: 'https://www.mongodb.com/' },
              { name: 'SQL', logo: 'https://www.freeiconspng.com/thumbs/sql-server-icon-png/sql-server-icon-png-29.png', url: 'https://www.microsoft.com/en-us/sql-server/' },
            ].map((tech, index) => (
              <a 
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 overflow-hidden shadow-md border border-gray-100">
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span>{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Eğitim ve Sertifikalar */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Eğitim ve Sertifikalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Eğitim */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
                Eğitim
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">Bilgisayar Programcılığı, Ön Lisans</h4>
                  <p className="text-gray-600">Marmara Üniversitesi, 2021</p>
                  <p className="text-gray-700 mt-2">
                    Bilgisayar programlama ve web geliştirme alanında temel ve ileri düzey eğitim.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sertifikalar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Sertifikalar
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Frontend with Docker</h4>
                    <p className="text-gray-600">Techcareer.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">The Complete Web Development Bootcamp</h4>
                    <p className="text-gray-600">Udemy, Angela Yu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Projeler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="card hover:-translate-y-2">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.technologies}</span>
                    <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                      Detaylar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {projects.length > 3 && (
            <div className="text-center mt-8">
              <Link to="/projects" className="btn btn-primary">
                Tüm Projeleri Gör
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Kariyer Yolculuğu */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Kariyer Yolculuğu</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Current Job */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-blue-600 border-4 border-white z-10"></div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-10 w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Yazılım Uzmanı</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Şu an</span>
                  </div>
                  <p className="text-gray-600 mb-1">Emaa Sigorta</p>
                  <p className="text-gray-500 text-sm">Ekim 2024 - Devam Ediyor</p>
                  <p className="mt-2 text-gray-700">
                    Sigorta teknolojileri alanında yazılım geliştirme ve sistem entegrasyonu.
                  </p>
                </div>
              </div>
              
              {/* Previous Job */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-gray-400 border-4 border-white z-10"></div>
                <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-10 w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Developer</h3>
                  </div>
                  <p className="text-gray-600 mb-1">Softcand Yazılım Hizmetleri</p>
                  <p className="text-gray-500 text-sm">Mart 2023 - Ekim 2024</p>
                  <p className="mt-2 text-gray-700">
                    Web uygulamaları ve kurumsal yazılım çözümleri geliştirme.
                  </p>
                </div>
              </div>
              
              {/* Internship */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-gray-400 border-4 border-white z-10"></div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-10 w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Stajyer</h3>
                  </div>
                  <p className="text-gray-600 mb-1">Netax</p>
                  <p className="text-gray-500 text-sm">9 Ay (Lise Dönemi)</p>
                  <p className="mt-2 text-gray-700">
                    Yazılım geliştirme süreçlerinde temel deneyim ve ekip çalışması.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Projeniz için Hazırım!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Modern, hızlı ve kullanıcı dostu web çözümleri için hemen iletişime geçin.
          </p>
          <Link to="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3">
            İletişime Geç
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 