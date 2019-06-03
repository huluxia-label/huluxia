<template>
	<view class="cu-modal" :class="{'show':visible}">
		<view class="cu-dialog">
			<block v-if="type == 'img'">
				<view class="bg-img" style="min-height: 50vh;" :style="{backgroundImage: `url(${img})`}">
					<view class="cu-bar justify-end text-white">
						<view class="action">
							<text class="cuIcon-close" style="opacity: 0;"></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white" @tap="cancel">
					<view class="action margin-0 flex-sub solid-left">关闭</view>
				</view>
			</block>
			<block v-else-if="type == 'confirm'">

			</block>
			<block v-else-if="type == 'loading'">
				<view>
					<image src="/static/assets/loading.gif" mode="center"></image>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub solid-left">加载中</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: `modal`,
		props: {
			type: {
				type: String,
				defalut: 'img'
			},
			img: {
				type: String,
				defalut: ''
			},
			value: {
				type: Boolean,
				defalut: false
			}
		},
		data() {
			return {
				visible: false
			}
		},
		watch: {
			value(val) {
				this.visible = val;
			},
			visible(val) {
				this.$emit("visible-change", val);
			}
		},
		methods: {
			cancel() {
				this.visible = false;
			}
		},
		mounted() {
			if (this.value) {
				this.visible = true;
			}
		}
	}
</script>

<style>
</style>
