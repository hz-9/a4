#!/bin/bash

cd ../../

for dir in ./library/*/docs/guide; do  
  # 输出匹配到的文件路径  
  echo "Dir: $dir"

  # 批量拷贝进入文件
  cp ./.sidebar.json "$dir/.sidebar.json"
done
