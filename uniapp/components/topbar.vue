<template>
	<view>
		<view>
			<view class="diy-bar shadow bg-gradual-green sm" style="padding-top:5vh;">
				<view class="cu-bar">
					<view class="action" @tap="backTo"><text class="cuIcon-back"></text>返回</view>
					<view class="content">
						{{ title }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: `topbar`,
	props: {
		title: {
			type: String,
			default: ``
		}
	},
	methods: {
		backTo() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style>
</style>
