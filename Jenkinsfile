pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
    }
    
    stages {

        stage('Preparation') { 
            steps {
                git branch: 'master', url: 'https://github.com/viseo-asia/blockchain-civic-demo.git'
                script {
                    // sh 'printenv'
                    sh 'git rev-parse HEAD > .git/commit-id'
                }
            }
        }
        
        stage('Test') {
            steps {
                withDockerContainer(image: 'node:8.9.4-alpine') {
                    sh 'yarn install'
                    // sh 'printenv'
                    script {
                        commit_id = readFile('.git/commit-id')
                    }
                    echo "COMMIT ID: ${commit_id}"
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                echo "Git commit ID: ${commit_id}"
                script {
                    sh 'docker build -t viseo-asia/civic-app .'
                    sh "docker tag viseo-asia/civic-app local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

        stage('Push') {
            steps {
                withDockerRegistry(url: 'https://local.dtr', credentialsId: 'dtr-credentials') {
                    sh "docker push local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker service update civic_web --detach=true --image local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

        // https://stackoverflow.com/questions/42909439/using-waitforqualitygate-in-a-jenkins-declarative-pipeline
    }
}
