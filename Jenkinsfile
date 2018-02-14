pipeline {
    agent any
    
    environment {
        VISEO = '1'
        NODE_ENV = 'development'
    }
    
    stages {
        stage('Preparation') { 
            steps {
                git branch: 'master', url: 'https://github.com/viseo-asia/blockchain-civic-demo.git'
                script {
                    sh 'printenv'
                    sh 'git rev-parse HEAD > .git/commit-id'
                }
            }
        }
        stage('Build') {
            steps {
                withDockerContainer(image: 'node:8.9.4-alpine') {
                    sh 'yarn install'
                    sh 'printenv'
                    script {
                        commit_id = readFile('.git/commit-id')
                    }
                    echo "COMMIT ID: ${commit_id}"
                    sh 'npm test'
                }
            }
        }
    }
}