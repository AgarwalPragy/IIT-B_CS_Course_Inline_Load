// Get all the "More Info" links inside that table.
// We get a array of all these links into var links.
var links = $('.greybodytr td:nth-child(2)>a');

// We're not choosing CS XXX links becuase IIT-B retards choose
// to load only some pages over SSL.

// Add a click handler to all those links.
links.click(function(e){
	e.preventDefault();
	var $this = $(this);

	// Get the row in which our clicked link resides
	var $row = $this.parent(/**We get the column*/).parent(/**we get the row*/);

	// Check if we've already clicked this link.
	// If we have, then we have already loaded the data, and we need to 
	// hide it on this click. So clicking the link works as a toggle.

	if($this.data('open') === undefined) {
		// Didn't click the link ever before. Load the data now.
		var href = $this.attr('href');

		var new_row = '<tr><div class="myframe"></div></tr>';
		$row.after(new_row);
		get_data(href, $row.next());

		$this.data('open', 'loaded');
		// loaded means that we need to hide it next time,
		// but next to next time, we just show it instead of re-loading
	}
	else if($this.data('open') === 'loaded'){
		// We already clicked the link and loaded the data earlier.
		// Just hide that data now.
		$row.next().hide();

		$this.data('open', 'loaded hidden');
		// hidden means that we need to show it next time,
		// just show and not reload
	}
	else {
		// We already clicked the link and loaded the data earlier.
		// We hid it earlier, so just show it now.
		$row.next().show();

		$this.data('open', 'loaded');
	}
});

function get_data(href, my_row) {
	$.ajax({
		url: href,
		success: function(data) {
			// Get the content, ignore the page navigation and sidebar
			data = $(data).find('.mpart').html();
			my_row.html('<td colspan=3">' + data + '</td>');
		}
	});
}