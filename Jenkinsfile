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
                sh '''
                  set -eu   
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Tests') {
            steps {
                sh '''
                  export TEST_USERNAME="${TEST_CRED_USR}"
                  export TEST_PASSWORD="${TEST_CRED_PSW}"
                    npx playwright test
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                  set -eu   
                    npx allure generate ./allure-results --clean -o ./allure-report
                '''
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
