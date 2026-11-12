export type Skill = { id: string; name: string; category: string; proficiency: number; level: 'Foundational' | 'Developing' | 'Proficient' | 'Advanced'; trend: number; color: string }
export type Career = { id: string; title: string; family: string; match: number; salary: string; demand: string; description: string; skills: { name: string; required: number; current: number }[] }
export type Lesson = { id: string; title: string; duration: string; complete: boolean; type: 'video' | 'reading' | 'exercise' }
export type Course = { id: string; title: string; category: string; level: string; duration: string; lessons: number; progress: number; rating: number; color: string; description: string; skills: string[]; modules: { title: string; lessons: Lesson[] }[] }
export type Assessment = { id: string; title: string; skill: string; questions: number; duration: string; score?: number; status: 'Ready' | 'In progress' | 'Passed' | 'Needs practice'; date: string }
export type Project = { id: string; title: string; category: string; level: string; duration: string; skills: string[]; description: string; status: 'Available' | 'In review' | 'Approved'; score?: number }
export type Certificate = { id: string; title: string; issuer: string; date: string; code: string; skills: string[] }
export type AppNotification = { id: string; title: string; description: string; date: string; group: string; unread: boolean; kind: 'course' | 'certificate' | 'mentor' | 'streak' }

export const learner = { name: 'Jordan Lee', role: 'Aspiring product designer', email: 'jordan.lee@email.com', joined: 'March 2025', streak: 12, hours: 42 }
export const learnerStats = [
  { label: 'Courses completed', value: '8', change: '+2 this month' },
  { label: 'Average score', value: '92%', change: '+4% from last month' },
  { label: 'Projects shipped', value: '5', change: '2 awaiting review' },
  { label: 'Certificates', value: '3', change: 'One earned this week' },
]
export const weeklyLearning = [
  { day: 'Mon', hours: 1.2, target: 1.5 }, { day: 'Tue', hours: 2.4, target: 1.5 }, { day: 'Wed', hours: 1.8, target: 1.5 },
  { day: 'Thu', hours: 2.9, target: 1.5 }, { day: 'Fri', hours: 1.1, target: 1.5 }, { day: 'Sat', hours: 2.2, target: 1.5 }, { day: 'Sun', hours: 0.7, target: 1.5 },
]
export const activity = [
  { id: 'act-1', title: 'Passed the Design Systems assessment', detail: 'Interaction design · 94%', time: 'Today, 10:42 AM', kind: 'assessment' },
  { id: 'act-2', title: 'Completed a course module', detail: 'Designing for accessibility · Module 3', time: 'Yesterday', kind: 'course' },
  { id: 'act-3', title: 'AI mentor added a roadmap milestone', detail: 'Build a portfolio case study', time: 'Oct 10', kind: 'mentor' },
  { id: 'act-4', title: 'Certificate earned', detail: 'UX Foundations', time: 'Oct 8', kind: 'certificate' },
]
export const skills: Skill[] = [
  { id: 's1', name: 'User research', category: 'Design', proficiency: 78, level: 'Proficient', trend: 8, color: 'violet' },
  { id: 's2', name: 'Figma', category: 'Design', proficiency: 86, level: 'Advanced', trend: 12, color: 'coral' },
  { id: 's3', name: 'Interaction design', category: 'Design', proficiency: 68, level: 'Proficient', trend: 5, color: 'blue' },
  { id: 's4', name: 'Accessibility', category: 'Engineering', proficiency: 59, level: 'Developing', trend: 14, color: 'green' },
  { id: 's5', name: 'Design systems', category: 'Design', proficiency: 72, level: 'Proficient', trend: 9, color: 'amber' },
  { id: 's6', name: 'Prototyping', category: 'Design', proficiency: 81, level: 'Advanced', trend: 6, color: 'rose' },
]
export const skillCatalog = ['Product strategy', 'Visual design', 'HTML & CSS', 'Usability testing', 'Information architecture', 'Design systems', 'Motion design', 'Prototyping', 'Accessibility', 'Data storytelling', 'Communication', 'Agile collaboration']
export const careers: Career[] = [
  { id: 'product-designer', title: 'Product designer', family: 'Design', match: 86, salary: '$98k–$142k', demand: 'Very high demand', description: 'Shape useful, accessible digital products from discovery through delivery. Blend research, systems thinking, and craft to make complex experiences feel simple.', skills: [{ name: 'User research', required: 72, current: 78 }, { name: 'Interaction design', required: 82, current: 68 }, { name: 'Design systems', required: 75, current: 72 }, { name: 'Accessibility', required: 68, current: 59 }, { name: 'Prototyping', required: 70, current: 81 }, { name: 'Product strategy', required: 64, current: 48 }] },
  { id: 'ux-researcher', title: 'UX researcher', family: 'Research', match: 74, salary: '$88k–$128k', demand: 'High demand', description: 'Turn the questions people ask into evidence teams can act on. Plan studies, synthesize patterns, and help teams make better product decisions.', skills: [{ name: 'User research', required: 85, current: 78 }, { name: 'Communication', required: 80, current: 65 }, { name: 'Data storytelling', required: 70, current: 43 }, { name: 'Usability testing', required: 77, current: 51 }] },
  { id: 'design-systems', title: 'Design systems designer', family: 'Design', match: 69, salary: '$105k–$155k', demand: 'Growing fast', description: 'Create the shared foundations that help product teams build consistent, inclusive experiences at scale.', skills: [{ name: 'Design systems', required: 88, current: 72 }, { name: 'Accessibility', required: 79, current: 59 }, { name: 'Figma', required: 84, current: 86 }, { name: 'HTML & CSS', required: 60, current: 38 }] },
  { id: 'frontend-engineer', title: 'Frontend engineer', family: 'Engineering', match: 57, salary: '$112k–$168k', demand: 'Very high demand', description: 'Build the interactive, polished front end of digital products and turn thoughtful design into accessible, reliable interfaces.', skills: [{ name: 'HTML & CSS', required: 86, current: 38 }, { name: 'JavaScript', required: 82, current: 42 }, { name: 'Accessibility', required: 68, current: 59 }, { name: 'Design systems', required: 58, current: 72 }] },
]
export const courses: Course[] = [
  { id: 'design-systems', title: 'Designing thoughtful design systems', category: 'Product design', level: 'Intermediate', duration: '6h 20m', lessons: 18, progress: 68, rating: 4.9, color: 'indigo', description: 'Build flexible, accessible systems that help product teams design and ship with confidence.', skills: ['Design systems', 'Figma', 'Accessibility'], modules: [{ title: 'The foundations', lessons: [{ id: 'l1', title: 'What makes a system work', duration: '12 min', complete: true, type: 'video' }, { id: 'l2', title: 'Tokens and design decisions', duration: '18 min', complete: true, type: 'reading' }, { id: 'l3', title: 'Map a product language', duration: '25 min', complete: true, type: 'exercise' }] }, { title: 'Components with purpose', lessons: [{ id: 'l4', title: 'Build a reusable component', duration: '22 min', complete: false, type: 'video' }, { id: 'l5', title: 'States, variants, and behavior', duration: '16 min', complete: false, type: 'reading' }, { id: 'l6', title: 'Component audit challenge', duration: '35 min', complete: false, type: 'exercise' }] }, { title: 'Ship and scale', lessons: [{ id: 'l7', title: 'Documentation that gets used', duration: '19 min', complete: false, type: 'video' }, { id: 'l8', title: 'Measure system health', duration: '21 min', complete: false, type: 'reading' }] }] },
  { id: 'ux-foundations', title: 'UX foundations: from insight to impact', category: 'UX research', level: 'Beginner', duration: '4h 10m', lessons: 14, progress: 100, rating: 4.8, color: 'coral', description: 'Learn to frame problems, understand people, and turn research into meaningful product decisions.', skills: ['User research', 'Information architecture'], modules: [{ title: 'Understand the problem', lessons: [{ id: 'u1', title: 'Ask better questions', duration: '14 min', complete: true, type: 'video' }, { id: 'u2', title: 'Interview with empathy', duration: '21 min', complete: true, type: 'reading' }] }] },
  { id: 'accessible-products', title: 'Designing for every ability', category: 'Accessibility', level: 'Intermediate', duration: '3h 45m', lessons: 12, progress: 34, rating: 4.9, color: 'green', description: 'Create more inclusive experiences by bringing accessibility into everyday product decisions.', skills: ['Accessibility', 'Interaction design'], modules: [{ title: 'Access by design', lessons: [{ id: 'a1', title: 'Principles of inclusive design', duration: '16 min', complete: true, type: 'video' }, { id: 'a2', title: 'Audit a real experience', duration: '32 min', complete: false, type: 'exercise' }] }] },
  { id: 'product-thinking', title: 'Product thinking for designers', category: 'Product strategy', level: 'Advanced', duration: '5h 30m', lessons: 16, progress: 0, rating: 4.7, color: 'amber', description: 'Connect customer value, business outcomes, and design decisions into a product point of view.', skills: ['Product strategy', 'Communication'], modules: [{ title: 'Think in outcomes', lessons: [{ id: 'p1', title: 'From outputs to outcomes', duration: '17 min', complete: false, type: 'video' }, { id: 'p2', title: 'Prioritize with evidence', duration: '24 min', complete: false, type: 'reading' }] }] },
]
export const assessments: Assessment[] = [
  { id: 'a11', title: 'Design systems fundamentals', skill: 'Design systems', questions: 24, duration: '35 min', score: 94, status: 'Passed', date: 'Oct 12, 2025' },
  { id: 'a12', title: 'Interaction design principles', skill: 'Interaction design', questions: 18, duration: '25 min', score: 88, status: 'Passed', date: 'Oct 8, 2025' },
  { id: 'a13', title: 'Accessibility in practice', skill: 'Accessibility', questions: 20, duration: '30 min', status: 'In progress', date: 'Started Oct 10' },
  { id: 'a14', title: 'Product discovery essentials', skill: 'Product strategy', questions: 15, duration: '20 min', status: 'Ready', date: 'Not started' },
  { id: 'a15', title: 'Research synthesis', skill: 'User research', questions: 22, duration: '30 min', score: 61, status: 'Needs practice', date: 'Oct 2, 2025' },
]
export const projects: Project[] = [
  { id: 'portfolio-audit', title: 'Accessibility audit sprint', category: 'Inclusive design', level: 'Intermediate', duration: '4–6 hours', skills: ['Accessibility', 'User research', 'Communication'], description: 'Audit a real-world checkout flow and make a prioritized, evidence-backed plan to improve its accessibility.', status: 'Available' },
  { id: 'design-system-kit', title: 'Build a product UI kit', category: 'Design systems', level: 'Advanced', duration: '8–10 hours', skills: ['Design systems', 'Figma', 'Prototyping'], description: 'Create a coherent, accessible component kit for a focused product scenario, with tokens and useful documentation.', status: 'In review' },
  { id: 'research-study', title: 'Plan a usability study', category: 'UX research', level: 'Beginner', duration: '3–4 hours', skills: ['User research', 'Communication'], description: 'Write a research plan, recruit thoughtfully, and turn five sessions into clear product recommendations.', status: 'Approved', score: 92 },
]
export const certificates: Certificate[] = [
  { id: 'c1', title: 'UX Foundations', issuer: 'SkillForge Professional', date: 'October 8, 2025', code: 'SF-2025-9K4T2', skills: ['User research', 'Information architecture'] },
  { id: 'c2', title: 'Product Discovery Essentials', issuer: 'SkillForge Professional', date: 'September 22, 2025', code: 'SF-2025-7Q1M8', skills: ['Product strategy', 'Communication'] },
  { id: 'c3', title: 'Figma for Product Teams', issuer: 'SkillForge Professional', date: 'August 14, 2025', code: 'SF-2025-2B6N4', skills: ['Figma', 'Prototyping'] },
]
export const appNotifications: AppNotification[] = [
  { id: 'n1', title: 'Your certificate is ready', description: 'UX Foundations certificate is now available in your gallery.', date: '10:42 AM', group: 'Today', unread: true, kind: 'certificate' },
  { id: 'n2', title: 'A new roadmap milestone', description: 'Your AI mentor added “Build a portfolio case study” to your plan.', date: '9:18 AM', group: 'Today', unread: true, kind: 'mentor' },
  { id: 'n3', title: 'Assessment passed', description: 'You scored 94% on Design systems fundamentals.', date: 'Yesterday', group: 'Yesterday', unread: true, kind: 'course' },
  { id: 'n4', title: '12-day streak unlocked', description: 'You showed up 12 days in a row. Keep the momentum going.', date: 'Yesterday', group: 'Yesterday', unread: false, kind: 'streak' },
  { id: 'n5', title: 'Project feedback is ready', description: 'Your product UI kit review includes detailed next steps.', date: 'Oct 9', group: 'Earlier', unread: false, kind: 'mentor' },
]
export const mentorMessages = [
  { id: 'm1', role: 'assistant' as const, content: 'Hi Jordan. Your accessibility score improved by **14 points** this month. That is a strong signal that your practice is sticking. What would you like to focus on today?' },
  { id: 'm2', role: 'user' as const, content: 'I want to get closer to a product designer role. What should I work on next?' },
  { id: 'm3', role: 'assistant' as const, content: 'You are already strong in research and prototyping. The clearest next move is to deepen your **interaction design** and connect it to product outcomes.\n\nI would suggest: start with the interaction patterns module, then apply it to a short case study. You will build a useful portfolio artifact while strengthening a role-critical skill.' },
]
export const adminUsers = [
  { name: 'Jordan Lee', email: 'jordan.lee@email.com', role: 'Learner', progress: '78%', joined: 'Mar 12, 2025', active: true },
  { name: 'Maya Chen', email: 'maya.chen@email.com', role: 'Learner', progress: '92%', joined: 'Feb 28, 2025', active: true },
  { name: 'Theo Brooks', email: 'theo.brooks@email.com', role: 'Instructor', progress: '—', joined: 'Jan 18, 2025', active: true },
  { name: 'Nina Patel', email: 'nina.patel@email.com', role: 'Learner', progress: '41%', joined: 'Apr 03, 2025', active: false },
  { name: 'Avery Johnson', email: 'avery.j@email.com', role: 'Admin', progress: '—', joined: 'Dec 11, 2024', active: true },
  { name: 'Sam Rivera', email: 'sam.r@email.com', role: 'Learner', progress: '66%', joined: 'May 22, 2025', active: true },
]
export const adminReviews = [
  { learner: 'Jordan Lee', project: 'Build a product UI kit', submitted: 'Oct 11, 2025', skills: 'Design systems, Figma' },
  { learner: 'Maya Chen', project: 'Accessibility audit sprint', submitted: 'Oct 10, 2025', skills: 'Accessibility, Research' },
  { learner: 'Nina Patel', project: 'Plan a usability study', submitted: 'Oct 9, 2025', skills: 'Research, Communication' },
]
export const learningAnalytics = [
  { month: 'May', hours: 880, completions: 240 }, { month: 'Jun', hours: 1040, completions: 300 }, { month: 'Jul', hours: 980, completions: 284 },
  { month: 'Aug', hours: 1260, completions: 365 }, { month: 'Sep', hours: 1410, completions: 410 }, { month: 'Oct', hours: 1680, completions: 492 },
]
