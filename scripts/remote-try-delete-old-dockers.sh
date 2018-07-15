echo try delete old docker
(sudo docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)) || true
