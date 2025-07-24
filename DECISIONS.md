# Technical Decisions & Implementation Notes

## Parsing & Edge Cases

### Data Parsing Logic

- **File Format**: Issues stored in pipe-delimited (`|`) text format for simplicity
- **Duplicate Handling**: First occurrence wins - subsequent duplicates with same ID are ignored
- **Missing Fields**:
  - Empty `updatedAt` fields treated as `null`
  - Missing `updatedAt` field entirely (4 parts instead of 5) handled gracefully
  - Malformed lines (wrong part count) are skipped silently
- **Date Handling**: ISO 8601 strings converted to JavaScript Date objects, with "Unknown" fallback for null values
- **ID Generation**: New issues get sequential numeric IDs, with collision detection for edge cases

### Edge Cases Handled

1. **Empty Search Results**: Friendly message with search/filter suggestions
2. **Long Titles**: Automatic text wrapping with `break-words` and `hyphens-auto`
3. **Mobile Layout**: Progressive disclosure - description/date shown in title cell on small screens
4. **Null Dates**: Always sorted to end of list regardless of sort direction
5. **Browser Compatibility**: localStorage access wrapped in try-catch with fallback

## Accessibility Techniques

### Keyboard Navigation

- **Focus Management**: Modal/panel opening traps focus appropriately
- **Focus Return**: Closing modals returns focus to previously focused element
- **Tab Order**: Logical progression through interactive elements
- **Escape Key**: Closes modals and panels

### Screen Reader Support

- **ARIA Labels**: Form fields properly labeled with `htmlFor` attributes
- **Live Regions**: Error messages announced with `role="alert"`
- **Semantic HTML**: Proper heading hierarchy, table structure
- **Status Communication**: Loading states and form validation errors announced

### Visual Accessibility

- **Color Contrast**: Dark mode ensures WCAG AA compliance
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Text Scaling**: Responsive design supports browser zoom up to 200%
- **Color Independence**: Status information not solely dependent on color (uses text labels)

### Form Validation

- **Inline Validation**: Real-time feedback as user types
- **Error Association**: `aria-describedby` links errors to form fields
- **Required Fields**: Clear visual indicators and validation messages

## Token Naming Rationale

### Design System Structure

```css
/* Surface Hierarchy */
surface: Background colors for main areas
surface-secondary: Cards, panels, elevated content
surface-dark: Dark mode equivalent backgrounds

/* Text Hierarchy */
text-primary: Main content text
text-secondary: Supporting text, metadata
text-*-dark: Dark mode equivalents

/* Semantic Colors */
status-open: Blue (#3B82F6) - actionable, needs attention
status-in-progress: Amber (#F59E0B) - warning/work in progress
status-closed: Green (#10B981) - success/completed

/* Accent Colors */
accent-primary: Primary brand color (blue)
accent-success/warning/danger: Semantic feedback colors
```

### Color Rationale

- **Consistency**: Single source of truth for colors across all components
- **Semantic Meaning**: Colors convey meaning (blue=action, green=success, amber=caution)
- **Accessibility**: High contrast ratios maintained in both light and dark modes
- **Flexibility**: Opacity modifiers (`/10`, `/50`) for subtle variations

## Architecture Decisions

### Custom Hooks Pattern

**Separation of Concerns**: Logic split into focused, reusable hooks

- `useUrlState`: URL synchronization and navigation
- `useIssuesManager`: Data management and persistence
- `useModalState`: UI state management
- `useDarkMode`: Theme management

**Benefits**:

- Testability: Each hook can be unit tested independently
- Reusability: Hooks can be reused across different components
- Maintainability: Clear boundaries between different concerns

### State Management Strategy

**Client-Side First**:

- Server provides initial data from `issues.dat`
- Client-side changes stored in localStorage
- Smart merging on app initialization
- URL state for shareable filtered views

**Persistence Layers**:

1. **Server State**: Original issues from `issues.dat`
2. **Client State**: User modifications in localStorage
3. **URL State**: Current filter/search/sort parameters

### Component Structure

**Atomic Design Principles**:

- **Atoms**: StatusBadge, SearchInput, DarkModeToggle
- **Molecules**: IssueHeader, IssueTable
- **Organisms**: IssueDetailPanel, NewIssueModal
- **Pages**: IssuesPageClient

## Performance Optimizations

### Rendering Performance

- **useMemo**: Expensive filtering/sorting operations memoized
- **useCallback**: Event handlers stabilized to prevent unnecessary re-renders
- **Component Splitting**: Detail panel and modal as separate components

### Data Management

- **Incremental Updates**: Only modified issues re-saved to localStorage
- **Smart Merging**: Server data merged with client changes only on initialization
- **Efficient Filtering**: Multiple filter criteria applied in single pass

## Shortcuts Implementation (Planned)

### Keyboard Shortcuts (Future Enhancement)

```javascript
// Planned shortcuts:
'o' - Cycle status filter (Open → All → Open)
'/' - Focus search input
'n' - New issue modal
'Escape' - Close modals/panels
'Ctrl/Cmd + S' - Save current issue
'Arrow Up/Down' - Navigate issue list
'Enter' - Open selected issue
```

**Implementation Strategy**:

- Global keyboard event listener in main component
- Context-aware shortcuts (different behavior in modals vs. list)
- Visual indicators for available shortcuts

## What We'd Improve with More Time

### 1. Enhanced Error Handling

- **Network Resilience**: Retry logic for localStorage failures
- **Validation**: Stricter input validation with custom rules
- **Error Boundaries**: React error boundaries for graceful failure handling

### 2. Performance Enhancements

- **Virtual Scrolling**: For large issue lists (1000+ items)
- **Debounced Search**: Reduce filtering frequency on fast typing
- **Code Splitting**: Lazy load modal components

### 3. Advanced Features

- **Issue Categories**: Tags/labels system
- **Batch Operations**: Multi-select and bulk status changes
- **Export/Import**: CSV/JSON data exchange
- **Issue Templates**: Pre-filled issue types

### 4. Testing & Quality

- **Unit Tests**: Comprehensive hook and component testing
- **E2E Tests**: Playwright/Cypress integration tests
- **Performance Monitoring**: Real user metrics and core web vitals
- **Accessibility Audit**: Automated a11y testing in CI/CD

### 5. User Experience

- **Drag & Drop**: Reorder issues or change status by dragging
- **Keyboard Navigation**: Full keyboard-only operation mode
- **Offline Support**: Service worker for offline functionality
- **Real-time Updates**: WebSocket connections for multi-user scenarios

### 6. Technical Improvements

- **TypeScript Strictness**: Stricter type checking and error handling
- **Component Library**: Extract to reusable design system
- **API Integration**: Backend integration with proper REST/GraphQL API
- **State Management**: Consider Zustand/Redux for complex state scenarios

## Browser Support

### Target Browsers

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Graceful Degradation**: Falls back to system theme if CSS custom properties unsupported

### Known Limitations

- **IE 11**: Not supported (uses modern JavaScript features)
- **Very Old Mobile**: Touch interactions may be limited
- **No JavaScript**: Requires JavaScript for functionality (could add SSR fallback)

## Security Considerations

### Data Protection

- **Client-Side Only**: No sensitive data transmission
- **XSS Prevention**: All user input properly sanitized through React
- **localStorage Limits**: Graceful handling of storage quota exceeded

### Input Validation

- **Title Length**: Enforced minimums/maximums
- **Content Sanitization**: HTML entities properly escaped
- **Status Validation**: Enum validation for status values
