<template>
  <div data-server-rendered="true" class="loading-icon">
    <div class="loading-bar-0"></div>
    <div class="loading-bar-1"></div>
    <div class="loading-bar-2"></div>
    <div class="loading-bar-3"></div>
    <div class="loading-bar-4"></div>
  </div>
</template>

<script>
export default {
  name: "Skeleton"
};
</script>

<style scoped lang="less">
.loading-icon {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 10000;
  -moz-animation-duration: 10s;
  -webkit-animation-duration: 10s;
  animation-duration: 10s;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -moz-animation-name: fullrotate;
  -webkit-animation-name: fullrotate;
  animation-name: fullrotate;
  -moz-animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
.loading-icon > div {
  position: absolute;
  background-color: #333;
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-animation-duration: 3s;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -moz-animation-direction: alternate;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -moz-animation-name: loader;
  -webkit-animation-name: loader;
  animation-name: loader;
  -moz-animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -webkit-animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.loading-bar-0 {
  width: 120px;
  height: 120px;
  -moz-animation-delay: 0s;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.loading-bar-1 {
  width: 180px;
  height: 180px;
  -moz-animation-delay: -0.5s;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.loading-bar-2 {
  width: 240px;
  height: 240px;
  -moz-animation-delay: -1s;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.loading-bar-3 {
  width: 300px;
  height: 300px;
  -moz-animation-delay: -1.5s;
  -webkit-animation-delay: -1.5s;
  animation-delay: -1.5s;
}

.loading-bar-4 {
  width: 360px;
  height: 360px;
  -moz-animation-delay: -2s;
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}

.loading-bar-5 {
  width: 420px;
  height: 420px;
  -moz-animation-delay: -2.5s;
  -webkit-animation-delay: -2.5s;
  animation-delay: -2.5s;
}

.loading-bar-6 {
  width: 480px;
  height: 480px;
  -moz-animation-delay: -3s;
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
}

@-moz-keyframes loader {
  0% {
    opacity: 0;
    -moz-transform: translateX(-50%) translateY(-50%) rotate(0);
    transform: translateX(-50%) translateY(-50%) rotate(0);
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    background-color: #000;
    -moz-transform: translateX(-50%) translateY(-50%) rotateX(180deg)
      rotate(360deg);
    transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotate(360deg);
  }
}
@-webkit-keyframes loader {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(0);
    transform: translateX(-50%) translateY(-50%) rotate(0);
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    background-color: #000;
    -webkit-transform: translateX(-50%) translateY(-50%) rotateX(180deg)
      rotate(360deg);
    transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotate(360deg);
  }
}
@keyframes loader {
  0% {
    opacity: 0;
    -moz-transform: translateX(-50%) translateY(-50%) rotate(0);
    -ms-transform: translateX(-50%) translateY(-50%) rotate(0);
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(0);
    transform: translateX(-50%) translateY(-50%) rotate(0);
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    background-color: #000;
    -moz-transform: translateX(-50%) translateY(-50%) rotateX(180deg)
      rotate(360deg);
    -ms-transform: translateX(-50%) translateY(-50%) rotateX(180deg)
      rotate(360deg);
    -webkit-transform: translateX(-50%) translateY(-50%) rotateX(180deg)
      rotate(360deg);
    transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotate(360deg);
  }
}
@-moz-keyframes fullrotate {
  0% {
    -moz-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -moz-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes fullrotate {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes fullrotate {
  0% {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
