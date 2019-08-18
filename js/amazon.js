"use strict";

/*
関連商品や「ほしい物リスト」などCSSだけでは上手く消せない部分はJSで除去
*/

(function(){ // 名前空間汚さないバリアー

// 親要素と子要素候補群を入力し、最初の子要素を返す。なければ false
const getFirstChild = function(element, children) {
	for (const child of children) {
		if (element.contains(child) && element !== child) return child;
	}
	return false;
}

const removeStars = function() {
	const arows = document.getElementsByClassName('a-row');
	const stars = document.querySelectorAll('.a-icon-star, .a-icon-star-small');
	for(const arow of arows) {
		if (getFirstChild(arow, stars)) {
			if (! getFirstChild(arow, arows)) arow.remove();
		}
	}
	const aiconrows = document.getElementsByClassName('a-icon-row');
	for(const item of aiconrows) {
		if (getFirstChild(item, stars)) { 
			item.innerHTML = '<div style="font-size: 9px; color: #888; padding: 10px 0px;">レビュー非表示</div>';
		}
	}
}

const removeIndeesRanking = function() {
	const arows = document.getElementsByClassName('a-row a-spacing-top-medium dbs-widget-size');
	const headlines = document.querySelectorAll('.a-size-large');
	for (const arow of arows) {
		const h2 = getFirstChild(arow, headlines);
		if (h2.textContent.search('インディーズマンガのランキング') >= 0) arow.remove();
	}
}

window.onload = removeIndeesRanking;
setInterval( removeStars, 1000 ); // 動的に読み込まれる星を消す方法はこれ以外にあるか？

})();

