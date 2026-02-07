# コードスタイル・Lint

- Prettier 設定を遵守: ダブルクォート、セミコロンあり、trailing comma (all)、80 文字幅、2 スペースインデント
- コード変更後は `npm run format` を実行
- `npm run lint` でエラーゼロを維持
- Tailwind クラスは `cn()` で結合 (`@/lib/utils`)
- `prettier-plugin-tailwindcss` によるクラス自動ソートに任せる
- shadcn/ui コンポーネントは `npx shadcn@latest add <name>` で追加し、手動作成しない
