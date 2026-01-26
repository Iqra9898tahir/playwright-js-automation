pipeline {
    agent any

    environment {
        // Adjust Node path if needed
        NODE_HOME = "C:\\Program Files\\nodejs"
        PATH = "${env.NODE_HOME};${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running regression tests...'
                bat 'npm run Regression'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report...'
                bat 'npm run allure:generate'
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Archiving reports...'
                // Archive Playwright HTML reports
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                // Archive Allure reports
                archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
                // Publish Allure HTML report inside Jenkins
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                             reportDir: 'allure-report', reportFiles: 'index.html', reportName: 'Allure Report'])
            }
        }
    }

    post {
        always {
            echo 'Cleaning downloads folder...'
            bat 'rmdir /S /Q downloads || echo downloads folder not present'
        }
    }
}
