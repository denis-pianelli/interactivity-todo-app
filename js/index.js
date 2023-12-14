const app = {
	init: function() {
		theme.init();
		todo.init();
	}
}

document.addEventListener('DOMContentLoaded', app.init())
