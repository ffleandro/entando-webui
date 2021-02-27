#!/bin/bash
(
  trap 'exit 0' SIGTERM
  source ~/.bashrc

  cd /home/jboss
  while true; do
    echo "> Starting reverse proxy.." 1>&2
    npm run start -- --port=8080
    echo "> Reverse proxy closed, relaunching in 3 seconds.." 1>&2
    sleep 3
  done
) &>/tmp/revproxy.log &

trap 'exit 0' SIGTERM
exec "${STI_SCRIPTS_PATH}/run"
