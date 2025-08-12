<template>
  <div class="mz-portfolio">
    <!-- Hero -->
    <section class="hero">
      <v-container>
        <v-row align="center" class="py-14">
          <v-col cols="12" md="7">
            <div class="badge">
              <span>Front‑End • UI/UX • Creative</span>
            </div>
            <h1 class="title">
              안녕하세요, 조기현입니다 <span class="wave">👋</span>
            </h1>
            <p class="subtitle">
              인터랙션과 감성을 설계하는 프론트엔드 개발자. 빠르게 실험하고 더 빠르게 전달합니다.
            </p>
            <div class="cta">
              <a v-if="socials.github" :href="socials.github" target="_blank" rel="noopener">
                <v-btn color="primary" class="mr-3" prepend-icon="mdi-github">코드 보러가기</v-btn>
              </a>
              <a v-if="socials.email" :href="`mailto:${socials.email}`">
                <v-btn variant="tonal" color="primary" prepend-icon="mdi-email">함께 만들기</v-btn>
              </a>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="d-flex justify-center">
            <v-card class="hero-card glass" elevation="10">
              <div class="avatar">JGH</div>
              <div class="hero-tags">
                <v-chip variant="tonal" color="primary" size="small">Vue 3</v-chip>
                <v-chip variant="tonal" color="primary" size="small">TypeScript</v-chip>
                <v-chip variant="tonal" color="primary" size="small">Motion</v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="mesh" style="position: absolute; inset: -10% -10% 0 -10%; z-index: -1; pointer-events: none;">
        <span class="m1"/><span class="m2"/><span class="m3"/><span class="m4"/>
      </div>
    </section>

    <!-- Stats -->
    <section class="section stats">
      <v-container>
        <v-row>
          <v-col cols="6" md="3">
            <div class="stat-box glass">
              <div class="num">3+</div>
              <div class="cap">Years</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="stat-box glass">
              <div class="num">20+</div>
              <div class="cap">Projects</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="stat-box glass">
              <div class="num">10+</div>
              <div class="cap">Stacks</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="stat-box glass">
              <div class="num">∞</div>
              <div class="cap">Ideas</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Skills -->
    <section class="section">
      <v-container>
        <div class="section-head">
          <h2 class="section-title" style="font-size: clamp(22px, 3.6vw, 36px);">Stack DNA</h2>
          <p class="section-desc">내가 즐겨 쓰는 것들 — 감성과 성능 사이의 균형</p>
        </div>
        <div class="chips">
          <v-chip
            v-for="(s, i) in skills"
            :key="`sk-${i}`"
            class="mr-2 mb-2 chip"
            variant="elevated"
            color="primary"
            size="small"
            style="color: var(--fg) !important;"
          >
            {{ s }}
          </v-chip>
        </div>
      </v-container>
    </section>

    <!-- Works / Case Studies -->
    <section class="section alt">
      <v-container>
        <div class="section-head">
          <h2 class="section-title" style="font-size: clamp(22px, 3.6vw, 36px);">Case Studies</h2>
          <p class="section-desc">문제 정의 → 인터랙션 설계 → 전달. 결과에 집중합니다.</p>
        </div>
        <v-row>
          <v-col v-for="p in projects" :key="p.id" cols="12" md="6">
            <v-hover v-slot="{ isHovering, props }">
              <v-card v-bind="props" class="work-card glass" :elevation="isHovering ? 14 : 8" :class="{ tilt: isHovering }">
                <div class="cover">
                  <div class="cover-grad" />
                  <div class="cover-title">{{ p.title }}</div>
                </div>
                <v-card-item>
                  <div class="d-flex align-center justify-space-between">
                    <div class="text-subtitle-1">{{ p.subtitle }}</div>
                    <v-chip size="x-small" variant="tonal" color="primary">{{ p.year }}</v-chip>
                  </div>
                  <div class="text-body-2 mt-2">{{ p.description }}</div>
                  <div class="mt-3">
                    <v-chip v-for="(t, i) in p.tags" :key="`t-${p.id}-${i}`" size="x-small" class="mr-1 mb-1" variant="outlined" color="primary">{{ t }}</v-chip>
                  </div>
                </v-card-item>
                <v-card-actions>
                  <v-spacer />
                  <a v-if="p.links?.demo" :href="p.links.demo" target="_blank" rel="noopener">
                    <v-btn variant="text" color="primary" prepend-icon="mdi-open-in-new">Demo</v-btn>
                  </a>
                  <a v-if="p.links?.github" :href="p.links.github" target="_blank" rel="noopener">
                    <v-btn variant="text" color="primary" prepend-icon="mdi-github">GitHub</v-btn>
                  </a>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact -->
    <section class="section contact">
      <v-container>
        <v-card class="contact-card glass" elevation="12">
          <v-card-item>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <div>
                <div class="contact-title">함께 감각적인 UI를 만들고 싶다면</div>
                <div class="contact-desc">Figma → Code, 또는 Code → Motion. 어디서든 시작할 준비가 되어 있어요.</div>
              </div>
              <div class="mt-4 mt-md-0">
                <a v-if="socials.email" :href="`mailto:${socials.email}`">
                  <v-btn color="primary" class="mr-2" prepend-icon="mdi-email">컨택하기</v-btn>
                </a>
                <a v-if="socials.github" :href="socials.github" target="_blank" rel="noopener">
                  <v-btn variant="tonal" color="primary" prepend-icon="mdi-github">깃허브</v-btn>
                </a>
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { skills, projects, socials } from '../data/portfolio';
</script>

<style scoped>
/* Font (optional, modern vibe) */
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@500;700;800&display=swap');

:root {
  --bg: #0b0b0f;
  --fg: #f7f7fb;
  --muted: #b8b8c6;
  --p1: #ff3d81; /* hot pink */
  --p2: #7c4dff; /* violet */
  --p3: #c6ff00; /* acid lime */
  --p4: #18ffff; /* cyan */
}

.mz-portfolio { color: var(--fg); background: var(--bg); min-height: 100vh; }

/* Hero */
.hero { position: relative; overflow: hidden; }
.badge { display: inline-flex; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,0.06); color: var(--muted); font-size: 12px; letter-spacing: .06em; }
.title { font-weight: 800; font-size: clamp(28px, 6vw, 56px); line-height: 1.1; margin-top: 14px; color: var(--fg); background: linear-gradient(90deg, var(--p3), var(--p4), var(--p2), var(--p1)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: var(--muted); margin-top: 12px; font-size: 16px; }
.cta { margin-top: 18px; }
.hero-card { width: 320px; height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
.avatar { width: 88px; height: 88px; border-radius: 20px; display: grid; place-items: center; background: linear-gradient(135deg, var(--p2), var(--p1)); font-weight: 800; font-size: 24px; }
.hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.wave { display: inline-block; animation: wave 1.8s infinite; transform-origin: 70% 70%; }
@keyframes wave { 0% { transform: rotate(0deg);} 20% { transform: rotate(14deg);} 40% { transform: rotate(-8deg);} 60% { transform: rotate(14deg);} 80% { transform: rotate(-4deg);} 100% { transform: rotate(0deg);} }

/* Mesh gradient background */
.mesh span { position: absolute; width: 40vw; height: 40vw; filter: blur(60px); opacity: .5; border-radius: 50%; }
.mesh .m1 { left: -10vw; top: -8vw; background: radial-gradient(circle, var(--p2), transparent 60%); }
.mesh .m2 { right: -8vw; top: -6vw; background: radial-gradient(circle, var(--p1), transparent 60%); }
.mesh .m3 { left: 30vw; top: 8vw; background: radial-gradient(circle, var(--p4), transparent 60%); }
.mesh .m4 { right: 24vw; top: 16vw; background: radial-gradient(circle, var(--p3), transparent 60%); }

/* Sections */
.section { padding: 60px 0; }
.section.alt { background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); }
.section-head { text-align: center; margin-bottom: 18px; }
.section-title { font-weight: 800; letter-spacing: .2px; font-size: clamp(22px, 3.6vw, 36px); }
.section-desc { color: var(--muted); }

/* Stats */
.stat-box { height: 100px; border-radius: 16px; display: grid; place-items: center; text-align: center; }
.stat-box .num { font-size: 28px; font-weight: 800; background: linear-gradient(90deg, var(--p3), var(--p1)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stat-box .cap { color: var(--muted); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }

/* Chips */
.chips .chip { background: rgba(255,255,255,0.06) !important; backdrop-filter: saturate(180%) blur(6px); color: var(--fg) !important; }

/* Works */
.work-card { border-radius: 16px; overflow: hidden; transition: transform .25s ease, box-shadow .25s ease; }
.work-card.tilt { transform: translateY(-4px) rotateX(2deg) rotateY(-2deg); }
.cover { position: relative; height: 180px; }
.cover-grad { position: absolute; inset: 0; background: conic-gradient(from 0deg, var(--p2), var(--p1), var(--p3), var(--p4), var(--p2)); filter: saturate(120%) blur(0.2px); }
.cover-title { position: absolute; left: 16px; bottom: 14px; font-weight: 800; text-shadow: 0 6px 30px rgba(0,0,0,.35); }

/* Contact */
.contact-card { border-radius: 18px; }
.contact-title { font-weight: 800; font-size: 22px; }
.contact-desc { color: var(--muted); margin-top: 6px; }

/* Glass util */
.glass { background: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: saturate(160%) blur(10px); }

/* Vuetify 내부 텍스트 대비 강화 */
:deep(.v-card), :deep(.v-card-title), :deep(.v-card-subtitle), :deep(.v-card-text) { color: var(--fg); }

/* 글래스모피즘 미지원 브라우저 폴백 */
@supports not ((-webkit-backdrop-filter: blur(2px)) or (backdrop-filter: blur(2px))) {
  .glass { background: rgba(255,255,255,0.12) !important; }
}
</style>
