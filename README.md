# killer_joki_-development_story

개발 일일 작업 정리를 기록하고 관리하기 위한 저장소입니다.

## 구조
- `summaries/YYYY/MM/DATE.md` — 연/월별로 정리된 일일 작업 기록
- `templates/daily-summary-template.md` — 새 기록을 작성할 때 사용하는 템플릿

## 새 일일 기록 작성 방법
1. `templates/daily-summary-template.md`를 복사하여 `summaries/YYYY/MM/YYYY-MM-DD.md`로 저장합니다.
2. 각 섹션을 간결하게 채웁니다. 기술적 내용, 링크, 후속 작업을 명확히 적습니다.
3. 커밋 메시지 예시:
   - `docs: add YYYY-MM-DD work summary`
   - 또는 한국어: `docs: YYYY-MM-DD 작업 정리 추가`

## 선택 사항(연동)
- Notion: 같은 내용을 Notion 개인 공부 공간(페이지: "개인 공부")에도 미러링할 수 있습니다.
- GitHub PR: `chore/daily-log-YYYY-MM-DD` 브랜치를 만들어 `main`으로 PR을 열어 관리할 수 있습니다.
