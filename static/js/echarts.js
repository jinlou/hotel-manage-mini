export const getEchartsOptionsCircle = (legendData, seriesData, options) => {
	let legend = {
			x: 'right',
			y: 'center',
			right: '5%',
			orient: 'vertical',
			itemWidth: 12,
			itemHeight: 8,
			textStyle: {
				fontSize: 11
			},
			data: legendData
		},
		grid = {
			left: '3%',
			right: '8%',
			bottom: '3%',
			containLabel: true
		},
		tooltip = {
			trigger: 'item',
		},
		series = [{
			type: 'pie',
			radius: [0, '30%'],
			width: '40%',
			right: '30%',
			center: ['35%', '50%'],
			data: seriesData
		}]
	return {
		tooltip,
		grid,
		legend,
		series
	}
}
export const getEchartsOptionsLine = (dateList, seriesData, options) => {
	let series = seriesData,
		xAxis = {
			type: 'category',
			data: dateList,
			axisLabel: {
				rotate: '45'
			},
			axisLine: {
				show: true
			},
		},
		yAxis = {
			show: true,
			type: 'value',
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					// color: 'rgba(255,255,255,0.1)'
				}
			},
			axisLine: {
				show: true
			},
		},
		legend = {
			left: '15%'
		}
		return {
			legend,
			xAxis,
			yAxis,
			series
		}
}
