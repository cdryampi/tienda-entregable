<template>
  <section class="relative w-full min-h-screen bg-black flex items-center justify-center overflow-x-auto p-4">
    <div class="absolute grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-0 w-full mx-auto">
      <video
        v-for="(video, index) in videos"
        :key="index"
        :src="video"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-contain"
      />
    </div>
  </section>
</template>

<script setup>
const videos = [
  '/videos/sora1.mp4',
  '/videos/sora2.mp4',
  '/videos/sora3.mp4',
  '/videos/sora4.mp4',
  '/videos/sora5.mp4',
  '/videos/sora6.mp4'
]
</script>
