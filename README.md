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


