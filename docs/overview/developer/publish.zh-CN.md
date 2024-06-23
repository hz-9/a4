# 版本发布操作

在发布 `A4` 时，应按照以下操作进行：

```sh
# 执行全局打包
rush build

# 填写更新内容
rush change

# 更新版本策略 - 将补丁版本号增加 0.0.1
rush version --override-bump patch --bump 

# 更新版本策略 - 将补丁版本号增加 0.0.1（仅更新 hz9 版本策略的依赖）
rush version --override-bump patch --bump \
  --version-policy hz9 

# 更新版本策略 - 将补丁版本号增加 0.0.1（设置测试标签）
rush version --override-bump patch --bump \
  --version-policy hz9 
rush version --override-bump patch \
  --ensure-version-policy --override-prerelease-id test.1 \
  --version-policy hz9 

rush version --override-bump patch --bump \
  --version-policy a4 
rush version --override-bump patch \
  --ensure-version-policy --override-prerelease-id test.1 \
  --version-policy a4 

# 更新版本策略 - 将次要版本号增加 0.1.0
rush version --bump --override-bump minor

# 更新版本策略 - 将次要版本号增加 0.1.0（仅更新 hz9 版本策略的依赖）
rush version --bump --override-bump minor \
  --version-policy hz9

# 提交更改并发布
git add . && \
git commit -m 'chore: bump versions [skip ci]' && \
rush publish --publish \
             --target-branch master \
             --add-commit-details \
             --ignore-git-hooks \
             --include-all

# 测试发布（不提交到 Git，仅影响测试 npm 标签）
rush publish --publish \
             --add-commit-details \
             --ignore-git-hooks \
             --include-all \
             --tag test

```

::: warning
`@hz-9/*`、`@hz-9/a4-*` 的版本不同步。
:::
