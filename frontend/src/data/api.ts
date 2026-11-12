import { activity, adminReviews, adminUsers, appNotifications, assessments, careers, certificates, courses, learner, learnerStats, learningAnalytics, projects, skillCatalog, skills, weeklyLearning, type Assessment, type Career, type Course, type Project, type Skill } from './mockData'

export type DashboardData = { learner: typeof learner; stats: typeof learnerStats; weeklyLearning: typeof weeklyLearning; activity: typeof activity }

export interface SkillForgeApi {
  getDashboard(): Promise<DashboardData>
  getSkills(): Promise<Skill[]>
  getSkillCatalog(): Promise<string[]>
  getCareers(): Promise<Career[]>
  getCourses(): Promise<Course[]>
  getAssessments(): Promise<Assessment[]>
  getProjects(): Promise<Project[]>
  getCertificates(): Promise<typeof certificates>
  getNotifications(): Promise<typeof appNotifications>
  getAdminUsers(): Promise<typeof adminUsers>
  getAdminReviews(): Promise<typeof adminReviews>
  getLearningAnalytics(): Promise<typeof learningAnalytics>
}

export const mockSkillForgeApi: SkillForgeApi = {
  async getDashboard() { return { learner, stats: learnerStats, weeklyLearning, activity } },
  async getSkills() { return skills },
  async getSkillCatalog() { return skillCatalog },
  async getCareers() { return careers },
  async getCourses() { return courses },
  async getAssessments() { return assessments },
  async getProjects() { return projects },
  async getCertificates() { return certificates },
  async getNotifications() { return appNotifications },
  async getAdminUsers() { return adminUsers },
  async getAdminReviews() { return adminReviews },
  async getLearningAnalytics() { return learningAnalytics },
}
