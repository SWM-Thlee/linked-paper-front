export class SemanticStyles {
  private result: string[];

  constructor() {
    this.result = [];
  }

  build() {
    return this.result.join(" ");
  }

  /* 모든 함수는 기능이 동일하지만, 그룹 이름을 달리 하여 가독성을 높입니다. */
  layout(styles: string[]) {
    this.result = [...this.result, ...styles];
    return this;
  }

  color(styles: string[]) {
    this.result = [...this.result, ...styles];
    return this;
  }

  transition(styles: string[]) {
    this.result = [...this.result, ...styles];
    return this;
  }

  others(styles: string[]) {
    this.result = [...this.result, ...styles];
    return this;
  }
}

export function sem() {
  return new SemanticStyles();
}
