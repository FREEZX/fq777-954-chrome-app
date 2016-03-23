chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('window.html', {
		'innerBounds': {
			width: 720,
			height: 576
		}
	});
});