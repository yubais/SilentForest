"use strict";

/*
関連商品や「ほしい物リスト」などCSSだけでは上手く消せない部分はJSで除去
*/

(function(){ // 名前空間汚さないバリアー

// ある DOM 要素があるクラス名の子供を持っているか判定（持ってたら最初のを返す）
const getFirstChildWithClassName = function(element, className) {
	const children = document.getElementsByClassName(className);
	for (const child of children) {
		if (element.contains(child) && element !== child) return child;
	}
	return false;
}

const removeStars = function() {
	const arows = document.getElementsByClassName('a-row');
	for(const arow of arows) {
		if (getFirstChildWithClassName(arow, 'a-icon-star')) {
			if (! getFirstChildWithClassName(arow, 'a-row')) arow.remove();
		}
	}

	const gabageCollection = [] // なぜか一旦 Array に集めて消さないと同時に全部消えてくれない。
	const aiconrows = document.getElementsByClassName('a-icon-row');
	for(const item of aiconrows) {
		if (getFirstChildWithClassName(item, 'a-icon-star')) gabageCollection.push(item);
	}
	for(const item of gabageCollection) item.innerHTML = '<div style="font-size: 9px; color: #888; padding: 10px 0px;">レビュー非表示</div>';
}

const removeIndeesRanking = function() {
	const arows = document.getElementsByClassName('a-row a-spacing-top-medium dbs-widget-size');
	for (const arow of arows) {
		const h2 = getFirstChildWithClassName(arow, 'a-size-large');
		if (h2.textContent.search('インディーズマンガのランキング') >= 0) arow.remove();
	}
}

window.onload = removeIndeesRanking;
setInterval( removeStars, 1000 ); // 動的に読み込まれる星を消す方法はこれ以外にあるか？

})();

