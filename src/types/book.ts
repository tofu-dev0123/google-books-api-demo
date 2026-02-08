export type GoogleBooksResponse = {
  kind: "books#volumes";
  totalItems: number;
  items?: GoogleBooksVolume[];
};

export type GoogleBooksVolume = {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
  searchInfo?: {
    textSnippet?: string;
  };
};

export type VolumeInfo = {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: ImageLinks;
  language: string;
};

export type IndustryIdentifier = {
  type: "ISBN_10" | "ISBN_13" | "ISSN" | "OTHER";
  identifier: string;
};

export type ImageLinks = {
  smallThumbnail?: string;
  thumbnail?: string;
};

export type SaleInfo = {
  country: string;
  saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FREE";
  isEbook: boolean;
};

export type AccessInfo = {
  viewability: "NO_PAGES" | "PARTIAL" | "ALL_PAGES";
  embeddable: boolean;
  publicDomain: boolean;
};

export type Book = {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  isbn?: string;
  thumbnail?: string;
};

function toBook(item: GoogleBooksVolume): Book {
  const v = item.volumeInfo;

  return {
    id: item.id,
    title: v.title,
    authors: v.authors,
    description: v.description,
    isbn: v.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier,
    thumbnail: v.imageLinks?.thumbnail,
  };
}

export function toBooks(response: GoogleBooksResponse): Book[] {
  if (!response.items) return [];
  return response.items.map(toBook);
}
