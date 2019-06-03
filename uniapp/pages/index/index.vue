<template>
	<view>
		<modal type="loading" :flag="checkLoading"></modal>
		<view class="diy-bar cu-form-group padding shadow" :class="currentColor" style="
					position: fixed;
					top: 0;
					left: 0;
				">
			<view class="title">
				<text class="cuIcon-search"></text>
			</view>
			<input type="text" class="bg-white padding-left radius shadow" :placeholder="searchTips" @tap="searchIn" />
		</view>
		<scroll-view class="event-wrap" v-bind:style="{paddingTop: `${ptx}vh`}">
			<view class="flex margin-top-xs text-center padding-sm bg-gray" v-if="fx.length > 0">
				<block v-for="(item,index) in fx" :key="index">
					<view class="flex-sub padding-sm margin-xs radius" :data-id="item.tabid" :class="currentColor" @tap="fxBtn">
						<view class="text-xxl"> <text :class="item.icon"></text> </view>
						{{ item.tabname }}
					</view>
				</block>
			</view>
			<view v-if="lx.length > 0" class="cu-list menu-avatar margin-top-xs">
				<block v-for="(item,index) in lx" v-bind:key="index">
					<view class="cu-item solid-bottom" :data-id="item.appid" @tap="gameDetail">
						<view class="cu-avatar radius lg shadow-blur solid" :style="{ backgroundImage: `url(${item.applogo})`, backgroundSize: '100%' }"></view>
						<view class="content">
							<view class="text-pink">{{ item.apptitle }}</view>
							<view class="text-sm text-gray flex">
								<view class="flex-sub">
									<text class="solid-tag action">{{ item.categoryname }}</text>
								</view>
								<view class="flex-sub">{{ item.appsize }} MB</view>
								<view class="flex-sub"></view>
							</view>
						</view>
						<button class="cu-btn round line-blue" catchtap="downGame">下载</button>
					</view>
				</block>
			</view>
			<view v-else>
				<view class="content-wrap" style="height: 60vh;text-align: center;">
					<view class="text-lg text-red margin-sm">Σ( ° △ °|||)︴ FUCK#</view>
					<view class="text-sm text-black">{{ fuck }}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let conf = require('../../utils/config')
	let api = conf.api.tools,
			search = conf.api.search
	import modal from "../../components/modal.vue"
	export default {
		components: {
			modal
		},
		data() {
			return {
				fx: [],
				lx: [],
				colors: conf.colors,
				currentColor: ``,
				searchTips: ``,
				gameCount: 20,
				gameStart: 0,
				ptx: 16,
				fuck: `服务器君跑路了w(ﾟДﾟ)w`,
				checkLoading: true
			}
		},
		onLoad() {
			const self = this
			self.bbsGame()
			self.randomColor()
			setTimeout(() => {
				self.getWords()
				self.getBtnList()
			}, 1000)

			let system = uni.getSystemInfoSync()
			let hx = system.windowHeight
			if (hx < 500) {
				self.ptx = 21
			}
		},
		onShow() {
			let current = this.randomColor()
			this.currentColor = current
		},
		onReachBottom() {

		},
		methods: {
			searchIn() {
					uni.navigateTo({
						url: `../game/search`
					})
			},
			getWords() {
				let self = this
				uni.request({
					url: `${api}/search/suggest/ANDROID/3.6`,
					success: function(data) {
						self.searchTips = data.data.list[0]
					}
				})
			},
			getBtnList() {
				let self = this
				uni.request({
					url: `${api}/game/navigator/ANDROID/3.7`,
					success: function(data) {
						let btns = data.data.btnlist
						let icons = [
							'cuIcon-game',
							'cuIcon-discover',
							'cuIcon-favor',
							'cuIcon-evaluate'
						]
						for (let i=0; i<icons.length; i++) {
							btns[i].icon = icons[i]
						}
						self.fx = btns
					}
				})
			},
			bbsGame() {
				let self = this
				let ajx = `${api}/bbs/recommend/ANDROID/3.6`
				uni.request({
					url: ajx,
					success(data) {
						self.checkLoading = false
						self.lx = data.data.gameapps
					},
					fail: error => console.error(error)
				})
			},
			randomColor() {
				let self = this
				let random = () => self.colors[Math.floor(Math.random() * self.colors.length)]
				return random()
			},
			gameDetail(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:`../game/detail?id=${id}`
				})
			},
			fxBtn(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:'../game/total'
				})
			}
		}
	}
</script>

<style>

</style>
