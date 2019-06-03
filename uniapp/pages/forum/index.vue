<template>
	<view>
		<view class="diy-bar bg-green bg-gradual-purple shadow-blur">
			<view class="padding-sm text-xl">
				<text class="cuIcon-titles text-red"></text> 葫芦侠三楼
			</view>
		</view>
		<view>
			<modal type="loading"></modal>
			<scroll-view class="event-wrap">
				<view class="padding-sm flex hotWrap" :data-id="hot.postID" @tap="postDetail">
					<view class="flex-sub bg-cyan">
						<view 
							:data-img="hot.images.length >= 1 ? hot.images[0] : ''" 
							class="hot-img radius lg shadow-blur" :style="{ backgroundImage: `url(${ hot.images[0] })` }"
							@tap.stop="clickImg">
						</view>
					</view>
					<view class="flex-treble padding-left por hotWrap2">
						<view class="content text-xl text-cut">
							<text class="hotScore bg-red text-white">+{{hot.score}}</text>
							{{hot.title}}
						</view>
						<view class="content text-sm text-cut">
							{{hot.detail}}
						</view>
						<view class="content hotBar padding-left flex">
							<view class="flex-sub text-cut">
								<text class="icon-titles text-orange"></text> {{ hot.user.nick }}
							</view>
							<view class="flex-twice text-right">
								{{ hot.activeTime }}
								<text class="icon-male text-orange"></text>
								{{ hot.hit }}
								<text class="icon-comment text-orange"></text>
								{{ hot.commentCount }}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-bar">
					<view class="action sub-title" hover-class="none">
						<text class="text-xl text-bold text-green">我的板块</text>
						<text class="bg-green"></text>
					</view>
				</view>
				<view class="flex padding-left padding-right padding-top" v-for="(item,index) in list" :key="index">
					<view class="flex-sub padding radius shadow-blur" :data-id="item.categoryID" style="
						color: #fff;
						background-color: rgba(103, 57, 182, 0.72)!important;
						background-image: url(../../static/assets/cardBg.png);
						background-position: center;
					"
					 @tap="postInfo">
						<view class="action">
							<image class="list-logo shadow-lg radius" :src="item.icon" mode="aspectFit" lazy-load="true" />
							<text class="content padding-left">
								<text class="text-bold">{{item.title}}</text> 🔥 {{item.viewCountFormated}}
								<!--
							-->🌸 {{item.postCountFormated}}
							</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<modal type="loading" :value="isLoad"></modal>
			<modal type="img" :value="isImg" :img="img" @visible-change="eyes"></modal>
		</view>
	</view>
	</view>
</template>

<script>
	const {
		colors,
		api
	} = require("../../utils/config")
	const random = () => colors[Math.floor(Math.random() * colors.length)]
	import modal from "../../components/modal.vue"
	export default {
		components: {
			modal
		},
		data() {
			return {
				hot: {
					postID: 0,
					images: [
						`../../static/assets/loading.gif`
					],
					title: `加载中`,
					detail: `加载中`,
					user: {
						nick: `@d1y`
					},
					score: 666,
					activeTime: ``,
					hit: 666,
					commentCount: 666
				},
				list: [],
				isLoad: true,
				c: `bg-yellow`,
				img: ``,
				isImg: false
			}
		},
		onLoad() {
			this.bindHot()
		},
		methods: {
			bindHot() {
				let self = this
				uni.request({
					url: `${api.floor}/category/list/ANDROID/2.0`,
					header: {
						"Content-Type": "application/json"
					},
					dataType: 'json',
					success(data) {
						self.isLoad = false
						data = data.data
						self.hot = data.postInfo
						let list = data.categories.slice(2, data.categories.length - 5)
						for (let i = 0; i < list.length; i++) {
							let nw = random()
							list[i].color = nw
							list[i].flag = true
						}
						self.list = list
					},
					fail: (e) => console.error(e)
				})
			},
			postInfo(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `./list?id=${id}`
				})
			},
			clickImg(e) {
				let img = e.currentTarget.dataset.img
				this.img = img
				this.eyes(true)
			},
			postDetail(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `./detail?id=${id}`
				})
			},
			eyes(e) {
				this.isImg = e
			}
		}
	}
</script>

<style>
	.hotWrap {
		background: rgba(222, 153, 217, .1)
	}

	.hotWrap2 {
		width: 180rpx;
	}

	.hot-img {
		width: 200rpx;
		height: 200rpx;
		background: no-repeat center;
		background-size: 100%;
		border-radius: 8rpx;
	}

	.hotScore {
		padding: 2rpx 4rpx;
		border-radius: 6rpx;
		font-size: 24rpx;
		margin-top: -4rpx;
		vertical-align: middle;
	}

	.hotBar {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.list-logo {
		width: 80rpx;
		height: 80rpx;
		vertical-align: middle;
	}
</style>
