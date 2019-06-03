<template>
	<view>
		<topbar :title='data.post.category.title'></topbar>
		<view>
			<view>
				<view class="bg-gray">
					<view class="content">
						<view class="text-lg text-gray padding">
							{{data.post.title}}
						</view>
						<view class="flex text-gray padding-sm">
							<view class="flex-sub text-cyan">
								<text class="icon-appreciatefill lg text-cyan"></text>
								{{data.post.praise}}个人觉得很赞
							</view>
							<view class="flex-sub text-right text-gray">
								<text class="icon-male text-orange"></text>
								{{data.post.hit}}
								<text class="icon-comment text-orange"></text>
								{{data.post.commentCount}}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-card no-card">
					<view class="cu-item solids-bottom">
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="{backgroundImage: `url(${data.post.user.avatar})`}"></view>
								<view class="content flex-sub">
									<view class="flex">
										<view class="flex-sub">{{data.post.user.nick}}</view>
										<view class="flex-sub text-cyan text-right">楼主</view>
									</view>
									<view class="flex">
										<view class="flex-sub text-cyan light">
											<text class="radius" :class="{'bg-pink light': data.post.user.gender == 1, 'bg-cyan light' : data.post.user.gender}">
												{{data.post.user.gender == 1 ? '♀' : '♂'}} {{data.post.user.age}}
											</text>
										</view>
										<view class="flex-sub text-gray light text-right">昨天21:20</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="text-content bg-white padding-sm" decode="true">
						<text decode="true">{{data.post.detail}}</text>
					</view>
					<block v-if="data.post.images.length">
						<swiper class="bg-white card-swiper round-dot" duration="500" indicator-active-color="#0081ff" indicator-color="#8799a3"
						 indicator-dots="">
							<block v-for="(item,index) in data.post.images" :key="index">
								<swiper-item class="" item-id="">
									<view :data-img="item" @tap="zoom" class="swiper-item">
										<image mode="widthFix" :src="item"></image>
									</view>
								</swiper-item>
							</block>
						</swiper>
					</block>
					<block v-if="data.post.scorelist.length >= 1 && data.post.scorelist.length <= 6">
						<view class="cu-bar bg-blue light">
							<view class="action">
								<text class="icon-title text-cyan"></text> 打赏葫芦
							</view>
						</view>
						<view class="pading bg-blue light padding-bottom solids-bottom">
							<view class="padding-left padding-bottom-sm">
								总打赏: <text class="text-cyan">{{data.post.scorecount}}</text>
							</view>
							<block v-for="(item,index) in data.post.scorelist" :key="index">
								<view class="cu-avatar round margin-left" :style="{backgroundImage: `url(${item.avatar})`}">
									<view class="cu-tag badge bg-pink light">{{item.score}}</view>
								</view>
							</block>
						</view>
					</block>

				</view>
				<block v-for="(item,index) in data.comments" :key="index">
					<view class="cu-card no-card">
						<view class="cu-item solids-bottom">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" :style="{backgroundImage: `url(${item.user.avatar})`}"></view>
									<view class="content flex-sub">
										<view class="flex">
											<view class="flex-sub">{{item.user.nick}}</view>
											<view class="flex-sub text-cyan text-right">
												{{item.user.nick == up ? '楼主' : ''}}
											</view>
										</view>
										<view class="flex">
											<view class="flex-sub text-cyan light">
												<text class="radius bg-cyan light" selectable="false" :class="{'bg-pink light' : item.user.gender == 1}">
													{{item.user.gender == 1 ? '♀' : '♂'}} {{item.user.age}}
												</text>
											</view>
											<view class="flex-sub text-gray light text-right">昨天21:20</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="text-content bg-white padding-sm" decode="true">
							<text decode="true">{{item.text}}</text>
						</view>
						<block v-if="item.images.length">
							<swiper class="bg-white card-swiper round-dot" duration="500" indicator-active-color="#0081ff" indicator-color="#8799a3"
							 indicator-dots="">
								<block v-for="(item,index) in item.images" :key="index">
									<swiper-item class="" item-id="">
										<view :data-img="item" @tap="zoom" class="swiper-item">
											<image mode="widthFix" :src="item"></image>
										</view>
									</swiper-item>
								</block>
							</swiper>
						</block>
						<block v-if="item.scorelist.length >= 1 && item.scorelist.length <= 6">
							<view class="cu-bar bg-blue light">
								<view class="action">
									<text class="icon-title text-cyan"></text> 打赏葫芦
								</view>
							</view>
							<view class="pading bg-blue light padding-bottom solids-bottom">
								<view class="padding-left padding-bottom-sm">
									总打赏: <text class="text-cyan">{{item.scorecount}}</text>
								</view>
								<block v-for="(item,index) in item.scorelist" :key="index">
									<view class="cu-avatar round margin-left" :style="{backgroundImage: `url(${avatar})`}">
										<view class="cu-tag badge bg-pink light">
											{{item.score}}
										</view>
									</view>
								</block>
							</view>
						</block>
					</view>
				</block>

			</view>
		</view>
		<modal type="loading" :value="isLoad"></modal>
		<modal type="img" :value="isImg" :img="img" @visible-change="eyes"></modal>
	</view>
</template>

<script>
	let conf = require('../../utils/config')
	let url = `${conf.api.floor}/post/detail/ANDROID/2.3`
	let as = require('../../utils/info.json')
	import modal from '../../components/modal.vue'
	import topbar from '../../components/topbar.vue'
	export default {
		components: {
			modal,
			topbar
		},
		data() {
			return {
				data: as,
				start: 1,
				total: 1,
				size: 20,
				up: '',
				isLoad: true,
				isImg: false,
				img: ``,
				id: ``
			}
		},
		onLoad(op) {
			let id = op.id || 34893485
			this.getData({
				id,
				cur: 0
			})
		},
		onReachBottom() {
			let that = this
			let page = ++that.start
			if (page >= that.total) return
			console.log(page,that.total)
			this.getData({
				cur: page,
				id: that.id || 0
			})
		},
		methods: {
			getData(obj) {
				let id = obj.id,
						cur = obj.cur || 0,
				    that = this
				that.id = id
				uni.request({
					url,
					data: {
						post_id: id,
						post_size: 20,
						page_no: cur
					},
					success(data) {
						data = data.data
						
						if (cur > 0) {
							let od = that.data.comments,
						    nw = data.comments
							that.data.comments = od.concat(nw)
						} else {
							that.data = data
							that.isLoad = false
							that.total = data.totalPage
							that.up = data.post.user.nick
						}
					}
				})
			},
			eyes(e) {
				this.isImg = e
			},
			zoom(e) {
				let img = e.currentTarget.dataset.img
				this.img = img
				this.eyes(true)
			}
		}
	}
</script>

<style>
</style>
