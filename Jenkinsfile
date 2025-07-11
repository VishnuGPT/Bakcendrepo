pipeline {
    agent any

    tools {
        nodejs 'Node24.0.10'  // Match the name you configured in Global Tools
    }

    environment {
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test' // Or your actual test command
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' // Optional: Only if your app builds
            }
        }
    }

    post {
        failure {
            mail to: 'your-email@gmail.com',
                 subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "View the log: ${env.BUILD_URL}"
        }
    }
}
