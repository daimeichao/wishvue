<template>
		<div style="outline: none;" class="main__item">

		<!-- <svg t="1492500959545" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
		  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"> -->
			<!-- <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
			  p-id="1692"></path>
			<path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
			  p-id="1693"></path>
			<path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
			  p-id="1694"></path> -->
			
			<!-- <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path> -->
			<!-- <polyline points="13 7 18 12 13 17 13 17"></polyline>
			<polyline points="7 7 12 12 7 17 7 17"></polyline> -->
		<!-- </svg> -->
		<svg role="img" xmlns="http://www.w3.org/2000/svg"  class="hamburger" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="chevronsRightIconTitle" :class="{'is-active':isActive}" @click="toggleClick">
          <!-- <title id="chevronsRightIconTitle">Chevrons Right</title> -->
          <polyline points="13 7 18 12 13 17 13 17"></polyline>
          <polyline points="7 7 12 12 7 17 7 17"></polyline>
        </svg>
	</div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(0deg);
	transition: .38s;
	transform-origin: 50% 50%;
}

.hamburger.is-active {
	transform: rotate(180deg);
}
/* .app-levelbar.el-breadcrumb{
	outline:none !important;
} */
.main__item svg{
	width: 20px;
    height: 20px;
    /* stroke: #2329D6; */
	stroke:#000;
    stroke-width: 1;
    stroke-linecap: square;
    stroke-linejoin: miter;
    fill: none;
	color:#000
    /* color: #2329D6; */
}
</style>
