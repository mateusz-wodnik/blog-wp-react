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
        register_rest_route( 'theme', '/menus/(?P<slug>.+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_menu']
        ));
        register_rest_route( 'theme', '/posts', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_posts']
        ));
        register_rest_route( 'theme', '/posts/(?P<slug>.+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_post']
        ));
        register_rest_route( 'theme', '/settings', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_settings']
        ));
        register_rest_route( 'theme', '/pages', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_pages']
        ));
        register_rest_route( 'theme', '/pages/(?P<slug>.+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_page']
        ));
        register_rest_route( 'theme', '/tags', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_tags']
        ));
        register_rest_route( 'theme', '/sidebar', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_sidebar']
        ));
        register_rest_route( 'theme', '/sidebar/(?P<widget>.+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_widget']
        ));
        register_rest_route( 'theme', '/search', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_search']
        ));
    }

    public function get_search( $request ) {
        $parameters = $request->get_params();
        // Search by keyword!!
        $posts = new WP_Query( $parameters );
        $posts = $posts->posts;
        $posts_filters = ['ID', 'post_title', 'comment_status', 'post_date', 'post_modified','post_status', 'post_name', 'url'];
        $posts = self::normalize_item($posts, $posts_filters);
        $posts = array_map(function($post) {
            return self::populate_post($post);
        }, $posts);
        return $posts;
    }

    public function get_widget( $request ) {
        $widgets = wp_get_sidebars_widgets()['theme-sidebar'];
        $parameters = $request->get_params();
        $name = $parameters['widget'];
        foreach ($widgets as $key => $value) {
            $name_id = explode('-', $value);
            if ($name_id[0] === 'theme_' . $name) {
                $name = $name_id;
            }
        }
        $widget = get_option('widget_' . $name[0])[$name[1]];
        if ($widget['image']) {
            $widget['image'] = wp_get_attachment_image_url($widget['image'], 'thumbnail');
        }
        return $widget;
    }

    public function get_sidebar( $requset ) {

        $widgets = wp_get_sidebars_widgets();
        // $sidebar = wp_get_widget_defaults();
        // $tag_cloud = get_option('widget_text');
        // $posts = get_option('widget_recent-posts');
        // $all_widgets = $GLOBALS['wp_widget_factory'];

        $sidebar = $widgets['theme-sidebar'];
        $sidebar = array_map(function($name) {
            $name_id = explode('-', $name);
            return get_option('widget_' . $name_id[0])[$name_id[1]];
        }, $sidebar);
        return $widgets;
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

    public function get_tags( $request ) {
        $parameters = $request->get_params();
        $tags = get_tags();
        $tags = array_map(function($tag) {
            $tag->url = parse_url(get_tag_link($tag->term_id))['path'];
            return $tag;
        }, $tags);
        return $tags;
    }

    public function get_menus( $request ) {
        $parameters = $request->get_params();
        $menus = wp_get_nav_menus();
        return $menus;
    }

    public function get_menu( $request ) {
        $parameters = is_string($request) ? $request : $request->get_params()['slug'];
        $args = array(
            'orderby' => 'menu_order',
            'order' => 'DESC',
            'output' => 'ARRAY_B'
        );
        $menu = wp_get_nav_menu_items($parameters, $args);
        $filters = ['ID', 'title', 'type', 'object', 'menu_item_parent', 'menu_order', 'url'];
        $menu = self::normalize_item($menu, $filters);
        $result = [];
        for ($x = 0; $x <= count($menu) - 1; $x++) {
            $parent = $menu[$x]['menu_item_parent'];
            if($parent) {
                $keyToAppend = array_search($parent, array_column($menu, 'ID'));
                $menu[$keyToAppend]['childrens'][] = $menu[$x];
            } else {
                $result[] = $menu[$x];
            }
        }
        return $result;
    }

    /* GET all pages
     *
     */
    public function get_pages( $request ) {
        $parameters = $request->get_params();
        $args = array(
            'post_status' => 'publish'
        );
        if ( $parameters ) {
            $args['tag'] = $parameters['tag'];
        }
        $pages = get_pages( $args );
        $pages_filters = ['ID', 'post_title', 'post_date', 'post_content', 'post_modified','post_status', 'post_name', 'url'];
        $pages = self::normalize_item($pages, $pages_filters);
        $pages = array_map(function($post) {
            return self::populate_post($post);
        }, $pages);
        return $pages;
    }

    /* GET page by slug */
    public function get_page( $request ) {
        $parameters = $request->get_params();
        $page = get_page_by_path($parameters['slug'], OBJECT, 'page');
        $post_filters = ['ID', 'post_title', 'post_content', 'comment_status', 'post_date', 'post_modified','post_status', 'post_name', 'url'];
        $post = self::filter_items($post, $post_filters);
        $post = self::populate_post($post);
        return $page;
    }

    /* GET all posts
     *
     */
    public function get_posts( $request ) {
        $parameters = is_string($request) ? $request : $request->get_params()['tag'];
        $args = array(
            'posts_per_page'   => -1,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'post_status'      => 'publish'
        );
        if ( $parameters ) {
            $args['tag'] = $parameters;
        }
        $posts = get_posts($args);
        $posts_filters = ['ID', 'post_title', 'comment_status', 'post_date', 'post_modified','post_status', 'post_name', 'url'];
        $posts = self::normalize_item($posts, $posts_filters);
        $posts = array_map(function($post) {
            return self::populate_post($post);
        }, $posts);
        return $posts;
    }
    /* GET post by slug */
    public function get_post( $request ) {
        $parameters = $request->get_params();
        $post = get_page_by_path($parameters['slug'], OBJECT, 'post');
        $post_filters = ['ID', 'post_title', 'post_content', 'comment_status', 'post_date', 'post_modified','post_status', 'post_name', 'url'];
        $post = self::filter_items($post, $post_filters);
        $post = self::populate_post($post);
        return $post;
    }

    static function populate_post($post) {
        $featured_media = [
            "thumbnail" => parse_url(get_the_post_thumbnail_url($post['ID'], 'thumbnail'))['path'],
            "medium" => parse_url(get_the_post_thumbnail_url($post['ID'], 'medium'))['path'],
            "large" => parse_url(get_the_post_thumbnail_url($post['ID'], 'large'))['path'],
            "full" => parse_url(get_the_post_thumbnail_url($post['ID'], 'full'))['path'],
        ];
        $url = parse_url(get_permalink($post['ID']))['path'];
        $excerpt = get_the_excerpt($post['ID']);
        $categories = get_the_category($post['ID']);
        $categories_filters = ['term_id', 'name', 'slug', 'term_taxonomy_id'];
        $categories = self::normalize_item($categories, $categories_filters);
        $post['featured_media'] = $featured_media;
        $post['url'] = $url;
        $post['excerpt'] = $excerpt;
        $post['categories'] = $categories;
        return $post;
    }
    
    static function normalize_item( $items, $filters ) {
        return array_map(function($item) use ($filters) {
            $filtered = [];
            foreach( $filters as $filter ) {
                if ( $filter === 'url' ) {
                    $path = parse_url($item->$filter)['path'];
                    if($item->object === 'category') {
                        $tokens = explode('/', $path);
                        $path =$tokens[sizeof($tokens)-2];
                    } 
                    $filtered[$filter] = $path ? $path : $item->$filter;
                } else {
                    $filtered[$filter] = $item->$filter;   
                }
            }
            return $filtered;
        }, $items);
    }

    static function filter_items($item, $filters) {
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
    }
    
}

$theme_client = new ThemeClient();

