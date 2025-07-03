<<<<<<< HEAD
# 🚢 ENTNT Ship Management System

A comprehensive, modern web-based ship management dashboard built for maritime operations. This system provides real-time monitoring, maintenance scheduling, and operational oversight for ship fleets with an intuitive, responsive interface.

![Ship Management Dashboard](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🏗️ System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    React Application (SPA)                  │
├─────────────────────────────────────────────────────────────┤
│  📱 Presentation Layer                                      │
│  ├── Pages (Dashboard, Ships, Jobs, Calendar, Reports)     │
│  ├── Components (Modular, Reusable UI Components)          │
│  └── Layout (Header, Sidebar, Navigation)                  │
├─────────────────────────────────────────────────────────────┤
│  🧠 State Management Layer                                  │
│  ├── AuthContext (User Authentication & Authorization)     │
│  ├── DataContext (Ships, Jobs, Components Management)      │
│  └── ThemeContext (UI Theme Management)                    │
├─────────────────────────────────────────────────────────────┤
│  🔧 Service Layer                                           │
│  ├── Utils (Date, Export, Validation)                      │
│  ├── Types (TypeScript Interfaces)                         │
│  └── Routing (React Router DOM)                            │
├─────────────────────────────────────────────────────────────┤
│  💾 Data Persistence Layer                                  │
│  ├── LocalStorage (App State Persistence)                  │
│  ├── SessionStorage (User Session)                         │
│  └── Mock Data (Development Environment)                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture
The application follows a **hierarchical component structure** with clear separation of concerns:

- **Smart Components**: Pages and Context Providers (handle business logic)
- **Dumb Components**: UI Components (pure presentation)
- **Higher-Order Components**: Layout and Route Protection
- **Custom Hooks**: Context consumption and shared logic

## ✨ Core Features

### 🚢 **Ship Fleet Management**
- **CRUD Operations**: Create, Read, Update, Delete ships
- **Ship Details**: IMO numbers, flags, types, build years
- **Status Tracking**: Active, Under Maintenance, Docked, Inactive
- **Inspection History**: Last inspection dates and records

### 🔧 **Component Management**
- **Component Lifecycle**: Installation, maintenance, replacement tracking
- **Status Monitoring**: Good, Warning, Critical status indicators
- **Serial Number Tracking**: Unique component identification
- **Maintenance Scheduling**: Automated next maintenance date calculation

### 📋 **Maintenance Job System**
- **Job Types**: Inspection, Repair, Replacement, Preventive maintenance
- **Priority Levels**: Low, Medium, High, Critical with visual indicators
- **Status Workflow**: Open → In Progress → Completed/Cancelled
- **Assignment Management**: Engineer assignment and workload tracking
- **Time Tracking**: Estimated vs. actual hours monitoring

### 📊 **Analytics Dashboard**
- **Real-time KPIs**: Fleet status, maintenance metrics, job completion rates
- **Visual Charts**: Priority distribution, component health overview
- **Recent Activities**: Latest job updates and system changes
- **Trend Analysis**: Performance metrics with percentage changes

### 📅 **Calendar & Scheduling**
- **Maintenance Calendar**: Visual job scheduling interface
- **Deadline Tracking**: Overdue maintenance alerts
- **Resource Planning**: Engineer availability and workload
- **Upcoming Maintenance**: Proactive maintenance scheduling

### 👥 **User Management & Security**
- **Role-Based Access Control**: Admin, Inspector, Engineer roles
- **Secure Authentication**: Session-based login system
- **User Profiles**: Individual user management
- **Permission Levels**: Feature access based on user roles

### 📈 **Reports & Analytics**
- **Operational Reports**: Fleet performance and maintenance statistics
- **Export Capabilities**: JSON and CSV data export
- **Custom Filtering**: Date ranges, ship types, priority levels
- **Data Visualization**: Charts and graphs for insights

## 🎯 Bonus Features

### 🎯 **Interactive Guided Tour**
- **React Joyride Integration**: Step-by-step application walkthrough
- **User Onboarding**: First-time user guidance
- **Feature Discovery**: Highlight key functionalities
- **Skip Prevention**: Remember user preferences

### 🌙 **Dark/Light Theme System**
- **System Preference Detection**: Automatic theme based on OS settings
- **Manual Toggle**: User-controlled theme switching
- **Persistent Settings**: Theme preference storage
- **Smooth Transitions**: Animated theme changes

### 📱 **Responsive Design**
- **Mobile-First Approach**: Optimized for all device sizes
- **Adaptive Layout**: Dynamic grid systems
- **Touch-Friendly**: Mobile gesture support
- **Progressive Enhancement**: Feature scaling based on device capabilities

### 🔔 **Real-time Notification System**
- **Event-Driven Alerts**: Job creation, updates, completions
- **Maintenance Reminders**: Overdue component alerts
- **Visual Indicators**: Unread notification counts
- **Dismissal Management**: Mark as read/dismiss functionality

### 💫 **Modern UI/UX**
- **Glassmorphism Effects**: Modern visual aesthetics
- **Smooth Animations**: Hover effects and transitions
- **Micro-interactions**: Enhanced user engagement
- **Consistent Design System**: Unified visual language

### 💾 **Data Export & Import**
- **Multiple Formats**: JSON and CSV export options
- **Bulk Operations**: Mass data management
- **Data Persistence**: Local storage backup
- **Cross-tab Synchronization**: Real-time state sync

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1**: Modern component-based architecture
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.2**: Fast build tool and development server

### **Styling & UI**
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.344.0**: Beautiful, customizable icons
- **Custom CSS**: Enhanced animations and effects

### **State Management**
- **React Context API**: Global state management
- **React Hooks**: Local state and side effects
- **Local Storage**: Client-side data persistence

### **Routing & Navigation**
- **React Router DOM 6.21.0**: Single-page application routing
- **Protected Routes**: Authentication-based navigation
- **Dynamic Routing**: Parameter-based page rendering

### **Development Tools**
- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Cross-browser CSS compatibility

### **Special Libraries**
- **React Joyride 2.9.3**: Interactive guided tours
- **Date Utilities**: Custom date manipulation functions

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ship-management-system.git
   cd ship-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 👤 Demo Credentials

The system comes with pre-configured demo users:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@entnt.in | admin123 | Full system access |
| **Inspector** | inspector@entnt.in | inspect123 | Read/Write access |
| **Engineer** | engineer@entnt.in | engine123 | Limited access |

## 📁 Project Structure

```
src/
├── 📱 components/          # Reusable UI components
│   ├── Auth/              # Authentication components
│   ├── Jobs/              # Job management components
│   ├── Layout/            # Layout and navigation
│   └── Ships/             # Ship management components
├── 🧠 contexts/           # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   ├── DataContext.tsx   # Application data
│   └── ThemeContext.tsx  # Theme management
├── 📄 pages/              # Main application pages
│   ├── Dashboard.tsx     # Analytics dashboard
│   ├── Ships.tsx         # Ship management
│   ├── Jobs.tsx          # Job management
│   ├── Calendar.tsx      # Scheduling interface
│   ├── Reports.tsx       # Reports and analytics
│   └── Users.tsx         # User management
├── 🔧 utils/             # Utility functions
│   ├── dateUtils.ts      # Date manipulation
│   └── exportUtils.ts    # Data export functions
└── 📝 types/             # TypeScript type definitions
    └── index.ts          # Application interfaces
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue (`#2563eb`) - Navigation and primary actions
- **Success**: Green (`#10b981`) - Completed states
- **Warning**: Yellow (`#f59e0b`) - Attention needed
- **Danger**: Red (`#ef4444`) - Critical states
- **Neutral**: Gray (`#6b7280`) - Text and backgrounds

### **Typography**
- **Headers**: Custom font families for hierarchy
- **Body**: System fonts for readability
- **Numeric**: Monospace for data display
- **Actions**: Medium weight for buttons

### **Spacing System**
- **Base Unit**: 4px (0.25rem)
- **Component Spacing**: 8px, 16px, 24px, 32px
- **Layout Spacing**: 48px, 64px, 96px

## 🔒 Security Features

- **Input Validation**: Client-side data validation
- **XSS Protection**: Sanitized user inputs
- **Session Management**: Secure session handling
- **Role-Based Access**: Feature access control
- **Data Persistence**: Local storage encryption ready

## 🧪 Testing Strategy

### **Code Quality**
- ESLint configuration for code consistency
- TypeScript for compile-time error catching
- Component isolation for easier testing

### **Browser Compatibility**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Progressive enhancement approach

## 📈 Performance Optimizations

- **Code Splitting**: Route-based lazy loading ready
- **Bundle Optimization**: Vite's optimized builds
- **Image Optimization**: Responsive image handling
- **Caching Strategy**: Local storage for offline capability
- **Virtual Scrolling**: Ready for large datasets

## 🚀 Deployment

### **Build Process**
```bash
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Code quality check
```

### **Deployment Options**
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN Integration**: CloudFront, CloudFlare
- **Docker**: Containerized deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About ENTNT

This Ship Management System is developed as part of ENTNT's commitment to providing cutting-edge maritime technology solutions. The system demonstrates modern web development practices and enterprise-grade functionality.

---

**Built with ❤️ by ENTNT Development Team**

For questions or support, please contact: support@entnt.in
=======
# ENTNT Ship Management System
# 🚢 ENTNT Marine - Ship Maintenance Dashboard
>>>>>>> 35cb120997f592ea8ad3957db68d0ed9438546d2

A modern, comprehensive ship maintenance management system built with React, TypeScript, and Tailwind CSS. This dashboard provides real-time insights into maritime operations, helping manage ships, components, maintenance jobs, and crew efficiently.


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
