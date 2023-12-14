const theme = {
	init: function () {

		theme.setTheme();

		const darkModeBtn = document.querySelector('.todo__header__button');
		darkModeBtn.addEventListener('click', theme.setTheme)
	},
	setTheme: function () {
		const root = document.documentElement;
		const newTheme = root.className === 'dark' ? 'light' : 'dark';
		root.className = newTheme;
	},
}