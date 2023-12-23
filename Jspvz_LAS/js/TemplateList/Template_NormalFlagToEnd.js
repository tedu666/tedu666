let __Template_Normal_FlagToEnd__ = {
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {
			onclick: function() {
				SelectModal(0);
				PlayAudio("winmusic");
			}
		});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
	}
};