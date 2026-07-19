# Jenkins CI/CD Pipeline on AWS

Automated deployment pipeline: git push → Jenkins → Docker → ECR → EC2

## Architecture
git push → GitHub webhook → Jenkins EC2
↓
Docker build
↓
Push to ECR
↓
Deploy to App Server EC2
↓
Live App 🚀

## Tech Stack
![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white)

## Pipeline Stages
1. **Checkout** — pulls latest code from GitHub main branch
2. **Build Docker Image** — builds and tags image with build number
3. **Push to ECR** — pushes versioned image to Amazon ECR
4. **Deploy to App Server** — SSH pulls and runs container on port 80

## What I Built
- Self-hosted Jenkins on EC2 using Java 21 + WAR file method
- IAM role-based auth — zero hardcoded AWS credentials
- GitHub webhook triggers pipeline on every push to main
- Docker images tagged with Jenkins build number for rollback
- SSH agent-based deployment from Jenkins EC2 to app server EC2

## Key Problems Solved
- Jenkins repo GPG key failure on Ubuntu 26.04 → WAR file workaround
- Java version conflict (Jenkins required 21, only 17 available) → manual JDK install
- Docker socket permission denied on app server → chmod 666 fix
- Jenkins node offline due to disk threshold → Script Console fix

## Setup Guide
Full step-by-step rebuild guide included in:
[project3-jenkins-cicd-aws.md](./project3-jenkins-cicd-aws.md)

## Result
Deployment time: 30+ min manual → under 3 min automated (10× faster)

---
**Author:** Shaik Mahammad Umar Faruq | [LinkedIn](https://linkedin.com/in/umarfaruq21)
