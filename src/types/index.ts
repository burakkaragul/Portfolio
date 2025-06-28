export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string;
}

export interface Message {
  id?: number;
  name: string;
  email: string;
  content: string;
  createdAt?: Date;
} 