<template>
	<view style="
		padding-top: 20vh;
		background-color: var(--cyan);
		background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJFYmVuZV8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNjIycHgiIGhlaWdodD0iNjI2cHgiIHZpZXdCb3g9IjAgMCAxNjIyIDYyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYyMiA2MjYiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cG9seWdvbiBvcGFjaXR5PSIwLjIiIGZpbGw9IiNGRkZGRkYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXciIHBvaW50cz0iMTMwOCwzMC4zMSAxMzM4LDM5Ljk4IDEzMTcuMzMsNjEuMzEgIi8+CjxjaXJjbGUgb3BhY2l0eT0iMC4yIiBmaWxsPSIjRkZGRkZGIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IiBjeD0iMTQwMCIgY3k9IjI0MCIgcj0iMjQiLz4KPGNpcmNsZSBvcGFjaXR5PSIwLjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXciIGN4PSIxNDgwIiBjeT0iMTIwIiByPSI2LjkyIi8+Cjxwb2x5Z29uIG9wYWNpdHk9IjAuMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyIgcG9pbnRzPSIKCTE4MS4wNCwxMTYuOTggMjA5LjQ2LDExMS41IDE5OS41MSwxMzguMjkgIi8+Cjxwb2x5Z29uIG9wYWNpdHk9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyIgcG9pbnRzPSI0MTIuMTgsMzY5Ljc3IDQyOS42OCwzNzkuMzMgNDEyLjE4LDM4OS44NiAiLz4KPGNpcmNsZSBvcGFjaXR5PSIwLjIiIGZpbGw9IiNGRkZGRkYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXciIGN4PSIyODUuNTgiIGN5PSIxOC40OCIgcj0iOS44MyIvPgo8cG9seWdvbiBvcGFjaXR5PSIwLjIiIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTE2OS4xNywzNTcuMTcgMTIxNi41LDI5MS44MyAxMjgxLDMzOCAxMjM0LjgzLDQwMi44MyAiLz4KPHBvbHlnb24gb3BhY2l0eT0iMC4yIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE2Mi43NSwyNTAuMjUgMjE2LjI1LDI2MS43NSAyMDUuMTIsMzE1LjQ2IDE1MC43NSwzMDQuNSAiLz4KPC9zdmc+Cg==);
		">
		<view class="padding-top-xl">
			<view class="cu-list menu list-top bg-white">
				<view :data-flag="item.flag" @tap="goTo" class="cu-item padding margin" v-for="(item,index) in item" :key="index">
					<view class="content">
						<text class="cu-avatar" :style="{backgroundImage: `url(${item.icon})`}"></text>
						<text class="text-gray padding-left">{{item.title}}</text>
					</view>
					<view class="action">
						<text class="icon-right text-gray"></text>
					</view>
				</view>
				<view class="cu-item padding margin">
					<view class="content">
						<text class="cu-avatar" style="background-image:url(https://img.icons8.com/dusk/64/000000/idea.png)"></text>
						<text class="text-gray padding-left">切换主题</text>
					</view>
					<view class="action">
						<switch class="" type="switch" bindchange=""></switch>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal"
		 :class="{'show':isModal}"
		 @tap="close">
			<view class="cu-dialog padding">
				<image src="https://avatars2.githubusercontent.com/u/45585937?s=460&v=4" mode=""
					style="
					border-radius: 50%;
					width: 240upx;
					height: 240upx;
					border: 2px solid var(--orange)"></image>
				<view>Github<text class="text-orange">@d1y</text></view>
				<view class="padding-top-sm">Bilibili<text class="text-orange">@陈大大哦了</text></view>
				<view class="padding-top text-gray">鸣谢 <text class="text-orange">@colorUI</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import modal from '../../components/modal.vue'
	export default {
		data() {
			return {
				item: [
					{
						icon: 'https://img.icons8.com/dusk/64/000000/support.png',
						title: '活动',
						url: 'activity/index'
					},
					{
						icon: 'https://img.icons8.com/dusk/64/000000/bookmark.png',
						title: '关于作者',
						flag: 'about'
					}
				],
				isModal: false
			}
		},
		methods: {
			goTo(e) {
				let that = this
				let flag = e.currentTarget.dataset.flag
				if (flag == 'about') {
					that.isModal = true
				}
			},
			close() {
				this.isModal = false
			}
		}
	}
</script>
<style>
.cu-avatar {
	background-color: transparent;
}
</style>
