import { sample, repeat, random, select } from "@/utils/sample";
import { Category } from "@/utils/category";
import { SearchResult } from "../types/result";
import { SearchHistory } from "../types/history";

// 모든 필드를 가져옵니다.
const categories = Object.keys(Category);

// 가짜 검색 결과 데이터를 생성합니다.
export function searchResult(): SearchResult {
  return {
    id: sample.database.mongodbObjectId(),
    title: sample.word.words({ count: { min: 5, max: 20 } }),
    authors: repeat(random(1, 20), sample.person.fullName),
    categories: select(categories, 1, 20),
    journal: sample.company.name(),
    abstraction: sample.lorem.lines({ min: 2, max: 6 }),
    reference_count: random(1, 99),
    citiation_count: random(1, 99999),
    link: {
      origin_link: repeat(random(1, 5), sample.internet.url),
      pdf_link: repeat(random(1, 5), sample.internet.url),
    },
    version: `v${random(1, 10)}`,
    date: sample.date.anytime().toDateString(),
    similarity: sample.number.float({ max: 1.0, fractionDigits: 3 }),
  };
}

export function searchHistory(): SearchHistory {
  return {
    id: sample.database.mongodbObjectId(),
    query: sample.word.words({ count: { min: 5, max: 10 } }),
  };
}
