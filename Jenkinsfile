#!groovy

/*
 * Copyright (C) 2020 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// https://www.jenkins.io/doc/tutorials/create-a-pipeline-in-blue-ocean/

pipeline {
    // agent any
    agent {
        docker {
            // https://www.debian.org/releases: Bullseye = Debian 11
            image 'node:20.0.0-bullseye'
            // https://stackoverflow.com/questions/62330354/jenkins-pipeline-alpine-agent-apk-update-error-unable-to-lock-database-permis
            // https://stackoverflow.com/questions/42630894/jenkins-docker-how-to-control-docker-user-when-using-image-inside-command/51986870#51986870
            // https://stackoverflow.com/questions/42743201/npm-install-fails-in-jenkins-pipeline-in-docker
            args '--publish 3000:3000 --publish 5000:5000'
            // fuer "apt-get install ..."
            args '--user root:root'

            // node:...-bullseye : in /etc/passwd gibt es "node" mit uid=1000
            //args '--user 1000:1000'
        }
    }

    // Umgebungsvariable:
    environment {
        // Cloud:
        DB_HOST = 'unknown.amazonaws.com'
        DB_USER = 'nobody'
        DB_PASS = 'ChangeMe'
        DB_POPULATE = true

        LOG_DIR = './log'
        LOG_LEVEL_CONSOLE = 'debug'
        MAIL_HOST = 'skip'
        USER_PASSWORD_ENCODED = '$argon2i$v=19$m=4096,t=3,p=1$aaxA2v/9rRSPGkwYN+NQog$27Huii1XtD3iEd62fog+04G26LRPZMHoYCI6AGKTL8M'
    }

    options {
      // Timeout fuer den gesamten Job
        timeout time: 60, unit: 'MINUTES'
    }

    stages {
        // Stage = Logisch-zusammengehoerige Aufgaben der Pipeline:
        // zur spaeteren Visualisierung
        stage('Init') {
            // Step = einzelne Aufgabe
            steps {
                script {
                    if (!isUnix()) {
                        error 'Unix ist erforderlich'
                    }
                }

                echo "Jenkins-Job ${env.JOB_NAME} #${env.BUILD_ID} mit Workspace ${env.WORKSPACE}"

                // Unterverzeichnisse src und test im WORKSPACE loeschen: vom letzten Build
                // Kurzform fuer: sh([script: '...'])
                sh 'rm -rf src'
                sh 'rm -rf __tests__'
                sh 'rm -rf node_modules'
                sh 'rm -rf dist'
                sh 'rm -rf .extras/doc/api'

                // https://www.jenkins.io/doc/pipeline/steps/git
                // "named arguments" statt Funktionsaufruf mit Klammern
                git url: 'https://github.com/Vvalentin/film.git', branch: 'main', poll: true
            }
        }

        stage('Install') {
            steps {
                // https://stackoverflow.com/questions/51416409/jenkins-env-node-no-such-file-or-directory
                // https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
                // https://www.debian.org/distrib/packages
                // https://packages.debian.org/buster/nodejs
                sh 'id'
                sh 'cat /etc/passwd'
                sh 'echo $PATH'
                sh 'pwd'
                sh 'uname -a'
                //sh 'lsb_release -a'
                sh 'cat /etc/os-release'
                sh 'cat /etc/debian_version'

                // https://packages.debian.org/stable/python/python3
                // https://packages.debian.org/bullseye/python3
                // https://computingforgeeks.com/how-to-install-python-on-debian-linux
                // https://cloudcone.com/docs/article/how-to-install-python-3-10-on-debian-11
                // https://linuxhint.com/install-python-debian-10
                // https://computingforgeeks.com/how-to-install-python-on-debian-linux
                sh 'apt-get install --no-install-recommends --yes --show-progress gcc g++ make python3-minimal'
                sh 'python3 --version'

                sh 'curl --silent --fail --show-error --location https://deb.nodesource.com/setup_20.x | bash -; apt-get install --no-install-recommends --yes --show-progress nodejs'
                sh 'node --version'
                sh 'npm i -g npm'
                sh 'npm --version'

                sh 'apt-get update --yes'
                sh 'apt-get upgrade --yes'

                script {
                    if (!fileExists("${env.WORKSPACE}/package.json")) {
                        error "package.json ist *NICHT* in ${env.WORKSPACE} vorhanden"
                    }
                }

                // /var/jenkins_home ist das Homedirectory vom User "jenkins"
                // /var/jenkins_home/workspace/film (siehe "pwd" oben)
                sh 'cat package.json'

                // npm help install
                // Konfigurationsverzeichnis /root/.npm
                sh 'npm install --no-fund'

                // ci (= clean install) mit package-lock.json
                // sh 'npm ci --no-fund'
                // sh "npm uninstall --save-dev ..."
                // sh "npm install --save-dev ... --no-fund"
            }
        }

        stage('Compile') {
            steps {
                sh 'npx tsc --version'
                // TODO Warum funktioniert npx nicht?
                sh './node_modules/.bin/tsc'
            }
        }

        stage('Test, Codeanalyse, Security, Dok.') {
            steps {
                parallel(
                    'Test': {
                        echo 'TODO: Rechnername/IP-Adresse des DB-Servers fuer Tests konfigurieren'
                        //sh 'npm run test:coverage'
                    },
                    'ESLint': {
                        sh 'npx eslint --version'
                        sh 'npm run eslint'
                    },
                    'Security Audit': {
                        sh 'npm audit --omit=dev'
                    },
                    'AsciiDoctor': {
                        sh 'npx asciidoctor --version'
                        sh 'npm run asciidoctor'
                    },
                    'reveal.js': {
                        sh 'npx asciidoctor-revealjs --version'
                        sh 'npm run revealjs'
                    },
                    'TypeDoc': {
                        sh 'npx typedoc --version'
                        sh 'npm run typedoc'
                    }
                )
            }

            post {
                always {
                  echo 'TODO: Links fuer Coverage und TypeDoc'
                  //publishHTML target : [
                  //  reportDir: 'coverage',
                  //  reportFiles: 'index.html',
                  //  reportName: 'Coverage (Istanbul)',
                  //  reportTitles: 'Coverage'
                  //]

                  publishHTML (target : [
                      reportDir: '.extras/doc/entwicklerhandbuch/html',
                      reportFiles: 'entwicklerhandbuch.html',
                      reportName: 'Entwicklerhandbuch',
                      reportTitles: 'Entwicklerhandbuch'
                  ])

                  publishHTML target : [
                      reportDir: '.extras/doc/folien',
                      reportFiles: 'folien.html',
                      reportName: 'Folien (reveal.js)',
                      reportTitles: 'reveal.js'
                  ]

                  publishHTML target : [
                      reportDir: '.extras/doc/api',
                      reportFiles: 'index.html',
                      reportName: 'TypeDoc',
                      reportTitles: 'TypeDoc'
                  ]
                }

                success {
                    script {
                        if (fileExists("${env.WORKSPACE}/film.zip")) {
                            sh 'rm film.zip'
                        }
                    }
                    // https://www.jenkins.io/doc/pipeline/steps/pipeline-utility-steps/#zip-create-zip-file
                    zip zipFile: 'film.zip', archive: false, dir: 'dist'
                    // jobs/film/builds/.../archive/film.zip
                    archiveArtifacts 'film.zip'
                }
            }
        }

        stage('Docker Image bauen') {
            steps {
                // Docker-Installation und laufender Docker-Daemon erforderlich
                echo 'TODO: dockerd starten, dann Docker-Image bauen'
                // sh 'docker buildx build --tag juergenzimmermann/film:2023.1.0 .'
            }
        }

        stage('Deployment fuer Kubernetes') {
            steps {
                echo 'TODO: Deployment fuer Kubernetes mit z.B. Ansible'
            }
        }
    }
}
