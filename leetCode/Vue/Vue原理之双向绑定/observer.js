var data = { name: 'kinde' };

observe(data);

data.name = 'qqq';

function observe(data) {
	if (!data || typeof data !== 'object') {
		return;
	}

	// 取出所有元素遍历
	Object.keys(data).forEach(function(key) {
		defineReactive(data, key, data[key]);
	})
}


function defineReactive(data, key, val) {
	var dep = new Dep()
	observe(val); // 监听子属性

	Object.defineProperty(data, key, {
		enumerable: true, // 可枚举
		configurable: false,
		get: function() {
			return val;
		},
		set: function(newVal) {
			if (val === newVal) return;
			console.log('哈哈哈，监听到值变化了 ', val, '--->', newVal);
			val = newVal;
			dep.notify(); // 通知所有订阅者
		}
	})
}

// Observer 监听属性，监听之后要通知订阅者。

function Dep() {
	this.subs = [];
}

Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub);
	},
	notify: function() {
		this.subs.forEach(function(sub) {
			sub.update();
		})
	}
}