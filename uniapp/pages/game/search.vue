<template>
	<view>
		<view class="">
			<view class="cu-form-group bg-green padding-bottom padding-left diy-bar">
				<text class="cuIcon-back title" @tap="backTo"></text>
				<input class="diy-in" type="text" 
					v-model.trim="valueInit"
					@confirm="searchEnter"
				  placeholder="要不要搜索一下~" />
					<text class="cuIcon-close" @tap="delText"></text>
			</view>
			<view v-if="searchStatus">
				<view class="">
					<view class="padding bg-white">
						<text class="cuIcon-titles text-green"></text>
						<text>热门搜索</text>
					</view>
					<view class="grid col-3 text-center bg-white light">
						<block v-for="(item,index) in hots.keywodList" :key="index">
							<view class="padding-left-sm" @tap="hotKeywords" :data-keyword="item">
								<view :style="{borderColor: hots.colors[index]}" class="hit text-cut text-sm">{{item}}</view>
							</view>
						</block>
					</view>
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<view class="padding-left padding-right">
									<text class="icon-titles text-green"></text>
									<text>搜索历史</text>
								</view>
							</view>
							<view class="action" @tap="removeHistory">
								<text class="cuIcon-delete lg text-gray"></text>清空列表
							</view>
						</view>
						<scroll-view>
							<view class="cu-list menu bg-white margin-sm">
								<view class="cu-item" :data-keyword="item" @tap="hotKeywords" v-for="(item,index) in searchHistory" :key="index">
									<view class="content">
										<text class="cuIcon-read"></text>
										<text class="text-gray">{{item}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view v-if="!searchStatus">
				<scroll-view class="event-wrap">
					<block>
						<view class="cu-list menu-avatar margin-top-xs">
							<view 
								class="cu-item solid-bottom" 
								@tap="gameDetail" 
								:data-id="item.appid" 
								v-for="(item,index) in game"
								:key="index">
								<view class="cu-avatar radius lg shadow-blur solid" 
									style="background-size: 100%;"
									:style="{backgroundImage: `url(${item.applogo})`}"></view>
								<view class="content">
									<view class="text-pink">
										{{item.apptitle}}
									</view>
									<view class="text-sm text-gray flex">
										<view class="flex-sub">
											<text class="solid-tag action">{{item.categoryname}}</text>
										</view>
										<text class="action flex-sub">{{item.appsize}}MB</text>
										<view class="flex-sub"></view>
									</view>
								</view>
								<button class="cu-btn round line-blue" :data-url="item.localurl.url" @tap="downGame">下载</button>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<modal type="loading" :value="isLoading"></modal>
	</view>
</template>

<script>
const conf = require('../../utils/config')
import modal from '../../components/modal.vue'
export default {
	components: {
		modal
	},
	data() {
		return {
			hots: [],
			valueInit: '',
			searchHistory: [],
			searchStatus: true,
			game: [],
			isLoading: false
		}
	},
	onLoad() {
			this.loadHistory()
			this.loadHotWords()
	},
	methods: {
		delText() {
			this.valueInit = ``
			this.searchStatus = true
		},
		loadHistory() {
			// 加载搜索历史
			let b = uni.getStorageSync('search_history') || []
			this.searchHistory = b
		},
		loadHotWords() {
			// 加载热门搜索
			let that = this
			that.isLoading = true
			uni.request({
				url: `${conf.api.tools}/search/recommend/list/ANDROID/3.6`,
				success(data) {
					that.isLoading = false
					that.hots = data.data
				}
			})
		},
		backTo() {
			wx.navigateBack({
				delta:1
			})
		},
		hotKeywords(e) {
			// 搜索记录,点击事件
			let data = e.currentTarget.dataset.keyword
			this.valueInit = data
			this.searchEnter()
		},
		searchEnter() {
			// 按下回车
			let local = uni.getStorageSync('search_history') || [],
					that = this,
					value = that.valueInit // 值
			that.searchStatus = false
			that.isLoading = true
			for (let i = 0; i < local.length; i++) {
				if (local[i] == value) {
					local.splice(i, 1)
				}
			}
			local.unshift(value) // 总是让此次的结果push到最上层
			that.searchHistory = local
			wx.setStorageSync('search_history', local)
			uni.request({
				url: `${conf.api.search}/game/search/ANDROID/1.1`,
				data: {
					keyword: value
				},
				success(data) {
					that.isLoading = false
					that.game = data.data.gameapps
				}
			})
		},
		removeHistory() {
			// 清空搜索历史列表
			wx.setStorageSync('search_history', '')
			this.searchHistory = []
		},
		downGame(e) {
			// 下载游戏
			wx.setClipboardData({
				data: e.target.dataset.url,
				success: (result) => {
					console.log(`${e.target.dataset.url} 复制成功!`)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		gameDetail(e) {
			// 跳转到游戏详情
			let id = e.currentTarget.dataset.id
			uni.navigateTo({url: `detail?id=${id}`})
		}
	}
}
</script>

<style>
	.diy-in {
		height: 6vh;
		border: 1px solid #fff;
		border-radius: 8rpx;
		margin-left: 40rpx;
		margin-right: 8rpx;
		background: #fff;
		padding-left: 20rpx;
	}

	.hit {
		box-sizing: inherit;
		padding: 20rpx 16rpx;
		margin: 14rpx;
		border: 1px solid;
		border-radius: 8rpx;
	}
</style>
