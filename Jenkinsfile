node {
    def commit_id

    stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readfile(".git/commit-id").trim()
    }
    
}