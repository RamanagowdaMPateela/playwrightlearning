pipeline {
    agent any
    tools {
        nodejs "node24"   // Make sure you configured NodeJS 22 in Jenkins global tools
        allure "allure"      // Make sure you configured Allure in Jenkins global tools
    }
    options {
        timeout(time: 30, unit: 'MINUTES')   // Job timeout
    }

    environment {
        TEST_CRED= credentials('e2e-test-user')       // Use Jenkins credentials binding
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/RamanagowdaMPateela/playwrightlearning.git'
            }
        }

        stage('Build') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Tests') {
            steps {
                bat 'npm run test:loginPOM'
            }
        }

        stage('Generate Allure Report') {
            steps {
                
                 bat 'npx allure generate ./allure-results --clean -o ./allure-report'
                
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
        }
        failure {
            echo 'Build failed. Check logs and reports.'
        }
    }
}
