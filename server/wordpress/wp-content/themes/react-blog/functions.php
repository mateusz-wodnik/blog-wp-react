<?php
register_nav_menus();
add_theme_support( 'custom-logo' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'custom-background' );

/**
 * Register our sidebars and widgetized areas.
 *
 */

/*
Custom widgets
*/
include_once('class-theme-about-widget.php');
include_once('class-theme-instagram-widget.php');
include_once('class-theme-tags-widget.php');

function widgets_init() {
	register_sidebar( array(
		'name'          => 'Sidebar',
		'id'            => 'theme-sidebar',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

	/* Theme plugins */
    register_widget( 'Theme_About_Widget' );
    register_widget( 'Theme_Instagram_Widget' );
    register_widget( 'Theme_Tags_Widget' );

	// Remove default widgets
	unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Widget_Calendar');
    unregister_widget('WP_Widget_Archives');
    unregister_widget('WP_Widget_Links');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Text');
    unregister_widget('WP_Widget_Categories');
    unregister_widget('WP_Widget_Recent_Posts');
    unregister_widget('WP_Widget_Recent_Comments');
    unregister_widget('WP_Widget_RSS');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Nav_Menu_Widget');
    unregister_widget('WP_Widget_Custom_HTML');
    unregister_widget('WP_Widget_Media_Audio');
    unregister_widget('WP_Widget_Media_Gallery');
    unregister_widget('WP_Widget_Media_Video');
    unregister_widget('WP_Widget_Media_Image');

}

add_action( 'widgets_init', 'widgets_init' );

// TODO: add lazy image loading feature
// Soft crop main image
add_image_size( 'placeholder', 20, 20 );
// Hard crop thumbnail
add_image_size( 'featured-placeholder', 20, 20, true );
/*
Custom settings
*/
include_once('theme-settings.php');
/*
React Client
*/
include_once('theme-client.php');



