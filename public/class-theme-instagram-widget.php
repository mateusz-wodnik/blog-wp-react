<?php
/**
 * Adds Foo_Widget widget.
 */
class Theme_Instagram_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'theme_instagram', // Base ID
			esc_html__( 'Instagram', 'text_domain' ), // Name
			array( 'description' => esc_html__( 'Instagram feed', 'text_domain' ), ) // Args
		);
		// wp_enqueue_script( 'script', get_template_directory_uri() . '/ig-auth.js', array ( 'jquery' ), true);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
		echo esc_html__( 'Hello, World!', 'text_domain' );
		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'New title', 'text_domain' );
		$token = ! empty( $instance['token'] ) ? $instance['token'] : esc_html__( 'New token', 'text_domain' );
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
		<p>
		<label for="<?php echo esc_attr( $this->get_field_id( 'token' ) ); ?>"><?php esc_attr_e( 'Instagram Access Token:', 'text_domain' ); ?></label> 
		<input 
			class="widefat"
			id="<?php echo esc_attr( $this->get_field_id( 'token' ) ); ?>"
			name="<?php echo esc_attr( $this->get_field_name( 'token' ) ); ?>"
			type="text"
			value="<?php echo esc_attr( $token ); ?>"
			placeholder="Enter valid Instagram Access Token"
		>
		</p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['token'] = ( ! empty( $new_instance['token'] ) ) ? sanitize_text_field( $new_instance['token'] ) : '';

		return $instance;
	}

}