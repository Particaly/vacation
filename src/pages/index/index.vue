<template>
	<div class="index"></div>
</template>

<script>
export default {
	name: 'index',
	mounted() {
		console.log(this.$route.query);
	}
}
</script>

<style scoped lang="scss">
.index {
	height: 100%;
	background: #153a5d;
}
</style>
