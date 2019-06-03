// 配置文件

let fix = `huluxia.com`,
		ag = `http://`
		
// test devloper
// ag = `http://localhost:1337/`

let api = {
	tools: `${ag}tools.${fix}`,
	floor: `${ag}floor.${fix}`,
	search: `${ag}search.${fix}`
}

let	data = {
	platform: 2,
	gkey: 440000,
	app_version: '3.5.0.88.3',
	versioncode: 20141400,
	market_id: 'floor_web',
},
colors = [
	"bg-gradual-red","bg-gradual-orange",
	"bg-gradual-green","bg-gradual-blue",
	"bg-gradual-purple","bg-gradual-pink",
]

module.exports = {
	api,
	data,
	colors
}