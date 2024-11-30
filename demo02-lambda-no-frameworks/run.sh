# 1. criar arquivo de politicas de seguranças
# 2. criar o arquivo
# 3. zipar o projeto
# 4. criar a lambda com a política o zip

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs22.x
FUNCTION_NAME=hello-cli

# manter um log de cada execução
mkdir -p logs

# cria uma política para a lambda
aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://policies.json \
    | tee logs/1.role.log

POLICE_ARN="arn:aws:iam::341244262487:role/lambda-example"


# zipa o arquivo index
zip function.zip index.js


# cria a lambda attachando a política
aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime $NODEJS_VERSION \
    --role $POLICE_ARN \
    | tee logs/2.lambda-create.log

# Invoca a lambda 

# sem body
aws lambda invoke \
    --function-name $FUNCTION_NAME logs/3.lambda-exec.log \
    --log-type Tail \
    --query 'LogResult' \
    --output text | base64 -d 

# com body
aws lambda invoke \
    --function-name $FUNCTION_NAME logs/5.lambda-exec-payload.log \
    --log-type Tail \
    --query 'LogResult' \
    --cli-binary-format raw-in-base64-out \
    --payload '{"name": "Edson Martins"}' \
    --output text | base64 -d 

# atualizar função já existente
zip function.zip index.js

aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name $FUNCTION_NAME \
    --publish \
    | tee logs/4.lambda-update.log


# deletar function
aws lambda delete-function \
    --function-name $FUNCTION_NAME \
    | tee logs/6.lambda-delete.log

# deletar role
aws iam delete-role --role-name $ROLE_NAME