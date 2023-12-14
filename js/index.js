const app = {
	init: function() {
		theme.init();
		todos.init();
	}
}

document.addEventListener('DOMContentLoaded', app.init())
