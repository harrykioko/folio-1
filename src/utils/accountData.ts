
import { Account } from "./accountTypes";

export const accountsData: Account[] = [
  {
    id: 1,
    name: "Company Website Domain",
    type: "Domain",
    url: "https://example.com",
    username: "admin@example.com",
    password: "password123",
    expiryDate: "2024-12-01",
    projectId: 1,
    projectName: "Company Website",
    hostedOn: "Namecheap",
    renewalCost: 14.99
  },
  {
    id: 2,
    name: "GitHub Organization",
    type: "Repository",
    url: "https://github.com/exampleorg",
    username: "devteam",
    password: "password123",
    projectId: 1,
    projectName: "Company Website"
  },
  {
    id: 3,
    name: "Company Twitter",
    type: "SocialMedia",
    platform: "Twitter",
    url: "https://twitter.com/examplecompany",
    username: "examplecompany",
    password: "password123",
    projectId: 2,
    projectName: "Social Media Campaign"
  },
  {
    id: 4,
    name: "Analytics Platform",
    type: "Service",
    url: "https://analytics.example.com",
    username: "admin@example.com",
    password: "password123",
    expiryDate: "2024-07-15",
    monthlyCost: 49.99
  },
  {
    id: 5,
    name: "Instagram Business Account",
    type: "SocialMedia",
    platform: "Instagram",
    url: "https://instagram.com/examplecompany",
    username: "examplecompany",
    password: "password123",
    projectId: 2,
    projectName: "Social Media Campaign"
  },
  {
    id: 6,
    name: "CRM Platform",
    type: "Service",
    url: "https://crm.example.com",
    username: "sales@example.com",
    password: "password123",
    expiryDate: "2023-12-01", // expired
    monthlyCost: 99.99
  },
  {
    id: 7,
    name: "Customer Support Email",
    type: "Email",
    url: "https://mail.example.com",
    username: "support@example.com",
    password: "password123",
    projectId: 3,
    projectName: "Customer Support Portal"
  },
  {
    id: 8,
    name: "LinkedIn Company Page",
    type: "SocialMedia",
    platform: "LinkedIn",
    url: "https://linkedin.com/company/example",
    username: "hr@example.com",
    password: "password123",
    projectId: 2,
    projectName: "Social Media Campaign"
  },
  {
    id: 9,
    name: "Project Management Tool",
    type: "Service",
    url: "https://tasks.example.com",
    username: "team@example.com",
    password: "password123",
    expiryDate: "2024-06-01", // expires soon
    monthlyCost: 29.99
  },
  {
    id: 10,
    name: "Development API",
    type: "Service",
    url: "https://api.example.com",
    username: "apiuser",
    password: "password123",
    projectId: 1,
    projectName: "Company Website"
  }
];
