const cost_gold = [0,0,10,25,50,150,500,1000,2000,5000,10000,20000,30000,40000,50000]
const cost_card = [0,0,2,5,10,20,50,100,200,500,1000,1500,2000,2500,3000]

$(function () {
	console.log('loaded')
	$('.level').on('input', () => {
		calculate()
	})
	$('.avail_cards').on('input', () => {
		calculate()
	})
	$('.type').on('change', () => {
		calculate()
	})
	$('.gold').on('input', () => {
		calculate()
	})

	function calculate() {
		console.log('calculate')
		const level = $('.level').val()|0 || 0
		const cards = $('.avail_cards').val()|0 || 0
		const gold = $('.gold').val()|0 || 0
		const type = $('.type').val()|0 || 0

		let maxLevel = level;
		let calc = []
		let costGold=0, costCards=0;
		for(let i=level+1, N=cost_gold.length; i<N; i++) {
			costCards += cost_card[i];
			costGold += cost_gold[i+type];
			calc.push({'level': i, costCards, costGold})
			if (costCards-cards < 0 && costGold-gold < 0) maxLevel=i
		}
		console.log('maxLevel', maxLevel)
		console.log('calc', calc)
		$('.data').html('')
		for (const data of calc) {
			let okLevel = data.level <= maxLevel ? 'green' : ''
			let okCards = data.costCards <= cards ? 'green' : ''
			let okGold = data.costGold <= gold ? 'green' : ''
			let html = `
				<table class="${okLevel}">
					<thead>
						<tr><th colspan="2">Level ${data.level}</th></tr>
						<tr><th>Cards</th><th>Gold</th></tr>
					</thead>
					<tbody class="tbody">
						<tr><td class="${okCards}">${data.costCards}</td><td class="${okGold}">${data.costGold}</td></tr>
						<tr><td class="${okCards}">${cards - data.costCards}</td><td class="${okGold}">${gold-data.costGold}</td></tr>
					</tbody>
				</table>`
			$('.data').append(html)
			if (!okLevel && !okGold && !okCards) break;
		}
	}
});
