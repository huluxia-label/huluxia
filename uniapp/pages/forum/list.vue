<template>
	<scroll-view>
		<topbar :title="data.category.title"></topbar>
		<view class="event-wrap sm">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{backgroundImage: `url(${ data.category.icon})`}"></view>
					<view class="content">
						<view class="text-orange">话题: {{data.category.postCountFormated}} 热度: {{data.category.viewCountFormated}}</view>
						<view class="text-cut">{{data.category.description}}</view>
					</view>
				</view>
			</view>
			<view class="flex bg-white text-center solid-top solid-bottom">
				<view class="flex-sub padding solid-right">
					<text class="icon-evaluate"></text>
					达人堂
				</view>
				<view class="flex-sub padding">
					<text class="icon-search"></text>
					搜索
				</view>
			</view>

			<view class="margin-top-sm padding-sm bg-white cu-list menu">
				<view class="solid-bottom cu-item" :data-id="item.postID" @tap="postInfo" v-for="(item,index) in data.weightAndTopPost"
				 :key="index">
					<view class="content text-cut">
						<text class="upText">置顶</text>{{item.title}}
					</view>
				</view>
			</view>

			<scroll-view class="bg-gradual-green nav">
				<block v-for="(item,index) in data.category.tags" :key="index">
					<view class="cu-item" :data-id="item.ID">
						{{item.name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view class="padding-sm">
				<block v-for="(item,index) in data.posts" :key="index">
					<view :data-id="item.postID" @tap="postInfo" class="margin-top-xs solid-bottom padding-bottom">
						<view class="item-title text-lg">
							<text class="radius bg-red padding-left-xs padding-right-xs text-sm">+{{item.score}}</text>
							{{item.title}}
						</view>
						<view class="text-sm text-gray" style="height: 15vh;overflow:hidden;">
							<text class="">
								{{item.detail}}
							</text>
						</view>
						<view class="flex por" v-if="item.images.length >= 1">
							<image class="v-img" @tap.stop="zoom"
										:data-img="item.images[0]"
										:src="item.images[0]"
										mode="widthFix"></image>
							<text class="img-length">{{ item.images.length }}</text>
						</view>
						<view class="flex text-gray text-sm">
							<view class="flex-sub">{{item.user.nick}}</view>
							<view class="flex-sub text-right">
								<text>{{item.activeTime}}</text>
								<text>
									<text class="icon-male"></text>
									{{item.hit}}
									<text class="icon-comment"></text>
									{{item.commentCount}}
								</text>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<modal type="loading" :value="isLoading" @visible-change="modalLoadingChange"></modal>
		<modal type="img" :value="isWrap" :img="zoomImg" @visible-change="modalImgChange"></modal>
	</scroll-view>

</template>

<script>
	const conf = require('../../utils/config')
	const f3 = require('../../utils/f3.json')
	import modal from '../../components/modal.vue'
	import topbar from '../../components/topbar.vue'
	export default {
		components: {
			modal,
			topbar
		},
		data() {
			return {
				data: f3,
				isLoading: true,
				isWrap: false,
				zoomImg: ``
			}
		},
		onLoad(options) {
			let self = this
			let id = options.id || 43
			uni.request({
				url: `${conf.api.floor}/post/list/ANDROID/2.1`,
				data: {
					cat_id: id
				},
				success(data) {
					data = data.data
					data.category.description = '\n' + data.category.description
					self.data = data
					self.modalLoadingChange(false)
				}
			})
		},
		methods: {
			zoom(e) {
				let src = e.currentTarget.dataset.img
				this.zoomImg = src
				this.modalImgChange(true)
			},
			postInfo(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `./detail?id=${id}`
				})
			},
			modalLoadingChange(val) {
				this.isLoading = val
			},
			modalImgChange(val) {
				this.isWrap = val
			}
		}
	}
</script>

<style>
	.upText {
  background: var(--orange);
  padding: 6rpx 12rpx;
  color: var(--white);
  border-radius: 10rpx;
  margin-right: 6rpx;
}
.content-wrap {
  height: auto;
}
.v-img {
  width: 100%;
  padding: 10rpx;
}
.img-length {
  position: absolute;
  bottom: 18rpx;
  right: 16rpx;
  background: rgba(0,0,0,.5);
  color: #fff;
  padding: 4rpx 16rpx;
}
</style>
