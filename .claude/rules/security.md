# 秘密情報の取り扱い

- API キー・トークン・パスワードをコードにハードコードしない
- 秘密情報は `.env` に格納 (`.gitignore` 済み)
- `.env`, `.env.local`, `credentials.json` 等をコミット・ステージングしない
- 環境変数は `NEXT_PUBLIC_` プレフィックスの有無でクライアント公開範囲を意識する
- `.env.example` にはダミー値のみ記載
