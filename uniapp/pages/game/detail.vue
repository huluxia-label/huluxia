<template>
	<view>
		<modal type="loading" :value="isLoading" @visible-change="modalLoadingChange"></modal>
		<modal type="img" :img="zoomImg" :value="zoomFlag" @visible-change="modalVisibleChange"></modal>
		<view class="" style="padding-top:0;padding-bottom: 10vh;">
			<view class="diy-bar shadow bg-gradual-green sm" style="padding-top:5vh;">
				<view class="cu-bar">
					<view class="action" @tap="backTo"><text class="cuIcon-back"></text>返回</view>
					<view class="content">
						{{ game.gameinfo.apptitle }}
					</view>
				</view>
			</view>
			<view class="event-wrap sm">

				<view class="video-wrap shadow-warp">
					<video v-if="game.coverVideoUrl" :src="game.coverVideoUrl" :title="game.gameinfo.apptitle" :poster="game.coverVideoThumbnailUrl"
					 controls></video>
				</view>

				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar radius lg shadow-blur" :style="{backgroundImage: `url(${game.gameinfo.applogo})`}"></view>
						<view class="content flex-sub">
							<view class="text-bold">{{game.gameinfo.apptitle}}</view>
							<view class="text-sm text-gray">
								<text>{{game.gameinfo.appversion}}</text> | <text>{{game.gameinfo.appsize}}</text>
							</view>
							<view>
								<block v-for="item in game.gameinfo.apptags" :key="item">
									<text class="app-tags text-orange">{{ item }}</text>
								</block>
							</view>
						</view>
					</view>
				</view>

				<view class="flex text-center bg-cyan light">
					<view data-open="info" @tap="checkCard" class="flex-sub text-gray padding" :class="{'solids-bottom line-green text-green' :status == 'info'}">
						详情
					</view>
					<view data-open="comment" @tap="checkCard" class="flex-sub text-gray padding" :class="{'solids-bottom line-green text-green' : status == 'comment'}">
						评论
					</view>
				</view>

				<block v-if="status == 'info'">
					<swiper class="card-swiper round-dot bg-pink light" indicator-active-color="orange" indicator-color="#8799a3"
					 indicator-dots="true">
						<block v-for="(item,index) in game.gameinfo.imageresource" :key="index">
							<swiper-item class="" item-id="">
								<view :data-img="item" @tap="zoomIMG" class="swiper-item">
									<image class="" :src="item" mode="widthFix" />
								</view>
							</swiper-item>
						</block>
					</swiper>
					<block>
						<view class="padding solid line-orange margin-sm text-gray">
							<view class="flex">
								<view class="flex-sub">系统: {{game.gameinfo.system}}</view>
								<view class="flex-sub">语言: {{game.gameinfo.applanguage}}</view>
							</view>
							<view class="flex">
								<view class="flex-sub">作者: {{game.gameinfo.username}}</view>
								<view class="flex-sub">分类: {{game.gameinfo.categoryname}}</view>
							</view>
						</view>
					</block>

					<block>
						<view class="padding">
							<view class="text-content solid-bottom padding-bottom text-green text-bold padding-left padding-top-sm">
								<text class="icon-title"></text> {{game.gameinfo.appcrackdesc}}
							</view>
							<view @tap="appOpen" class="text-content text-gray solids-bottom padding-bottom line-green padding-top" :class="{ 'more-wrap' : !isOpen }">
								<text class="text-bold">应用介绍</text>
								<view class="bg-gradual-blue" style="width:3rem;height:6rpx"></view>
								<text class="padding" selectable="false" space="false" decode="true">
									{{game.gameinfo.appdesc}}
								</text>
							</view>
						</view>
					</block>

					<block>
						<view class="padding-left padding-bottom">
							<text class="text-bold">相关应用推荐: </text>
							<view class="bg-gradual-blue" style="width:3rem;height:6rpx"></view>
						</view>
						<view class="grid col-4">
							<block v-for="(item,index) in game.similarList" :key="index">
								<view class="text-center" :data-id="item.appid" @tap="checkDetail">
									<view>
										<image mode="widthFix" :src="item.applogo" class="app-logo radius"></image>
									</view>
									<view class="text-center text-cut">
										<text>{{item.apptitle}}</text>
									</view>
								</view>
							</block>
						</view>

					</block>
				</block>

				<block v-else-if="status == 'comment'">
					<view class="cu-card bg-white">
						<view class="cu-item" v-for="(item,index) in comments" :key="index">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round" :style="{backgroundImage: `url(${item.user.avatar})`}"></view>
									<view class="content flex-sub">
										<view class="text-orange">{{item.user.nick}}</view>
									</view>
								</view>
							</view>
							<view class="por text-content text-gray line-orange radius padding-left solid padding">
								<view class="chat-arrow"></view>
								{{item.text}}
							</view>
						</view>
					</view>
				</block>

			</view>
		</view>

		<view @tap="downUrl" class="flex flex-direction text-center bg-gradual-green" style="position: fixed; bottom: 0; width: 100vw;height: 6vh">
			<view class="margin-top-sm lg" :data-url="game.gameinfo.localurl.url">下载({{game.gameinfo.appsize}})</view>
		</view>
	</view>
</template>

<script>
	let conf = require('../../utils/config')
	import modal from "../../components/modal.vue";
	export default {
		components:{
			modal
		},
		data() {
			return {
				game: {},
				isOpen: false,
				status: 'info',
				comments: [],
				isLoading: true,
				zoomImg: ``,
				zoomFlag: false
			}
		},
		onLoad(options) {
			let self = this
			let id = options.id || 47815
			self.getGameDetails(id)
		},
		methods: {
			getGameDetails(id) {
				let self = this
				let url = conf.api.tools
				uni.request({
					url: `${conf.api.tools}/game/detail/ANDROID/3.6`,
					data: {
						app_id: id,
						count: 20,
						start: 0
					},
					success(data) {
						let mock = data.data
						mock.gameinfo.apptags = mock.gameinfo.apptags.split(',')
						mock.gameinfo.appdesc = mock.gameinfo.appdesc.replace(/<br \/>/g, '\n')
						mock.gameinfo.appsize = mock.gameinfo.appsize + 'MB'
						mock.gameinfo.appcrackdesc = mock.gameinfo.appcrackdesc.replace(/<br \/>/g, '\n')
						self.game = mock
					},
					fail: e => console.error(e)
				})
				uni.request({
					url: `${conf.api.tools}/game/comment/good/list/ANDROID/3.6`,
					data: {
						app_id: id,
						count: 20,
						start: 0
					},
					success(data) {
						self.comments = data.data.comments
						self.modalLoadingChange(false)
					}
				})
			},
			appOpen() {
				let self = this
				let open = self.isOpen
				self.isOpen = !open
			},
			checkCard(e) {
				let self = this
				let text = e.currentTarget.dataset.open
				self.status = text
			},
			backTo() {
				uni.navigateBack({
					delta:1,
					animationDuration:400
				})
			},
			zoomIMG(e) {
				let src = e.currentTarget.dataset.img
				this.zoomImg = src
				this.modalVisibleChange(true)
			},
			modalVisibleChange(val){
       this.zoomFlag = val;
      },
			modalLoadingChange(val){
				this.isLoading = val
			},
			checkDetail(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
						url: `./detail?id=${id}`
				})
			}
		}
	}
</script>

<style>
	.video-wrap video {
		width: 100vw;
		height: 24vh;
	}

	.app-tags {
		font-size: 20rpx;
		border: 1px solid orange;
		padding: 3rpx 6rpx;
		margin: 0 6rpx;
		border-radius: 6rpx;
	}

	.more-wrap {
		height: 240rpx;
		overflow: hidden;
	}

	.app-logo {
		padding: 10rpx;
		width: 80%;
		height: auto;
	}

	.chat-arrow {
		position: absolute;
		top: -46rpx;
		left: 42rpx;
		width: 0;
		height: 0;
		font-size: 0;
		border: solid 10px;
		border-color: transparent transparent var(--orange) transparent;
	}
</style>
