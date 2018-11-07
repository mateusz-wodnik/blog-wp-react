<?php
class MySettingsPage {
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct() {
        // delete_option('elo');
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
        add_action( 'admin_enqueue_scripts', [ $this, add_set_image ]);
    }

    public function add_set_image() {
        wp_enqueue_script( 'script', get_template_directory_uri() . '/add-author-image.js', array ( 'jquery' ), 1.1, true);
        wp_enqueue_media ();
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_options_page(
            'Settings Admin', 
            'My Settings', 
            'manage_options', 
            'my-setting-admin', 
            array( $this, 'create_admin_page' )
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
        $this->options = get_option( 'theme_settings' );
        ?>
        <div class="wrap">
            <h1>My Settings</h1>
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'my_option_group' );
                do_settings_sections( 'my-setting-admin' );
                submit_button();
            ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init() {        
        register_setting(
            'my_option_group', // Option group
            'theme_settings', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_section_id', // ID
            'My Custom Settings', // Title
            array( $this, 'print_section_info' ), // Callback
            'my-setting-admin' // Page
        );  

        add_settings_field(
            'id_number', // ID
            'ID Number', // Title 
            array( $this, 'id_number_callback' ), // Callback
            'my-setting-admin', // Page
            'setting_section_id' // Section           
        );      

        add_settings_field(
            'title', 
            'Title', 
            array( $this, 'title_callback' ),
            'my-setting-admin', 
            'setting_section_id'
        );
        add_settings_field(
            "author_image",
            "Header Image",
			array( $this, 'header_image_callback' ),
			'my-setting-admin',
			'setting_section_id'
        );
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input ) {
        $new_input = array();
        if( isset( $input['id_number'] ) )
            $new_input['id_number'] = absint( $input['id_number'] );

        if( isset( $input['title'] ) )
            $new_input['title'] = sanitize_text_field( $input['title'] );
        if( isset( $input['author_image'] ) )
            $new_input['author_image'] = sanitize_text_field( $input['author_image'] );

        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_section_info() {
        print 'Configure your site template';
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function id_number_callback() {
        printf(
            '<input type="text" id="id_number" name="theme_settings[id_number]" value="%s" />',
            isset( $this->options['id_number'] ) ? esc_attr( $this->options['id_number']) : ''
        );
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function title_callback() {
        printf(
            '<input type="text" id="title" name="theme_settings[title]" value="%s" />',
            isset( $this->options['title'] ) ? esc_attr( $this->options['title']) : ''
        );
    }
    public function header_image_callback() {
        vprintf('<input type="text" value="%s" hidden id="author_image" name="theme_settings[author_image]" max="" min="1" step="1">
                 <button class="set_custom_images button">Set Image ID</button>
                 <img src="%s" id="author_image" />',
            isset( $this->options['author_image'] ) ? [esc_attr( $this->options['author_image']), wp_get_attachment_image_url($this->options['author_image'])] : ['theme_settings', 'mordo']
        );
    }

}

// if( is_admin() )
    $my_settings_page = new MySettingsPage();
