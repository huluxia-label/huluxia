<script>
	export default {
		data() {
			return {
				author: `@d1y`
			}
		},
		onLaunch: function() {
			console.info('启动')
		}
	}
</script>

<style>
	@import url("./colorui/main.css");
	@import url("./colorui/icon.css");

	.content-wrap {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 140rpx 0;
		box-sizing: border-box;
	}

	/* 布局相关 */
	.por {
		position: relative;
	}

	.pofTop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
	}

	.pofBottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
	}

	.diy-bar {
		padding-top: 10vh;
		width: 100vw;
		z-index: 2333;
	}

	.diy-bar.sm {
		padding-top: 6vh;
	}
</style>
