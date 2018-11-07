jQuery(document).ready(function() {
    var $ = jQuery;
    if ($('.set_custom_images').length > 0) {
        if ( typeof wp !== 'undefined' && wp.media && wp.media.editor) {
            $(document).on('click', '.set_custom_images', function(e) {
                e.preventDefault();
                var button = $(this);
                var id = button.prev();
                var img = button.next();
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
