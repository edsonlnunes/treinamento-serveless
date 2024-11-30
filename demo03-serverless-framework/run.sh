# instalar
npm i -g serverless@3.16.0

# sls ou serverless para inicializar
sls 
# foi escolhido o HTTP API template
# não foi usado org
# deploy - yes


# sempre que mudar o código, usar o
sls deploy


# traz os endereços e informações sobre as funções
sls info

# invocar local
sls invoke local -f hello

# invocar em prod
sls invoke -f hello

# destruir ambiente
sls remove