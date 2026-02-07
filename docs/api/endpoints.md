# Google Books API エンドポイント詳細

## 1. 書籍検索 - `GET /volumes`

最も使用頻度の高いエンドポイント。キーワード・ISBN・著者名などで書籍を検索する。

### URL

```
https://www.googleapis.com/books/v1/volumes?q={検索クエリ}
```

### リクエストパラメータ

#### 必須

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `q` | string | 検索クエリ（[構文の詳細は overview.md を参照](./overview.md#検索クエリ構文)） |

#### オプション

| パラメータ | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `startIndex` | number | `0` | ページング開始位置（0始まり） |
| `maxResults` | number | `10` | 取得件数（1〜40） |
| `langRestrict` | string | - | 言語制限（例: `ja`, `en`） |
| `printType` | string | `all` | `all` / `books` / `magazines` |
| `orderBy` | string | `relevance` | `relevance`（関連度順） / `newest`（新しい順） |
| `key` | string | - | API キー |

### レスポンス

#### トップレベル

```json
{
  "kind": "books#volumes",
  "totalItems": 123,
  "items": [ ... ]
}
```

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `kind` | string | 固定値 `"books#volumes"` |
| `totalItems` | number | 検索ヒット総数 |
| `items` | array | 書籍オブジェクトの配列（検索結果が0件の場合、フィールド自体が存在しない） |

#### items 内の各オブジェクト

```json
{
  "kind": "books#volume",
  "id": "abc123",
  "etag": "...",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/abc123",
  "volumeInfo": { ... },
  "saleInfo": { ... },
  "accessInfo": { ... },
  "searchInfo": { ... }
}
```

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `id` | string | ボリューム ID（詳細取得で使用） |
| `volumeInfo` | object | 書籍メタ情報（最重要） |
| `saleInfo` | object | 販売情報（参考程度） |
| `accessInfo` | object | アクセス・閲覧情報（参考程度） |
| `searchInfo` | object | 検索スニペット |

#### volumeInfo（最重要）

```json
{
  "title": "Clean Code",
  "authors": ["Robert C. Martin"],
  "publisher": "Prentice Hall",
  "publishedDate": "2008-08-01",
  "description": "Even bad code can function...",
  "industryIdentifiers": [
    { "type": "ISBN_10", "identifier": "0132350882" },
    { "type": "ISBN_13", "identifier": "9780132350884" }
  ],
  "pageCount": 464,
  "categories": ["Computers"],
  "averageRating": 4.5,
  "ratingsCount": 1200,
  "imageLinks": {
    "smallThumbnail": "http://books.google.com/books/content?id=...",
    "thumbnail": "http://books.google.com/books/content?id=..."
  },
  "language": "en"
}
```

| フィールド | 型 | 必ず存在するか | 説明 |
| --- | --- | --- | --- |
| `title` | string | はい | 書籍タイトル |
| `authors` | string[] | いいえ | 著者リスト |
| `publisher` | string | いいえ | 出版社 |
| `publishedDate` | string | いいえ | 出版日（`YYYY`, `YYYY-MM`, `YYYY-MM-DD` のいずれか） |
| `description` | string | いいえ | 書籍の説明文（HTML タグを含む場合あり） |
| `industryIdentifiers` | array | いいえ | ISBN 等の識別子 |
| `pageCount` | number | いいえ | ページ数 |
| `categories` | string[] | いいえ | カテゴリ |
| `averageRating` | number | いいえ | 平均評価（1.0〜5.0） |
| `ratingsCount` | number | いいえ | 評価数 |
| `imageLinks` | object | いいえ | 表紙画像の URL |
| `language` | string | はい | 言語コード（ISO 639-1） |

> **注意**: `title` と `language` 以外のフィールドはすべてオプショナル。データの有無は書籍ごとに異なるため、フロントエンドでは必ず存在チェックが必要。

#### saleInfo（参考）

```json
{
  "country": "JP",
  "saleability": "NOT_FOR_SALE",
  "isEbook": false
}
```

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `country` | string | 国コード |
| `saleability` | string | `FOR_SALE` / `NOT_FOR_SALE` / `FREE` |
| `isEbook` | boolean | 電子書籍かどうか |

#### accessInfo（参考）

```json
{
  "viewability": "PARTIAL",
  "embeddable": true,
  "publicDomain": false
}
```

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `viewability` | string | `NO_PAGES` / `PARTIAL` / `ALL_PAGES` |
| `embeddable` | boolean | 埋め込み可能か |
| `publicDomain` | boolean | パブリックドメインか |

---

## 2. 書籍詳細取得 - `GET /volumes/{volumeId}`

検索結果の `id` を指定して、1冊の詳細情報を取得する。

### URL

```
https://www.googleapis.com/books/v1/volumes/{volumeId}
```

### リクエストパラメータ

#### パスパラメータ（必須）

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `volumeId` | string | 検索結果に含まれる `id` フィールドの値 |

#### クエリパラメータ（オプション）

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `key` | string | API キー |

### レスポンス

```json
{
  "kind": "books#volume",
  "id": "abc123",
  "volumeInfo": { ... },
  "saleInfo": { ... },
  "accessInfo": { ... }
}
```

レスポンスの構造は検索 API の `items` 内の各オブジェクトと同一。`volumeInfo` の詳細は上記「書籍検索」のセクションを参照。

### 用途

- 検索結果の一覧から1冊を選んだ後の詳細画面表示
- ISBN 検索で十分な場合は使わないこともある

---

## 3. My Library 系 - `/mylibrary/*`（対象外）

```
GET /mylibrary/bookshelves
GET /mylibrary/bookshelves/{shelfId}/volumes
```

| 項目 | 内容 |
| --- | --- |
| 認証 | OAuth 2.0 必須（API キーでは利用不可） |
| 用途 | Google アカウントに紐づく個人の本棚操作 |
| 本プロジェクトでの利用 | **しない** |

一般向けアプリやデモでは使用しないため、本プロジェクトでは対象外とする。
