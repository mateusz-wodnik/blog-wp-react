jQuery(document).ready(function() {
    var $ = jQuery;
    if ($('.set_custom_images').length > 0) {
        if ( typeof wp !== 'undefined' && wp.media && wp.media.editor) {
            $(document).on('click', '.set_custom_images, #author_image', function(e) {
                e.preventDefault();
                var button = $(this);
                var id = button.prev().prev().trigger("change");
                var img = button.prev();
                wp.media.editor.send.attachment = function(props, attachment) {
                    id.val(attachment.id);
                    img.attr('src', attachment.sizes.thumbnail.url);
                    console.log(attachment)
                };;
                wp.media.editor.open(button);
                return false;
            });
        }
    }
});

if ($('.set_custom_images').length > 0) {
    if ( typeof wp !== 'undefined' && wp.media && wp.media.editor) {

    }
}