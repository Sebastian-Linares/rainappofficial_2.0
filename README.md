# Rain App 2.0

Una aplicación moderna de chat con agentes especializados para ARL Sura, construida con Next.js 14, Firebase y Tailwind CSS.

## 🚀 Características

- **Autenticación Segura**: Sistema de login integrado con Firebase
- **Múltiples Agentes**: Tres perfiles diferentes de agentes especializados
  - Servicios Corporativos Sura
  - Cliente Potencial
  - Sector Educativo
- **Interfaz Moderna**: Diseño elegante y responsivo con Tailwind CSS
- **Conversaciones en Tiempo Real**: Integración con ElevenLabs para chat en vivo
- **Diseño Adaptativo**: Experiencia fluida en dispositivos móviles y escritorio

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [ElevenLabs](https://elevenlabs.io/)
- [TypeScript](https://www.typescriptlang.org/)

## 📋 Prerrequisitos

- Node.js 18.x o superior
- npm o yarn
- Cuenta de Firebase
- Cuenta de ElevenLabs

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/rainappofficial_2.0.git
cd rainappofficial_2.0
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:
Crea un archivo `.env.local` en la raíz del proyecto y añade:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# ElevenLabs
NEXT_PUBLIC_ELEVENLABS_API_KEY=tu_api_key
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_SURA=id_agente_sura
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_CLIENTE=id_agente_cliente
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_EDUCATIVO=id_agente_educativo
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Características de la Aplicación

### Página de Selección de Modelo
- Interfaz intuitiva para seleccionar el agente deseado
- Cards interactivos con información detallada de cada agente
- Diseño responsivo y animaciones suaves

### Conversaciones con Agentes
- Chat en tiempo real con agentes especializados
- Contexto específico para cada tipo de agente
- Interfaz de usuario moderna y fácil de usar
- Indicadores de estado de conexión y actividad

### Sistema de Autenticación
- Login seguro con Firebase
- Protección de rutas para usuarios autenticados
- Gestión de sesiones de usuario

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una nueva rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Agradecimientos

- ARL Sura por la colaboración
- Rain Group por el desarrollo
- ElevenLabs por la tecnología de chat
