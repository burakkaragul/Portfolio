# Portfolio Web Sitesi

Modern ve etkileyici bir kişisel portfolio web sitesi. React, TypeScript ve TailwindCSS ile geliştirilmiştir.

## Özellikler

- Responsive tasarım
- Parallax efektleri
- Proje galerisi
- İletişim formu
- Modern UI/UX

## Teknolojiler

- React + Vite
- TypeScript
- TailwindCSS
- React Router

## Kurulum

```bash
# Depoyu klonla
git clone https://github.com/username/portfolio-site.git

# Proje dizinine git
cd portfolio-site

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## Ortam Değişkenleri

Projeyi çalıştırmak için aşağıdaki ortam değişkenlerini `.env` dosyasında tanımlamanız gerekir:

```
VITE_API_URL=https://your-api-url.com/api
```

## Yapı

```
/src
  /api        - API istek fonksiyonları
  /assets     - Statik dosyalar (resimler, fontlar vb.)
  /components - Yeniden kullanılabilir bileşenler
  /pages      - Sayfa bileşenleri
  /types      - TypeScript tip tanımlamaları
```

## Dağıtım

Bu proje Vercel ile dağıtılmak üzere yapılandırılmıştır. Ana branch'e push yapıldığında otomatik olarak dağıtılır.

```bash
# Dağıtım için build
npm run build
```

## Backend API

Backend API, ASP.NET Core ile geliştirilmiştir ve Azure'da barındırılmaktadır. API endpoint'leri:

- `GET /api/projects` - Tüm projeleri getir
- `GET /api/projects/:id` - Belirli bir projenin detaylarını getir
- `POST /api/contact` - İletişim formu verilerini gönder

## Lisans

MIT
