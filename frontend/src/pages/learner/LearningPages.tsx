import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Award, BookOpen, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Code2, Download, ExternalLink, FileText, Filter, Flame, FolderKanban, GraduationCap, Link2, LockKeyhole, MessageCircle, MoreHorizontal, Play, Plus, Send, Sparkles, Target, Trash2, Upload, UserRound, WandSparkles, X } from 'lucide-react'
import { useToast } from '../../components/toast-context'
import { Avatar, Badge, Button, Card, EmptyState, Input, Progress, Ring, Select, SkillMeter, Textarea, Timeline } from '../../components/ui'
import { appNotifications, assessments, certificates, courses, learner, mentorMessages, projects, type AppNotification, type Course, type Project } from '../../data/mockData'
import { api } from '../../data/live'
export function CoursesPage() {
  const [category, setCategory] = useState('All courses'); const [search, setSearch] = useState('')
  const categories = ['All courses', 'Product design', 'UX research', 'Accessibility', 'Product strategy']
  const results = courses.filter((course) => `${course.title} ${course.category} ${course.skills.join(' ')}`.toLowerCase().includes(search.toLowerCase()) && (category === 'All courses' || course.category === category))
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">LEARN WITH DIRECTION</div><h1>Course library</h1><p>Focused courses, built around the skills your next role needs.</p></div><Badge tone="primary"><BookOpen size={12} /> {courses.length} curated courses</Badge></div><div className="course-toolbar"><div className="catalog-tabs">{categories.map((item) => <button key={item} className={category === item ? 'catalog-tab selected' : 'catalog-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="inline-search"><Filter size={14} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses" aria-label="Search courses" /></label></div>{results.length ? <div className="course-grid">{results.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <EmptyState icon={<BookOpen size={18} />} title="No courses found" description="Try another search or category to find your next learning step." />}</div>
}

function CourseCard({ course }: { course: Course }) {
  return <Link className="course-card-link" to={`/app/courses/${course.id}`}><Card className="course-card"><div className={`course-art course-art-${course.color}`}><span className="course-art-grid" /><span className="course-art-symbol"><BookOpen size={24} /></span><Badge tone="neutral">{course.category}</Badge><span className="course-art-rating">â˜… {course.rating}</span></div><div className="course-card-body"><div className="course-card-meta"><Badge tone="primary">{course.level}</Badge><span><Clock3 size={12} /> {course.duration}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-skills">{course.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="course-card-progress"><div><span>{course.progress ? 'Your progress' : 'Start learning'}</span><strong>{course.progress ? `${course.progress}%` : 'Not started'}</strong></div>{course.progress > 0 && <Progress value={course.progress} color={course.progress === 100 ? 'success' : 'primary'} />}</div></div></Card></Link>
}

export function CourseDetailPage() {
  const { id = 'design-systems' } = useParams(); const course = courses.find((item) => item.id === id) ?? courses[0]
  const [openModule, setOpenModule] = useState(0)
  const completedLessons = course.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.complete).length
  return <div className="learner-page animate-enter"><Link to="/app/courses" className="back-link"><ChevronLeft size={14} /> Course library</Link><div className={`course-detail-hero course-art-${course.color}`}><div className="course-detail-copy"><Badge tone="neutral">{course.category}</Badge><div className="course-hero-meta"><span>{course.level}</span><i /><span><Clock3 size={13} /> {course.duration}</span><i /><span>â˜… {course.rating}</span></div><h1>{course.title}</h1><p>{course.description} Learn from practical examples, then apply each concept to work you can share.</p><div className="course-instructor"><Avatar name="Theo Brooks" /><span><small>YOUR INSTRUCTOR</small><strong>Theo Brooks Â· Product systems lead</strong></span></div><Link className="ui-button ui-button-primary" to={`/app/courses/${course.id}/lesson`}>{course.progress ? 'Continue course' : 'Start course'} <Play size={14} fill="currentColor" /></Link></div><div className="course-hero-art"><div className="course-art-card card-front"><span><Code2 size={26} /></span><i /><i /><i /></div><div className="course-art-card card-back"><div /><div /><div /></div><div className="course-art-orbit" /></div></div><div className="course-detail-layout"><div className="course-curriculum"><div className="section-title-row"><div><h2>Course curriculum</h2><span>{course.modules.length} modules Â· {course.lessons} lessons</span></div><Badge tone="success"><CheckCircle2 size={12} /> {completedLessons} completed</Badge></div><div className="module-list">{course.modules.map((module, index) => <section className="module-item" key={module.title}><button className="module-heading" onClick={() => setOpenModule(openModule === index ? -1 : index)} aria-expanded={openModule === index}><span className="module-number">{String(index + 1).padStart(2, '0')}</span><span className="module-title"><strong>{module.title}</strong><small>{module.lessons.length} lessons Â· {module.lessons.reduce((sum, lesson) => sum + (lesson.complete ? 1 : 0), 0)} complete</small></span><ChevronDown size={16} className={openModule === index ? 'rotate-chevron' : ''} /></button>{openModule === index && <div className="lesson-list">{module.lessons.map((lesson, lessonIndex) => <Link to={`/app/courses/${course.id}/lesson`} className="lesson-row" key={lesson.id}><span className={lesson.complete ? 'lesson-check complete' : 'lesson-check'}>{lesson.complete ? <Check size={13} /> : lesson.type === 'video' ? <Play size={12} /> : lesson.type === 'reading' ? <FileText size={12} /> : <Target size={12} />}</span><span className="lesson-title">{lesson.title}{lessonIndex === 0 && !lesson.complete && <Badge tone="primary">NEXT</Badge>}</span><span className="lesson-duration">{lesson.duration}</span><ChevronRight size={14} /></Link>)}</div>}</section>)}</div></div><aside className="course-progress-sticky"><Card><div className="course-progress-summary"><Ring value={course.progress} size={80} stroke={7} color="primary" label={`${course.progress}%`} /><div><strong>{course.progress === 100 ? 'Course complete' : 'Your progress'}</strong><span>{completedLessons} of {course.lessons} lessons</span></div></div><Progress value={course.progress} /><div className="course-progress-details"><span>Estimated completion</span><strong>{course.duration}</strong></div><div className="course-progress-details"><span>Certificate</span><strong><BadgeCheckIcon /> Included</strong></div><Link className="ui-button ui-button-primary" to={`/app/courses/${course.id}/lesson`}>{course.progress ? 'Resume learning' : 'Begin course'} <ArrowRightIcon /></Link><div className="course-included"><strong>What youâ€™ll build</strong><p>A practical component system that demonstrates your design thinking and craft.</p></div></Card></aside></div></div>
}

function BadgeCheckIcon() { return <CheckCircle2 size={13} /> }
function ArrowRightIcon() { return <ChevronRight size={14} /> }

export function LessonPage() {
  const { id = 'design-systems' } = useParams(); const course = courses.find((item) => item.id === id) ?? courses[0]; const notify = useToast()
  return <div className="learner-page lesson-page animate-enter"><div className="lesson-breadcrumb"><Link to="/app/courses">Courses</Link><ChevronRight size={13} /><Link to={`/app/courses/${course.id}`}>{course.title}</Link><ChevronRight size={13} /><span>Components with purpose</span></div><div className="lesson-workspace"><main className="lesson-content"><div className="lesson-kicker"><Badge tone="primary">MODULE 2 Â· LESSON 1</Badge><span><Clock3 size={13} /> 22 min</span></div><h1>Build a reusable component</h1><p className="lesson-lead">Good components make good decisions easier to repeat. Start with the pattern people need, then make its behavior clear at every size and state.</p><div className="lesson-video"><div className="video-grid" /><div className="video-center"><span><Play size={22} fill="currentColor" /></span><strong>Component anatomy</strong><small>Lesson video Â· 08:42</small></div><div className="video-controls"><span>08:42</span><Progress value={31} /><span>22:10</span><button onClick={() => notify('Captions are on for this lesson')} aria-label="Toggle captions"><MessageCircle size={14} /></button></div></div><section className="lesson-reading"><div className="eyebrow">THE IDEA</div><h2>Design the behavior, not just the shape.</h2><p>A component is a small contract between design and implementation. It describes how an element looks, what it can do, and how it responds when something changes.</p><div className="lesson-callout"><Sparkles size={16} /><p><strong>Start with the decision.</strong> Before drawing variants, write down what choice the component helps a person make.</p></div><h3>Three useful questions</h3><ol><li>What does someone need to understand before interacting?</li><li>Which states show progress, success, or a need for attention?</li><li>How does the component stay usable with a keyboard and assistive technology?</li></ol><div className="lesson-resource-row"><Button variant="outline" size="sm" icon={<Download size={14} />} onClick={() => notify('Component audit worksheet downloaded')}>Download worksheet</Button><Button variant="ghost" size="sm" icon={<Link2 size={14} />} onClick={() => notify('Lesson link copied')}>Copy lesson link</Button></div></section><section className="lesson-panel"><div><div className="panel-icon violet-panel"><CircleHelp size={17} /></div><div><Badge tone="violet">QUICK CHECK</Badge><h3>What should guide a componentâ€™s variants?</h3><p>Choose the strongest starting point.</p></div></div><div className="quick-answers">{['Every possible visual treatment', 'The real decisions and states a person needs', 'The number of screens in the product'].map((answer, index) => <button key={answer} onClick={(event) => { const button = event.currentTarget; button.classList.toggle(index === 1 ? 'answer-correct' : 'answer-wrong') }}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>)}</div></section><div className="lesson-navigation"><Link to={`/app/courses/${course.id}`} className="ui-button ui-button-outline"><ChevronLeft size={14} /> Course overview</Link><Button onClick={() => notify('Lesson complete. Your progress has been updated.', 'success')}>Mark complete <Check size={14} /></Button></div></main><aside className="lesson-sidebar"><Card><div className="lesson-side-title"><span>IN THIS LESSON</span><button className="icon-button" aria-label="More lesson actions"><MoreHorizontal size={16} /></button></div>{['Watch the lesson', 'Read the key ideas', 'Complete the quick check', 'Try the component audit'].map((item, index) => <div className={`lesson-side-step ${index < 2 ? 'complete' : ''}`} key={item}><span>{index < 2 ? <Check size={12} /> : index + 1}</span>{item}</div>)}<Progress value={42} /><div className="lesson-side-progress">Course progress <strong>68%</strong></div></Card><Card className="lesson-resource-card"><strong>Resources</strong><a href="#worksheet"><FileText size={14} /> Component audit worksheet <Download size={13} /></a><a href="#reading"><ExternalLink size={14} /> Inclusive components guide <ExternalLink size={12} /></a></Card><Card className="ask-mentor-card"><div className="mentor-mini-icon"><WandSparkles size={17} /></div><strong>Have a question?</strong><p>Your AI mentor can help you work through the tricky bits.</p><Link to="/app/mentor">Ask your mentor <ArrowRightIcon /></Link></Card></aside></div></div>
}

export function AssessmentsPage() {
  const results = assessments
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">PUT YOUR SKILLS TO THE TEST</div><h1>Assessments</h1><p>Short, practical checks that help you understand what you know and what to practice next.</p></div><div className="assessment-overview"><Ring value={82} size={55} stroke={5} label="82%" /><span><strong>Average score</strong><small>across 4 assessments</small></span></div></div><div className="assessment-summary-grid"><Card><span className="assessment-summary-icon green-summary"><CheckCircle2 size={17} /></span><div><strong>3</strong><small>Passed</small></div></Card><Card><span className="assessment-summary-icon amber-summary"><Clock3 size={17} /></span><div><strong>1</strong><small>In progress</small></div></Card><Card><span className="assessment-summary-icon violet-summary"><Target size={17} /></span><div><strong>5</strong><small>Available</small></div></Card></div><Card className="assessments-table-card"><div className="card-heading"><div><h2>Your assessments</h2><span>Review results or continue where you left off</span></div><select className="compact-select" aria-label="Filter assessments"><option>All statuses</option><option>Ready</option><option>Passed</option><option>In progress</option></select></div><div className="assessment-list">{results.map((assessment) => <div className="assessment-row" key={assessment.id}><span className={`assessment-row-icon assessment-${assessment.status.replace(/\s+/g, '-').toLowerCase()}`}><Target size={17} /></span><div className="assessment-info"><strong>{assessment.title}</strong><span>{assessment.skill} Â· {assessment.questions} questions Â· {assessment.duration}</span></div><Badge tone={assessment.status === 'Passed' ? 'success' : assessment.status === 'In progress' ? 'warning' : assessment.status === 'Needs practice' ? 'danger' : 'neutral'}>{assessment.status}</Badge><span className="assessment-score">{assessment.score ? `${assessment.score}%` : assessment.date}</span>{assessment.status === 'Passed' ? <Link className="ui-button ui-button-ghost ui-button-sm" to={`/app/assessments/${assessment.id}/results`}>Review result <ChevronRight size={13} /></Link> : <Link className="ui-button ui-button-outline ui-button-sm" to={`/app/assessments/${assessment.id}/take`}>{assessment.status === 'In progress' ? 'Continue' : 'Start'} <ArrowRightIcon /></Link>}</div>)}</div></Card><Card className="assessment-tip"><span><Sparkles size={16} /></span><p><strong>Practice is progress.</strong> Assessments are designed to help you find your next learning step, not just a score.</p><Link to="/app/skills">Review your skills <ArrowRightIcon /></Link></Card></div>
}

const questionBank = [
  { skill: 'Design systems', question: 'A primary button is used for the main action on a page. Which choice best supports a clear hierarchy?', options: ['Give every button the same emphasis', 'Use one prominent primary action and quieter secondary actions', 'Make the primary action the smallest element'], correct: 1 },
  { skill: 'Accessibility', question: 'When should an icon-only control include an accessible label?', options: ['Only when it uses a custom icon', 'Whenever its purpose is not clear from visible text', 'Only on mobile layouts'], correct: 1 },
  { skill: 'Interaction design', question: 'A form submission takes several seconds. What feedback is most useful?', options: ['Disable the button with no explanation', 'Show a clear pending state and prevent duplicate submissions', 'Keep the form unchanged until the response arrives'], correct: 1 },
]
export function AssessmentFlowPage() {
  const navigate = useNavigate(); const [step, setStep] = useState(0); const [answers, setAnswers] = useState<number[]>([]); const [review, setReview] = useState(false); const question = questionBank[step]
  const choose = (index: number) => setAnswers((current) => { const next = [...current]; next[step] = index; return next })
  const submit = () => { const breakdown = questionBank.map((item, index) => answers[index] === item.correct); const score = Math.round((breakdown.filter(Boolean).length / questionBank.length) * 100); sessionStorage.setItem('assessment-score', String(score)); sessionStorage.setItem('assessment-breakdown', JSON.stringify(breakdown)); navigate('/app/assessments/a11/results') }
  return <div className="assessment-flow-page animate-enter"><div className="assessment-flow-header"><Link to="/app/assessments" className="back-link"><ChevronLeft size={14} /> Exit assessment</Link><div className="assessment-timer"><Clock3 size={14} /> 18:42 remaining</div></div><div className="assessment-flow-title"><Badge tone="primary">DESIGN SYSTEMS FUNDAMENTALS</Badge><h1>{review ? 'Review your answers' : 'Show what you know'}</h1><p>{review ? 'Take a final look before submitting your assessment.' : 'One question at a time. Take a breath and trust your practice.'}</p></div><div className="assessment-progress-line"><div><span>Question {Math.min(step + 1, questionBank.length)} of {questionBank.length}</span><strong>{Math.round(((step + 1) / questionBank.length) * 100)}%</strong></div><Progress value={((step + 1) / questionBank.length) * 100} /></div><div className="assessment-take-layout"><aside className="question-nav"><strong>QUESTION MAP</strong><div>{questionBank.map((item, index) => <button key={item.skill} className={`${step === index ? 'current' : ''} ${answers[index] !== undefined ? 'answered' : ''}`} onClick={() => { setStep(index); setReview(false) }}>{answers[index] !== undefined ? <Check size={13} /> : index + 1}</button>)}</div><p>{answers.filter((value) => value !== undefined).length} of {questionBank.length} answered</p><span className="question-nav-legend"><i /> Current <i /> Answered</span></aside><Card className="question-card"><div className="question-meta"><span>{question.skill.toUpperCase()}</span><span>QUESTION {step + 1}</span></div><h2>{review ? 'Review your responses' : question.question}</h2><div className="answer-options">{question.options.map((option, index) => <button key={option} className={`answer-option ${answers[step] === index ? 'selected' : ''}`} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span>{option}{answers[step] === index && <CheckCircle2 size={17} />}</button>)}</div><div className="question-card-footer"><Button variant="ghost" disabled={step === 0} onClick={() => { setStep((value) => Math.max(0, value - 1)); setReview(false) }}><ChevronLeft size={15} /> Previous</Button>{step < questionBank.length - 1 ? <Button onClick={() => setStep((value) => value + 1)}>Next question <ChevronRight size={15} /></Button> : review ? <Button onClick={submit}>Submit assessment <Check size={15} /></Button> : <Button variant="outline" onClick={() => setReview(true)}>Review answers <ArrowRightIcon /></Button>}</div></Card></div></div>
}

export function AssessmentResultsPage() {
  const score = Number(sessionStorage.getItem('assessment-score') ?? 94)
  return <div className="learner-page results-page animate-enter"><div className="results-celebration"><span><Award size={23} /></span><Badge tone="success">ASSESSMENT COMPLETE</Badge><h1>{score >= 70 ? 'You passed. Nicely done.' : 'Good work getting started.'}</h1><p>Your Design systems fundamentals results are ready.</p><div className="results-score"><Ring value={score} size={143} stroke={11} color={score >= 70 ? 'success' : 'amber'} label={`${score}%`} sublabel="YOUR SCORE" /><div><Badge tone={score >= 70 ? 'success' : 'warning'}>{score >= 70 ? 'PASSING SCORE' : 'KEEP PRACTICING'}</Badge><strong>{score >= 70 ? 'Strong work, Jordan.' : 'You are building useful knowledge.'}</strong><small>Completed today Â· 3 questions Â· 4 min</small></div></div></div><div className="results-grid"><Card className="result-breakdown"><div className="card-heading"><div><h2>By skill area</h2><span>Where you showed strength and where to focus</span></div></div>{questionBank.map((item, index) => <div className="result-skill-row" key={item.skill}><div><span className={answersCorrect(score, index) ? 'result-check correct' : 'result-check needs-work'}>{answersCorrect(score, index) ? <Check size={12} /> : <Target size={12} />}</span><strong>{item.skill}</strong><Badge tone={answersCorrect(score, index) ? 'success' : 'warning'}>{answersCorrect(score, index) ? 'Strong' : 'Practice'}</Badge></div><SkillMeter value={answersCorrect(score, index) ? 91 - index * 3 : 58} /></div>)}</Card><Card className="results-feedback"><div className="feedback-strength"><span><CheckCircle2 size={16} /></span><div><strong>Strengths</strong><p>You made clear choices around hierarchy and thoughtful user feedback.</p></div></div><div className="feedback-focus"><span><Target size={16} /></span><div><strong>Next focus</strong><p>Revisit accessibility labels and practice naming actions for assistive technology.</p></div></div><Link to="/app/courses/accessible-products" className="ui-button ui-button-primary">Practice your next skill <ArrowRightIcon /></Link><Link className="results-back-link" to="/app/assessments">Back to assessments</Link></Card></div></div>
}
function answersCorrect(score: number, index: number) {
  try {
    const storedBreakdown: unknown = JSON.parse(sessionStorage.getItem('assessment-breakdown') ?? 'null')
    if (Array.isArray(storedBreakdown) && typeof storedBreakdown[index] === 'boolean') return storedBreakdown[index]
  } catch {
    return score >= 70 ? index < 2 : index === 0
  }
  return score >= 70 ? index < 2 : index === 0
}

export function ProjectsPage() {
  const [view, setView] = useState<'Explore' | 'My projects'>('Explore'); const [category, setCategory] = useState('All projects')
  const list = view === 'Explore' ? projects : projects.filter((project) => project.status !== 'Available')
  const filtered = list.filter((project) => category === 'All projects' || project.category === category)
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">SHOW WHAT YOU CAN DO</div><h1>Projects</h1><p>Turn your learning into work people can see, review, and trust.</p></div><Button variant="outline" icon={<FolderKanban size={15} />} onClick={() => setView('My projects')}>My submissions</Button></div><div className="project-tabs"><button className={view === 'Explore' ? 'selected' : ''} onClick={() => setView('Explore')}>Explore projects</button><button className={view === 'My projects' ? 'selected' : ''} onClick={() => setView('My projects')}>My projects <Badge>{projects.filter((project) => project.status !== 'Available').length}</Badge></button></div><div className="project-toolbar"><div><strong>{view === 'Explore' ? 'Build your portfolio with a real brief' : 'Your project activity'}</strong><span>{filtered.length} projects</span></div><select className="compact-select" aria-label="Filter project category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All projects</option><option>Inclusive design</option><option>Design systems</option><option>UX research</option></select></div>{filtered.length ? <div className="project-grid">{filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div> : <EmptyState icon={<FolderKanban size={18} />} title="No project activity yet" description="Choose a project brief to create work you can add to your portfolio." action={<Button onClick={() => setView('Explore')}>Explore projects</Button>} />}</div>
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link className="project-card-link" to={`/app/projects/${project.id}`}><Card className="project-card"><div className={`project-art project-art-${index}`}><div className="project-art-stamp"><Code2 size={19} /></div><span>{project.category.toUpperCase()}</span><button aria-label={`Open ${project.title}`}><ArrowUpRight size={16} /></button></div><div className="project-card-body"><div className="project-card-tags"><Badge tone="neutral">{project.level}</Badge>{project.status !== 'Available' && <Badge tone={project.status === 'Approved' ? 'success' : 'warning'}>{project.status}</Badge>}<span><Clock3 size={12} /> {project.duration}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="course-skills">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>{project.score && <div className="project-score"><span>Reviewer score</span><strong>{project.score}%</strong></div>}<div className="project-card-link-text">{project.status === 'Available' ? 'View project brief' : 'See your feedback'} <ArrowRight size={13} /></div></div></Card></Link>
}

export function ProjectDetailPage() {
  const { id = 'portfolio-audit' } = useParams(); const project = projects.find((item) => item.id === id) ?? projects[0]; const [checked, setChecked] = useState<string[]>([]); const [submitted, setSubmitted] = useState(project.status !== 'Available'); const notify = useToast()
  const requirements = ['Audit at least one primary user flow', 'Include keyboard navigation checks', 'Prioritize findings by user impact', 'Share evidence for each recommendation']
  const onSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); notify('Project submitted for review. Weâ€™ll let you know when feedback is ready.') }
  return <div className="learner-page animate-enter"><Link to="/app/projects" className="back-link"><ChevronLeft size={14} /> Projects</Link><div className="project-detail-header"><div className="project-detail-art"><span><Code2 size={24} /></span><small>{project.category.toUpperCase()}</small></div><div><div className="project-card-tags"><Badge tone="primary">{project.level}</Badge><span><Clock3 size={12} /> {project.duration}</span></div><h1>{project.title}</h1><p>{project.description}</p><div className="course-skills">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div><div className="project-detail-grid"><main><Card className="project-requirements"><div className="card-heading"><div><div className="eyebrow">YOUR CHECKLIST</div><h2>Project requirements</h2></div><Badge tone={checked.length === requirements.length ? 'success' : 'neutral'}>{checked.length}/{requirements.length} complete</Badge></div><p>Check off each requirement as your project takes shape.</p>{requirements.map((requirement) => <label className="requirement-row" key={requirement}><input type="checkbox" checked={checked.includes(requirement) || submitted} onChange={(event) => setChecked((items) => event.target.checked ? [...items, requirement] : items.filter((item) => item !== requirement))} /><span>{requirement}</span></label>)}</Card><Card className="project-guidance"><span><Sparkles size={17} /></span><div><strong>Make your work easy to review</strong><p>Share a short walkthrough of your decisions alongside the final deliverable. A little context helps reviewers give more useful feedback.</p></div></Card><Card className="project-submit-card"><div className="eyebrow">SHARE YOUR WORK</div><h2>{submitted ? 'Submission received' : 'Submit your project'}</h2>{submitted ? <div className="submission-confirm"><CheckCircle2 size={20} /><div><strong>Your project is in the review queue</strong><p>Typical review time is 2â€“3 business days. Weâ€™ll send your feedback to your notifications.</p></div></div> : <form className="project-form" onSubmit={onSubmit}><Input label="Repository URL" name="repo" type="url" placeholder="https://github.com/you/project" required /><Input label="Live demo URL" name="demo" type="url" placeholder="https://your-project.com" /><Textarea label="Project notes" name="description" placeholder="What did you learn? What decisions are you most proud of?" rows={4} required /><label className="upload-attachment"><input type="file" accept="image/*,.pdf" /><Upload size={15} /> Attach a project preview or case study</label><Button type="submit">Submit for review <ArrowRight size={14} /></Button></form>}</Card></main><aside className="project-review-aside"><Card><div className="reviewer-heading"><span><UserRound size={16} /></span><div><strong>Expert review</strong><small>Feedback from a working designer</small></div></div><p>Your submission is reviewed against the brief, craft, clarity, and the skills youâ€™re building.</p><div className="review-dimension"><span>Brief requirements</span><Progress value={75} /></div><div className="review-dimension"><span>Design craft</span><Progress value={70} color="violet" /></div><div className="review-dimension"><span>Communication</span><Progress value={80} color="amber" /></div></Card><Card className="similar-project"><span className="similar-icon"><GraduationCap size={16} /></span><strong>Projects build evidence</strong><p>Approved work can be shared with your certificates and career profile.</p><Link to="/app/certificates">View credentials <ArrowRightIcon /></Link></Card></aside></div></div>
}




export function CertificatesPage() {
  const [selectedId, setSelectedId] = useState(
    certificates[0]?.id ?? null,
  )

  const [message, setMessage] = useState('')

  const selected =
    certificates.find((item) => item.id === selectedId) ??
    certificates[0] ??
    null

  async function copyCode(code: string) {
    if (!code) {
      setMessage('No verification code is available.')
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setMessage('Verification code copied.')
    } catch {
      setMessage(`Verification code: ${code}`)
    }
  }

  async function shareCertificate() {
    if (!selected) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: selected.title || 'SkillForge Certificate',
          text: `I earned ${selected.title || 'a certificate'} with SkillForge. Verification code: ${selected.code || 'Unavailable'}`,
        })
      } catch {
        // The user may cancel sharing.
      }
    } else {
      await copyCode(selected.code || '')
    }
  }

  return (
    <main className="learner-page animate-enter">
      <header className="page-heading">
        <div>
          <div className="eyebrow">PROOF OF YOUR PROGRESS</div>
          <h1>Certificates</h1>
          <p>Your earned credentials, ready to share.</p>
        </div>
      </header>

      {message && (
        <p role="status" aria-live="polite">
          {message}
        </p>
      )}

      <div className="certificates-layout">
        <section className="certificate-gallery">
          <div className="section-title-row">
            <div>
              <h2>Your credentials</h2>
              <span>{certificates.length} certificates earned</span>
            </div>
          </div>

          {certificates.length === 0 ? (
            <div className="certificate-empty">
              <h2>No certificates yet</h2>
              <p>
                Complete a course or assessment to earn a certificate.
                Your certificates will appear here when available.
              </p>
            </div>
          ) : (
            <div className="certificate-list">
              {certificates.map((certificate) => (
                <article
                  className={`certificate-card ${
                    selected?.id === certificate.id ? 'selected' : ''
                  }`}
                  key={certificate.id}
                >
                  <button
                    type="button"
                    className="certificate-card-main"
                    onClick={() => setSelectedId(certificate.id)}
                  >
                    <span className="certificate-mini">ðŸ†</span>

                    <span className="certificate-card-copy">
                      <strong>
                        {certificate.title || 'Untitled certificate'}
                      </strong>
                      <small>{certificate.issuer || 'SkillForge'}</small>
                      <span>
                        Issued {certificate.date || 'Date unavailable'}
                      </span>
                    </span>
                  </button>

                  <div className="certificate-card-bottom">
                    <span>
                      VERIFICATION CODE{' '}
                      <strong>{certificate.code || 'Unavailable'}</strong>
                    </span>

                    <button
                      type="button"
                      className="icon-button"
                      disabled={!certificate.code}
                      onClick={() => void copyCode(certificate.code || '')}
                    >
                      Copy code
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="certificate-preview-side">
          <div className="certificate-preview-header">
            <span>CERTIFICATE PREVIEW</span>
          </div>

          {selected ? (
            <>
              <div className="certificate-paper">
                <div className="certificate-paper-frame">
                  <div className="certificate-paper-brand">
                    SKILLFORGE
                  </div>

                  <div className="certificate-paper-decoration">âœ¦</div>

                  <small>PROFESSIONAL CERTIFICATE</small>

                  <h2>{selected.title || 'Untitled certificate'}</h2>

                  <p>This certifies that</p>

                  <strong className="recipient-name">Learner</strong>

                  <p>has demonstrated proficiency in</p>

                  <div className="certificate-skills">
                    {(selected.skills ?? []).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <div className="certificate-signature">
                    <span>SkillForge Academy</span>
                    <small>
                      ISSUED {(selected.date || '').toUpperCase()}
                    </small>
                  </div>

                  <div className="certificate-paper-footer">
                    <span>VERIFICATION CODE</span>
                    <strong>{selected.code || 'Unavailable'}</strong>
                  </div>
                </div>
              </div>

              <div className="certificate-preview-actions">
                <button
                  type="button"
                  className="ui-button ui-button-primary"
                  onClick={() => window.print()}
                >
                  Print certificate
                </button>

                <button
                  type="button"
                  className="ui-button"
                  onClick={() => void shareCertificate()}
                >
                  Share certificate
                </button>

                <button
                  type="button"
                  className="certificate-verify-link"
                  disabled={!selected.code}
                  onClick={() => void copyCode(selected.code || '')}
                >
                  Copy verification code
                </button>
              </div>
            </>
          ) : (
            <div className="certificate-empty">
              <h2>Certificate preview</h2>
              <p>
                Earn a certificate to see its details and verification code
                here.
              </p>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}


export function ResumePage() {
  const [file, setFile] = useState<File | null>(null); const [analyzed, setAnalyzed] = useState(false); const [dragging, setDragging] = useState(false); const inputRef = useRef<HTMLInputElement>(null); const notify = useToast()
  const selectFile = (picked: File | undefined) => { if (!picked) return; if (!/\.(pdf|docx)$/i.test(picked.name)) { notify('Choose a PDF or DOCX resume.', 'error'); return }; setFile(picked); setAnalyzed(false) }
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files[0]) }
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">MAKE YOUR EXPERIENCE COUNT</div><h1>Resume insights</h1><p>Turn your experience into a clear story of skills, impact, and potential.</p></div><Badge tone="violet"><Sparkles size={12} /> AI-powered review</Badge></div>{!file ? <div className={`resume-upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={onDrop}><input ref={inputRef} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event: ChangeEvent<HTMLInputElement>) => selectFile(event.target.files?.[0])} /><span className="resume-upload-icon"><Upload size={23} /></span><h2>Bring your experience into focus.</h2><p>Drop your resume here, or browse your files. Weâ€™ll help you identify the strengths and opportunities inside.</p><Button onClick={() => inputRef.current?.click()}>Choose a file <Upload size={14} /></Button><small>PDF or DOCX Â· Up to 10 MB Â· Your resume stays private</small></div> : <div className="resume-analysis"><div className="resume-file-row"><span><FileText size={17} /></span><div><strong>{file.name}</strong><small>{(file.size / 1024).toFixed(0)} KB Â· Ready to analyze</small></div><button className="icon-button" title="Remove resume" aria-label="Remove resume" onClick={() => { setFile(null); setAnalyzed(false) }}><Trash2 size={15} /></button>{!analyzed && <Button onClick={() => setAnalyzed(true)}><Sparkles size={14} /> Analyze resume</Button>}</div>{analyzed ? <><div className="resume-analysis-heading"><div><Badge tone="success"><CheckCircle2 size={12} /> ANALYSIS COMPLETE</Badge><h2>Your experience has a strong foundation.</h2><p>We found skills that align with your Product designer career goal.</p></div><Ring value={82} size={91} stroke={8} color="success" label="82%" sublabel="ROLE MATCH" /></div><div className="resume-analysis-grid"><Card><div className="card-heading"><div><h3>Skills we found</h3><span>Matched against your career goal</span></div><Badge tone="success">8 found</Badge></div><div className="extracted-skills">{['User research', 'Figma', 'Prototyping', 'Design systems', 'Communication', 'Accessibility', 'Product discovery', 'Workshop facilitation'].map((skill) => <span key={skill}><Check size={12} />{skill}</span>)}</div></Card><Card><div className="card-heading"><div><h3>Ways to strengthen it</h3><span>Small changes with a clear payoff</span></div></div><div className="resume-suggestion"><span>01</span><p><strong>Lead with impact.</strong> Add outcomes to your project bullets, not just responsibilities.</p></div><div className="resume-suggestion"><span>02</span><p><strong>Show the method.</strong> Name your research and design decisions so reviewers can see your thinking.</p></div><div className="resume-suggestion"><span>03</span><p><strong>Fill one visible gap.</strong> Add a case study that demonstrates accessibility in practice.</p></div></Card></div><div className="resume-privacy"><LockKeyhole size={14} /> Your resume is private and visible only to you.</div></> : <div className="resume-waiting-state"><div className="resume-skeleton"><span /><span /><span /><span /></div><div><strong>Ready when you are</strong><p>Weâ€™ll review your experience and identify skills, strengths, and opportunities tied to your goal.</p></div></div>}</div>}</div>
}

function renderMessage(content: string) {
  return content.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < content.split('\n').length - 1 && <br />}
    </span>
  ))
}


export function MentorPage() {
  const [messages, setMessages] = useState(mentorMessages)
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [contextOpen, setContextOpen] = useState(true)

  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const notify = useToast()

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, typing])

  const sendMessage = async (text = value) => {
    const question = text.trim()

    if (!question || typing) return

    setMessages((current) => [
      ...current,
      {
        id: `message-${Date.now()}`,
        role: 'user' as const,
        content: question,
      },
    ])

    setValue('')
    setTyping(true)

    try {
      const response = await api('/project-agent/ask', {
        question,
      })

      const data = response as {
        answer?: string
        response?: string
        message?: string
        detail?: string
      }

      const answer =
        data?.answer ??
        data?.response ??
        data?.message

      if (typeof answer !== 'string' || !answer.trim()) {
        throw new Error(
          data?.detail ||
            'The AI service returned no answer. Check the backend response.'
        )
      }

      setMessages((current) => [
        ...current,
        {
          id: `reply-${Date.now()}`,
          role: 'assistant' as const,
          content: answer,
        },
      ])
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'

      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: 'assistant' as const,
          content:
            `Sorry, I couldn't get a response from the AI service.\n\n${errorMessage}\n\nCheck that your backend is running, you are logged in, and the API URL is configured correctly.`,
        },
      ])
    } finally {
      setTyping(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div
      className={`mentor-page animate-enter ${
        contextOpen ? '' : 'mentor-context-hidden'
      }`}
    >
      <header className="mentor-header">
        <div className="mentor-title-icon">
          <WandSparkles size={18} />
        </div>

        <div>
          <strong>Your AI mentor</strong>
          <span>
            <i /> Here to help you move forward
          </span>
        </div>

        <div className="mentor-header-actions">
          <Badge tone="violet">PERSONALIZED TO YOU</Badge>

          <button
            className="icon-button mentor-context-toggle"
            aria-label={
              contextOpen
                ? 'Hide learning guidance'
                : 'Show learning guidance'
            }
            onClick={() => setContextOpen((open) => !open)}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </header>

      <div className="mentor-body">
        <main className="mentor-chat">
          <div className="mentor-chat-date">
            YOUR CONVERSATION
          </div>

          {messages.map((message) => (
            <div
              className={`chat-message ${message.role}`}
              key={message.id}
            >
              <span
                className={
                  message.role === 'assistant'
                    ? 'chat-avatar ai-chat-avatar'
                    : 'chat-avatar'
                }
              >
                {message.role === 'assistant' ? (
                  <Sparkles size={15} />
                ) : (
                  'You'
                )}
              </span>

              <div className="chat-message-content">
                <div className="chat-message-name">
                  {message.role === 'assistant'
                    ? 'SkillForge mentor'
                    : 'You'}
                </div>

                <div className="chat-bubble">
                  {renderMessage(message.content)}
                </div>

                {message.role === 'assistant' && (
                  <div className="chat-actions">
                    <button
                      onClick={() => {
                        void navigator.clipboard
                          ?.writeText(message.content)
                          .then(() => notify('Answer copied'))
                          .catch(() =>
                            notify('Could not copy the answer', 'error')
                          )
                      }}
                    >
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        notify('Thanks for your feedback!')
                      }
                    >
                      Helpful
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-message assistant">
              <span className="chat-avatar ai-chat-avatar">
                <Sparkles size={15} />
              </span>

              <div className="chat-message-content">
                <div className="chat-message-name">
                  SkillForge mentor
                  <small>Thinkingâ€¦</small>
                </div>

                <div className="chat-bubble typing-bubble">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </main>

        {contextOpen && (
          <aside className="mentor-guidance">
            <div className="guidance-header">
              <div>
                <div className="eyebrow">
                  YOUR LEARNING CONTEXT
                </div>
                <h2>In your corner</h2>
              </div>

              <button
                className="icon-button"
                aria-label="Close guidance panel"
                onClick={() => setContextOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <Card className="mentor-goal-card">
              <span className="goal-icon">
                <Target size={16} />
              </span>

              <div>
                <small>CAREER GOAL</small>
                <strong>Product designer</strong>
                <span>86% current match</span>
              </div>

              <Link to="/app/careers/product-designer">
                <ArrowUpRight size={14} />
              </Link>
            </Card>

            <Card className="mentor-focus-card">
              <div className="eyebrow">YOUR CURRENT FOCUS</div>
              <h3>Interaction design</h3>
              <SkillMeter value={68} />

              <p>
                Practice interaction patterns and build a portfolio
                case study to demonstrate your skills.
              </p>

              <Link to="/app/courses/design-systems">
                Continue learning <ArrowRightIcon />
              </Link>
            </Card>

            <div className="mentor-guidance-section">
              <div className="eyebrow">
                UP NEXT IN YOUR ROADMAP
              </div>

              <Timeline
                items={[
                  {
                    title: 'Interaction patterns',
                    description: '8 lessons Â· 2 hours',
                    complete: true,
                  },
                  {
                    title: 'Product strategy',
                    description:
                      'Build a stronger product point of view',
                  },
                  {
                    title: 'Portfolio case study',
                    description:
                      'Show your process and decisions',
                  },
                ]}
              />
            </div>

            <Card className="mentor-streak-card">
              <Flame size={17} />
              <div>
                <strong>Keep your learning going</strong>
                <span>Small steps add up.</span>
              </div>
            </Card>
          </aside>
        )}
      </div>

      <div className="mentor-composer-wrap">
        <div className="prompt-chips">
          {[
            'Help me plan my next week',
            'Review my portfolio idea',
            'Explain a skill gap',
          ].map((prompt) => (
            <button
              key={prompt}
              disabled={typing}
              onClick={() => void sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mentor-composer">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void sendMessage()
              }
            }}
            placeholder="Ask about your learning, career, or next stepâ€¦"
            rows={1}
            aria-label="Message your AI mentor"
            disabled={typing}
          />

          <div className="composer-actions">
            <span>
              AI guidance grounded in your learning journey
            </span>

            <div>
              <button
                className="icon-button"
                title="Attach a file"
                aria-label="Attach a file"
                onClick={() =>
                  notify('File attachments are not connected yet.')
                }
              >
                <Plus size={17} />
              </button>

              <button
                className="send-message"
                disabled={!value.trim() || typing}
                aria-label="Send message"
                onClick={() => void sendMessage()}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>(appNotifications); const notify = useToast()
  const markRead = (id: string) => setItems((list) => list.map((item) => item.id === id ? { ...item, unread: false } : item))
  const unreadCount = items.filter((item) => item.unread).length
  const groups = [...new Set(items.map((item) => item.group))]
  const icons = { course: BookOpen, certificate: Award, mentor: WandSparkles, streak: Flame }
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">YOUR LEARNING, IN THE LOOP</div><h1>Notifications {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}</h1><p>Updates about your learning, achievements, and next steps.</p></div><Button variant="outline" onClick={() => setItems((list) => list.map((item) => ({ ...item, unread: false })))}><Check size={14} /> Mark all as read</Button></div><div className="notification-groups">{groups.map((group) => <section key={group}><div className="notification-group-title"><h2>{group}</h2><span>{items.filter((item) => item.group === group).length}</span></div><Card className="notification-group-card">{items.filter((item) => item.group === group).map((item) => { const Icon = icons[item.kind]; return <article className={`notification-item ${item.unread ? 'unread' : ''}`} key={item.id}><span className={`notification-item-icon notification-${item.kind}`}><Icon size={17} /></span><div className="notification-item-copy"><div><strong>{item.title}</strong>{item.unread && <i />}</div><p>{item.description}</p><time>{item.date}</time></div><div className="notification-actions">{item.unread && <button onClick={() => markRead(item.id)}>Mark read</button>}<button className="icon-button" aria-label={`Delete notification: ${item.title}`} onClick={() => { setItems((list) => list.filter((candidate) => candidate.id !== item.id)); notify('Notification removed') }}><Trash2 size={14} /></button></div></article> })}</Card></section>)}</div>{items.length === 0 && <EmptyState icon={<CheckCircle2 size={18} />} title="Youâ€™re all caught up" description="New course updates and achievements will show up here." />}</div>
}

export function ProfilePage() {
  const [saved, setSaved] = useState(false); const [weeklyGoal, setWeeklyGoal] = useState(7); const notify = useToast()
  return <div className="learner-page animate-enter"><div className="page-heading"><div><div className="eyebrow">YOUR SPACE, YOUR SETTINGS</div><h1>Profile & settings</h1><p>Keep your learning profile current and make SkillForge work for you.</p></div>{saved && <Badge tone="success"><Check size={12} /> Changes saved</Badge>}</div><div className="profile-layout"><aside className="profile-nav"><a className="selected" href="#profile"><UserRound size={15} /> Profile</a><a href="#goals"><Target size={15} /> Learning goals</a><a href="#preferences"><Filter size={15} /> Preferences</a><a href="#privacy"><LockKeyhole size={15} /> Privacy & security</a></aside><main className="profile-content"><Card className="profile-card" id="profile"><div className="card-heading"><div><h2>Personal profile</h2><span>Help your mentor tailor advice to your goals</span></div><Button variant="outline" size="sm" onClick={() => { setSaved(true); notify('Profile changes saved') }}>Save changes</Button></div><div className="profile-person"><Avatar name={learner.name} size="lg" /><div><strong>{learner.name}</strong><span>Member since {learner.joined}</span></div><Button variant="ghost" size="sm" onClick={() => notify('Profile photo upload is ready')}>Change photo</Button></div><div className="profile-form-grid"><Input label="Full name" defaultValue={learner.name} /><Input label="Email address" type="email" defaultValue={learner.email} /><Input label="Current role or focus" defaultValue={learner.role} /><Select label="Career goal" defaultValue="Product designer"><option>Product designer</option><option>UX researcher</option><option>Design systems designer</option><option>Frontend engineer</option></Select><Textarea className="profile-bio" label="About you" defaultValue="Iâ€™m a curious designer who loves making complex things feel simple. Currently building skills in interaction design and accessibility." rows={3} /></div></Card><Card className="profile-card" id="goals"><div className="card-heading"><div><h2>Learning goals</h2><span>Set a pace that feels sustainable</span></div><Badge tone="warning"><Flame size={11} /> 12-day streak</Badge></div><div className="goal-setting"><div><strong>Weekly learning target</strong><span>Hours per week</span></div><div className="goal-stepper"><button onClick={() => setWeeklyGoal((goal) => Math.max(1, goal - 1))} aria-label="Decrease weekly learning goal">âˆ’</button><strong>{weeklyGoal} <small>hrs</small></strong><button onClick={() => setWeeklyGoal((goal) => Math.min(40, goal + 1))} aria-label="Increase weekly learning goal">+</button></div></div><div className="goal-setting"><div><strong>Learning reminders</strong><span>Choose a time that works for you</span></div><Select aria-label="Learning reminder time" defaultValue="9:00 AM"><option>8:00 AM</option><option>9:00 AM</option><option>12:00 PM</option><option>6:00 PM</option></Select></div></Card><Card className="profile-card" id="preferences"><div className="card-heading"><div><h2>Preferences</h2><span>Make your workspace feel right</span></div></div>{[{ title: 'Weekly progress email', text: 'A Sunday recap of the skills you practiced.', checked: true }, { title: 'Course recommendations', text: 'Get learning picks based on your career goal.', checked: true }, { title: 'Public learner profile', text: 'Let others see your skills and earned certificates.', checked: false }].map((item) => <label className="settings-toggle-row" key={item.title}><span><strong>{item.title}</strong><small>{item.text}</small></span><input type="checkbox" defaultChecked={item.checked} /></label>)}</Card><Card className="profile-card" id="privacy"><div className="card-heading"><div><h2>Privacy & security</h2><span>Your information belongs to you</span></div><LockKeyhole size={17} /></div><button className="security-row" onClick={() => notify('Password update flow opened')}><span><strong>Change password</strong><small>Last updated more than 90 days ago</small></span><ChevronRight size={15} /></button><button className="security-row" onClick={() => notify('Data export requested. Weâ€™ll email you when it is ready.')}><span><strong>Download your learning data</strong><small>Export your course, assessment, and skills history</small></span><Download size={15} /></button></Card></main></div></div>
}

