// 검색 시 시작(끝나는) 날짜를 나타냅니다.
export type SearchDateType = string;

// 검색 시 필터링할 저널을 나타내니다.
export type SearchJournalType = string;

// 검색 시 필터링할 분야를 나타냅니다.
export type SearchFieldType = string;

// 검색 필터링 정보입니다.
export type SearchFilterInfo = {
  // [start_date, end_date]
  // 지정하지 않은 경우 [가장 오래 전, 오늘]로 설정됩니다.
  date: [SearchDateType?, SearchDateType?];
  journal: SearchJournalType[];
  field: SearchFieldType[];
};
