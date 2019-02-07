#!/usr/bin/env bash
STAGE=$1
aws s3 cp s3://3box-dapp-"$STAGE".3box.io/service-worker.js s3://3box-dapp-"$STAGE".3box.io/service-worker.js --metadata-directive REPLACE --cache-control no-cache,no-store,must-revalidate --expires 0 --content-type application/javascript --acl public-read
aws s3 cp s3://3box-dapp-"$STAGE".3box.io/index.html s3://3box-dapp-"$STAGE".3box.io/index.html --metadata-directive REPLACE --cache-control no-cache,no-store,must-revalidate --expires 0 --content-type text/html --acl public-read
