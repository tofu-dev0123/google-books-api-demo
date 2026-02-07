# CLAUDE.md

## コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — プロダクションビルド
- `npm run lint` — ESLint 実行
- `npm run format` — Prettier でフォーマット
- `npm run format:check` — フォーマットチェック（CI 向け）

## 技術スタック

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + `tw-animate-css`
- **shadcn/ui** (new-york スタイル, Radix UI, Lucide アイコン)
- **ESLint 9** (`eslint-config-next` + `eslint-config-prettier`)
- **Prettier 3** (`prettier-plugin-tailwindcss`)

## アーキテクチャ

- App Router: `src/app/`
- パスエイリアス: `@/*` → `./src/*`
- shadcn/ui コンポーネント: `src/components/ui/`
- ユーティリティ: `src/lib/`
- フック: `src/hooks/`

### shadcn/ui コンポーネント追加

```bash
npx shadcn@latest add <component-name>
```

## コード規約

- Prettier 設定: ダブルクォート、セミコロンあり、トレイリングカンマ (all)、インデント 2 スペース、80 文字幅
- Tailwind クラスは `cn()` (`src/lib/utils.ts`) で結合
- RSC (React Server Components) デフォルト有効

## 環境変数

- `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY` — Google Books API キー
