pipeline {
  agent any
  environment {
    ECR_REGISTRY = '307357283272.dkr.ecr.us-east-1.amazonaws.com'
    IMAGE_NAME   = 'my-app'
    IMAGE_TAG    = "${BUILD_NUMBER}"
    APP_SERVER   = 'ubuntu@98.93.106.48'
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
        url: 'https://github.com/umarfaruq21/jenkins-cicd-aws.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${ECR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
        }
      }
    }
    stage('Push to ECR') {
      steps {
        script {
          sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
          dockerImage.push()
          dockerImage.push('latest')
        }
      }
    }
    stage('Deploy to App Server') {
      steps {
        sshagent(['app-server-ssh']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
              aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_REGISTRY}
              docker pull ${ECR_REGISTRY}/${IMAGE_NAME}:latest
              docker stop my-app || true
              docker rm my-app || true
              docker run -d --name my-app -p 80:3000 ${ECR_REGISTRY}/${IMAGE_NAME}:latest
            '
          """
        }
      }
    }
  }
  post {
    success { echo 'Deployment succeeded!' }
    failure { echo 'Pipeline failed — check logs.' }
  }
}
