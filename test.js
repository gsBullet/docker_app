
/*

# create container 
docker build -t basic_node_app:v4 .
docker run -p 8001:6001 basic_node_app:v4
## create mongodb with network
docker network create basic_node_app_network

docker run --name basic_node_app_mongodb_container --network  basic_node_app_network -p 28017:27017 -d mongo

# volume for uploads 
docker run --name basic_node_app_v3_container --network  basic_node_app_network -p 8002:6001 -v /home/devops/Desktop/testcase/dockerproject/basic1/uploads:/var/www/basic_node_app/uploads -d basic_node_app:v3


 */