# VedaAI – AI Assessment Creator

Build an AI-powered Assessment Creator that allows teachers to create assignments, generate question papers using AI, and view formatted outputs.

## Architecture Overview

This is a **monolithic Next.js application** with:

- **Frontend**: React components with Zustand state management
- **Backend**: Next.js API routes with Node.js
- **Database**: MongoDB for persistent storage
- **AI Integration**: Prompt-based question generation

## Features

✅ **Assignment Creation Form** - Teachers can create assignments with:

- Title, description, due date
- Question type selection (Multiple Choice, Short Answer, Essay)
- Number of questions and marks configuration
- File upload support (optional)
- Additional instructions

✅ **AI Question Generation**

- Structured prompt generation
- Automatic section organization (Section A, B, C, etc.)
- Difficulty classification (Easy, Medium, Hard)
- Marks assignment per question

✅ **Question Paper Output**

- Professional exam paper layout
- Student information section
- Organized sections with instructions
- Answer spaces for different question types
- Difficulty badges and marks display

✅ **PDF Export** - Download generated question papers as PDFs

✅ **Responsive Design** - Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **HTTP Client**: Axios
- **PDF Export**: html2canvas, jsPDF
- **Validation**: Built-in form validation

## Project Structure

```
veda/
├── app/
│   ├── api/
│   │   ├── assignments/
│   │   │   ├── route.ts           # Create/Get assignments
│   │   │   ├── [id]/route.ts      # Get single assignment
│   │   │   └── [id]/generate/route.ts  # Generate questions
│   │   └── uploads/               # Handle file uploads
│   ├── components/
│   │   ├── AssignmentForm.tsx      # Assignment creation form
│   │   └── QuestionDisplay.tsx     # Question paper display
│   ├── lib/
│   │   ├── mongodb.ts             # MongoDB connection
│   │   └── ai.ts                  # AI prompt generation
│   ├── models/
│   │   └── assignment.ts          # MongoDB schema
│   ├── store/
│   │   └── assignmentStore.ts     # Zustand store
│   ├── generate/
│   │   └── [id]/page.tsx          # Generation page
│   ├── page.tsx                   # Home page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── public/                         # Static assets
├── .env.local                      # Environment variables
├── package.json
└── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm/yarn

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables** (`.env.local`):

```env
MONGODB_URI=mongodb://localhost:27017/vedaai
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
OPENAI_API_KEY=your_api_key_here
```

3. **Start MongoDB locally (if using local MongoDB):**

```bash
mongod
```

Or use MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/vedaai
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

## API Endpoints

### Create Assignment

```
POST /api/assignments
Content-Type: application/json

{
  "title": "Physics Quiz",
  "description": "Quarterly physics examination",
  "dueDate": "2024-12-25T18:00:00Z",
  "questionTypes": ["multiple-choice", "short-answer"],
  "numberOfQuestions": 10,
  "marksPerQuestion": 5,
  "additionalInstructions": "Answer all questions",
  "fileName": "reference.pdf"
}

Response:
{
  "success": true,
  "assignmentId": "507f1f77bcf86cd799439011",
  "assignment": { ... }
}
```

### Get All Assignments

```
GET /api/assignments

Response:
{
  "success": true,
  "assignments": [ ... ]
}
```

### Get Single Assignment

```
GET /api/assignments/[id]

Response:
{
  "success": true,
  "assignment": { ... }
}
```

### Generate Questions

```
POST /api/assignments/[id]/generate

Response:
{
  "success": true,
  "assignment": {
    "generatedContent": {
      "sections": [ ... ],
      "totalMarks": 50,
      "totalQuestions": 10
    }
  }
}
```

## Usage Flow

1. **Create Assignment** → Fill form → Submit
2. **Auto-redirect** → Generation page loads
3. **Generate Questions** → AI creates structured questions
4. **View Paper** → Professional exam layout with all details
5. **Student Info** → Fill name, roll number, section
6. **Download PDF** → Export as PDF or Regenerate

## Key Components

### AssignmentForm.tsx

- Form state management with Zustand
- Validation for all required fields
- File upload handling
- Error/success notifications
- Auto-redirect on successful creation

### QuestionDisplay.tsx

- Professional exam paper rendering
- Student information section
- Section-wise question organization
- Difficulty level badges (Easy/Medium/Hard)
- Answer spaces for different question types
- PDF export with html2canvas + jsPDF
- Regenerate functionality

### assignmentStore.ts (Zustand)

```typescript
// Form state
form: AssignmentForm;

// Generated content
generatedAssignment: GeneratedAssignment | null;

// UI states
loading: boolean;
error: string | null;
success: string | null;

// Actions
updateForm();
resetForm();
setGeneratedAssignment();
setLoading();
setError();
setSuccess();
```

## Styling & Design

- **Tailwind CSS** for responsive, modern UI
- **Blue/Indigo** color scheme for professional look
- **Gradient backgrounds** for visual appeal
- **Grid layouts** for organized content
- **Flexbox** for flexible component arrangements
- **Mobile-first** responsive design
- **Professional exam paper** layout inspired by actual papers

## Mock AI Generation

Currently uses mock data generator that creates questions based on parameters:

```typescript
// Mock questions are categorized by type
- Multiple Choice: 8 sample questions
- Short Answer: 8 sample questions
- Essay: 5 sample questions

// Difficulty randomly assigned (easy/medium/hard)
// Questions organized into sections (A, B, C, ...)
// Each section contains related question types
```

To integrate real LLM:

1. Replace `generateMockQuestions()` in `/app/lib/ai.ts`
2. Add OpenAI/Claude API call
3. Parse structured response
4. Handle streaming if needed

## Validation & Error Handling

- Empty field validation
- Negative number prevention
- Date validation
- File type checking
- API error handling
- User-friendly error messages

## Performance Optimizations

- Next.js App Router for optimized routing
- Component memoization
- Lazy loading with dynamic imports
- MongoDB indexing ready
- CSS minification via Tailwind
- Image optimization via Next.js

## Building for Production

```bash
# Build the application
npm run build

# Test production build locally
npm run start
```

## Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD npm run start
```

### AWS EC2

```bash
# SSH into instance
# Install Node.js & MongoDB
# Clone repository
# Set environment variables
# npm install && npm run build && npm run start
```

## Testing

Add to `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## Troubleshooting

### MongoDB Connection Error

- Verify MongoDB is running: `mongod`
- Check MONGODB_URI in .env.local
- Ensure MongoDB service is accessible

### PDF Download Issues

- Clear browser cache
- Check browser console for errors
- Verify html2canvas is installed

### Form Validation Fails

- Check all required fields are filled
- Ensure numberOfQuestions > 0
- Verify marksPerQuestion > 0

## Future Enhancements

- Real LLM integration (OpenAI GPT-4, Claude)
- WebSocket for real-time updates
- Redis caching layer
- BullMQ background job processing
- Advanced analytics dashboard
- Question bank/library
- Student submission portal
- Automated grading system
- Email notifications
- Role-based access control
- Multi-language support

## License

MIT

## Support

For issues or questions, create a GitHub issue or refer to the documentation.
