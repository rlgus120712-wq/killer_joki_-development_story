# 🚀 Vercel 배포 가이드

## 1️⃣ 사전 준비

### 프로필 이미지 추가
`public/profile.jpg` 파일을 추가해주세요. (현재 `portfolio/public/profile.jpg`에 있는 파일을 복사하면 됩니다)

```bash
# 프로필 이미지 복사
cp portfolio/public/profile.jpg portfolio-nextjs/public/profile.jpg
```

## 2️⃣ Vercel 계정 설정

### 1. Vercel 가입
1. [Vercel 웹사이트](https://vercel.com) 접속
2. "Sign Up" 클릭
3. GitHub 계정으로 로그인

### 2. GitHub 권한 부여
- Vercel이 GitHub 저장소에 접근할 수 있도록 권한을 부여합니다

## 3️⃣ 프로젝트 배포

### 방법 1: Vercel 대시보드에서 배포 (추천)

1. **New Project 클릭**
   - Vercel 대시보드에서 "Add New..." → "Project" 클릭

2. **저장소 선택**
   - `rlgus120712-wq/killer_joki_-development_story` 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정**
   ```
   Project Name: portfolio-조기현 (또는 원하는 이름)
   Framework Preset: Next.js (자동 감지됨)
   Root Directory: portfolio-nextjs
   Build Command: npm run build (자동 설정)
   Output Directory: .next (자동 설정)
   Install Command: npm install (자동 설정)
   ```

4. **환경 변수 (선택사항)**
   - 필요한 경우 환경 변수 추가
   - 이 프로젝트는 환경 변수 없이 작동합니다

5. **Deploy 클릭**
   - 배포가 시작됩니다 (약 1-2분 소요)

### 방법 2: Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리로 이동
cd portfolio-nextjs

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 4️⃣ 배포 완료!

배포가 완료되면:
- **배포 URL**: `https://your-project-name.vercel.app`
- **커스텀 도메인**: Vercel 대시보드에서 설정 가능

## 5️⃣ 자동 배포 설정

### Git 기반 자동 배포
Vercel은 자동으로 다음을 수행합니다:

✅ **메인 브랜치 푸시 시**
- `main` 브랜치에 push하면 자동으로 프로덕션 배포

✅ **Pull Request 생성 시**
- PR마다 프리뷰 배포 URL 자동 생성
- PR 코멘트에 프리뷰 링크 추가

✅ **브랜치 푸시 시**
- 모든 브랜치에 대해 프리뷰 배포 생성

## 6️⃣ 배포 상태 확인

### Vercel 대시보드
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. "Deployments" 탭에서 배포 상태 확인

### GitHub 통합
- GitHub PR/Commit에 배포 상태가 자동으로 표시됩니다

## 7️⃣ 커스텀 도메인 설정 (선택사항)

### 1. Vercel 대시보드에서 설정
1. 프로젝트 선택
2. "Settings" → "Domains" 탭
3. "Add" 클릭하여 도메인 입력
4. DNS 설정 안내 따르기

### 2. DNS 설정
도메인 제공업체에서 다음 레코드 추가:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 8️⃣ 성능 최적화 (이미 적용됨)

✅ **Static Site Generation (SSG)**
- 빌드 시 모든 페이지가 정적으로 생성됩니다

✅ **Edge Network**
- 전 세계 CDN으로 빠른 로딩 속도

✅ **Image Optimization**
- Next.js Image 컴포넌트로 자동 최적화

✅ **Code Splitting**
- 자동 코드 분할로 초기 로딩 최적화

## 9️⃣ 모니터링

### Vercel Analytics (선택사항)
1. 프로젝트 대시보드에서 "Analytics" 탭
2. "Enable Analytics" 클릭
3. 실시간 방문자 수, 페이지뷰, 성능 지표 확인

### Web Vitals
- Core Web Vitals 자동 모니터링
- LCP, FID, CLS 등 성능 지표 확인

## 🔄 업데이트 방법

### 코드 업데이트
```bash
# 코드 수정 후
git add .
git commit -m "Update portfolio"
git push origin main
```

자동으로 Vercel이 감지하고 배포를 시작합니다!

## 🐛 문제 해결

### 배포 실패 시
1. **빌드 로그 확인**
   - Vercel 대시보드 → 프로젝트 → Deployments → 실패한 배포 클릭
   - 에러 메시지 확인

2. **로컬에서 빌드 테스트**
   ```bash
   cd portfolio-nextjs
   npm run build
   ```

3. **Root Directory 확인**
   - Vercel 설정에서 Root Directory가 `portfolio-nextjs`로 설정되어 있는지 확인

### 이미지가 안 보일 때
- `public/profile.jpg` 파일이 있는지 확인
- 파일명이 정확한지 확인 (대소문자 구분)

## 📊 예상 배포 시간

- **초기 배포**: 1-2분
- **후속 배포**: 30초-1분

## 🎉 배포 성공!

배포가 완료되면 다음 URL로 접속할 수 있습니다:
- **Vercel URL**: `https://your-project-name.vercel.app`

---

**질문이나 문제가 있으시면 [Vercel 문서](https://vercel.com/docs)를 참고하세요!**
