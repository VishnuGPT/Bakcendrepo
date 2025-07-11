pipeline {
    agent any

    tools {
        nodejs 'Node24.0.10'  // Must match the name you set in Jenkins
    }

    environment {
        // Optional: load env vars manually
        // PORT = '3000'
    }

    stages {
        stage('Clone') {
            steps {
                echo '✅ Cloning repository...'
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo '🚀 Build completed!'
            }
        }
    }

    post {
        success {
            echo '✅ Build succeeded!'
        }

        failure {
            echo '❌ Build failed. Sending email...'
            emailext(
                subject: '🚨 Jenkins Build Failed: ${JOB_NAME} #${BUILD_NUMBER}',
                body: """
                    Hi team,

                    The Jenkins job *${JOB_NAME}* failed at build #${BUILD_NUMBER}.
                    Check the logs here: ${BUILD_URL}

                    💥 Error occurred in branch: ${BRANCH_NAME}
                """,
                to: 'you@example.com, teammate@gmail.com'
            )
        }
    }
}
