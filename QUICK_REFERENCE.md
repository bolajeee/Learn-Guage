# Quick Reference Guide

## Project Overview

**AI STEM Tutor** - A type-safe, production-ready frontend for AI-powered learning.

**Stack:** Next.js 14 + React 18 + TypeScript + Tailwind CSS + Zustand

---

## File Structure at a Glance

```
app/
  ├─ dashboard/page.tsx     Topic input
  ├─ lesson/page.tsx        Content display
  ├─ quiz/page.tsx          Interactive quiz
  ├─ layout.tsx             Metadata, viewport
  ├─ page.tsx               Redirect to dashboard
  └─ globals.css            Global styles

components/
  ├─ Button.tsx             Primary/secondary
  ├─ Card.tsx               Container
  ├─ Input.tsx              Text input
  └─ Select.tsx             Dropdown

services/
  └─ api.ts                 API calls + mock data

store/
  └─ useAppStore.ts         Zustand state

types/
  └─ index.ts               All interfaces
```

---

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npx tsc --noEmit
```

---

## Common Tasks

### Add a New Component

1. Create file: `components/MyComponent.tsx`
2. Define props interface
3. Use existing components inside
4. Export component

```typescript
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => (
  <Card>
    <h2>{title}</h2>
    <Button onClick={onClick}>Action</Button>
  </Card>
);
```

### Update Global State

Edit `store/useAppStore.ts`:

```typescript
// 1. Add to interface
myField: string;
setMyField: (value: string) => void;

// 2. Add to store
myField: 'default',
setMyField: (value) => set({ myField: value }),

// 3. Use in component
const { myField, setMyField } = useAppStore();
```

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'brand-blue': '#1E40AF',      // Primary color
  'brand-accent': '#0EA5E9',    // Accent color
  'bg-primary': '#FAFBFC',      // Background
  'text-primary': '#1F2937',    // Text color
}
```

### Add a New API Endpoint

1. Add to types in `types/index.ts`
2. Add function in `services/api.ts`
3. Handle in service:

```typescript
export async function myFunction(request: MyRequest): Promise<ApiResponse<MyResponse>> {
  try {
    if (DEMO_MODE) {
      return { success: true, data: MOCK_DATA };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/endpoint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
```

4. Use in component:

```typescript
const response = await myFunction(request);
if (response.success && response.data) {
  // Handle success
} else {
  setError(response.error);
}
```

---

## Component Usage Examples

### Button

```typescript
// Primary button
<Button onClick={handler} isLoading={loading} fullWidth>
  Generate Lesson
</Button>

// Secondary button
<Button variant="secondary" onClick={handler}>
  Cancel
</Button>

// Disabled button
<Button disabled>
  Disabled
</Button>
```

### Input

```typescript
<Input
  label="Topic"
  type="text"
  placeholder="Enter topic..."
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  error={validationError}
  helperText="What do you want to learn?"
/>
```

### Select

```typescript
<Select
  label="Difficulty"
  value={depth}
  onChange={(e) => setDepth(e.target.value)}
  options={[
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]}
/>
```

### Card

```typescript
<Card className="mb-6">
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

---

## State Management Pattern

### Reading State
```typescript
const { currentTopic, depth, isLoading } = useAppStore();
```

### Updating State
```typescript
const { setCurrentTopic, setDepth, setIsLoading } = useAppStore();

setCurrentTopic('Photosynthesis');
setDepth('advanced');
setIsLoading(true);
```

### Using Multiple Fields
```typescript
const state = useAppStore();
console.log(state.currentLesson);
state.setCurrentLesson(lesson);
```

---

## Common Patterns

### Loading State with API Call

```typescript
const { isLoading, setIsLoading, setError } = useAppStore();

const handleAction = async () => {
  setError(null);
  setIsLoading(true);
  
  try {
    const response = await generateLesson({ topic, depth, language });
    
    if (response.success && response.data) {
      // Handle success
      setCurrentLesson(response.data);
      router.push('/lesson');
    } else {
      setError(response.error || 'Unknown error');
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error occurred');
  } finally {
    setIsLoading(false);
  }
};
```

### Form Validation

```typescript
const [error, setError] = useState('');

const handleSubmit = () => {
  setError('');
  
  if (!value.trim()) {
    setError('Field is required');
    return;
  }
  
  if (value.length < 2) {
    setError('Minimum 2 characters');
    return;
  }
  
  // Process valid input
};
```

### Conditional Rendering

```typescript
{isLoading && <p>Loading...</p>}

{error && (
  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
    {error}
  </div>
)}

{data && <Component data={data} />}
```

---

## Styling Patterns

### Flexbox Layout

```typescript
<div className="flex items-center justify-between gap-4">
  {/* Left content */}
  <div>Left</div>
  
  {/* Right content */}
  <div>Right</div>
</div>
```

### Spacing

```typescript
<div className="space-y-4">  {/* Vertical spacing */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</div>

<div className="flex gap-4">  {/* Horizontal spacing */}
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Responsive

```typescript
<div className="p-4 md:p-8 lg:p-12">
  {/* 1rem padding on mobile */}
  {/* 2rem on tablet */}
  {/* 3rem on desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile */}
  {/* 2 columns on tablet */}
  {/* 3 columns on desktop */}
</div>
```

### Text Styles

```typescript
<h1 className="text-4xl font-bold text-brand-blue">
  Heading
</h1>

<p className="text-lg text-text-secondary leading-relaxed">
  Body text
</p>

<span className="text-sm text-text-secondary">
  Helper text
</span>
```

---

## Environment Variables

### Default (.env.local)

```env
# Demo mode - uses mock data
NEXT_PUBLIC_DEMO_MODE=true

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### For Real Backend

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### For Production

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Type Definitions

### Creating a New Type

```typescript
// In types/index.ts

export interface MyData {
  id: string;
  title: string;
  description: string;
  timestamp: number;
}

export interface MyRequest {
  query: string;
  filters: Record<string, string>;
}

export interface MyResponse {
  success: boolean;
  results: MyData[];
}
```

### Using Types in Components

```typescript
interface PageProps {
  data: MyData;
  onAction: (id: string) => Promise<void>;
}

export const MyPage: React.FC<PageProps> = ({ data, onAction }) => {
  // TypeScript ensures correct prop types
  return <div>{data.title}</div>;
};
```

---

## Testing the App

### Demo Mode (Default)

```bash
npm run dev
# Visit http://localhost:3000
# Everything works with mock data
```

### Real API

1. Ensure backend is running on `http://localhost:3001`
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_DEMO_MODE=false
   ```
3. Run `npm run dev`
4. App now calls your real API

---

## Debugging Tips

### Check State
```typescript
// In any component
const state = useAppStore.getState();
console.log('Current state:', state);
```

### Monitor API Calls
```typescript
// Browser DevTools → Network tab
// See all API requests and responses
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Or let IDE show them (VSCode, WebStorm, etc.)
```

### Hot Reload Issues
```bash
# If changes not reflecting:
# 1. Save file again
# 2. Check browser console for errors
# 3. Clear .next folder
# 4. Restart dev server
```

---

## Performance Checklist

- ✅ Images optimized (using next/image if needed)
- ✅ No unnecessary re-renders (Zustand prevents)
- ✅ Lazy loading ready (built into Next.js)
- ✅ CSS optimized with Tailwind
- ✅ No external fonts loading
- ✅ API calls separated from render
- ✅ State updates batched

---

## Deployment

### To Vercel (Recommended)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect repo to Vercel
# Dashboard → Add New Project → Select repo

# 3. Set environment variables (if needed)
# Project Settings → Environment Variables
# Add NEXT_PUBLIC_API_URL if using real backend

# 4. Deploy
# Automatic on every push to main
```

### To Other Platforms

```bash
# Build
npm run build

# Output in .next/
# Deploy .next/ and public/ folders

# Or use Docker (if available on platform)
```

---

## Troubleshooting

### "Cannot find module" error
- Run `npm install`
- Restart dev server
- Check import paths use absolute paths (@/...)

### Type errors in IDE
- Run `npm install`
- Restart IDE/VSCode
- Check TypeScript version matches tsconfig

### Styles not applying
- Check class names in Tailwind config
- Verify Tailwind is processing files (globals.css imported)
- Check for inline styles overriding

### API calls failing
- Check `.env.local` configuration
- Verify backend URL is correct
- Check browser DevTools → Network tab
- Ensure demo mode is not enabled

### State not updating
- Use `useAppStore()` not `useAppStore.getState()` in components
- Check action is calling setter function
- Verify no typos in field names

---

## Code Style

### DO ✅

```typescript
// Named functions
export const MyComponent: React.FC<Props> = ({ prop }) => {}

// Explicit types
const value: string = 'hello'

// Props interface
interface MyProps {
  id: string;
  onAction: () => void;
}

// Try/catch on async
try {
  const result = await api.call()
} catch (error) {
  setError(error)
}
```

### DON'T ❌

```typescript
// Implicit any
const data: any = {}

// No types
const handleClick = (event) => {}

// No error handling
const result = await api.call()

// Commented code
// const oldCode = 'remove this'

// Hardcoded values
const baseUrl = 'http://localhost:3001'
```

---

## Learning Path

1. **Read** `README.md` - Overview and structure
2. **Explore** `types/index.ts` - Understand data model
3. **Study** `store/useAppStore.ts` - Learn state management
4. **Review** `services/api.ts` - See API pattern
5. **Check** `components/*.tsx` - Study reusable components
6. **Examine** `app/dashboard/page.tsx` - See page integration
7. **Deploy** - Push to Vercel

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://typescriptlang.org
- **Tailwind Docs:** https://tailwindcss.com
- **Zustand Docs:** https://github.com/pmndrs/zustand

---

## Getting Help

1. Check `README.md` and `IMPLEMENTATION_SUMMARY.md`
2. Review similar files in codebase
3. Check TypeScript error messages (very helpful)
4. Look at component examples
5. Read comments in code
6. Check `.env.local` configuration

---

**Last Updated:** 2026-03-22  
**Version:** 1.0  
**Status:** Production Ready ✅
