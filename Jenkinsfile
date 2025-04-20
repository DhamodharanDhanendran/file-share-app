pipeline {
    agent any

    environment {
        APP_NAME = "file-share-app"
        TARGET_HOST = "ubuntu@44.202.142.41"
        TARGET_KEY = "Jenkins_controller.pem"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Push Docker Image to Registry') {
            steps {
                script {
                    // If you're using Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker tag file-share-app_app $DOCKER_USER/file-share-app:latest
                            docker push $DOCKER_USER/$APP_NAME:latest
                        '''
                    }
                }
            }
        }

        stage('Deploy to EC2 Target') {
            steps {
                sh '''
                    ssh -o StrictHostKeyChecking=no -i $TARGET_KEY $TARGET_HOST '
                    docker pull $DOCKER_USER/$APP_NAME:latest &&
                    docker stop $APP_NAME || true &&
                    docker rm $APP_NAME || true &&
                    docker run -d --name $APP_NAME -p 5000:5000 $DOCKER_USER/$APP_NAME:latest
                    '
                '''
            }
        }
    }
}
