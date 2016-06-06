WebsiteModel = Backbone.Model.extend ({
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#setuptemplate").html(), {});
		this.$el.html(template);
	}
});

$(document).ready(function(){
	var aView = new TheView({el: $("#unique")});
});

$('.collapse').collapse()

$(document).ready(function(){
  $("#demo").on("hide.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
  });
  $("#demo").on("show.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
  });
});