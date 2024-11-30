# cria bucket
aws s3api create-bucket --bucket ed-hello-bucket

# upload local > s3
# se não passar o nome do arquivo depois do nome do bucket por padrão vai o nome do arquivo
aws s3 cp hello-world.txt s3://ed-hello-bucket/hello-world.txt

# download s3 > local
aws s3 cp s3://ed-hello-bucket/hello-world.txt h.txt

# delata tudo do bucket
aws s3 rm s3://ed-hello-bucket --recursive

# deleta bucket
aws s3api delete-bucket --bucket ed-hello-bucket