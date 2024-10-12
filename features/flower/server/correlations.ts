import { ErrorResponse, fetchUniversally } from "@/utils/fetch-universally";
import { Data } from "@/features/search/types/result";

import { Flower } from "../types";

export async function Correlations({
  paperID,
}: Flower.Query.Info): Promise<Flower.Api.Result | ErrorResponse> {
  const response = await fetchUniversally<Flower.Api.Response>(
    `/api/correlations/${paperID}`,
    Flower.Api.NoStore,
  );

  if (response.status === "ERROR") return response;

  // Convert Response to Result
  const { count, data } = response.data;

  const papers = data.map((res) => ({
    id: res.id,
    title: res.title,
    abstraction: res.abstraction,
    journal: res.journal,
    authors: res.authors,
    categories: res.categories,
    reference_count: res.reference_count,
    citiation_count: res.citiation_count,
    link: {
      origin_link: res.origin_link,
      pdf_link: res.pdf_link,
    },
    date: res.date,
    similarity: res.weight,
    version: "v1",
  })) satisfies Data[];

  const targetPaper = papers.find((paper) => paper.id === paperID);

  // 연관 논문 결과에 Target도 반드시 포함되어야 합니다.
  if (!targetPaper)
    return { status: "ERROR", errorCode: 500 } satisfies ErrorResponse;

  // TODO: 검증 과정이 필요합니다.
  return {
    status: Flower.Api.Status.OK,
    paperID,
    paper: targetPaper,
    count,
    data: papers.filter((paper) => paper.id !== paperID),
  };
}
