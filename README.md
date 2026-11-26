# WINK 신청(Apply) 클라이언트

WINK 동아리 공식 홈페이지에 추가되는 **스터디·행사 신청** 기능의 프론트엔드입니다. 기존 공홈([wink-official-page-client](https://github.com/KMU-WINK/wink-official-page-client))에 들어갈 새 기능만 독립적으로 개발하고 있으며, 공홈의 디자인/코드 컨벤션을 최대한 따르되 그 레포는 수정하지 않습니다.

## 📌 주요 기능

- **부원**: 신청 가능한 스터디·행사 목록 확인, 상세 페이지 열람, 신청서 작성/제출, 내 신청 내역 확인·수정·취소
- **운영진**: 신청글 작성/수정/삭제(마감), 신청서 질문 구성, 제출자 목록 및 답변 확인, 참여 완료 처리

> 현재는 백엔드 연동 전 단계로, 모든 데이터는 **mock 데이터** 기반으로 동작합니다. 새로고침하면 초기 상태로 되돌아갑니다.

## 🛠️ 기술 스택

| 분류 | 사용 기술 |
|---|---|
| 프레임워크 | React 19, TypeScript, Vite |
| 라우팅 | react-router-dom v7 |
| 서버 상태 | @tanstack/react-query |
| 스타일 | Tailwind CSS v4, shadcn/ui(Radix 기반) |
| 기타 | sonner(토스트), Pretendard 폰트 |

## 🚀 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `/apply` 로 접속하면 됩니다. (`/` 는 자동으로 `/apply` 로 리다이렉트)

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 체크 + 프로덕션 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리보기 |

## 📁 폴더 구조

도메인 단위(`features/`)로 묶는 구조를 따릅니다.

```
src/
├─ app/
│  └─ router.tsx           # 라우트 정의
├─ components/
│  ├─ layout/               # Header, MainLayout, AdminLayout 등 앱 공통 쉘
│  └─ ui/                   # shadcn/ui 컴포넌트
├─ features/
│  ├─ apply/                 # 신청 기능 전체
│  │  ├─ api/                # mock API 함수 + TanStack Query 훅
│  │  ├─ components/         # 화면별 UI 조각 (list/detail/form/editor/admin)
│  │  ├─ hooks/
│  │  ├─ pages/               # 실제 라우트에 연결되는 페이지
│  │  └─ types.ts
│  └─ auth/                  # mock 로그인 상태
├─ hooks/                    # 범용 훅 (useIsMobile 등)
├─ lib/                      # cn 유틸 등 범용 헬퍼
└─ pages/                    # 404 등 도메인에 속하지 않는 페이지
```

백엔드 연동 시에는 `features/apply/api/*.api.ts` 내부 구현만 실제 axios 호출로 바꾸면 되고, 나머지 컴포넌트/훅 코드는 그대로 둘 수 있도록 설계했습니다.

## 🗺️ 라우트

| 경로 | 화면 |
|---|---|
| `/apply` | 신청 목록 (`?tab=my` 로 내 신청 탭) |
| `/apply/:postId` | 신청글 상세 |
| `/apply/:postId/form` | 신청서 작성·수정 |
| `/admin/apply-posts` | (운영진) 신청글 관리 |
| `/admin/apply-posts/new` | (운영진) 신청글 작성 |
| `/admin/apply-posts/:postId/edit` | (운영진) 신청글 수정 |
| `/admin/apply-posts/:postId/submissions` | (운영진) 제출자 관리 |

`/admin/*` 은 로그인 + 관리자 권한이 필요합니다 (헤더의 **Login** 클릭 시 mock 관리자 계정으로 로그인됩니다).

## ⚠️ 현재 한계

- 모든 데이터는 mock이며 새로고침 시 초기화됩니다 (백엔드 연동 전 단계)
- 로그인은 mock 상태이며, 실제 인증/세션 검증은 없습니다
- 일부 신청서 질문 응답 검증(필수 여부 등)은 의도적으로 제외했습니다

## 🔗 참고

- Figma 디자인: [최종본](https://www.figma.com/design/omTyveEbH4OWtnRn4OR17z/?node-id=140-231)
- 디자인/컴포넌트 참고(읽기 전용): [wink-official-page-client](https://github.com/KMU-WINK/wink-official-page-client)
