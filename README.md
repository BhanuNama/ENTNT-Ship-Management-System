# ENTNT Ship Management System
# 🚢 ENTNT Marine - Ship Maintenance Dashboard

A modern, comprehensive ship maintenance management system built with React, TypeScript, and Tailwind CSS. This dashboard provides real-time insights into maritime operations, helping manage ships, components, maintenance jobs, and crew efficiently.

![Ship Management Dashboard](public/ship-background.jpg)

## ✨ Features

### 🏗️ **Core Functionality**
- **Ship Management**: Complete CRUD operations for managing your fleet
- **Component Tracking**: Detailed component management with maintenance history
- **Maintenance Jobs**: Create, assign, and track maintenance tasks
- **Calendar View**: Visual scheduling and timeline management
- **Dashboard Analytics**: Real-time insights and KPI tracking
- **User Management**: Role-based access control (Admin, Inspector, Engineer)

### 🎨 **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Guided Tours**: Interactive onboarding with React Joyride
- **Real-time Notifications**: Toast notifications for all CRUD operations
- **Modern UI**: Clean, professional design with smooth animations

### 📊 **Data Management**
- **Local Storage Persistence**: Data persistence across browser sessions
- **Cross-tab Synchronization**: Real-time data sync between multiple tabs
- **Export/Import**: CSV and JSON export functionality
- **Bulk Operations**: Multi-select and bulk delete capabilities

### 🔐 **Authentication & Security**
- **Role-based Access**: Different permissions for Admin, Inspector, and Engineer roles
- **Session Management**: Secure authentication with session storage
- **Protected Routes**: Route guards based on user authentication

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Styling**: Tailwind CSS 3.4.1 + Custom Components
- **Routing**: React Router DOM 6.21.0
- **Icons**: Lucide React 0.344.0
- **Tours**: React Joyride 2.9.3
- **Build Tool**: Vite 5.4.2
- **Linting**: ESLint 9.9.1

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ship-maintenance-dashboard.git
   cd ship-maintenance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 👥 Default Users

The system comes with pre-configured users for testing:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@entnt.com | admin123 | Full system access |
| **Inspector** | inspector@entnt.com | inspector123 | View and inspect operations |
| **Engineer** | engineer@entnt.com | engineer123 | Manage maintenance tasks |

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Jobs/            # Job management components
│   ├── Layout/          # Layout and navigation
│   └── Ships/           # Ship management components
├── contexts/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   ├── DataContext.tsx # Data management
│   └── ThemeContext.tsx # Theme management
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── dateUtils.ts    # Date formatting utilities
│   └── exportUtils.ts  # Data export utilities
└── styles/             # Global styles and Tailwind config
```

## 📱 Key Features Walkthrough

### Dashboard
- **Real-time KPIs**: Active ships, pending jobs, overdue maintenance
- **Priority Distribution**: Visual breakdown of job priorities
- **Upcoming Maintenance**: Calendar view of scheduled tasks
- **Quick Actions**: Fast access to common operations

### Ship Management
- **Fleet Overview**: Grid view of all ships with status indicators
- **Detailed Ship View**: Complete ship information and component tracking
- **Bulk Operations**: Select and manage multiple ships
- **Export/Import**: Data portability with CSV/JSON support

### Maintenance Jobs
- **Job Creation**: Comprehensive form for creating maintenance tasks
- **Assignment System**: Assign jobs to specific engineers
- **Progress Tracking**: Real-time status updates
- **Priority Management**: High, Medium, Low priority classification

### Calendar View
- **Visual Scheduling**: Drag-and-drop job scheduling
- **Timeline Management**: Monthly, weekly, daily views
- **Job Filtering**: Filter by ship, priority, or status

## 🎨 Theming & Customization

### Typography System
The app uses a sophisticated typography system with specialized fonts:
- **Display Names**: Poppins (Bold, modern for ship/component names)
- **Headers**: Space Grotesk (Clean, professional)
- **Numbers**: JetBrains Mono (Tabular alignment)
- **Dates**: Inter (Readable, consistent)
- **Labels**: Space Grotesk (Attention-grabbing)
- **Body Text**: Inter (Comfortable reading)

### Dark Mode
- Automatic system preference detection
- Manual toggle with persistent storage
- Comprehensive dark theme coverage
- Smooth transitions between themes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE="ENTNT Marine - Ship Maintenance Dashboard"
VITE_API_URL="http://localhost:3000" # If using a backend API
```

### Tailwind Configuration
The project uses an extended Tailwind configuration with:
- Custom color palette
- Animation keyframes
- Typography utilities
- Dark mode support

## 📈 Performance Features

- **Optimized Bundle**: Vite-powered build optimization
- **Lazy Loading**: Code splitting for better performance
- **Efficient Rendering**: React best practices implementation
- **Local Storage**: Client-side data persistence
- **Responsive Images**: Optimized asset loading

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind utility classes consistently
- Maintain responsive design principles
- Add proper error handling
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React Joyride** for guided tours
- **Vite** for lightning-fast development

## 📞 Support

For support, email support@entnt.com or create an issue in this repository.

---

<div align="center">
  <strong>Built with ❤️ for Maritime Operations</strong>
</div> 
