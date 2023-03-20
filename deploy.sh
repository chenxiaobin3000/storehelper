#!/bin/bash
tar zcf dist.tar.gz dist
scp dist.tar.gz ali:/www/
rm -f dist.tar.gz
