# Issue Tracker

A modern, responsive issue tracking application built with Next.js App Router and Tailwind CSS. Features real-time search, filtering, dark mode, and persistent client-side storage.

## ✨ Features

### Core Functionality

- 📋 **Issue Management**: Create, edit, and track issues with titles, descriptions, and status
- 🔍 **Real-time Search**: Instant filtering by issue title (case-insensitive)
- 🏷️ **Status Filtering**: Filter by Open, In Progress, Closed, or All issues
- 📅 **Smart Sorting**: Sort by update date (newest/oldest) with null values handled properly
- 🔗 **URL State**: Shareable URLs with search, filter, and sort parameters
- 💾 **Persistent Storage**: Client-side changes saved to localStorage

### User Experience

- 🌙 **Dark Mode**: Toggle between light, dark, and system preference themes
- 📱 **Responsive Design**: Mobile-first approach with progressive enhancement
- ♿ **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- 🎨 **Modern UI**: Clean design with semantic color tokens and smooth animations

### Technical Features

- 🚀 **Next.js App Router**: Server-side rendering with client-side hydration
- 🎯 **TypeScript**: Full type safety and developer experience
- 🧩 **Custom Hooks**: Modular, reusable logic separation
- 📦 **Shadcn/UI**: High-quality, accessible component library
- 🎭 **Tailwind CSS**: Utility-first styling with semantic design tokens

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or download the project
cd issue-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
issue-tracker/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main issues page (server component)
│   ├── components/          # React components
│   │   ├── ui/              # Shadcn/UI base components
│   │   ├── issue-header.tsx # Header with search/filter/sort controls
│   │   ├── issue-table.tsx  # Responsive issues table
│   │   ├── issue-detail-panel.tsx # Slide-over edit panel
│   │   ├── new-issue-modal.tsx    # Create issue modal
│   │   ├── status-badge.tsx       # Status indicator component
│   │   ├── search-input.tsx       # Search with icon
│   │   ├── status-filter.tsx      # Status dropdown
│   │   ├── sort-toggle.tsx        # Sort direction toggle
│   │   ├── dark-mode-toggle.tsx   # Theme switcher
│   │   └── issues-page-client.tsx # Main client component
│   ├── hooks/               # Custom React hooks
│   │   ├── use-url-state.ts       # URL synchronization
│   │   ├── use-issues-manager.ts  # Data management
│   │   ├── use-modal-state.ts     # Modal state
│   │   ├── use-dark-mode.ts       # Theme management
│   │   └── index.ts               # Hook exports
│   └── lib/
│       └── issues.ts        # Data parsing and utilities
├── issues.dat              # Sample issue data
├── tailwind.config.ts      # Tailwind configuration with design tokens
├── DECISIONS.md            # Technical decisions and rationale
└── README.md              # This file
```

## 🎯 Usage

### Basic Operations

1. **View Issues**: All issues are displayed in a responsive table
2. **Search Issues**: Type in the search box to filter by title
3. **Filter by Status**: Use the status dropdown to filter by Open/In Progress/Closed
4. **Sort Issues**: Click the sort toggle to switch between newest/oldest
5. **Create Issue**: Click "New Issue" button, fill form, and submit
6. **Edit Issue**: Click any issue row to open the detail panel

### Advanced Features

#### URL State Management

The app maintains all filter state in the URL for easy sharing:

- `?q=search+term` - Search query
- `?status=open` - Status filter
- `?sort=asc` - Sort direction
- Combined: `?q=login&status=open&sort=desc`

#### Dark Mode

- **Manual Toggle**: Click the sun/moon icon in the header
- **System Preference**: Automatically follows your OS setting
- **Persistent**: Remembers your choice across sessions

#### Data Persistence

- **Server Data**: Initial issues loaded from `issues.dat`
- **Client Changes**: Edits and new issues saved to localStorage
- **Smart Merging**: Client changes overlay server data on app load

## 🎨 Design System

### Color Palette

```css
/* Light Mode */
--surface: #F1F5F9        /* Page background */
--surface-secondary: #FFFFFF   /* Cards, panels */
--text-primary: #0F172A       /* Main text */
--text-secondary: #334155     /* Supporting text */

/* Dark Mode */
--surface-dark: #1E293B       /* Page background */
--surface-dark-secondary: #334155 /* Cards, panels */
--text-primary-dark: #F1F5F9  /* Main text */
--text-secondary-dark: #CBD5E1 /* Supporting text */

/* Status Colors */
--status-open: #3B82F6        /* Blue - needs attention */
--status-in-progress: #F59E0B /* Amber - work in progress */
--status-closed: #10B981      /* Green - completed */
```

### Responsive Breakpoints

- **Mobile**: < 640px (single column, stacked controls)
- **Tablet**: 640px - 768px (two columns, some controls hidden)
- **Desktop**: 768px+ (full table, all features visible)

## 🧪 Development

### Code Organization

The project uses a modular architecture with separation of concerns:

- **Hooks**: Business logic extracted into custom hooks
- **Components**: Focused, single-responsibility components
- **Type Safety**: Full TypeScript coverage with strict types
- **Error Boundaries**: Graceful error handling throughout

### Adding New Features

1. **New Hook**: Create in `src/hooks/` and export from `index.ts`
2. **New Component**: Create in `src/components/` with TypeScript interface
3. **Styling**: Use semantic tokens from `tailwind.config.ts`
4. **State**: Use appropriate hook (URL state, modal state, etc.)

### Performance Considerations

- **Memoization**: Expensive operations wrapped in `useMemo`
- **Callbacks**: Event handlers stabilized with `useCallback`
- **Code Splitting**: Large components loaded separately
- **Efficient Updates**: Only changed data re-saved to localStorage

## 🔧 Configuration

### Tailwind Config

Custom design tokens defined in `tailwind.config.ts`:

- Semantic color names
- Consistent spacing scale
- Animation presets
- Dark mode class strategy

### Next.js Config

- App Router enabled
- TypeScript strict mode
- Optimized builds
- Development hot reload

## 🐛 Troubleshooting

### Common Issues

**Dark mode not working?**

- Check if JavaScript is enabled
- Clear localStorage: `localStorage.clear()`
- Try hard refresh (Ctrl+Shift+R)

**Search/filter not updating URL?**

- Ensure JavaScript is enabled
- Check browser console for errors
- Try in incognito mode

**Issues not persisting?**

- Check localStorage quota
- Verify browser supports localStorage
- Check browser console for storage errors

### Browser Support

- ✅ Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- ✅ Mobile: iOS Safari 14+, Chrome Mobile 90+
- ❌ Internet Explorer (not supported)

## 📄 License

This project is provided as-is for demonstration purposes.

## 🤝 Contributing

This is a demonstration project, but suggestions and improvements are welcome:

1. Focus on accessibility improvements
2. Performance optimizations
3. Additional keyboard shortcuts
4. Enhanced mobile experience
5. Better error handling

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/UI](https://ui.shadcn.com)
- [React Hook Patterns](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
