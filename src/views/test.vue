<template>
	<div class="background ">
		<testComponent/>
	</div>
</template>

<script>
import testComponent from "@/components/testComponent"

export default {
	name : "test",
	components : {
		testComponent,
	},
	
}
</script>

<style scoped>
.background {
	background : #262626;
	font-family:sans-serif;
	font-size:12px;
	margin: 0 auto;
}








</style>