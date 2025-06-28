import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Hakkımda</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop"
                alt="Profil Fotoğrafı"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-4">Merhaba, Ben [İsminiz]</h2>
              
              <p className="text-gray-700 mb-4">
                Yazılım geliştirme konusunda 5+ yıllık deneyime sahip bir Full Stack geliştiriciyim. 
                Modern web teknolojileri ile kullanıcı dostu, performanslı ve ölçeklenebilir uygulamalar 
                geliştirmekten keyif alıyorum.
              </p>
              
              <p className="text-gray-700 mb-4">
                Frontend tarafında React, Vue ve Angular gibi modern JavaScript/TypeScript framework'leri ile çalışıyorum. 
                Backend tarafında ise .NET Core, Node.js ve Python teknolojilerini kullanarak API'ler ve mikroservisler geliştiriyorum.
              </p>
              
              <p className="text-gray-700 mb-4">
                Sürekli öğrenmeye ve kendimi geliştirmeye önem veriyorum. Yeni teknolojileri takip ediyor, 
                açık kaynak projelere katkıda bulunuyor ve teknik makaleler yazıyorum.
              </p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Yeteneklerim</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'JavaScript/TypeScript',
                    'React/Vue/Angular',
                    'Node.js',
                    '.NET Core',
                    'SQL/NoSQL Veritabanları',
                    'Docker/Kubernetes',
                    'CI/CD',
                    'Cloud Services (AWS/Azure)',
                    'TDD & Test Otomasyonu'
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Eğitim</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Bilgisayar Mühendisliği, Yüksek Lisans</p>
                    <p className="text-gray-600">XYZ Üniversitesi, 2018-2020</p>
                  </div>
                  <div>
                    <p className="font-medium">Bilgisayar Mühendisliği, Lisans</p>
                    <p className="text-gray-600">ABC Üniversitesi, 2014-2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 