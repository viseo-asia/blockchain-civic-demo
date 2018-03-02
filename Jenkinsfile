pipeline {
    agent any
    
    environment {
        // NODE_ENV is dev for testing first, will prune dev dependencies before deploy.
        NODE_ENV = 'development'
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
                    sh 'npm run ci-test-coverage'
                    sh 'npm run ci-test-report'
                }
                script {
                    scannerHome = tool 'sonarqube';
                }
                withSonarQubeEnv('sonarqube') {
                    script {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                script {
                    qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
                    if (qg.status != 'OK') {
                       error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo "Git commit ID: ${commit_id}"
                script {
                    // the ${commit_id} tag seems to chop off anything trailing, so we build and tag seperately
                    sh "docker build -t viseo/civic-app ."
                    sh "docker tag viseo/civic-app local.dtr/viseo/civic-app:latest"
                    sh "docker tag viseo/civic-app local.dtr/viseo/civic-app:${commit_id}"

                }
            }
        }

        stage('Push') {
            steps {
                withDockerRegistry(url: 'https://local.dtr', credentialsId: 'dtr-credentials') {
                    // latest tag is not auto, so need to push twice - each layer is uploaded only once though (no double upload)
                    sh "docker push local.dtr/viseo/civic-app:latest"
                    sh "docker push local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker service update civic_web --detach=true --image local.dtr/viseo/civic-app:latest"
                    // sh "docker service update civic_web --detach=true --image local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

    }
}
