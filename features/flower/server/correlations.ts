import { ErrorResponse, api } from "@/utils/api";
import { Data } from "@/features/search/types/result";
import { Flower } from "../types";

/**
 * 특정 논문에 대한 연관 논문의 정보를 불러옵니다.
 *
 * - "success" or 특정 Error Code의 응답이 반환됩니다.
 * - "특정 논문"에 대한 정보도 같이 포함되어 있어야 합니다. (= ID가 동일한 논문)
 */
export async function Correlations({
  paperID,
}: Flower.Query.Info): Promise<
  Flower.Api.Result | ErrorResponse<Flower.Api.Error>
> {
  const response = await api<Flower.Api.Response>(
    `/api/correlations/${paperID}`,
    Flower.Api.NoStore,
  );

  if (response.status === "ERROR") return { ...response, extra: { paperID } };

  // Convert Response to Result
  const { count, data } = response.data;

  const correlations = data.map((res) => ({
    id: res.id,
    title: res.title,
    abstraction: res.abstraction,
    journal: res.journal,
    authors: res.authors,
    categories: res.categories,
    reference_count: res.reference_count,
    citation_count: res.citiation_count,
    link: {
      origin_link: res.origin_link,
      pdf_link: res.pdf_link,
    },
    date: res.date,
    similarity: res.weight,
    version: "v1",
  })) satisfies Data[];

  const targetPaper = correlations.find((paper) => paper.id === paperID);

  // 연관 논문 결과에 Target도 반드시 포함되어야 합니다.
  if (!targetPaper) {
    return {
      status: "ERROR",
      errorCode: 500,
      extra: { paperID },
    };
  }

  // TODO: 검증 과정이 필요합니다.
  return {
    status: Flower.Api.Status.OK,
    paperID,
    paper: targetPaper,
    data: correlations.filter((paper) => paper.id !== paperID),
    count,
  };
}
