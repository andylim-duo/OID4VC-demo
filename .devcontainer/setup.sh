#!/bin/bash

# Prepare needed tools for build/configuration of Sphereon system
echo -e "\n--> Downloading and installing newer version of sed ...\n"
cd $HOME
wget https://ftp.gnu.org/gnu/sed/sed-4.9.tar.gz
tar -xzf sed-4.9.tar.gz
cd sed-4.9
./configure
make
sudo make install
which sed
echo "--> Sed install complete"

# Configure and build Sphereon demo containers
echo -e "\n--> Configuring Sphereon containers ...\n"
cd /workspaces/OID4VC-demo/docker/compose/build
./install-configs.sh sphereon http://localhost:5000

echo -e "\n--> Building Sphereon containers ...\n"
docker compose build
docker images
echo -e "\n--> Container build complete.\n"
echo -e "--> To run the applications execute 'cd docker/build/compose && docker compose up'\n\n"


