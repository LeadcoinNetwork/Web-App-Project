echo try delete old docker
(sudo docker rmi $(docker images --filter "dangling=true" -q --no-trunc)) || true
