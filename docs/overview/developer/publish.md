# Version Release Operations

When publish `A4`, the following operations should be followed:

```sh
# Perform global packaging
rush build

# Fill in the update content
rush change

# Update version policy - Increment patch version by 0.0.1
rush version --override-bump patch --bump 

# Update version policy - Increment patch version by 0.0.1 (only update hz9 version policy dependencies)
rush version --override-bump patch --bump \
  --version-policy hz9 

# Update version policy - Increment patch version by 0.0.1 (set test tag)
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

# Update version policy - Increment minor version by 0.1.0
rush version --bump --override-bump minor

# Update version policy - Increment minor version by 0.1.0 (only update hz9 version policy dependencies)
rush version --bump --override-bump minor \
  --version-policy hz9

# Commit changes and publish
git add . && \
git commit -m 'chore: bump versions [skip ci]' && \
rush publish --publish \
             --target-branch master \
             --add-commit-details \
             --ignore-git-hooks \
             --include-all

# Test release (does not commit to Git, only affects the test npm tag)
rush publish --publish \
             --add-commit-details \
             --ignore-git-hooks \
             --include-all \
             --tag test

```

::: warning
Versions of `@hz-9/*`, `@hz-9/a4-*` are not synchronized.
:::
