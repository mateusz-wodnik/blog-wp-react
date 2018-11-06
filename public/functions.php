<?php
register_nav_menus();
add_theme_support( 'custom-logo' );
add_theme_support( 'post-thumbnails' );

/*
Plugin Name: React Client
*/

add_action( 'rest_api_init', 'register_woocommerce_routes');
function register_woocommerce_routes() {
    register_rest_route( 'theme', '/logo', array(
        'methods' => 'GET',
        'callback' => 'get_logo'
    ));
    register_rest_route( 'theme', '/menus', array(
        'methods' => 'GET',
        'callback' => 'get_menus'
    ));
}

function get_logo( $request ) {
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $logo = wp_get_attachment_image_url( $custom_logo_id , 'full' );
    if ( has_custom_logo() ) {
            $imgPath = ABSPATH.substr(parse_url($logo)['path'], 1);
            header('Content-Type:'.'image/jpg');
            return readfile($imgPath);
    } else {
            return get_bloginfo( 'name' );
    }
}

function normalize_item( $items, $filters ) {
    return array_map(function($item) use ($filters) {
        $filtered = [];
        foreach( $filters as $filter ) {
            if ( $filter === 'url' ) {
                $path = parse_url($item->$filter)['path'];
                $filtered[$filter] = $path ? $path : $item->$filter;
            } else {
                $filtered[$filter] = $item->$filter;   
            }
        }
        return $filtered;
    }, $items);
}

function get_menus( $request ) {
    $parameters = $request->get_params();
    if ( $parameters ) {
        $filters = ['ID', 'title', 'type', 'object', 'menu_item_parent', 'menu_order', 'url'];
        $items = wp_get_nav_menu_items($parameters['slug']);
        $filtered = normalize_item($items, $filters);
        
        return $filtered;
    }
    $menus = wp_get_nav_menus();
    return $menus;
}
