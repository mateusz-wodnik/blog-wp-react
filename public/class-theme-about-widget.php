<?php
class Theme_About_Widget extends WP_Widget {
	function __construct() {
		parent::__construct(
			'theme_about', // Base ID
			esc_html__( 'About', 'text_domain' ), // Name
			array( 'description' => esc_html__( 'Displays your photo with short caption linking to \'about\' page', 'text_domain' ), ) // Args
		);
	}

	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
		echo esc_html__( 'Hello, World!', 'text_domain' );
		echo $args['after_widget'];
	}

	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'New title', 'text_domain' );
		$image = ! empty( $instance['image'] ) ? $instance['image'] : esc_html__( 'New image', 'text_domain' );
		$image_url = wp_get_attachment_image_url(esc_attr( $image, 'medium' ));
		$text = ! empty( $instance['text'] ) ? $instance['text'] : esc_html__( 'New text', 'text_domain' );
		$url = ! empty( $instance['url'] ) ? $instance['url'] : esc_html__( 'New url', 'text_domain' );
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_attr_e( 'Title:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $title ); ?>"
			>
		</p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'image' ) ); ?>">
				<?php esc_attr_e( 'Image:', 'text_domain' ); ?>
			</label> 
			<input
				hidden
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'image' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'image' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $image ); ?>"
			>
		    <img
		    	class="attachment-thumb"
		    	src="<?php echo $image_url ?>"
		    	id="author_image"
		    	style="max-width: 100%; cursor: pointer;"
		    />
		    <button class="set_custom_images button">Set Image ID</button>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>">
				<?php esc_attr_e( 'Text:', 'text_domain' ); ?>
			</label> 
			<input 
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'text' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $text ); ?>"
			>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'url' ) ); ?>">
				<?php esc_attr_e( 'Url:', 'text_domain' ); ?>
			</label> 
			<input 
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'url' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'url' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $url ); ?>"
			>
		</p>
		<?php 
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['text'] = ( ! empty( $new_instance['text'] ) ) ? sanitize_text_field( $new_instance['text'] ) : '';
		$instance['url'] = ( ! empty( $new_instance['url'] ) ) ? sanitize_text_field( $new_instance['url'] ) : '';
		$instance['image'] = ( ! empty( $new_instance['image'] ) ) ? sanitize_text_field( $new_instance['image'] ) : '';

		return $instance;
	}
}