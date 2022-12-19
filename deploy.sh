#!/bin/bash
rm -f dist.tar.gz
tar zcf dist.tar.gz dist
scp dist.tar.gz ali:/www/
