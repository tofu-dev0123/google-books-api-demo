# Google Books API スキーマ定義

本プロジェクトで使用する TypeScript 型定義をまとめる。

## API レスポンスの型（生データ）

Google Books API が返す JSON をそのまま受け取るための型定義。

### GoogleBooksResponse

書籍検索 `GET /volumes` のレスポンス全体。

```ts
export type GoogleBooksResponse = {
  kind: "books#volumes"
  totalItems: number
  items?: GoogleBooksVolume[]
}
```

> `items` は検索結果が 0 件のときフィールド自体が返されないため、オプショナルにしている。

### GoogleBooksVolume

検索結果の各書籍オブジェクト。書籍詳細 `GET /volumes/{volumeId}` のレスポンスも同じ構造。

```ts
export type GoogleBooksVolume = {
  kind: "books#volume"
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo?: SaleInfo
  accessInfo?: AccessInfo
  searchInfo?: {
    textSnippet?: string
  }
}
```

### VolumeInfo

書籍のメタ情報。API レスポンスの中で最も重要なオブジェクト。

```ts
export type VolumeInfo = {
  title: string
  subtitle?: string
  authors?: string[]
  publisher?: string
  publishedDate?: string
  description?: string
  industryIdentifiers?: IndustryIdentifier[]
  pageCount?: number
  categories?: string[]
  averageRating?: number
  ratingsCount?: number
  imageLinks?: ImageLinks
  language: string
}

export type IndustryIdentifier = {
  type: "ISBN_10" | "ISBN_13" | "ISSN" | "OTHER"
  identifier: string
}

export type ImageLinks = {
  smallThumbnail?: string
  thumbnail?: string
}
```

### SaleInfo

販売情報（参考程度）。

```ts
export type SaleInfo = {
  country: string
  saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FREE"
  isEbook: boolean
}
```

### AccessInfo

アクセス・閲覧情報（参考程度）。

```ts
export type AccessInfo = {
  viewability: "NO_PAGES" | "PARTIAL" | "ALL_PAGES"
  embeddable: boolean
  publicDomain: boolean
}
```

---

## アプリケーション用の型（正規化済み）

API レスポンスから必要なフィールドだけを抽出した、アプリケーション内部で使用する型。

### Book

```ts
export type Book = {
  id: string
  title: string
  authors?: string[]
  description?: string
  isbn?: string
  thumbnail?: string
}
```

---

## 変換ロジック

`GoogleBooksVolume` から `Book` への変換例。

```ts
function toBook(item: GoogleBooksVolume): Book {
  const v = item.volumeInfo

  return {
    id: item.id,
    title: v.title,
    authors: v.authors,
    description: v.description,
    isbn: v.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier,
    thumbnail: v.imageLinks?.thumbnail,
  }
}
```

### 検索レスポンス全体の変換

```ts
function toBooks(response: GoogleBooksResponse): Book[] {
  if (!response.items) return []
  return response.items.map(toBook)
}
```

---

## フィールド補足

| Book のフィールド | 取得元 | 備考 |
| --- | --- | --- |
| `id` | `item.id` | 詳細取得 API のパスパラメータとして使用 |
| `title` | `volumeInfo.title` | 必ず存在する |
| `authors` | `volumeInfo.authors` | 存在しない書籍もある |
| `description` | `volumeInfo.description` | HTML タグを含む場合がある。表示時にサニタイズを推奨 |
| `isbn` | `volumeInfo.industryIdentifiers` | ISBN-13 を優先的に取得。見つからない場合は `undefined` |
| `thumbnail` | `volumeInfo.imageLinks.thumbnail` | 画像がない書籍もある。プレースホルダー表示を推奨 |
