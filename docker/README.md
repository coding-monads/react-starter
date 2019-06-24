# Standalone and persistent mongo database

Instalation steps:

1. Install docker
1. Install docker compose
1. Run comand

        docker-compose -f devenv.yml up -d

1. To stop mongo db run

        docker-compose -f devenv.yml down -d

1. Check status

        docker-compose -f devenv.yml ps