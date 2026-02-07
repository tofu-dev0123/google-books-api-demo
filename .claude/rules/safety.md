# 危険コマンドの禁止

- `rm -rf` の禁止 (特にルートや `src/` 配下)
- `git push --force` の禁止 (`main` ブランチへは特に厳禁)
- `git reset --hard` の禁止
- `git checkout .` / `git restore .` で未コミット変更を破棄しない
- `drop`, `delete`, `truncate` 等のデータ破壊操作を実行しない
- `--no-verify` フラグを使用しない
