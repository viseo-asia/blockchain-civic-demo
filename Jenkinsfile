node {
    def commit_id

    stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile(".git/commit-id").trim()
    }

    stage('Test') {
        def image = docker.image('node:8.9.3-alpine')
        image.pull()
        image.inside {
            sh 'npm install'
            sh 'npm test'
        }
    }
    
}