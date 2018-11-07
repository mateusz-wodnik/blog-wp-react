<?php
class ThemeClient {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ]);    
    }
    public function register_routes() {
        register_rest_route( 'theme', '/logo', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_logo']
        ));
        register_rest_route( 'theme', '/menus', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_menus']
        ));
        register_rest_route( 'theme', '/posts', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_posts']
        ));
        register_rest_route( 'theme', '/settings', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_settings']
        ));
    }

    public function get_settings() {
        $settings = get_option('theme_settings');
        $settings['author_image'] = wp_get_attachment_image_url($settings['author_image'], 'thumbnail');
        return $settings;
    }

    public function get_logo( $request ) {
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

    public function get_menus( $request ) {
        $parameters = $request->get_params();
        if ( $parameters ) {
            $filters = ['ID', 'title', 'type', 'object', 'menu_item_parent', 'menu_order', 'url'];
            $items = wp_get_nav_menu_items($parameters['slug']);
            $filtered = self::normalize_item($items, $filters);
            
            return $filtered;
        }
        $menus = wp_get_nav_menus();
        return $menus;
    }

    public function get_posts( $request ) {
        $parameters = $request->get_params();
        $args = array(
            'posts_per_page'   => -1,
            'orderby'          => 'date',
            'order'            => 'ASC'
        );
        if ( $parameters ) {
            $args['tag'] = $parameters['tag'];
        }
        $posts = get_posts($args);
        $posts_filters = ['ID', 'post_title', 'post_content', 'comment_status', 'post_date', 'post_modified','post_status', 'post_name', 'url'];
        $posts = self::normalize_item($posts, $posts_filters);
        $posts = array_map(function($item) {
            $thumbnail = parse_url(get_the_post_thumbnail_url($item['ID'], 'thumbnail'))['path'];
            $featured_image = parse_url(get_the_post_thumbnail_url($item['ID'], 'large'))['path'];
            $url = parse_url(get_permalink($item['ID']))['path'];
            $excerpt = get_the_excerpt($item['ID']);
            $categories = get_the_category($item['ID']);
            $categories_filters = ['term_id', 'name', 'slug', 'term_taxonomy_id'];
            $categories = self::normalize_item($categories, $categories_filters);
            $item['thumbnail'] = $thumbnail;
            $item['featured_image'] = $featured_image;
            $item['url'] = $url;
            $item['excerpt'] = $excerpt;
            $item['categories'] = $categories;
            return $item;
        }, $posts);
        return $posts;
    }
    
    static function normalize_item( $items, $filters ) {
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
    
}

$theme_client = new ThemeClient(); 

