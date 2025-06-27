# 🎮 Induct3D – Creador de Recorridos 3D Interactivos

**Induct3D** es una aplicación web que permite a cualquier persona crear recorridos de inducción interactivos en entornos 3D personalizados, sin necesidad de saber programar. Ideal para onboarding empresarial, recorridos educativos o presentaciones inmersivas.

---

## 🚀 Características principales

- 🌍 Ambientes 3D personalizables basados en plantillas `.glb`
- 🎨 Cambio de texturas y colores en tiempo real
- 🧍 Personaje guía con opciones editables y narración
- 🎮 Inserción de minijuegos gamificados
- 🔒 Publicación con acceso libre o protegido por contraseña
- 💾 CRUD de recorridos: crear, editar, previsualizar y compartir

---

## 🧱 Tecnologías utilizadas

### Frontend

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query
- [Zod](https://zod.dev/) + React Hook Form
- [React Router DOM](https://reactrouter.com/)

### Backend (previsto)

- [Spring Boot](https://spring.io/projects/spring-boot)
- [MongoDB](https://www.mongodb.com/) para almacenar estructuras de recorridos
- Autenticación con JWT

---

## 📁 Estructura del proyecto

```plaintext
src/
├── assets/               # Modelos, texturas, imágenes, audio
├── features/             # Lógica por dominio (auth, projects, editor, games)
├── infrastructure/       # API base, hooks globales, rutas, constantes
├── presentation/         # Componentes visuales, layouts y vistas
├── main.tsx              # Punto de entrada
```
## 📦 Instalación y ejecución
```githubexpressionlanguage
# 1. Clonar el repositorio
git clone https://github.com/Induct3D/Induct3D-Frontend.git
cd induct3d

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

```

## 🧪 Scripts disponibles
```githubexpressionlanguage
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila para producción
npm run preview   # Previsualiza el build
```

