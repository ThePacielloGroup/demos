$(document).ready(function() {
	// Overall process
	//	* Create holding areas for the tag cloud and article lists.
	//	* Move the article lists from being nested in the <dl> to being
	//	  inside the new holding area.
	//	* Create the tag cloud, with size of links' text proprortional to
	//	  number of articles, and including accessibility info for
	//	  non-visual browsers.
	//	* Attach a function to each tag cloud link that hides all of the
	//	  article lists except the one corresponding to that particular tag.
	//	* Create anchors before the tag cloud and article list holding
	//	  area to ease navigation for non-visual browsers.
	//	* Remove what remains of the original <dl>.

	var PREFIX_LIST = "list-";  // used as part of @id for static <ul>s
	var PREFIX_LINK = "link-";  // used as part of @id for cloud <a>s
	var SIZE_MIN = 0.25;
	var SIZE_MAX = 4;
	var hash = '';  // bit of the URL
	var max_article_count = 0;  // for a given tag
	var tag_to_count = {};
	// A mapping from tag name to number of articles and font size
	// The format is [tag_name]: { raw: [article_count], size: [] }
	var tag_cloud_container;
	var article_list_container;
	var struct = $("#posts-by-tag");  // the <dl> we have originally

	// Create the tag cloud area
	tag_cloud_container = $('<div '
		+ 'id="tag-cloud" '
		+ 'tabindex="-1">'  // it can be focussed only by script, not keyb.
		+ '</div>'
	).insertBefore(struct);

	// Create an element that can take the user to just before the list of
	// articles for a given tag.  This allows us to put the user in the
	// right place on the page, even if the article list has not yet
	// appeared due to ongoing DOM manipulations.
	// Thanks to <http://blog.ginader.de/> for the tipoff!
	$('<span '
		+ 'id="article-list-pointer" '
		+ 'tabindex="-1" '  // it can be focussed only by script, not keyb.
		+ 'class="hidden">'
		+ 'Article list</span>'
	).insertAfter(tag_cloud_container);

	// Create a holding area for the lists of articles.
	article_list_container = $('<div '
		+ 'id="article-list-container">'
		+ '</div>'
	).insertAfter(struct);

	// Create a link that returns the user to the tag cloud after
	// they have gone through the article list
	$('<a '
		+ 'href="#" '  // to keep it in the tab order
		+ 'class="hidden">'
		+ 'Return to tag cloud</a>'
	).click(function() {
		$('#tag-cloud').focus();
	}).insertAfter(article_list_container);

	// Iterate over each <ul> in the <dl> to find the tag names and sizes.
	// The <ul>'s id includes the tag name, and its length is the size.
	// Make the <ul> hidden, then move it to the article list container.
	struct.find("ul").each(function(index, element) {
		var tag_name = $(element).attr("id").slice(PREFIX_LIST.length);
		var article_count = $(element).children().length;
		tag_to_count[tag_name] = { raw: article_count };

		if( article_count > max_article_count ) {
			max_article_count = article_count;
		}

		$(element).hide();
		$(element).attr('aria-hidden', 'true');  // until full HTML5 support
		$(element).attr('hidden', 'true');
		$(element).appendTo(article_list_container);
	});

	// Normalise the article count against the given scale
	// to form the font size for each tag.
	$.each(tag_to_count, function(tag_name, record) {
		var raw = record.raw;
		var rank = raw / max_article_count;
		record.size = SIZE_MIN + ( rank * ( SIZE_MAX - SIZE_MIN ) );
	});

	// Debugging
	//console.log("tag_to_count:", tag_to_count);

	// Populate the tag cloud
	$.each(tag_to_count, function(tag_name, record) {
		tag_cloud_container.append(
			'<a '
			// Attributes
			+ 'href="#" '  // to keep it in the tab order
			+ 'id="' + PREFIX_LINK + tag_name + '" '
			+ 'style="font-size: ' + record.size + 'em;">'
			// Content
			+ tag_name
			+ '<span class="hidden"> (' + record.raw
			+ ( record.raw > 1 ? ' articles' : ' article' )
			+ ")</span></a>&nbsp; "
		);
	});

	// Attach a show function to the tag cloud links
	$("#tag-cloud a").click(function() {
		var list_id = PREFIX_LIST + this.id.slice(PREFIX_LINK.length);
		var target = $('#' + list_id);

		// Hide all <ul>s currently in the live region
		article_list_container
			.children()
			.attr('aria-hidden', 'true')  // until browsers support HTML5
			.attr('hidden', 'true')
			.hide('fast');

		// Show the one in which we are interested
		$(target)
			.attr('aria-hidden', 'false')  // until browsers support HTML5
			.removeAttr('hidden')
			.show('slow');

		// Ensure users of assistive technologies are redirected to the
		// point just before the list of articles is being shown
		$('#article-list-pointer').focus();
	});

	// Now that all of the <ul>s are in the live area, remove the <dl>
	struct.remove();

	// If a tag is specified as part of the URL after the # and it
	// is a valid tag, then show it as if it had been clicked.
	var hash = window.location.hash.substring(1);
	if( hash ) {
		// Use find to avoid executing arbitrary code from the URL
		$('body').find('#' + PREFIX_LINK + hash).click();
	}
});
